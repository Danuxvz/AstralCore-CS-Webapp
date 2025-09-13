import moduleLibrary from './moduleLibrary.js';
import moduleCatalog from './moduleCatalog.js';
import { supabase } from "./supabase.js";

//global variables
let draggedModule = null;
let currentUser = null;
let activeCatalog = "";
let currentActiveCharacterId = null;
let isSyncing = false;
let activeCharacter = {
	name: "Default Character",
	stats: {
		mig: { dice: 8, temp: 0 },
		dex: { dice: 8, temp: 0 },
		int: { dice: 8, temp: 0 },
		stl: { dice: 8, temp: 0 },
		wlp: { dice: 8, temp: 0 },
	},
	secondaryStats: {
		hp: { value: 36, temp: 0 },
		ep: { value: 8, temp: 0 },
		df: { value: 8, temp: 0 },
		dm: { value: 8, temp: 0 },
		impr: { value: 1, temp: 0 },
		mov: { value: 8, temp: 0 },
		atk: { value: 0, temp: 0 },
		dmg: { value: 0, temp: 0 },
	},
	jobs: [],
	skills: [],
	modules: {
		tier1: [],
		tier2: [],
		tier3: [],
		tier4: [],
		tier5: [],
	},
	perks: [],
	sp: 0,
	ce: 0,
	permanentBonuses: {},
	statUpgrades: {},
};
const jobEffects = [
	"Tras tirar tus stats, puedes reemplazar una de ellas por un 5.",
	"Tus tiradas pares por debajo de 6 se consideran críticos.",
	"Ganas un +3 a las secundarias de tu oficio.",
	"En cualquier momento durante el combate, puedes gastar +1 PE para usar una secundaria relacionada con tu oficio como una acción gratuita.",
	"Al fallar una tirada enfrentada de tu oficio, puedes gastar 2 PE para convertir el fallo en un acierto.",
	"Ignoras cualquier desventaja circunstancial que afecte tus tiradas del oficio."
];
window.showSection = showSection;
window.showCatalog = showCatalog;


// SupaBase handeling
// Add timestamp to character data
function addTimestamps(character) {
  const now = Date.now();
  if (!character.createdAt) character.createdAt = now;
  if (!character.updatedAt) character.updatedAt = now;
  return character;
}

async function syncCharacters() {
    if (!currentUser) return;
    
    // Set sync flag
    isSyncing = true;
    console.log("Sync started");

    try {
        const userId = currentUser.id;
        const localCharacters = await getCharacterList();
        console.log("Fetching characters from DB...");
        const remoteCharacters = await fetchCharactersFromDB(userId);
        console.log("Characters fetched from DB.");

        const mergedCharacters = { ...localCharacters };

        // Build a lookup for remote characters by hash and name
        const remoteByHash = {};
        const remoteByName = {};
        
        for (const [remoteId, remoteChar] of Object.entries(remoteCharacters)) {
            addTimestamps(remoteChar);
            const hash = hashCharacterData(remoteChar);
            remoteByHash[hash] = { id: remoteId, data: remoteChar };
            remoteByName[remoteChar.name] = { id: remoteId, data: remoteChar, hash: hash };
        }

        // Process local characters
        for (const [localId, localCharData] of Object.entries(localCharacters)) {
            // Load the full character data from IndexedDB
            const localChar = await loadCharacter(localId);
            addTimestamps(localChar);
            const localHash = hashCharacterData(localChar);

            const remoteMatch = remoteByHash[localHash];

            if (!remoteMatch) {
                // Check if a character with the same name exists (even if data is different)
                const sameNameChar = remoteByName[localChar.name];
                
                if (sameNameChar) {
                    // Character with same name exists but different data
                    if (localChar.updatedAt > sameNameChar.data.updatedAt) {
                        console.log(`Updating remote "${sameNameChar.data.name}" with newer local copy`);
                        localChar.updatedAt = Date.now();
                        await saveCharacterToDB(sameNameChar.id, localChar);
                        mergedCharacters[sameNameChar.id] = localChar;
                        if (localId !== sameNameChar.id) {
                            await deleteCharacterFromLocalDB(localId);
                            delete mergedCharacters[localId];
                        }
                    } else {
                        console.log(`Updating local "${localChar.name}" with newer remote copy`);
                        sameNameChar.data.updatedAt = Date.now();
                        mergedCharacters[localId] = sameNameChar.data;
                        await saveCharacterToDB(localId, sameNameChar.data);
                    }
                } else {
                    // Completely new character → upload
                    console.log(`Uploading new character`, localChar);
                    localChar.updatedAt = Date.now();
                    const { data, error } = await supabase
                        .from("characters")
                        .insert({
                            user_id: userId,
                            name: localChar.name,
                            data: localChar,
                            discord_id: currentUser?.user_metadata?.provider_id || null 
                        })
                        .select("id, data")
                        .single();

                    if (error) {
                        console.error("Failed to upload character:", error);
                    } else if (data) {
                        mergedCharacters[data.id] = localChar;
                        if (localId !== data.id) {
                            await deleteCharacterFromLocalDB(localId);
                            delete mergedCharacters[localId];
                        }

                        const uploadedHash = hashCharacterData(localChar);
                        remoteByHash[uploadedHash] = { id: data.id, data: localChar };
                        remoteByName[localChar.name] = { id: data.id, data: localChar, hash: uploadedHash };
                    }
                }
            } else {
                // Found an exact match
                console.log(`Character "${localChar.name}" is already synced.`);
                // Ensure we're using the remote ID
                if (localId !== remoteMatch.id) {
                    mergedCharacters[remoteMatch.id] = localChar;
                    await deleteCharacterFromLocalDB(localId);
                    delete mergedCharacters[localId];
                }
            }
        }

        // Process remote-only characters
        for (const [remoteId, remoteChar] of Object.entries(remoteCharacters)) {
            const remoteHash = hashCharacterData(remoteChar);
            const alreadyLocal = Object.entries(mergedCharacters).some(
                ([localId, c]) => localId === remoteId || hashCharacterData(c) === remoteHash
            );

            if (!alreadyLocal) {
                console.log(`Downloading new remote character "${remoteChar.name}"`);
                remoteChar.updatedAt = Date.now();
                mergedCharacters[remoteId] = remoteChar;
                await saveCharacterToDB(remoteId, remoteChar);
            }
        }

        console.log("Sync complete. Local is up-to-date.");

        // Update the character selector
        await populateCharacterSelector();
        
    } catch (error) {
        console.error("Error syncing characters:", error);
    } finally {
        // Clear sync flag
        isSyncing = false;
        console.log("Sync completed");
    }
}

function normalizeCharacterData(character) {
  return {
    name: character.name,
    stats: character.stats,
    secondaryStats: character.secondaryStats,
    jobs: (character.jobs || []).map(j => ({ id: j.id, title: j.title, effect: j.effect })),
    skills: (character.skills || []).map(s => ({
      name: s.name,
      restrictions: [...(s.restrictions || [])].sort(), // ✅ sorted
      stats: [...(s.stats || [])].sort(),
      description: s.description,
      modules: [...(s.modules || [])].sort()
    })),
    modules: {
      tier1: [...(character.modules?.tier1 || [])].sort(),
      tier2: [...(character.modules?.tier2 || [])].sort(),
      tier3: [...(character.modules?.tier3 || [])].sort(),
      tier4: [...(character.modules?.tier4 || [])].sort(),
      tier5: [...(character.modules?.tier5 || [])].sort()
    },
    perks: [...(character.perks || [])].sort(),
    sp: character.sp || 0,
    ce: character.ce || 0
  };
}

function hashCharacterData(characterData) {
  const normalized = normalizeCharacterData(characterData);
  const str = JSON.stringify(normalized);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32-bit int
  }
  return hash;
}

// Login with Discord
async function loginWithDiscord() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "discord",
		options: {
			// redirectTo: "http://127.0.0.1:3000/index.html"
			redirectTo: "https:/potilandiaheroes-dxhmb6hwhnc4bfhb.canadacentral-01.azurewebsites.net"
		}
	});

	if (error) {
		console.error("Login error:", error);
		return;
	}

	if (data?.url) {
		window.location.href = data.url;
	}
}

async function logout() {
	console.log("Logging out...");
	const { error } = await supabase.auth.signOut();
	
	if (error) {
		console.error("Logout error:", error);
		return;
	}

	console.log("Logout successful");
}

async function handleAuthChange(session) {
  const user = session?.user;
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userEmail = document.getElementById("userEmail");

  if (user) {
    console.log("User logged in:", user);
    console.log("Logged in Discord user ID:", user.user_metadata.provider_id);

    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    userEmail.textContent = user.email || user.user_metadata?.full_name || "";

    // Only do heavy lifting if user actually changed
    if (!currentUser || currentUser.id !== user.id) {
      currentUser = user;

      // Store the current active character ID before syncing
      const previousActiveCharacterId = currentActiveCharacterId;

      // First sync characters, then populate selector
      await syncCharacters();
      const characters = await populateCharacterSelector();

      if (characters && Object.keys(characters).length > 0) {
        // Try to restore the previous active character if it exists
        if (previousActiveCharacterId && characters[previousActiveCharacterId]) {
          await setActiveCharacter(previousActiveCharacterId);
        } else {
          // Fallback to the first character if the previous one doesn't exist
          const firstCharacterId = Object.keys(characters)[0];
          await setActiveCharacter(firstCharacterId);
        }
      }
    } else {
      // Session refresh - just update the reference
      currentUser = user;
      
      // Only sync if we haven't synced recently (within last minute)
      const lastSync = localStorage.getItem('lastSyncTime');
      const currentTime = Date.now();
      
      // Only sync if visible and not just returning from long absence
      if (document.visibilityState === 'visible' && 
          (!lastSync || (currentTime - parseInt(lastSync)) > 60000)) {
        // Use a small delay to avoid race conditions
        setTimeout(() => {
          syncCharacters();
          localStorage.setItem('lastSyncTime', currentTime.toString());
        }, 2000);
      }
    }
  } else {
    console.log("No active user");

    if (currentUser !== null) {
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
      userEmail.textContent = "";

      currentUser = null;

      const characters = await populateCharacterSelector();
      
      // Try to keep the same character active if it exists in local storage
      if (currentActiveCharacterId && characters[currentActiveCharacterId]) {
        await setActiveCharacter(currentActiveCharacterId);
      } else if (Object.keys(characters).length > 0) {
        // Fallback to the first character if the current one doesn't exist
        const firstCharacterId = Object.keys(characters)[0];
        await setActiveCharacter(firstCharacterId);
      }
    }
  }
  initializeLocalCharacters();
}

async function saveCharacterToDB(characterId, characterData) {
    const user = currentUser;
    
    // First save to IndexedDB
    try {
        await saveCharacterToIndexedDB(characterId, characterData);
    } catch (error) {
        console.error("Error saving to IndexedDB:", error);
    }
    
    // Then sync to Supabase if user is logged in
    if (user) {
        try {
            // Check if this is a local ID (starts with "char_")
            if (characterId.startsWith('char_')) {
                // For local IDs, we need to find if this character already exists in DB
                const remoteCharacters = await fetchCharactersFromDB(user.id);
                const characterHash = hashCharacterData(characterData);
                
                let foundInDB = false;
                for (const [dbId, dbChar] of Object.entries(remoteCharacters)) {
                    if (hashCharacterData(dbChar) === characterHash) {
                        // Character exists in DB, update it
                        const { error } = await supabase
                            .from("characters")
                            .update({
                                user_id: user.id,
                                name: characterData.name,
                                data: characterData,
                            })
                            .eq("id", dbId);

                        if (error) throw error;
                        foundInDB = true;
                        break;
                    }
                }
                
                if (!foundInDB) {
                    // Character doesn't exist in DB, create it with a UUID
                    const { data, error } = await supabase
                        .from("characters")
                        .insert({
                            user_id: user.id,
                            name: characterData.name,
                            data: characterData,
                            discord_id: user.user_metadata?.provider_id || null
                        })
                        .select("id")
                        .single();

                    if (error) throw error;
                    
                    // Update IndexedDB to use the new ID
                    await saveCharacterToIndexedDB(data.id, characterData);
                    await deleteCharacterFromLocalDB(characterId);
                    
                    // Update active character ID if needed
                    if (currentActiveCharacterId === characterId) {
                        currentActiveCharacterId = data.id;
                    }
                }
            } else {
                // Character ID is already a UUID, just upsert
                const { error } = await supabase
                    .from("characters")
                    .upsert({
                        id: characterId,
                        user_id: user.id,
                        name: characterData.name,
                        data: characterData,
                    }, {
                        onConflict: 'id'
                    });

                if (error) throw error;
            }
        } catch (error) {
            console.error("Error saving character to Supabase:", error);
        }
    }
}

async function fetchCharactersFromDB(userId) {
	if (!userId) return {};

	try {
		const { data, error } = await supabase
			.from("characters")
			.select("*")
			.eq("user_id", userId);

		if (error) throw error;

		const characters = {};
		data.forEach(row => {
			characters[row.id] = row.data;
		});
		
		return characters;
	} catch (error) {
		console.error("Error fetching characters from DB:", error);
		return {};
	}
}

async function deleteCharacterFromDB(characterId) {
	console.log("Deleting character:", currentActiveCharacterId);
const { error } = await supabase
	.from("characters")
	.delete()
	.eq("id", characterId
);

if (error) console.error("Error deleting:", error);
}





//LocalStorage + IndexDB handeling
const DB_NAME = 'CharacterManagerDB';
const DB_VERSION = 1;
const STORE_NAME = 'characters';
let db = null;

//IndexedDB
function openLocalDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            
            // Create object store if it doesn't exist
            if (!database.objectStoreNames.contains(STORE_NAME)) {
                const store = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('name', 'name', { unique: false });
                store.createIndex('updatedAt', 'updatedAt', { unique: false });
            }
        };
    });
}

async function getCharacterList() {
    if (!db) await openLocalDatabase();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const characterList = {};
            request.result.forEach(character => {
                characterList[character.id] = {
                    id: character.id,
                    name: character.name || "Unnamed Character", // Ensure we have a name
                    updatedAt: character.updatedAt
                };
            });
            resolve(characterList);
        };
    });
}

async function loadCharacter(id) {
    if (!db) await openLocalDatabase();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            if (request.result) {
                // Create a deep copy to prevent reference issues
                const characterCopy = JSON.parse(JSON.stringify(request.result));
                resolve(characterCopy);
            } else {
                resolve(null);
            }
        };
    });
}

async function saveActiveCharacter() {
    if (!activeCharacter || !currentActiveCharacterId) return;
    
    if (!db) await openLocalDatabase();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // Add ID and timestamp to character data
        const characterWithId = {
            ...activeCharacter,
            id: currentActiveCharacterId,
            updatedAt: Date.now()
        };
        
        const request = store.put(characterWithId);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            console.log("Character saved to IndexedDB:", currentActiveCharacterId);
            resolve(request.result);
        };
    });
}

async function deleteCharacterFromLocalDB(id) {
    if (!db) await openLocalDatabase();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
		console.log(`Deleted character ${id}`)
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

async function saveCharacterToIndexedDB(id, characterData) {
    if (!db) await openLocalDatabase();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // Add ID and timestamp to character data
        const characterWithId = {
            ...characterData,
            id: id,
            updatedAt: Date.now()
        };
        
        const request = store.put(characterWithId);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

async function migrateFromLocalStorage() {
    try {
        // Check if we have old data in localStorage
        const oldCharacters = JSON.parse(localStorage.getItem("characters") || "{}");
        
        if (Object.keys(oldCharacters).length > 0) {
            console.log("Migrating characters from localStorage to IndexedDB...");
            
            // Save each character to IndexedDB
            for (const [id, character] of Object.entries(oldCharacters)) {
                await saveCharacterToIndexedDB(id, character);
            }
            
            // Remove old data
            localStorage.removeItem("characters");
            localStorage.removeItem("characters_index");
            
            console.log("Migration completed successfully");
        }
    } catch (error) {
        console.error("Error during migration:", error);
    }
}



// Unified function to load characters
async function loadAllCharacters() {
	const characters = JSON.parse(localStorage.getItem("characters") || "{}");
	console.log("Loading all characters...");
	const user = currentUser;
	console.log("User:", user);
	
	return characters
	
}

async function initializeLocalCharacters() {
    try {
        // Open database
        await openLocalDatabase();
        
        // Migrate from localStorage if needed
        await migrateFromLocalStorage();
        
        // Check if we have any characters
        const characters = await getCharacterList();
        const user = currentUser;
        
        if (Object.keys(characters).length === 0 && !user) {
            const defaultCharacter = createLocalDefaultCharacter();
            const defaultId = "default";
            await saveCharacterToIndexedDB(defaultId, defaultCharacter);
            
            // Set as active character
            activeCharacter = defaultCharacter;
            currentActiveCharacterId = defaultId;
        } else if (Object.keys(characters).length > 0) {
            // Load the first character
            const firstCharacterId = Object.keys(characters)[0];
            await setActiveCharacter(firstCharacterId);
        }
    } catch (error) {
        console.error("Error initializing characters:", error);
    }
}

function createLocalDefaultCharacter() {
	return {
		name: "Default Character",
		stats: {
			mig: { dice: 8, temp: 0 },
			dex: { dice: 8, temp: 0 },
			int: { dice: 8, temp: 0 },
			stl: { dice: 8, temp: 0 },
			wlp: { dice: 8, temp: 0 },
		},
		secondaryStats: {
			hp: { value: 36, temp: 0 },
			ep: { value: 8, temp: 0 },
			df: { value: 8, temp: 0 },
			dm: { value: 8, temp: 0 },
			impr: { value: 1, temp: 0 },
			mov: { value: 8, temp: 0 },
			atk: { value: 0, temp: 0 },
			dmg: { value: 0, temp: 0 },
		},
		jobs: [],
		skills: [],
		modules: {
			tier1: [],
			tier2: [],
			tier3: [],
			tier4: [],
			tier5: [],
		},
		perks: [],
		sp: 0,
		ce: 0,
		permanentBonuses: {},
		statUpgrades: {},
	};
}

async function setActiveCharacter(characterId, skipSave = false) {
    if (characterId === currentActiveCharacterId) {
        console.log("Character already active, skipping reload:", characterId);
        return;
    }
    
    // Save current character before switching unless skipSave is true
    if (activeCharacter && currentActiveCharacterId && !skipSave) {
        await saveActiveCharacter();
    }
    
    // Rest of the function remains the same...
    // If we're in the middle of a sync, wait for it to complete
    if (isSyncing) {
        console.log("Sync in progress, deferring character switch");
        setTimeout(() => setActiveCharacter(characterId, skipSave), 500);
        return;
    }
    
    const user = currentUser;
    let selectedCharacter = null;
    
    try {
        // Try to get character from IndexedDB
        selectedCharacter = await loadCharacter(characterId);
        
        // If character not found in IndexedDB and user is logged in, check DB
        if (!selectedCharacter && user) {
            try {
                const remoteCharacters = await fetchCharactersFromDB(user.id);
                selectedCharacter = remoteCharacters[characterId];
                
                if (selectedCharacter) {
                    // Add this character to IndexedDB
                    await saveCharacterToDB(characterId, selectedCharacter);
                }
            } catch (error) {
                console.error("Error fetching character from DB:", error);
            }
        }
        
        if (!selectedCharacter) {
            console.error("Character ID not found:", characterId);
            return;
        }
        
        currentActiveCharacterId = characterId;
        activeCharacter = selectedCharacter;

        // Reset current HP/EP inputs
        const currentHpInput = document.getElementById("currentHp");
        const currentEpInput = document.getElementById("currentEp");
        if (currentHpInput) currentHpInput.value = "";
        if (currentEpInput) currentEpInput.value = "";

        // Process the character data
        activeCharacter = migrateCharacterData(activeCharacter);
        syncOldCharacterData();
        populateCharacterData(activeCharacter);
        
        console.log("Active character set:", activeCharacter.name);

        // Update summary section
        renderSummary();
        updateImageDisplay();
        calculateAvailableJobs();
    } catch (error) {
        console.error("Error setting active character:", error);
    }
}


// Navigation
function showSection(sectionId) {
	// Hide all sections and show the selected one
	document.querySelectorAll('.section').forEach(section => {
		section.style.display = (section.id === sectionId) ? 'block' : 'none';
	});
	renderSkills();

}

// Export Character as JSON
document.getElementById("exportCharacter").addEventListener("click", () => {
	const characterData = gatherCharacterData();
	const json = JSON.stringify(characterData, null, 2);

	const blob = new Blob([json], { type: "application/json" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = `${characterData.name || "character"}.json`;
	link.click();
});

// Import Character from JSON
document.getElementById("newCharacter").addEventListener("click", async () => {
    const user = currentUser;
    const characterSelector = document.getElementById("characterSelector");
    
    try {
        const characters = await getCharacterList();
        
        if (user) {
            // User is logged in - create character directly in database
            try {
                const newCharacter = createLocalDefaultCharacter();
                newCharacter.name = `New Character ${Object.keys(characters).length + 1}`;
                
                // Create character in database
                const { data, error } = await supabase
                    .from("characters")
                    .insert({
                        user_id: user.id,
                        name: newCharacter.name,
                        data: newCharacter,
                        discord_id: user.user_metadata?.provider_id || null
                    })
                    .select("id, data")
                    .single();

                if (error) throw error;
                
                // Add to IndexedDB with UUID from database
                await saveCharacterToDB(data.id, newCharacter);
                
                // Update selector and set as active
                await populateCharacterSelector();
                characterSelector.value = data.id;
                await setActiveCharacter(data.id);
                updateImageDisplay();
                
            } catch (error) {
                console.error("Error creating character in database:", error);
                alert("Failed to create character. Please check your connection.");
            }
        } else {
            // User is not logged in - create character locally
            const newCharacterId = `char_${Date.now()}`;
            const newCharacter = createLocalDefaultCharacter();
            newCharacter.name = `New Character ${Object.keys(characters).length + 1}`;

            // Create character in IndexedDB
            await saveCharacterToDB(newCharacterId, newCharacter);

            // Update selector
            await populateCharacterSelector();
            characterSelector.value = newCharacterId;

            await setActiveCharacter(newCharacterId);
            updateImageDisplay();
        }
    } catch (error) {
        console.error("Error creating new character:", error);
    }
});

// Update the Import Character handler
document.getElementById("importCharacter").addEventListener("change", async function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const characterData = JSON.parse(e.target.result);
            const migratedCharacter = typeof migrateCharacterData === "function"
                ? migrateCharacterData(characterData)
                : characterData;

            const user = currentUser;
            const characterSelector = document.getElementById("characterSelector");
            
            if (user) {
                // User is logged in - create character directly in database
                try {
                    const { data, error } = await supabase
                        .from("characters")
                        .insert({
                            user_id: user.id,
                            name: migratedCharacter.name,
                            data: migratedCharacter,
                            discord_id: user.user_metadata?.provider_id || null
                        })
                        .select("id, data")
                        .single();

                    if (error) throw error;
                    
                    // Add to IndexedDB with UUID from database
                    await saveCharacterToDB(data.id, migratedCharacter);
                    
                    // Update selector and set as active
                    await populateCharacterSelector();
                    characterSelector.value = data.id;
                    await setActiveCharacter(data.id);
                    event.target.value = '';
                    updateImageDisplay();
                    
                } catch (error) {
                    console.error("Error importing character to database:", error);
                    alert("Failed to import character. Please check your connection.");
                }
            } else {
                // User is not logged in - create character locally
                const newCharacterId = `char_${Date.now()}`;
                await saveCharacterToDB(newCharacterId, migratedCharacter);

                // Update selector and set as active
                await populateCharacterSelector();
                characterSelector.value = newCharacterId;
                await setActiveCharacter(newCharacterId);
                event.target.value = '';
                updateImageDisplay();
            }
        } catch (err) {
            alert("Error importing character: Invalid or corrupted file format");
            console.error(err);
        }
    };
    reader.readAsText(file);
});

// Delete Character button handler
document.getElementById("deleteCharacter").addEventListener("click", async () => {
    const characterSelector = document.getElementById("characterSelector");
    const characterId = currentActiveCharacterId;
    
    try {
        const character = await loadCharacter(characterId);
        
        if (!character) {
            alert("No character selected or character doesn't exist.");
            return;
        }

        if (!confirm(`Are you sure you want to delete ${character.name}?`)) return;

        // Remove from IndexedDB
        await deleteCharacterFromLocalDB(characterId);

        // Remove from database if user is logged in and online
        const user = currentUser;
        if (user && navigator.onLine) {
            await deleteCharacterFromDB(characterId);
        }

        // Update selector
        await populateCharacterSelector();

        // Select a new character or create default - use skipSave to prevent saving the deleted character
        const characters = await getCharacterList();
        if (Object.keys(characters).length === 0) {
            document.getElementById("newCharacter").click();
        } else {
            const firstCharacterId = Object.keys(characters)[0];
            characterSelector.value = firstCharacterId;
            await setActiveCharacter(firstCharacterId, true); // Skip save here
        }
        updateImageDisplay();
    } catch (error) {
        console.error("Error deleting character:", error);
    }
});

async function saveCharacterData() {
    console.log("Saving character data...");
    const characterSelector = document.getElementById("characterSelector");
    const selectedCharacterId = characterSelector.value;
    console.log("Selected character ID:", selectedCharacterId);
    if (!selectedCharacterId) return;

    const updatedCharacter = addTimestamps(gatherCharacterData());
    console.log("Data gathered.", updatedCharacter);
    
    activeCharacter = updatedCharacter;

    try {
        // Save to IndexedDB
        await saveActiveCharacter();
        console.log("Character saved to IndexedDB:", selectedCharacterId);
        
        // Sync to Supabase in the background if user is logged in
        if (currentUser) {
            setTimeout(async () => {
                try {
                    await saveCharacterToDB(selectedCharacterId, activeCharacter);
                    console.log("Character saved to Supabase in background:", selectedCharacterId);
                } catch (error) {
                    console.error("Background save error:", error);
                }
            }, 0);
        }
    } catch (error) {
        console.error("Error saving character to IndexedDB:", error);
    }
}

// Utility function for calculating secondary stats
function calculateSecondaryStats(stats, currentSecondaryStats = {}, permanentBonuses = {}) {
	const hpBase = 3 * (parseInt(stats.mig.dice || 8, 10) + parseInt(stats.mig.temp || 0));
	const epBase = parseInt(stats.wlp.dice || 8, 10) + parseInt(stats.wlp.temp || 0);
	const dfBase = parseInt(stats.dex.dice || 8, 10) + parseInt(stats.dex.temp || 0);
	const dmBase = parseInt(stats.int.dice || 8, 10) + parseInt(stats.int.temp || 0);
	const imprBase = Math.max(
		0,
		Math.floor((parseInt(stats.stl.dice || 8, 10) + parseInt(stats.stl.temp || 0) - 6) / 2)
	);
	const movBase = Math.floor(
		(parseInt(stats.mig.dice || 8, 10) + parseInt(stats.dex.dice || 8, 10) +
		parseInt(stats.mig.temp || 0) + parseInt(stats.dex.temp || 0)) / 2
	);

	return {
		hp: {
			value: hpBase + (permanentBonuses.hp || 0),
			temp: currentSecondaryStats.hp?.temp || 0
		},
		ep: {
			value: epBase + (permanentBonuses.ep || 0),
			temp: currentSecondaryStats.ep?.temp || 0
		},
		df: {
			value: dfBase + (permanentBonuses.df || 0),
			temp: currentSecondaryStats.df?.temp || 0
		},
		dm: {
			value: dmBase + (permanentBonuses.dm || 0),
			temp: currentSecondaryStats.dm?.temp || 0
		},
		impr: {
			value: imprBase + (permanentBonuses.impr || 0),
			temp: currentSecondaryStats.impr?.temp || 0
		},
		mov: {
			value: movBase + (permanentBonuses.mov || 0),
			temp: currentSecondaryStats.mov?.temp || 0
		},
		atk: {
			value: permanentBonuses.atk || 0,
			temp: currentSecondaryStats.atk?.temp || 0
		},
		dmg: {
			value: permanentBonuses.dmg || 0,
			temp: currentSecondaryStats.dmg?.temp || 0
		},
	};
}

// Gather character data for export
function gatherCharacterData() {
	console.log("Gathering data");

	const stats = ["mig", "dex", "wlp", "int", "stl"];
	const secondaryStats = ["hp", "ep", "df", "dm", "impr", "mov", "atk", "dmg"];

	const characterData = {
		name: document.getElementById("charName") ? document.getElementById("charName").value : "Unnamed Character",
		stats: stats.reduce((acc, stat) => {
			const diceElement = document.getElementById(stat + "Dice");
			const tempElement = document.getElementById(stat + "Temp");
			acc[stat] = {
				dice: diceElement ? parseInt(diceElement.value) || 8 : 8, // Default to 8 if element doesn't exist
				temp: tempElement ? parseInt(tempElement.value) || 0 : 0, // Default to 0 if element doesn't exist
			};
			return acc;
		}, {}),
		secondaryStats: secondaryStats.reduce((acc, stat) => {
			const valueElement = document.getElementById(stat);
			const tempElement = document.getElementById(stat + "Temp");
			acc[stat] = {
				value: valueElement ? parseInt(valueElement.value) || 0 : 0, // Default to 0 if element doesn't exist
				temp: tempElement ? parseInt(tempElement.value) || 0 : 0, // Default to 0 if element doesn't exist
			};
			return acc;
		}, {}),
		jobs: activeCharacter.jobs ? activeCharacter.jobs.map(job => ({
			id: job.id,
			title: job.title,
			effect: job.effect
		})) : [],
		skills: activeCharacter.skills || [],
		modules: activeCharacter.modules || {
			tier1: [],
			tier2: [],
			tier3: [],
			tier4: [],
			tier5: [],
		},
		perks: activeCharacter.perks || [],
		sp: parseInt(document.getElementById("sp") ? document.getElementById("sp").value : 0) || 0,
		ce: parseInt(document.getElementById("ce") ? document.getElementById("ce").value : 0) || 0,
		currentHP: activeCharacter.currentHP || 0,
		currentEP: activeCharacter.currentEP || 0,
		perks: activeCharacter.perks || [],
		permanentBonuses: activeCharacter.permanentBonuses || {},
		notes: activeCharacter.notes || "",
		image: activeCharacter.image || ""
	};

	return characterData;
}

// Populate character data from imported JSON
function populateCharacterData(data) {
	console.log("Populating character data:", data);

	// Set character name
	const charNameInput = document.getElementById("charName");
	charNameInput.value = data.name || "";
	document.getElementById("charNameDisplay").textContent = data.name || "";
	// Populate primary stats (flat structure)
	["mig", "dex", "int", "stl", "wlp"].forEach((stat) => {
		const diceElement = document.getElementById(stat + "Dice");
		const tempElement = document.getElementById(stat + "Temp");
		const displayElement = document.getElementById(stat + "DiceDisplay");

		if (diceElement) {
			diceElement.value = data.stats?.[stat]?.dice || 8;
			
		} else {
			console.warn("Element " + stat + "Dice not found!");
		}

		if (tempElement) {
			tempElement.value = data.stats?.[stat]?.temp || 0; // Default to 0
		} else {
			console.warn("Element " + stat + "Temp not found!");
		}

		if (displayElement) {
			displayElement.textContent = data.stats?.[stat]?.dice || 0;
		} else {
			console.warn("Element " + stat + "Display not found!");
		}
	});

	const recalculatedSecondaryStats = calculateSecondaryStats(
		data.stats,
		data.secondaryStats,
		data.permanentBonuses || {}
	);

	// Populate secondary stats (both value and temp)
	["hp", "ep", "df", "dm", "impr", "mov", "atk", "dmg"].forEach((stat) => {
		const valueElement = document.getElementById(stat);
		const tempElement = document.getElementById(stat + "Temp");
		const displayElement = document.getElementById(stat + "Display");

		// Get base value from calculation
		const baseValue = recalculatedSecondaryStats[stat]?.value || 0;
		const tempValue = recalculatedSecondaryStats[stat]?.temp || 0;
		const total = baseValue + tempValue;

		if (valueElement) {
			valueElement.textContent = total + " (" + tempValue + ")";
		}

		if (tempElement) {
			tempElement.value = tempValue;
		}

		if (displayElement) {
			displayElement.textContent = total;
		}
	});

	// Ensure modules structure exists
	if (!data.modules) {
		data.modules = {
			tier1: [], tier2: [], tier3: [], tier4: [], tier5: []
		};
	}

	// Ensure proper skill data formatting
	if (data.skills) {
		data.skills.forEach(skill => {
			// Convert restriction to restrictions array
			if (skill.restriction && !skill.restrictions) {
				skill.restrictions = [skill.restriction];
				delete skill.restriction;
			}

			// Ensure stats exist
			if (!skill.stats) {
				skill.stats = ["mig", "dex"];
			}
		});
	}

	// Assign character notes
	activeCharacter.notes = data.notes || "";

	// Populate CE/SE
	updateCEDisplay();
	syncExperienceInputs();
	loadSelfCoreContent();
	updateSPDisplay();
	updateStatUpgrades();
	loadOriginPerks();
	
	loadJobs(data.jobs || []);
	calculateAvailableJobs();
	renderSkills();
	loadLearnedModules();
	renderSummary();
}

async function populateCharacterSelector() {
    const characterSelector = document.getElementById("characterSelector");
    const currentSelection = characterSelector.value; // Store current selection
    
    console.log("Loading characters to selector...");
    const characters = await getCharacterList();
    
    // Clear and repopulate
    characterSelector.innerHTML = "";
    
    console.log("Characters loaded to selector...");
    Object.entries(characters).forEach(([id, char]) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = char.name || "Unnamed Character";
        characterSelector.appendChild(option);
    });
    
    // Try to restore the previous selection if it still exists
    if (currentSelection && characters[currentSelection]) {
        characterSelector.value = currentSelection;
    } 
    // If the previous selection doesn't exist but we have an active character, try to select it
    else if (currentActiveCharacterId && characters[currentActiveCharacterId]) {
        characterSelector.value = currentActiveCharacterId;
    }
    // Fallback: select the first character if nothing else works
    else if (Object.keys(characters).length > 0) {
        characterSelector.value = Object.keys(characters)[0];
    }
    
    return characters;
}


function updateStatUpgrades() {
	const newBonuses = {};

	Object.keys(moduleCatalog).forEach(catalogName => {
		const catalog = moduleCatalog[catalogName];
		if (!catalog.statUpgrades) return;

		Object.keys(catalog.statUpgrades).forEach(tierKey => {
			const statUpgradeList = catalog.statUpgrades[tierKey];
			if (!statUpgradeList) return;

			// Count perks in this catalog and tier
			const perksInTier = activeCharacter.perks.filter(p =>
				p.catalog === catalogName && p.tier === tierKey
			).length;

			for (let i = 0; i < perksInTier; i++) {
				const upgradeIndex = i % statUpgradeList.length;
				const upgrade = statUpgradeList[upgradeIndex];
				const match = upgrade.name.match(/(HP|EP|MOV|DF|DM|IMPR|ATK|DMG)\s*\+(\d+)/i);

				if (match) {
					const stat = match[1].toLowerCase();
					const amount = parseInt(match[2], 10);
					newBonuses[stat] = (newBonuses[stat] || 0) + amount;
				}
			}

			// Update UI highlights
			const upgradesRow = document.querySelector(
				`#catalogContent .collapsible-section[data-tier="${tierKey}"] .stat-upgrades-row`
			);
			if (upgradesRow) {
				upgradesRow.querySelectorAll(".stat-upgrade").forEach((el, index) => {
					if (index < perksInTier) {
						el.classList.add("unlocked");
					} else {
						el.classList.remove("unlocked");
					}
				});
			}
		});
	});

	const bonusesChanged = JSON.stringify(newBonuses) !== JSON.stringify(activeCharacter.permanentBonuses);
	activeCharacter.permanentBonuses = newBonuses;

	if (bonusesChanged) {
		saveCharacterData();
	}

	console.log("Updated stat upgrades:", activeCharacter.permanentBonuses);
}

function migrateCharacterData(character) {
	if (!character) return character;
	
	// Migrate skill modules (old string format to new object format)
	if (character.skills) {
		character.skills.forEach(skill => {
			if (skill.modules && skill.modules.length > 0) {
				// Check if modules are in old string format
				if (typeof skill.modules[0] === 'string') {
					console.log("Migrating old skill modules to new format");
					skill.modules = skill.modules.map(moduleName => ({
						name: moduleName,
						restriction: null
					}));
				}
			}
		});
	}
	
	// Migrate character modules to match latest library data
	if (character.modules) {
		Object.keys(character.modules).forEach(tier => {
			if (Array.isArray(character.modules[tier])) {
				character.modules[tier] = character.modules[tier].map(charModule => {
					const libraryModule = moduleLibrary.find(libModule => 
						libModule.name === charModule.name
					);
					// console.log("Migrating character module", libraryModule, charModule);
					if (libraryModule) {
						return {
							...libraryModule, 
							catalogs: charModule.catalogs || [], 
							restrictions: charModule.restrictions || [] 
						};
					}
					
					// If no matching library module found, keep the character's module as-is
					return charModule;
				});
			}
		});
	}
	
	return character;
}

function syncOldCharacterData() {
	if (!activeCharacter) return;
	
	function syncModule(moduleObj) {
		const libModule = moduleLibrary.find(m => m.name === moduleObj.name);
		if (!libModule) return moduleObj; // nothing to sync against

		let updated = false;

		// Sync description
		if (libModule.description && moduleObj.description !== libModule.description) {
			moduleObj.description = libModule.description;
			updated = true;
		}

		// Normalize restrictions into arrays
		function normalizeRestrictions(r) {
			if (!r) return [];
			if (Array.isArray(r)) return r;
			return [r]; // wrap single string into array
		}

		// Sync restrictions
		const libRestrictions = normalizeRestrictions(libModule.restrictions);
		const charRestrictions = normalizeRestrictions(moduleObj.restrictions);

		if (JSON.stringify(libRestrictions) !== JSON.stringify(charRestrictions)) {
			moduleObj.restrictions = libRestrictions;
			updated = true;
		}

		// Compare stringified versions for deep equality
		if (JSON.stringify(libRestrictions) !== JSON.stringify(charRestrictions)) {
			moduleObj.restrictions = [...libRestrictions];
			updated = true;
		}

	if (updated) {
		console.log(`Module "${moduleObj.name}" synced from library.`);
	}
		return moduleObj;
	}

	// --- Sync skill modules ---
	if (activeCharacter.skills) {
		activeCharacter.skills.forEach(skill => {
			if (skill.modules) {
				skill.modules = skill.modules.map(syncModule);
			}
		});
	}

	// --- Sync tiered modules ---
	if (activeCharacter.modules) {
		Object.keys(activeCharacter.modules).forEach(tier => {
			activeCharacter.modules[tier] = activeCharacter.modules[tier].map(syncModule);
		});
	}

	// --- Sync Perks ---
	if (activeCharacter.perks) {
		activeCharacter.perks.forEach(perk => {
			perk._showDelete = false; // default

			const catalogObj = moduleCatalog[perk.catalog];
			if (!catalogObj) {
				// console.log(`Delete: ${perk.name} → catalog "${perk.catalog}" not found.`);
				perk._showDelete = true;
				return;
			}

			// pick the right container depending on catalog
			let catalogContainer;
			if (perk.catalog === "origen") {
				catalogContainer = [
					...(catalogObj.ventajas || []),
					...(catalogObj.desventajas || [])
				];
			} else {
				catalogContainer = catalogObj.perks || [];
			}

			const catalogTier = catalogContainer[perk.tier] || [];
			const match = catalogTier.find(p => p.name === perk.name);

			if (!match) {
				// console.log(`Delete: ${perk.name} → not found in tier "${perk.tier}".`);
				perk._showDelete = true;
				return;
			}

			// Normalize text to avoid false mismatches (trim whitespace)
			const descChar = (perk.description || "").trim();
			const descCat = (match.description || "").trim();

			if (perk.type === "restriction") {
				const slotsChar = Number(perk.slots || 0);
				const slotsCat = Number(match.slots || 0);

				if (descChar !== descCat) {
					// console.log(`Delete: ${perk.name} → description mismatch.`);
					perk._showDelete = true;
				}
				if (slotsChar !== slotsCat) {
					// console.log(`Delete: ${perk.name} → slots mismatch (char: ${slotsChar}, cat: ${slotsCat}).`);
					perk._showDelete = true;
				}
			} else {
				if (descChar !== descCat) {
					// console.log(`Delete: ${perk.name} → description mismatch.`);
					perk._showDelete = true;
				}
			}
		});
	}
}

async function initApp() {
	try {
		console.log("initApp start");

		const characterSelector = document.getElementById("characterSelector");

		const characters = await populateCharacterSelector();

		const firstCharacterId = Object.keys(characters)[0];
		if (firstCharacterId) {
			await setActiveCharacter(firstCharacterId);
			characterSelector.value = firstCharacterId;
		}

		characterSelector.addEventListener("change", event => {
			setActiveCharacter(event.target.value);
		});

		function attachSaveListeners(elements, callback) {
			elements.forEach(id => {
				const element = document.getElementById(id);
				if (element) {
					const eventType = element.tagName === 'SELECT' ? 'change' : 'input';
					element.addEventListener(eventType, () => {
						saveCharacterData();
						populateCharacterData(activeCharacter);
						console.log("character data populated by initAPP")
						if (callback) callback();
					});
				} else {
					console.warn(`Element with ID "${id}" not found.`);
				}
			});
		}

		// Character name
		const charNameInput = document.getElementById("charName");
		if (charNameInput) attachSaveListeners([charNameInput.id]);

		// Primary stats
		const stats = ['mig', 'dex', 'wlp', 'int', 'stl'];
		attachSaveListeners(stats.map(stat => [`${stat}Dice`, `${stat}Temp`]).flat());

		// Secondary stats
		const secondaryStats = ['hp', 'ep', 'df', 'dm', 'impr', 'mov', 'atk', 'dmg'];
		attachSaveListeners(secondaryStats.map(stat => [`${stat}`, `${stat}Temp`]).flat());

		// Jobs
		const addJobButton = document.getElementById("addJob");
		if (addJobButton) addJobButton.addEventListener("click", addJob);

		// Current HP/EP summary
		document.getElementById("currentHp").addEventListener("input", renderSummary);
		document.getElementById("currentEp").addEventListener("input", renderSummary);

		// CE/SP inputs
		document.querySelectorAll('#ce, #sp, #ceCore, #spSkills').forEach(input => {
			input.addEventListener("change", () => {
				activeCharacter.secondaryStats.ce = parseInt(document.getElementById("ce").value) || 0;
				activeCharacter.secondaryStats.sp = parseInt(document.getElementById("sp").value) || 0;
				saveCharacterData();
				syncExperienceInputs();
				updateCEDisplay();
				updateSPDisplay();
			});
		});

		// Add skill button
		const addSkillButton = document.getElementById("addSkill");
		if (addSkillButton) {
			addSkillButton.addEventListener("click", () => {
				if (!activeCharacter.skills) activeCharacter.skills = [];

				const newSkill = {
					name: "",
					restrictions: [],
					stats: ["mig", "dex"],
					description: "",
					modules: []
				};

				activeCharacter.skills.push(newSkill);
				const index = activeCharacter.skills.length - 1;
				const skillForm = createSkillForm(newSkill, index);

				document.getElementById("skillsList").appendChild(skillForm);
				renderSkills();
				saveCharacterData(); // Save after adding new skill
			});
		} else {
			console.warn("Add Skill button not found!");
		}


		// Other setup calls
		syncOldCharacterData();
		setupCharacterImage();
		calculateAvailableJobs();
		loadSelfCoreContent();
		loadOriginPerks();
		updateSPDisplay();

		console.log("initApp finished");
	} catch (err) {
		console.error("initApp crashed:", err);
		activeCharacter = createLocalDefaultCharacter();
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	console.log("DOMContentLoaded");

	await openLocalDatabase();
	const { data: { session } } = await supabase.auth.getSession();
	supabase.auth.onAuthStateChange((_event, session) => handleAuthChange(session));

	document.getElementById("loginBtn").addEventListener("click", loginWithDiscord);
	document.getElementById("logoutBtn").addEventListener("click", logout);

	await initApp();
});


function calculateAvailableJobs() {
	if (!activeCharacter || !activeCharacter.stats) {
		console.error("No active character for calculating available jobs!");
		return;
	}

	// Retrieve stats from active character
	const intBase = parseInt(activeCharacter.stats.int?.dice || 8);
	const intTemp = parseInt(activeCharacter.stats.int?.temp || 0);
	const wlpBase = parseInt(activeCharacter.stats.wlp?.dice || 8);
	const wlpTemp = parseInt(activeCharacter.stats.wlp?.temp || 0);

	// Calculate totals
	const intTotal = intBase + intTemp;
	const wlpTotal = wlpBase + wlpTemp;

	// Calculate available jobs
	const maxJobs = Math.floor((intTotal + wlpTotal) / 6) || 1;
	const jobs = activeCharacter.jobs || [];
	const availableJobs = maxJobs - jobs.length;

	// Update the UI
	const availableJobsElement = document.getElementById("availableJobs");
	if (availableJobsElement) {
		availableJobsElement.textContent = availableJobs;
	} else {
		console.warn("Available jobs element not found!");
	}

	return availableJobs;
}


function createDropdown(jobId) {
	const dropdown = document.createElement("div");
	dropdown.className = "dropdown";

	const selectedButton = document.createElement("button");
	selectedButton.textContent = "Select an Effect";
	selectedButton.type = "button";

	const dropdownContent = document.createElement("div");
	dropdownContent.className = "dropdown-content";

	if (!activeCharacter.jobs) {
		activeCharacter.jobs = [];
	}

	jobEffects.forEach(effect => {
		const effectButton = document.createElement("button");
		effectButton.textContent = effect;
		effectButton.type = "button";

		effectButton.addEventListener("click", () => {
			selectedButton.textContent = effect;

			const job = activeCharacter.jobs.find(job => job.id === jobId);
			if (job) {
				job.effect = effect;
				saveCharacterData();
			} else {
				console.error(`Job with ID ${jobId} not found in activeCharacter.jobs.`);
			}
		});

		dropdownContent.appendChild(effectButton);
	});

	const customInput = document.createElement("textarea");
	customInput.className = "customEffectInput";
	customInput.placeholder = "Custom effect";
	customInput.rows = 1;
	customInput.style.resize = "none";

	customInput.addEventListener("input", () => {
		const customEffect = customInput.value;
		selectedButton.textContent = customEffect || "Select an Effect";

		const job = activeCharacter.jobs.find(job => job.id === jobId);
		if (job) {
			job.effect = customEffect;
			saveCharacterData();
		} else {
			console.error(`Job with ID ${jobId} not found in activeCharacter.jobs.`);
		}
	});

	dropdownContent.appendChild(customInput);
	dropdown.appendChild(selectedButton);
	dropdown.appendChild(dropdownContent);

	return dropdown;
}

// Update addJob() function:
function addJob() {
		const available = calculateAvailableJobs();

		const jobId = `job_${Date.now()}`;
		const newJob = { id: jobId, title: "", effect: "" };
		
		activeCharacter.jobs = activeCharacter.jobs || [];
		activeCharacter.jobs.push(newJob);
		
		saveCharacterData();
		loadJobs(activeCharacter.jobs);
		calculateAvailableJobs();
}

function loadJobs(jobsData) {
	console.log("loading jobs", jobsData);
	const jobsList = document.getElementById("jobsList");
	if (!jobsList) {
		console.error("Jobs list element not found!");
		return;
	}

	// Clear the current jobs list
	jobsList.innerHTML = "";

	// Iterate over the provided jobs data
	jobsData.forEach(job => {

		const { id: jobId, title = "", effect = "" } = job;

		const jobDiv = document.createElement("div");
		jobDiv.id = jobId;
		jobDiv.className = "job";

		// Title input
		const titleInput = document.createElement("input");
		titleInput.type = "text";
		titleInput.value = title;
		titleInput.className = "jobTitle";
		titleInput.placeholder = "Job Title";
		titleInput.addEventListener("input", () => {
			const job = activeCharacter.jobs.find(j => j.id === jobId);
			if (job) job.title = titleInput.value;
			saveCharacterData();
		});


		// Dropdown
		const dropdown = createDropdown(jobId);
		dropdown.querySelector("button").textContent = effect || "Select an Effect";

		// Remove button
		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.type = "button";
		removeButton.className = "removeBtn";
		removeButton.addEventListener("click", () => {
			// Remove job from activeCharacter and save
			activeCharacter.jobs = activeCharacter.jobs.filter(j => j.id !== jobId);
			saveCharacterData();
			jobDiv.remove();
			calculateAvailableJobs();
		});

		jobDiv.appendChild(titleInput);
		jobDiv.appendChild(dropdown);
		jobDiv.appendChild(removeButton);

		jobsList.appendChild(jobDiv);
		console.log("job loaded");
	});
}




function updateCEDisplay() {
	const totalCE = activeCharacter.ce || 0;
	const usedCE = calculateUsedCE();
	document.getElementById("ceDisplay").textContent = totalCE || 0;
	document.getElementById("ceCounter").textContent = 
		`${usedCE} CE / ${totalCE} CE max`;
	
}

function calculateUsedCE() {
	if (!activeCharacter.modules) return 0;

	let total = 0;
	for (const [tierKey, modules] of Object.entries(activeCharacter.modules)) {
		const tierNumber = parseInt(tierKey.replace("tier", "")) || 0;
		for (const module of modules) {
			for (const catalog of module.catalogs) {
				if (catalog !== "Custom") total += tierNumber;
			}
		}
	}
	return total;
}

function syncExperienceInputs() {
	const ceValue = activeCharacter.ce || 0;
	const seValue = activeCharacter.sp || 0;
	
	document.querySelectorAll('[id^="ce"], [id^="sp"]').forEach(input => {
		if(input.id.includes("ce")) input.value = ceValue;
		if(input.id.includes("sp")) input.value = seValue;
	});
}

function calculateUsedSP() {
	if (!activeCharacter.skills) return 0;
	return activeCharacter.skills.reduce((total, skill) => total + (skill.cost || 0), 0);
}
	
function updateSPDisplay() {
	const totalSP = activeCharacter.sp || 0;
	document.getElementById("spDisplay").textContent = totalSP || 0;

	const usedSP = calculateUsedSP();
	document.getElementById("spCounter").textContent = 
		`${usedSP} SP / ${totalSP} SP max`;
}

	// Attach tooltip events to module buttons
function attachTooltipToModuleButtons() {
	document.querySelectorAll(".module-button").forEach(button => {
		const moduleName = button.dataset.module;
		const module = moduleLibrary.find(m => m.name === moduleName);

		if (!module) return;

		button.addEventListener("mouseenter", () => {
			let restriction = null;

			if (activeCharacter.skills) {
				for (const skill of activeCharacter.skills) {
					const module = skill.modules.find(m => m.name === moduleName);
					if (module?.restriction) {
						restriction = module.restriction;
						break;
					}
				}
			}


			if (!restriction) {
				restriction = moduleCatalog[activeCatalog]?.[button.dataset.tier]
					?.find(m => m.name === moduleName)?.restriction || null;
			}
			
			showTooltip(module, module.restrictions, button);
		});
		
		button.addEventListener("mouseleave", hideTooltip);
	});
}

// Show selected catalog
function showCatalog(coreName) {
	activeCatalog = coreName;

	// Highlight the selected tab
	document.querySelectorAll("#catalogNav button").forEach(button => {
		button.classList.toggle("active", button.textContent.includes(coreName));
	});

	// Load the modules and perks for the selected catalog
	loadCatalogContent(coreName);
}

function learnModule(coreName, tier, moduleName, restriction) {
	const tierNumber = parseInt(tier.replace("tier", "")) || 1;

	// Initialize modules if missing
	if (!activeCharacter.modules) {
		activeCharacter.modules = {
			tier1: [], tier2: [], tier3: [], tier4: [], tier5: []
		};
	}

	// Ensure the tier exists as an array
	if (!Array.isArray(activeCharacter.modules[tier])) {
		activeCharacter.modules[tier] = [];
	}

	const tierModules = activeCharacter.modules[tier] || [];
	const module = moduleLibrary.find(m => m.name === moduleName);
	const catalogModule = moduleCatalog[coreName][tier].find(m => m.name === moduleName);

	// Check if a module with the same name already exists in this tier
	const existingModuleIndex = tierModules.findIndex(m => m.name === moduleName);

	if (existingModuleIndex > -1) {
		// Module already exists in this tier
		const existingModule = tierModules[existingModuleIndex];

		// Check if the module is already associated with this catalog
		const catalogIndex = existingModule.catalogs.indexOf(coreName);

		if (catalogIndex > -1) {
			// Remove the catalog association
			existingModule.catalogs.splice(catalogIndex, 1);

			// Remove the restriction from this catalog
			if (catalogModule.restriction) {
				const restrictionIndex = existingModule.restrictions.indexOf(catalogModule.restriction);
				if (restrictionIndex > -1) {
					existingModule.restrictions.splice(restrictionIndex, 1);
				}
			}

			// If no catalogs remain, remove the module entirely
			if (existingModule.catalogs.length === 0) {
				tierModules.splice(existingModuleIndex, 1);
			}
		} else {
			// Add the new catalog association
			existingModule.catalogs.push(coreName);

			// Add the restriction from this catalog
			if (catalogModule.restriction) {
				existingModule.restrictions.push(catalogModule.restriction);
			}
		}
	} else {
		// Module does not exist in this tier, create a new entry
		tierModules.push({
			name: moduleName,
			catalogs: [coreName],
			restrictions: catalogModule.restriction ? [catalogModule.restriction] : [],
			...module // Include all module data from moduleLibrary
		});
	}

	// Save the updated character data

	if (activeCharacter.sharedUnlocks === undefined) {
	activeCharacter.sharedUnlocks = 0; // how many perks can currently be unlocked
	}


	// Update UI
	updateCEDisplay();
	updatePerkAvailability(coreName, tier);
	loadCatalogContent(coreName);
	updateStatUpgrades();
	saveCharacterData();
	populateCharacterData(activeCharacter);
	
}
	
function loadLearnedModules() {
	if (!activeCharacter.modules) return;

	Object.keys(activeCharacter.modules).forEach((tier) => {
		activeCharacter.modules[tier].forEach((moduleData) => {
			moduleData.name;
			moduleData.description;
		});
	});

	if (activeCatalog) {
		loadCatalogContent(activeCatalog);
	}
}
	
function createCollapsibleCatalogSection(title, contentGenerator, storageKey) {
	const section = document.createElement("div");
	section.className = "collapsible-section";

	const header = document.createElement("h3");
	header.className = "collapsible-header";
	header.innerHTML = `
		<span>${title}</span>
		<span class="toggle-icon">▼</span>
	`;

	const contentWrapper = document.createElement("div");
	contentWrapper.className = "collapsible-content";
	contentWrapper.appendChild(contentGenerator());

	// Check localStorage for saved state
	const savedState = localStorage.getItem(`collapsible-${storageKey}`);
	if (savedState === 'collapsed') {
		contentWrapper.style.display = 'none';
		header.querySelector('.toggle-icon').textContent = '▲';
	}

	section.appendChild(header);
	section.appendChild(contentWrapper);
	header.addEventListener("click", toggleCollapse);
	return section;
}

// Load modules and perks for the selected catalog
function loadCatalogContent(coreName) {
	const catalog = moduleCatalog[coreName];
	const catalogContent = document.getElementById("catalogContent");
	catalogContent.innerHTML = "";

	// Add catalog title
	const title = document.createElement("h2");
	title.textContent = coreName.charAt(0).toUpperCase() + coreName.slice(1);
	catalogContent.appendChild(title);

	// Process each tier
	Object.keys(catalog).forEach(tierKey => {
		if (tierKey.startsWith('tier')) {
			const tierSection = createCollapsibleCatalogSection(
				`Tier ${tierKey.slice(-1)}`,
				() => {
					const tierContent = document.createElement("div");

					// Modules
					const moduleContainer = document.createElement("div");
					moduleContainer.className = "catalog-module-container";
					catalog[tierKey].forEach(catalogModule => {
						const module = moduleLibrary.find(m => m.name === catalogModule.name);
						if (!module) {
							console.error(catalogModule.name + " not found");
							return;
						}

						const moduleButton = document.createElement("button");
						moduleButton.className = "module-button";
						moduleButton.textContent = module.emote;
						moduleButton.dataset.catalog = coreName;
						moduleButton.dataset.tier = tierKey;
						moduleButton.dataset.module = catalogModule.name;

						// Check if learned
						const isLearned = activeCharacter.modules?.[tierKey]?.some(m =>
							m.name === catalogModule.name && m.catalogs.includes(coreName)
						);
						if (isLearned) moduleButton.classList.add("learned");

						moduleButton.addEventListener("click", () => {
							moduleButton.classList.toggle("learned");
							learnModule(coreName, tierKey, catalogModule.name, catalogModule.restriction);

							// Recalculate perks after module interaction, but avoid resetting the perk badge
							setTimeout(() => {
								updatePerkAvailability(coreName, tierKey);
							}, 0);
						});

						moduleContainer.appendChild(moduleButton);
					});
					tierContent.appendChild(moduleContainer);

					// Perks
					const perks = catalog.perks?.[tierKey] || [];
					if (perks.length > 0) {
						const perkContainer = document.createElement("div");
						perkContainer.className = "perk-container";

						// Stat Upgrades
						if (catalog.statUpgrades?.[tierKey]) {
							const statUpgradeContainer = document.createElement("div");
							statUpgradeContainer.className = "stat-upgrade-container";
							const upgradesRow = document.createElement("div");
							upgradesRow.className = "stat-upgrades-row";

							const perksInTier = activeCharacter.perks.filter(p =>
								p.catalog === coreName && p.tier === tierKey).length || 0;
							const earnedUpgrades = perksInTier;
							const availableUpgrades = catalog.statUpgrades[tierKey];

							availableUpgrades.forEach((upgrade, index) => {
								const upgradeElement = document.createElement("span");
								upgradeElement.className = "stat-upgrade" +
									(index < earnedUpgrades ? " unlocked" : "");
								upgradeElement.textContent = upgrade.name;

								if (index > 0 && index < availableUpgrades.length) {
									const separator = document.createElement("span");
									separator.className = "stat-upgrade-separator";
									separator.textContent = " ▶ ";
									upgradesRow.appendChild(separator);
								}
								upgradesRow.appendChild(upgradeElement);
							});

							statUpgradeContainer.appendChild(upgradesRow);
							const bottomBorder = document.createElement("div");
							bottomBorder.className = "stat-upgrade-border";
							statUpgradeContainer.appendChild(bottomBorder);
							perkContainer.appendChild(statUpgradeContainer);
						}

						const perkTitle = document.createElement("h4");
						perkTitle.className = "perkTitle";
						perkTitle.textContent = "Perks";
						perkTitle.setAttribute("data-tier", tierKey);
						perkContainer.appendChild(perkTitle);
						perkContainer.appendChild(document.createElement("br"));

						updatePerkAvailability(coreName, tierKey);

						perks.forEach(perk => {
							const perkButton = document.createElement("button");
							perkButton.className = "perk-button";
							perkButton.textContent = perk.name;
							perkButton.dataset.catalog = coreName;
							perkButton.dataset.tier = tierKey;

							if (perk.type === "restriction") {
								perkButton.classList.add("restriction-perk");
								perkButton.title = "This perk adds a new skill restriction option.";
							}

							const isSelected = activeCharacter.perks?.some(p =>
								p.name === perk.name && p.catalog === coreName && p.tier === tierKey
							);

							if (isSelected) {
								perkButton.classList.add("learned");
							}

							


							perkButton.addEventListener("click", () => {
								const index = activeCharacter.perks.findIndex(p =>
									p.name === perk.name && p.catalog === coreName && p.tier === tierKey
								);

								if (index === -1) {
									// Add the perk
									const newPerk = { ...perk, catalog: coreName, tier: tierKey };
									activeCharacter.perks.push(newPerk);
									perkButton.classList.add("learned");

									// 🔹 Special handling for perks that add restrictions or slots
									switch (perk.name) {
										case "Gimmick":
											activeCharacter.perks.push({
												name: " Gimmick",
												type: "restriction",
												description: "Sets skill cost to 0 and slots to 1 (or 2 with Gimmick Set).",
												catalog: "SecretRestrictions",
												tier: tierKey
											});
											break;
										case "Transformación":
											activeCharacter.perks.push({
												name: " Transformación",
												type: "restriction",
												description: "Skill cost set to 0 and grants 1 module slot (plus bonuses from Bendición De Luna perks).",
												catalog: "SecretRestrictions",
												tier: tierKey
											});
											break;
										// Add other special perk cases here
									}

								} else {
									// Remove the perk
									const removedPerk = activeCharacter.perks[index];
									activeCharacter.perks.splice(index, 1);
									perkButton.classList.remove("learned");

									// 🔹 Remove associated restrictions if applicable
									switch (removedPerk.name) {
										case "Gimmick":
											const gimmickIndex = activeCharacter.perks.findIndex(p => p.name === " Gimmick");
											if (gimmickIndex !== -1) activeCharacter.perks.splice(gimmickIndex, 1);
											break;
										case "Transformación":
											const transIndex = activeCharacter.perks.findIndex(p => p.name === "Transformación Restriction");
											if (transIndex !== -1) activeCharacter.perks.splice(transIndex, 1);
											break;
										// Add other special perk removals here
									}
								}

								saveCharacterData();
								updatePerkAvailability(coreName, tierKey);
								updateStatUpgrades();
								populateCharacterData(activeCharacter);
							});

							perkContainer.appendChild(perkButton);
						});

						tierContent.appendChild(perkContainer);
					}
					return tierContent;
				},
				`catalog-${coreName}-${tierKey}`

				
			);
			catalogContent.appendChild(tierSection);
			updatePerkAvailability(coreName, tierKey);
		}
	});

	// Attach tooltips
	attachTooltipToModuleButtons();
	attachTooltipToPerkButtons();
}

function loadOriginPerks() {
	const ventajasList = document.getElementById('ventajasList');
	const desventajasList = document.getElementById('desventajasList');

	ventajasList.innerHTML = '';
	desventajasList.innerHTML = '';

	// Load Ventajas
	const ventajasSection = createCollapsibleSection("Ventajas", () => {
		const ventajasContent = document.createElement("div");
		moduleCatalog.origen.ventajas.forEach(perk => {
			const button = createPerkButton(perk, 'ventajas');
			ventajasContent.appendChild(button);
		});
		return ventajasContent;
	}, 'ventajas');
	ventajasList.appendChild(ventajasSection);

	// Load Desventajas
	const desventajasSection = createCollapsibleSection("Desventajas", () => {
		const desventajasContent = document.createElement("div");
		moduleCatalog.origen.desventajas.forEach(perk => {
			const button = createPerkButton(perk, 'desventajas');
			desventajasContent.appendChild(button);
		});
		return desventajasContent;
	}, 'desventajas');
	desventajasList.appendChild(desventajasSection);
}

function createPerkButton(perk, section) {
	const button = document.createElement('button');
	button.className = 'perk-button';
	button.textContent = perk.name;
	button.title = perk.description;
	button.dataset.section = section;

	// Check if already learned - safely handle undefined perks
	const isLearned = (activeCharacter.perks || []).some(p => 
		p.name === perk.name && p.catalog === 'origen'
	);

	if (isLearned) button.classList.add(`learned-${section}`);

	button.addEventListener('click', () => {
		const sectionType = button.dataset.section;
		button.classList.toggle(`learned-${sectionType}`);
		toggleOriginPerk(perk, sectionType);
	});

	return button;
}

function toggleOriginPerk(perk, section) {
	if (!activeCharacter) return;
	
	// Ensure perks array exists
	if (!activeCharacter.perks) {
		activeCharacter.perks = [];
	}
	
	const index = activeCharacter.perks.findIndex(p => 
		p.name === perk.name && p.catalog === 'origen'
	);

	if (index > -1) {
		// Remove perk
		activeCharacter.perks.splice(index, 1);
	} else {
		// Add perk with section type
		activeCharacter.perks.push({
			...perk,
			catalog: 'origen',
			tier: section
		});
	}

	saveCharacterData();
}
// Show tooltip on hover
function showTooltip(item, restriction, button) {
	if (!item || typeof item !== "object") return; // <-- Guard against undefined or non-object

	let tooltip = document.getElementById("tooltip");
	if (!tooltip) {
		tooltip = document.createElement("div");
		tooltip.id = "tooltip";
		tooltip.className = "module-tooltip";
		document.body.appendChild(tooltip);
	}

	// Now safe to check "category" in item
	const isModule = "category" in item;

	let content = `<strong>${item.name}</strong><br>`;

	if (isModule) {
		content += `<em>${item.category}</em><br>
					${item.description}<br>
					<strong>Restrictions:</strong> ${restriction || "None"}`;
	} else {
		content += `<em>${item.type}</em><br>${item.description}`;
	}

	if (item.effects && item.effects.length) {
		content += "<br><strong>Sub-Effects:</strong><br>";
		for (let effect of item.effects) {
			content += `<div class='sub-effect'>
							<span class='sub-effect-emote'>${effect.emote}</span>
							<span class='sub-effect-description'>${effect.description}</span>
						</div>`;
		}
	}

	tooltip.innerHTML = content;
	tooltip.style.display = "block";
	tooltip.style.opacity = "0";

	const rect = button.getBoundingClientRect();
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	let top = rect.bottom + 5, left = rect.left;
	if (left + tooltip.offsetWidth > viewportWidth) left = viewportWidth - tooltip.offsetWidth - 10;
	if (left < 10) left = 10;
	if (top + tooltip.offsetHeight > viewportHeight) top = rect.top - tooltip.offsetHeight - 5;

	tooltip.style.position = "fixed";
	tooltip.style.top = `${top}px`;
	tooltip.style.left = `${left}px`;
	tooltip.style.opacity = "1";
}

// Hide tooltip when not hovering
function hideTooltip() {
	const tooltip = document.getElementById("tooltip");
	if (tooltip) {
		tooltip.style.display = "none";
	}
}

// Attach tooltip events to perk buttons
function attachTooltipToPerkButtons() {
	document.querySelectorAll(".perk-button").forEach(button => {
		const perkName = button.textContent;
		let perk;

		if (button.dataset.section) {
			perk = (moduleCatalog.origen[button.dataset.section] || [])
				.find(p => p.name === perkName);
		} else {
			// Normal catalog
			const tier = button.dataset.tier;
			perk = (moduleCatalog[activeCatalog] &&
				moduleCatalog[activeCatalog].perks &&
				moduleCatalog[activeCatalog].perks[tier] || [])
				.find(p => p.name === perkName);
		}

		if (perk) {
			button.addEventListener("mouseenter", () => showTooltip(perk, null, button));
			button.addEventListener("mouseleave", hideTooltip);
		}
	});
}

function updatePerkAvailability(coreName, tier) {
	if (!activeCharacter || !activeCharacter.modules) return;
	
	const modulesInTier = (activeCharacter.modules[tier] || []).length;

	const perksAvailable = Math.floor(modulesInTier / 3);
	const existingPerks = (activeCharacter.perks || [])
		.filter(p => p.tier === tier && p.catalog !== "SecretRestrictions")
		.length;
	
	let availablePerks = Math.max(perksAvailable - existingPerks, 0);
	if (tier == "tier1") {
		availablePerks = Math.max(perksAvailable + 1 - existingPerks, 0);
	}

	// Target the PERK SECTION TITLE instead of tier title
	const perkTitle = document.querySelector(`#catalogContent .perkTitle[data-tier="${tier}"]`);
	
	if (perkTitle) {
		let badge = perkTitle.querySelector(".perk-badge");
		if (!badge) {
			badge = document.createElement("span");
			badge.className = "perk-badge";
			perkTitle.appendChild(badge);
		}

		badge.textContent = availablePerks > 0 ? `${availablePerks} perk${availablePerks !== 1 ? 's' : ''} disponible${availablePerks !== 1 ? 's' : ''}!` : "";
		badge.style.color = "green";

		if (availablePerks <= 0) {
			badge.remove();
		}
	}
	loadSelfCoreContent();
}


//Selfcore section		
function loadSelfCoreContent() {
	const selfCoreContent = document.getElementById("selfCoreContent");

	// Clear ONLY the dynamic parts, not the notes
	Array.from(selfCoreContent.children).forEach(child => {
		if (child.id !== "notesContainer") {
			child.remove();
		}
	});

	if (!activeCharacter.modules && !activeCharacter.perks) {
		const msg = document.createElement("p");
		msg.textContent = "No modules or perks learned yet.";
		selfCoreContent.insertBefore(msg, document.getElementById("notesContainer"));
		return;
	}

	// ===== MODULE TABLE =====
	if (activeCharacter.modules) {
		const moduleSection = createCollapsibleSection("Modules", () => {
			const container = document.createElement("div");

			// Table
			const moduleTable = document.createElement("table");
			moduleTable.className = "module-table";

			const headerRow = document.createElement("tr");
			["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"].forEach(tier => {
				const th = document.createElement("th");
				th.textContent = tier;
				headerRow.appendChild(th);
			});
			moduleTable.appendChild(headerRow);

			const moduleRow = document.createElement("tr");
			for (let tier = 1; tier <= 5; tier++) {
				const tierCell = document.createElement("td");
				tierCell.className = "module-cell";
				tierCell.dataset.tier = "tier" + tier;
				const tierModules = activeCharacter.modules["tier" + tier] || [];

				tierModules.forEach(module => {
					const moduleContainer = document.createElement("div");
					moduleContainer.className = "module-container";
				
					if (module.isCustom) {
						moduleContainer.classList.add("custom-module");
					}

					const moduleDiv = document.createElement("div");
					moduleDiv.className = "module-emote";
					moduleDiv.textContent = module.emote;
					moduleDiv.dataset.module = module.name; 

					if (module.restrictions.length) {
						const restrictionIcon = document.createElement("div");
						restrictionIcon.className = "restriction-icon";
						restrictionIcon.textContent = "R";
						moduleDiv.appendChild(restrictionIcon);
					}

					moduleDiv.addEventListener("click", (ev) => {
						if (document.body.classList.contains("removal-mode")) {
							ev.stopPropagation();
							if (module.isCustom) {
							removeCustomModule(module.name, "tier" + tier);
							} else {
							alert("Only custom modules can be removed.");
							}
							// Exit removal mode after an action
							document.body.classList.remove("removal-mode");
							return;
						}

						// (Normal behavior below if not in removal mode)
						document.querySelectorAll(".module-detail-view").forEach(el => el.remove());
						const detailView = document.createElement("div");
						detailView.className = "module-detail-view";
						let detailContent = `${module.emote} <em>(${module.category}, Tier ${tier})</em> - ${module.description}`;
						if (module.restrictions.length) {
							detailContent += `<br><strong>Restrictions:</strong> ${module.restrictions}`;
						}
						if (module.effects && module.effects.length) {
							detailContent += `<div class='sub-effects'><strong>Sub-effects:</strong>`;
							module.effects.forEach(effect => {
							detailContent += `<div class='sub-effect'>
								<span class='sub-effect-emote'>${effect.emote}</span>
								<span class='sub-effect-description'>${effect.description}</span>
								</div>`;
							});
							detailContent += `</div>`;
						}
						detailView.innerHTML = detailContent;
						moduleTable.insertAdjacentElement("afterend", detailView);
					});


					if (module.isCustom) {
					moduleContainer.classList.add("custom-module");
					}

					moduleDiv.dataset.module = module.name; 

					moduleContainer.appendChild(moduleDiv);
					tierCell.appendChild(moduleContainer);
				});

				moduleRow.appendChild(tierCell);
			}
			moduleTable.appendChild(moduleRow);
			container.appendChild(moduleTable);

			// === Controls (moved inside) ===
			function setupCustomModuleControls(parent) {
				const controlsDiv = document.createElement("div");
				controlsDiv.className = "custom-module-controls";

				const addButton = document.createElement("button");
				addButton.textContent = "Add Module";
				addButton.addEventListener("click", showCustomModuleForm);
				controlsDiv.appendChild(addButton);

				const removeButton = document.createElement("button");
				removeButton.textContent = "Remove";
				removeButton.addEventListener("click", toggleRemovalMode);
				controlsDiv.appendChild(removeButton);

				// Form container
				const formContainer = document.createElement("div");
				formContainer.id = "customModuleFormContainer";
				formContainer.style.display = "none";

				parent.appendChild(controlsDiv);
				parent.appendChild(formContainer);
			}

			setupCustomModuleControls(container);

			return container;
		}, 'modules');

		selfCoreContent.insertBefore(moduleSection, document.getElementById("notesContainer"));
	}

	// ===== PERKS SECTION =====
		function showCustomPerkForm() {
		const formContainer = document.getElementById("customPerkFormContainer");

		formContainer.innerHTML = `
			<div class="custom-form">
				<h4>Add Custom Perk</h4>
				<input type="text" id="customPerkName" class="custom-form-name" placeholder="Perk Name" required>
				<textarea id="customPerkDescription" class="custom-form-description" placeholder="Perk Description" rows="3" required></textarea>
				<div class="form-buttons">
					<button type="button" id="cancelCustomPerk">Cancel</button>
					<button type="button" id="saveCustomPerk">Add Perk</button>
				</div>
			</div>
		`;
		formContainer.style.display = "block";

		document.getElementById("cancelCustomPerk").addEventListener("click", () => {
			formContainer.style.display = "none";
		});

		document.getElementById("saveCustomPerk").addEventListener("click", saveCustomPerk);
	}

	function saveCustomPerk() {
		const name = document.getElementById("customPerkName").value.trim();
		const description = document.getElementById("customPerkDescription").value.trim();

		if (!name || !description) {
			alert("Please fill in all required fields");
			return;
		}

		const customPerk = {
			name,
			description,
			catalog: "custom",
			tier: "custom",
			type: "perk",
			_showDelete: true
		};

		if (!activeCharacter.perks) {
			activeCharacter.perks = [];
		}

		activeCharacter.perks.push(customPerk);

		saveCharacterData();
		loadSelfCoreContent();

		document.getElementById("customPerkFormContainer").style.display = "none";
	}

	if (activeCharacter.perks) {
		const perkSection = createCollapsibleSection("Perks", () => {
			const container = document.createElement("div");

			// Filter out restriction-type perks
			const filteredPerks = activeCharacter.perks.filter(perk => 
				perk.type === "perk" || (perk.type === "restriction" && perk._showDelete)
			);

			const perkGroups = filteredPerks.reduce((acc, perk) => {
				const catalog = perk.catalog || 'other';
				if (!acc[catalog]) acc[catalog] = [];
				acc[catalog].push(perk);
				return acc;
			}, {});

			Object.entries(perkGroups).forEach(([catalog, perks]) => {
				const catalogSection = createCollapsibleSection(
					catalog === 'origen' ? 'Origin' : catalog.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
					() => {
						const content = document.createElement("div");

						if (catalog === 'origen') {
							const ventajas = perks.filter(p => p.tier === 'ventajas');
							const desventajas = perks.filter(p => p.tier === 'desventajas');

							if (ventajas.length) {
								const ventajasSection = createCollapsibleSection("Ventajas", () => createPerkList(ventajas), `ventajas-${catalog}`);
								content.appendChild(ventajasSection);
							}
							if (desventajas.length) {
								const desventajasSection = createCollapsibleSection("Desventajas", () => createPerkList(desventajas), `desventajas-${catalog}`);
								content.appendChild(desventajasSection);
							}
						} else {
							content.appendChild(createPerkList(perks));
						}

						return content;
					},
					`perks-${catalog}`
				);
				container.appendChild(catalogSection);
			});

			// === Custom perk controls ===
			const controlsDiv = document.createElement("div");
			controlsDiv.className = "custom-perk-controls";

			const addButton = document.createElement("button");
			addButton.textContent = "+ Custom Perk";
			addButton.addEventListener("click", showCustomPerkForm);
			controlsDiv.appendChild(addButton);

			const formContainer = document.createElement("div");
			formContainer.id = "customPerkFormContainer";
			formContainer.style.display = "none";

			container.appendChild(controlsDiv);
			container.appendChild(formContainer);

			return container;
		}, 'perks');

		selfCoreContent.insertBefore(perkSection, document.getElementById("notesContainer"));
	}

	// ===== COMPONENTS SECTION (PENDING) =====
	// if (!activeCharacter.components) activeCharacter.components = [];

	// const componentSection = createCollapsibleSection("Components", () => {
	// 	const container = document.createElement("div");
	// 	container.className = "components-container";

	// 	const listContainer = document.createElement("ul");
	// 	listContainer.className = "components-list";

	// 	function renderComponents() {
	// 		listContainer.innerHTML = "";
	// 		activeCharacter.components.forEach((comp, idx) => {
	// 			const li = document.createElement("li");
	// 			li.className = "component-item";

	// 			const amountCircle = document.createElement("span");
	// 			amountCircle.className = "component-amount";
	// 			amountCircle.textContent = `(${comp.amount})`;
	// 			amountCircle.addEventListener("contextmenu", (e) => {
	// 				e.preventDefault();
	// 				const newAmount = parseInt(prompt("Set amount for " + comp.name, comp.amount));
	// 				if (newAmount <= 0) activeCharacter.components.splice(idx, 1);
	// 				else comp.amount = newAmount;
	// 				saveCharacterData();
	// 				renderComponents();
	// 			});

	// 			const itemDiv = document.createElement("span");
	// 			itemDiv.className = "component-item-name";
	// 			// Display modules as emotes
	// 			const moduleEmotes = (comp.modules || []).map(m => {
	// 				const mod = moduleLibrary.find(mod => mod.name === m);
	// 				return mod?.emote ?? "?";
	// 			}).join("");
	// 			itemDiv.textContent = `${comp.name} [${moduleEmotes}]`;

	// 			li.appendChild(amountCircle);
	// 			li.appendChild(itemDiv);
	// 			listContainer.appendChild(li);
	// 		});
	// 	}

	// 	renderComponents();
	// 	container.appendChild(listContainer);

	// 	// Controls
	// 	const controlsDiv = document.createElement("div");
	// 	controlsDiv.className = "component-controls";

	// 	const addButton = document.createElement("button");
	// 	addButton.textContent = "+ Add Component";
	// 	addButton.addEventListener("click", showAddComponentForm);
	// 	controlsDiv.appendChild(addButton);

	// 	container.appendChild(controlsDiv);

	// 	return container;
	// }, "components");

	// selfCoreContent.insertBefore(componentSection, document.getElementById("notesContainer"));

	// // ===== ADD COMPONENT FORM =====
	// if (!document.getElementById("componentFormContainer")) {
	// 	const formContainer = document.createElement("div");
	// 	formContainer.id = "componentFormContainer";
	// 	formContainer.style.display = "none";
	// 	selfCoreContent.appendChild(formContainer);
	// }

	// function showAddComponentForm() {
	// 	const formContainer = document.getElementById("componentFormContainer");
	// 	formContainer.innerHTML = `<div class="component-form">
	// 		<h4>Add Component</h4>
	// 		<select id="componentSelect">
	// 			<option value="">-- Select Component --</option>
	// 			<option value="Rock">Rock</option>
	// 			<option value="Custom">Custom</option>
	// 		</select>
	// 		<div id="customComponentContainer" style="display:none; margin-top:10px;"></div>
	// 		<div class="form-buttons">
	// 			<button type="button" id="cancelComponent">Cancel</button>
	// 			<button type="button" id="saveComponent">Add Component</button>
	// 		</div>
	// 	</div>`;
	// 	formContainer.style.display = "block";

	// 	const componentSelect = document.getElementById("componentSelect");
	// 	const customContainer = document.getElementById("customComponentContainer");
	// 	let selectedComponent = null;
	// 	let customModules = [];

	// 	componentSelect.addEventListener("change", () => {
	// 		if (componentSelect.value === "Custom") {
	// 			customContainer.innerHTML = `
	// 				<input type="text" id="customComponentName" placeholder="Component Name" required>
	// 				<div id="customModuleSlots" class="module-slots"></div>
	// 			`;
	// 			customContainer.style.display = "block";
	// 			customModules = [null, null, null, null];

	// 			const slotsContainer = document.getElementById("customModuleSlots");
	// 			slotsContainer.innerHTML = "";
	// 			for (let i = 0; i < 4; i++) {
	// 				const slot = document.createElement("div");
	// 				slot.className = "module-slot empty";
	// 				slot.textContent = "+";
	// 				slot.addEventListener("click", () => {
	// 					showAllModuleSelection(slot, (module) => {
	// 						customModules[i] = module.name;
	// 						slot.textContent = module.emote;
	// 						slot.classList.remove("empty");
	// 					});
	// 				});
	// 				slotsContainer.appendChild(slot);
	// 			}
	// 		} else {
	// 			customContainer.style.display = "none";
	// 			selectedComponent = componentSelect.value;
	// 		}
	// 	});

	// 	document.getElementById("cancelComponent").addEventListener("click", () => {
	// 		formContainer.style.display = "none";
	// 	});

	// 	document.getElementById("saveComponent").addEventListener("click", () => {
	// 		if (selectedComponent === "Rock") {
	// 			const rockModules = ["Fuego", "Tierra"];
	// 			activeCharacter.components.push({ name: "Rock", modules: rockModules, amount: 1 });
	// 		} else if (componentSelect.value === "Custom") {
	// 			const name = document.getElementById("customComponentName").value.trim();
	// 			if (!name) return alert("Component name required");
	// 			activeCharacter.components.push({ name, modules: customModules.filter(Boolean), amount: 1 });
	// 		} else {
	// 			return alert("Select a component first");
	// 		}

	// 		saveCharacterData();
	// 		loadSelfCoreContent();
	// 		formContainer.style.display = "none";
	// 	});
	// }

	// ===== SHOW ALL MODULE SELECTION (for custom component slots) =====
	// function showAllModuleSelection(slot, callback) {
	// 	const selector = document.createElement("div");
	// 	selector.className = "module-selector";
	// 	moduleLibrary.forEach(module => {
	// 		const option = document.createElement("div");
	// 		option.className = "module-option";
	// 		option.textContent = module.emote;
	// 		option.title = module.name;
	// 		option.addEventListener("click", () => {
	// 			callback(module);
	// 			selector.remove();
	// 		});
	// 		selector.appendChild(option);
	// 	});

	// 	document.body.appendChild(selector);
	// 	// Position near slot
	// 	const rect = slot.getBoundingClientRect();
	// 	selector.style.position = "absolute";
	// 	selector.style.left = `${rect.left}px`;
	// 	selector.style.top = `${rect.bottom + window.scrollY + 5}px`;
	// 	selector.style.zIndex = 1000;

	// 	// Close when clicking outside
	// 	const clickHandler = (e) => {
	// 		if (!selector.contains(e.target)) {
	// 			selector.remove();
	// 			document.removeEventListener("click", clickHandler);
	// 		}
	// 	};
	// 	document.addEventListener("click", clickHandler);
	// }


	// ===== NOTES SECTION (persistent) =====
	const notesTextarea = document.getElementById("notes-section");
	notesTextarea.value = activeCharacter.notes || "";

	notesTextarea.oninput = e => {
		activeCharacter.notes = e.target.value;
		saveCharacterData();
	};

	// Add toggle handlers
	document.querySelectorAll('.collapsible-header').forEach(header => {
		header.addEventListener('click', toggleCollapse);
	});
}

function createPerkList(perks) {
	const list = document.createElement("ul");
	list.className = "perks-list";

	function createDeletePerkButton(perk) {
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.classList.add("delete-perk-button");
		deleteButton.addEventListener("click", (e) => {
			e.stopPropagation();
			if (confirm(`Are you sure you want to delete the perk "${perk.name}"?`)) {
				const index = activeCharacter.perks.findIndex(p =>
					p.name === perk.name && p.catalog === perk.catalog && p.tier === perk.tier
				);
				if (index !== -1) {
					activeCharacter.perks.splice(index, 1);
					saveCharacterData();
					loadSelfCoreContent(); // Refresh the display
				}
			}
		});
		return deleteButton;
	}

	perks.forEach(perk => {
		const listItem = document.createElement("li");

		const perkContent = document.createElement("div");
		perkContent.className = "perk-content";
		perkContent.innerHTML = `<strong>${perk.name}</strong>: ${perk.description}`;

		listItem.appendChild(perkContent);

		// Only add warning + delete button if _showDelete is true
		// AND the perk is NOT an Origen perk in Ventajas/Desventajas
		const isOrigenVentajaDesventaja = perk.catalog === "origen" && (perk.tier === "ventajas" || perk.tier === "desventajas");

		if (perk._showDelete && !isOrigenVentajaDesventaja) {
			if (perk.catalog !== "custom") {
				const warning = document.createElement("span");
				warning.textContent = "⚠ Outdated perk";
				warning.classList.add("perk-warning");
				listItem.appendChild(warning);
			}

			listItem.appendChild(createDeletePerkButton(perk));
		}

		list.appendChild(listItem);
	});

	return list;
}

function createCollapsibleSection(title, contentGenerator, storageKey) {
	const section = document.createElement("div");
	section.className = "collapsible-section";

	const header = document.createElement("h3");
	header.className = "collapsible-header";
	header.innerHTML = `
		<span>${title}</span>
		<span class="toggle-icon">▼</span>
	`;

	const contentWrapper = document.createElement("div");
	contentWrapper.className = "collapsible-content";
	contentWrapper.appendChild(contentGenerator());

	// Check localStorage for saved state
	const savedState = localStorage.getItem(`collapsible-${storageKey}`);
	if (savedState === 'collapsed') {
		contentWrapper.style.display = 'none';
		header.querySelector('.toggle-icon').textContent = '▲';
	}

	section.appendChild(header);
	section.appendChild(contentWrapper);
	header.addEventListener("click", toggleCollapse);
	return section;
}

// Toggle function for collapsible sections
function toggleCollapse(e) {
	const header = e.currentTarget;
	const section = header.parentElement;
	const content = section.querySelector('.collapsible-content');
	const icon = header.querySelector('.toggle-icon');

	const isCollapsed = content.style.display === 'none';
	content.style.display = isCollapsed ? 'block' : 'none';
	icon.textContent = isCollapsed ? '▼' : '▲';

	// Save state to localStorage
	const storageKey = Array.from(section.classList)
		.find(cls => cls.startsWith('collapsible-'))
		.replace('collapsible-', '');
	if (storageKey) {
		localStorage.setItem(`collapsible-${storageKey}`, isCollapsed ? 'expanded' : 'collapsed');
	}

	e.stopPropagation();
}

//Custom Modules
function showCustomModuleForm() {
	const formContainer = document.getElementById("customModuleFormContainer");

	// Create form HTML
	formContainer.innerHTML = `
		<div class="custom-form">
		<h4>Add Custom Module</h4>
		<input type="text" id="customModuleName" class="custom-form-name" placeholder="Module Name" required>
		<input type="text" id="customModuleEmote" class="custom-form-emote" placeholder="Module Icon" required>
		<select id="customModuleType" required>
			<option value="effect">Effect</option>
			<option value="range">Range</option>
			<option value="special">Special</option>
		</select>
		<select id="customModuleTier" required>
			<option value="tier1">Tier 1</option>
			<option value="tier2">Tier 2</option>
			<option value="tier3">Tier 3</option>
			<option value="tier4">Tier 4</option>
			<option value="tier5">Tier 5</option>
		</select>

		<textarea id="customModuleDescription" placeholder="Module Description" rows="3" required></textarea>
		<input type="text" id="customModuleRestriction" class="custom-form-restrictions" placeholder="Restriction (Optional)">
		<div class="form-buttons">
			<button type="button" id="cancelCustomModule">Cancel</button>
			<button type="button" id="saveCustomModule">Add Module</button>
		</div>
		</div>
	`;
	// Show form
	formContainer.style.display = "block";

	// Add event listeners
	document.getElementById("cancelCustomModule").addEventListener("click", () => {
	formContainer.style.display = "none";
});

document.getElementById("saveCustomModule").addEventListener("click", saveCustomModule);
}

function saveCustomModule() {
const name = document.getElementById("customModuleName").value;
const emote = document.getElementById("customModuleEmote").value;
const category = document.getElementById("customModuleType").value;
const description = document.getElementById("customModuleDescription").value;
const tier = document.getElementById("customModuleTier").value;
const restriction = document.getElementById("customModuleRestriction").value;

// Validate inputs
if (!name || !emote || !description || !tier) {
	alert("Please fill in all required fields");
	return;
}

// Create custom module object
const customModule = {
	name,
	emote,
	description,
	category: category || null,
	restriction: restriction || null,
	catalogs: ["Custom"],
	restrictions: restriction ? [restriction] : [],
	isCustom: true // Flag to identify custom modules
};

// Initialize customModules if it doesn't exist
if (!activeCharacter.customModules) {
	activeCharacter.customModules = {
	tier1: [], tier2: [], tier3: [], tier4: [], tier5: []
	};
}

// Add module to the appropriate tier
activeCharacter.customModules[tier].push(customModule);

// Also add to the main modules array for the character
if (!activeCharacter.modules[tier]) {
	activeCharacter.modules[tier] = [];
}
activeCharacter.modules[tier].push(customModule);

// Save character data
saveCharacterData();

// Reload self core content to show the new module
loadSelfCoreContent();

// Hide the form
document.getElementById("customModuleFormContainer").style.display = "none";
}

function toggleRemovalMode() {
const isOn = document.body.classList.toggle("removal-mode");
console.log("Removal mode:", isOn ? "ON" : "OFF");
}

function removeCustomModule(moduleName, tier) {
if (!activeCharacter.modules || !activeCharacter.modules[tier]) return;

// Remove from main modules
activeCharacter.modules[tier] = activeCharacter.modules[tier].filter(m => m.name !== moduleName);

// Also remove from customModules if it exists
if (activeCharacter.customModules && activeCharacter.customModules[tier]) {
	activeCharacter.customModules[tier] = activeCharacter.customModules[tier].filter(m => m.name !== moduleName);
}

saveCharacterData();
loadSelfCoreContent();
}




function findModuleDefByName(name) {
let m = moduleLibrary.find(x => x.name === name);
if (m) return m;

if (activeCharacter.modules) {
	for (let t = 1; t <= 5; t++) {
	const arr = activeCharacter.modules["tier" + t] || [];
	const hit = arr.find(x => x.name === name);
	if (hit) return hit;
	}
}

if (activeCharacter.customModules) {
	for (let t = 1; t <= 5; t++) {
	const arr = activeCharacter.customModules["tier" + t] || [];
	const hit = arr.find(x => x.name === name);
	if (hit) return hit;
	}
}
return null;
}

// Skill creation/editing form
function createSkillForm(skill = {}, index) {
	let isNew = index === undefined || index < 0;

	const defaultSkill = {
		name: "",
		restrictions: [],
		stats: ["mig", "dex"],
		description: "",
		modules: []
	};
	const currentSkill = { 
		...defaultSkill, 
		...skill, 
		modules: skill.modules ? skill.modules.map(m => ({ ...m })) : [] 
	};

	const form = document.createElement("div");
	form.className = "skill-form";

	// --- Name input ---
	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.placeholder = "Skill Name";
	nameInput.value = currentSkill.name;
	form.appendChild(nameInput);

	// --- Stats selection ---
	const stats = ["mig", "dex", "int", "wlp", "stl"];
	const statContainer = document.createElement("div");
	statContainer.className = "stat-selection";
	for (let i = 0; i < 2; i++) {
		const select = document.createElement("select");
		stats.forEach(stat => {
			const option = document.createElement("option");
			option.value = stat;
			option.textContent = stat.toUpperCase();
			select.appendChild(option);
		});
		select.value = currentSkill.stats[i] || stats[i];
		statContainer.appendChild(select);
		if (i === 0) statContainer.appendChild(document.createTextNode(" + "));
	}
	form.appendChild(statContainer);

	// --- Restriction selects ---
	const restrictionContainer = document.createElement("div");
	restrictionContainer.className = "restriction-container";

	const hasMasoquista = activeCharacter.perks?.some(p => p.name === "Masoquista");
	const numRestrictions = hasMasoquista ? 2 : 1;

	const restrictionOptions = [
		{ value: "", text: "No Restriction" },
		{ value: "Doble [+2 ☐ ]", text: "Acción doble [+2 ☐ ]" },
		{ value: "+1 PE [+1 ☐ ]", text: "Consumir Energía - 1 PE [+1 ☐ ]" },
		{ value: "+3 PE [+2 ☐ ]", text: "Consumir Energía - 3 PE [+2 ☐ ]" },
		{ value: "+6 PE [+3 ☐ ]", text: "Consumir Energía - 6 PE [+3 ☐ ]" },
		{ value: "+10 PE [+4 ☐ ]", text: "Consumir Energía - 10 PE [+4 ☐ ]" }
	];

	activeCharacter.perks?.forEach(p => {
		if (p.type === "restriction") restrictionOptions.push({ value: p.name, text: p.name });
	});

	const restrictionSelects = [];
	for (let i = 0; i < numRestrictions; i++) {
		const select = document.createElement("select");
		restrictionOptions.forEach(opt => {
			const option = document.createElement("option");
			option.value = opt.value;
			option.textContent = opt.text;
			select.appendChild(option);
		});
		select.value = currentSkill.restrictions[i] || "";
		restrictionContainer.appendChild(select);
		restrictionSelects.push(select);
	}
	form.appendChild(restrictionContainer);

	// --- Module slots ---
	const moduleSlots = document.createElement("div");
	moduleSlots.className = "module-slots";

	function updateModuleSlots() {
		moduleSlots.innerHTML = "";
		const newRestrictions = restrictionSelects.map(s => s.value);
		const totalSlots = getTotalSlots({ restrictions: newRestrictions });
		const skillData = (index > -1) ? activeCharacter.skills[index] : currentSkill;
		const currentModules = [...(skillData.modules || [])].slice(0, totalSlots);

		for (let i = 0; i < totalSlots; i++) {
			const slot = document.createElement("div");
			slot.className = "module-slot";

				if (currentModules[i]) {
					const saved = currentModules[i];
					const found = findModuleDefByName(saved.name);

					const displayEmote = found?.emote ?? saved.emote ?? "?";
					const displayCategory = found?.category ?? saved.category ?? "Custom";

					slot.textContent = displayEmote;
					slot.dataset.module = saved.name;
					slot.dataset.category = displayCategory;
					slot.title = saved.name;

					// --- Restriction icon ---
					const restrictionIcon = document.createElement("div");
					restrictionIcon.className = "restriction-icon";
					restrictionIcon.textContent = "R";

					// Tooltip handling
					restrictionIcon.addEventListener("mouseenter", () => {
						const restriction = saved.restriction || null;
						showTooltip(found, restriction, restrictionIcon);
					});
					restrictionIcon.addEventListener("mouseleave", hideTooltip);

					// If no restriction, keep hidden until hover
					if (!saved.restriction) {
						restrictionIcon.style.opacity = 0;
						slot.addEventListener("mouseenter", () => restrictionIcon.style.opacity = 1);
						slot.addEventListener("mouseleave", () => restrictionIcon.style.opacity = 0);
					}

					// Click opens restriction selection
					restrictionIcon.addEventListener("click", (e) => {
						e.stopPropagation();
						showGenericModuleRestrictions(restrictionIcon, skillData, i);
					});

					slot.appendChild(restrictionIcon);
				}
				else {
					slot.textContent = "+";
					slot.classList.add("empty");
					slot.dataset.module = "";
					
					// Create restriction icon for empty slots too
					const restrictionIcon = document.createElement("div");
					restrictionIcon.className = "restriction-icon";
					restrictionIcon.textContent = "R";
					restrictionIcon.title = "None";
					restrictionIcon.style.opacity = 0;
					slot.appendChild(restrictionIcon);
				}
			// --- Drag & click events ---
			slot.draggable = true;
			slot.addEventListener("dragstart", handleDragStart);
			slot.addEventListener("dragover", handleDragOver);
			slot.addEventListener("drop", handleDrop);
			slot.addEventListener("dragend", handleDragEnd);
			slot.addEventListener("mouseenter", handleModuleHover);
			slot.addEventListener("mouseleave", handleModuleUnhover);
			slot.addEventListener("click", e => {
				if (!slot.classList.contains("dragging")) {
					e.stopPropagation();
					document.querySelectorAll(".module-selector").forEach(sel => sel.remove());
					showModuleSelection(slot, saveSkill, currentSkill, index, currentModules);
				}
			});

			moduleSlots.appendChild(slot);
		}
	}
	restrictionSelects.forEach(select => select.addEventListener("change", updateModuleSlots));
	updateModuleSlots();
	form.appendChild(moduleSlots);

	// --- Description ---
	const descriptionInput = document.createElement("textarea");
	descriptionInput.placeholder = "Skill Description";
	descriptionInput.value = currentSkill.description;
	form.appendChild(descriptionInput);

	// --- Save button ---
	const saveButton = document.createElement("button");
	saveButton.textContent = "Save";

	function saveSkill() {
		const modules = Array.from(moduleSlots.children).map((slot, i) => {
			const moduleName = slot.dataset.module;
			if (!moduleName) return null;
			const moduleObj = (index > -1) ? activeCharacter.skills[index].modules[i] : currentSkill.modules[i];



			// Find the module definition from the library
			const moduleDef = moduleLibrary.find(m => m.name === moduleName) || 
							findModuleDefByName(moduleName);
			
			// Get the restriction icon if it exists
			const restrictionIcon = slot.querySelector('.restriction-icon');
			const hasRestriction = restrictionIcon && restrictionIcon.style.opacity !== "0";
						
			// return {
			// 	name: moduleName,
			// 	emote: moduleObj?.emote || slot.textContent || "❓",
			// 	category: slot.dataset.category || null,
			return {
				name: moduleName,
				emote: moduleDef?.emote || "❓", // Use the correct emote from library
				category: moduleDef?.category || null,
				// restriction: hasRestriction ? moduleDef?.restriction || null : null
				restriction: moduleObj?.restriction || null,
			};
		}).filter(Boolean);

		const restrictions = restrictionSelects.map(s => s.value);

		Object.assign(currentSkill, {
			name: nameInput.value,
			stats: Array.from(statContainer.querySelectorAll("select")).map(s => s.value),
			restrictions,
			description: descriptionInput.value,
			modules,
			cost: calculateSkillCost(modules, restrictions)
		});

		if (!activeCharacter.skills) activeCharacter.skills = [];
		if (isNew) {
			activeCharacter.skills.push(currentSkill);
			index = activeCharacter.skills.length - 1;
			isNew = false;
		} else {
			activeCharacter.skills[index] = currentSkill;
		}

		saveCharacterData();
		updateSPDisplay();
	}

	saveButton.addEventListener("click", () => {
		saveSkill();
		renderSkills();
	});

	form.appendChild(saveButton);
	return form;
}

// Edit skill
function editSkill(index) {
	const skillElement = document.getElementById(`skill-${index}`);
	if (!skillElement) {
		console.error(`Skill element with ID skill-${index} not found`);
		return;
	}

	const skill = activeCharacter.skills[index];
	if (!skill) {
		console.error(`Skill at index ${index} not found in activeCharacter.skills`);
		return;
	}

	// Create new form
	const newForm = createSkillForm(skill, index);
	
	// Get the parent container
	const parent = skillElement.parentElement;
	if (!parent) {
		console.error("Parent element not found for skill element");
		return;
	}

	// Replace the skill element with the new form
	try {
		parent.replaceChild(newForm, skillElement);
	} catch (error) {
		console.error("Error replacing skill element:", error);
	}
}

function showModuleSelection(slot, saveSkill, skill, index, currentModules) {
	// Create the module selector
	const moduleSelector = document.createElement("div");
	moduleSelector.className = "module-selector";
		const selector = document.createElement("div");
		selector.className = "module-selector";

		// Get all learned modules grouped by tier
		const tiers = {};
		for (let tier = 1; tier <= 5; tier++) {
				const tierKey = `tier${tier}`;
				tiers[tier] = activeCharacter.modules[tierKey] || [];
		}
		


		// Create remove option
		const removeOption = document.createElement("div");
		removeOption.className = "module-option remove";
		removeOption.innerHTML = "❌";
		removeOption.title = "Remove module";
		removeOption.addEventListener("click", () => {
				slot.textContent = "+";
				slot.dataset.module = "";
				slot.classList.add("empty");
				selector.remove();
		saveSkill(skill, index);
		});
		selector.appendChild(removeOption);

		// Add modules grouped by tier
		let firstTier = true;
		for (let tier = 1; tier <= 5; tier++) {
			const tierModules = tiers[tier].filter(m =>
			m.isCustom ||
			(m.catalogs || []).some(catalog =>
				moduleCatalog[catalog] &&
				moduleCatalog[catalog][`tier${tier}`] &&
				moduleCatalog[catalog][`tier${tier}`].some(cm => cm.name === m.name)
			)
			);

				if (tierModules.length > 0) {
						// Add tier separator for every tier after the first one
						if (!firstTier) {
								const separator = document.createElement("hr");
								separator.className = "tier-separator";
								separator.style.width = "100%";
								separator.style.margin = "5px 0";
								selector.appendChild(separator);
						}
						firstTier = false;

						// Add tier modules
						tierModules.forEach(module => {
								const moduleOption = document.createElement("div");
								moduleOption.className = "module-option";
								moduleOption.textContent = module.emote;
								moduleOption.title = `${module.name} (Tier ${tier})`;
								moduleOption.addEventListener("click", () => {
									slot.textContent = module.emote;
									slot.dataset.module = module.name;
									slot.dataset.category = module.category;
									slot.classList.remove("empty");

									// Update / create restriction icon
									let restrictionIcon = slot.querySelector(".restriction-icon");
									if (!restrictionIcon) {
										restrictionIcon = document.createElement("div");
										restrictionIcon.className = "restriction-icon";
										restrictionIcon.textContent = "R";
										slot.appendChild(restrictionIcon);
									}

									// Reset default state
									restrictionIcon.style.opacity = 0;

									// Reattach tooltip + click handling
									restrictionIcon.onmouseenter = () => {
										const moduleName = module.name;
										const moduleDef = moduleLibrary.find(m => m.name === moduleName);
										if (!moduleDef) return;
										const restriction = null; // new modules start restriction-less
										showTooltip(moduleDef, restriction, restrictionIcon);
									};
									restrictionIcon.onmouseleave = hideTooltip;

									restrictionIcon.onclick = (e) => {
										e.stopPropagation();
										showGenericModuleRestrictions(restrictionIcon, skill, index);
									};

									// Fade in/out behavior
									slot.onmouseenter = () => restrictionIcon.style.opacity = 1;
									slot.onmouseleave = () => restrictionIcon.style.opacity = 0;

									selector.remove();
									saveSkill(skill, index);
								});
								selector.appendChild(moduleOption);
						});
				}
		}

		document.body.appendChild(selector);

		// Get viewport dimensions and bounding rectangle of the slot
		selector.style.visibility = "hidden";
		selector.style.position = "absolute";
		selector.style.left = "0px";
		selector.style.top = "0px";

		const selectorWidth = selector.offsetWidth;
		const selectorHeight = selector.offsetHeight;


		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const rect = slot.getBoundingClientRect();
		let mouseX = rect.left + window.scrollX;
		let mouseY = rect.bottom + window.scrollY;

		// Adjust horizontal position
		if (mouseX + selectorWidth > viewportWidth) {
				mouseX = viewportWidth - selectorWidth - 10;
		} else {
				mouseX = Math.max(mouseX, 10);
		}

		// Adjust vertical position
		if (mouseY + selectorHeight > viewportHeight) {
			mouseY = rect.top + window.scrollY - selectorHeight - 10;
		} else {
			mouseY = rect.bottom + window.scrollY + 10;
		}


		selector.style.left = `${mouseX}px`;
		selector.style.top = `${mouseY}px`;
		selector.style.visibility = "visible";
		selector.style.zIndex = "1000";

		// Close selector when clicking outside
		const clickHandler = (e) => {
				if (!selector.contains(e.target)) {
						selector.remove();
						document.removeEventListener("click", clickHandler);
				}
		};
		document.addEventListener("click", clickHandler);
	
}

function showGenericModuleRestrictions(icon, skill, moduleIndex) {
	if (!skill || !skill.modules) return;

	// Remove any existing popup for this module
	document.querySelectorAll(`.restriction-popup[data-module="${moduleIndex}"]`).forEach(p => p.remove());

	const moduleObj = skill.modules[moduleIndex];
	const currentRestriction = moduleObj?.restriction || null;

	const restrictions = [
		{ name: "None", type: "" },
		{ name: "Maestria", type: "Maestria" },
		{ name: "+1 PE coste de activación", type: "-1 SP" },
		{ name: "Requiere un objeto específico como material", type: "-1 SP" },
		{ name: "Solo afecta a objetivos que hayan recibido daño", type: "-1 SP" },
		{ name: "El área debe estar centrada en el usuario", type: "-1 SP" },
		{ name: "No afecta a objetos inanimados", type: "-1 SP" },
		{ name: "Solo afecta a objetos o estructuras inanimadas", type: "-2 SP" },
		{ name: "Requiere un componente menor, que es consumido", type: "-2 SP" },
		{ name: "Este efecto termina si el objetivo recibe daño de un elemento (escogido durante creación)", type: "-2 SP" },
		{ name: "Mientras este módulo está activo, tu apariencia cambia a una obviamente mágica", type: "-2 SP" },
		{ name: "El objetivo debe estar afectado por otro módulo especificado en creación", type: "-3 SP" },
		{ name: "Solo afecta a un objetivo si te ha hecho daño en esta escena", type: "-3 SP" },
		{ name: "Este efecto termina cuando el objetivo recibe daño", type: "-3 SP" }
	];

	const popup = document.createElement("div");
	popup.className = "restriction-popup";
	popup.dataset.module = moduleIndex;
	popup.innerHTML = "<strong>Select Restriction:</strong><br>";

	restrictions.forEach(r => {
		const label = document.createElement("label");
		label.className = "restriction-option";

		const input = document.createElement("input");
		input.type = "radio";
		input.name = `restriction-${moduleIndex}`;
		input.value = r.name;
		input.checked = currentRestriction?.name === r.name;

		input.addEventListener("change", () => {
			if (r.name.toLowerCase() === "none") {
				delete moduleObj.restriction;
				icon.title = "";
				icon.dataset.restriction = "";
			} else {
				moduleObj.restriction = { name: r.name, type: r.type };
				icon.title = `${r.name} (${r.type})`;
				icon.dataset.restriction = JSON.stringify(moduleObj.restriction);
			}

			skill.cost = calculateSkillCost(skill.modules || [], skill.restrictions || []);
			saveCharacterData();
		});

		label.appendChild(input);
		const labelText = r.name.toLowerCase() === "none" ? "None" : `${r.name} (${r.type})`;
		label.appendChild(document.createTextNode(labelText));
		popup.appendChild(label);
		popup.appendChild(document.createElement("br"));
	});

	document.body.appendChild(popup);

	const rect = icon.getBoundingClientRect();
	popup.style.position = "absolute";
	popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
	popup.style.left = `${rect.left + window.scrollX}px`;
	popup.style.zIndex = "1000";

	// Close popup on outside click
	const clickHandler = e => {
		if (!popup.contains(e.target)) {
			popup.remove();
			document.removeEventListener("click", clickHandler);
		}
	};
	document.addEventListener("click", clickHandler);
}

// Delete skill
function deleteSkill(index) {
	if (!activeCharacter.skills) return;
	activeCharacter.skills.splice(index, 1);
	saveCharacterData(); 
	renderSkills();
	updateSPDisplay();
}	

//Render Skill list
function renderSkills() {
	const skillsList = document.getElementById("skillsList");
	skillsList.innerHTML = "";

	if (!activeCharacter.skills || activeCharacter.skills.length === 0) {
		skillsList.innerHTML = "<div class='no-skills'>No skills learned yet</div>";
		return;
	}

	const restrictionPerks = activeCharacter.perks
		.filter(perk => perk.type === "restriction")
		.map(perk => perk.name);

	activeCharacter.skills.forEach((skill, index) => {
		if (!skill.stats) skill.stats = ["mig", "dex"];

		const skillDiv = document.createElement("div");
		skillDiv.className = "skill";
		skillDiv.id = "skill-" + index;

		const actionsDiv = document.createElement("div");
		actionsDiv.className = "skill-actions";

		const editButton = document.createElement("button");
		editButton.innerHTML = "✏️";
		editButton.onclick = () => editSkill(index);

		const deleteButton = document.createElement("button");
		deleteButton.innerHTML = "🗑️";
		deleteButton.onclick = () => deleteSkill(index);

		actionsDiv.appendChild(editButton);
		actionsDiv.appendChild(deleteButton);

		const contentDiv = document.createElement("div");
		contentDiv.className = "skill-content";

		const headerDiv = document.createElement("div");
		headerDiv.className = "skill-header";

		const nameDiv = document.createElement("div");
		nameDiv.className = "skill-name";
		nameDiv.textContent = skill.name;

		const costDiv = document.createElement("div");
		costDiv.className = "skill-cost";
		const liveCost = calculateSkillCost(
			skill.modules || [],
			skill.restrictions || []
		);
		costDiv.textContent = `Cost: ${liveCost} SE`;

		headerDiv.appendChild(nameDiv);

		const statsDiv = document.createElement("div");
		statsDiv.className = "skill-stats";

		const stat1 = skill.stats[0] || "mig";
		const stat2 = skill.stats[1] || "dex";
		const moduleMod = (skill.modules.filter(m => m.name === "Apuntar").length * 2);
		const baseAtk = (activeCharacter.secondaryStats.atk.value || 0) + (activeCharacter.secondaryStats.atk.temp || 0);
		const totalATK = baseAtk + moduleMod;

		statsDiv.textContent = `${stat1.toUpperCase()} (d${activeCharacter.stats[stat1].dice}) + ` +
							`${stat2.toUpperCase()} (d${activeCharacter.stats[stat2].dice}) + ${totalATK}`;

		const restrictions = skill.restrictions?.length > 0 ? skill.restrictions : [];
		if (restrictions.length > 0) {
			const restrictionDiv = document.createElement("div");
			restrictionDiv.className = "skill-restriction";
			restrictionDiv.innerHTML = "Restrictions: ";
			restrictions.forEach((restriction, i) => {
				const span = document.createElement("span");
				span.className = "restriction-item";
				span.textContent = restriction;
				span.addEventListener("mouseenter", (e) => showRestrictionTooltip(restriction, e.target));
				span.addEventListener("mouseleave", () => {});
				if (i > 0) restrictionDiv.append(", ");
				restrictionDiv.appendChild(span);
			});
			headerDiv.appendChild(restrictionDiv);
		}

		headerDiv.appendChild(costDiv);

		const descriptionDiv = document.createElement("div");
		descriptionDiv.className = "skill-description";
		descriptionDiv.textContent = skill.description;

		const modulesDiv = document.createElement("div");
		modulesDiv.className = "skill-modules";

		const totalSlots = getTotalSlots(skill);
		const isEditMode = skillsList.classList.contains("editing");

		for (let i = 0; i < totalSlots; i++) {
			const moduleSlot = document.createElement("div");
			moduleSlot.className = "module-slot";

			if (skill.modules[i]) {
				const saved = skill.modules[i];
				const found = findModuleDefByName(saved.name);

				const displayEmote = found?.emote ?? saved.emote ?? "?";
				const displayCategory = found?.category ?? saved.category ?? "Custom";

				moduleSlot.textContent = displayEmote;
				moduleSlot.dataset.module = saved.name;
				moduleSlot.dataset.category = displayCategory;
				moduleSlot.title = saved.name;

				const baseRestrictions = getModuleRestrictions(saved.name);
				const skillRestriction = saved.restriction;

				if (baseRestrictions.length > 0 || skillRestriction) {
					const restrictionIcon = document.createElement("div");
					restrictionIcon.className = "restriction-icon";
					restrictionIcon.textContent = "R";
					restrictionIcon.title = skillRestriction || "None";
					restrictionIcon.addEventListener("click", (e) => {
					e.stopPropagation();
					showGenericModuleRestrictions(restrictionIcon, skill, i);
					});
					moduleSlot.appendChild(restrictionIcon);
				}
			} else {
			moduleSlot.textContent = "+";
			moduleSlot.classList.add("empty");
			}


			if (!isEditMode) {
				moduleSlot.addEventListener("mouseenter", handleModuleHover);
				moduleSlot.addEventListener("mouseleave", handleModuleUnhover);
			}

			modulesDiv.appendChild(moduleSlot);
		}


		contentDiv.appendChild(headerDiv);
		contentDiv.appendChild(statsDiv);
		contentDiv.appendChild(descriptionDiv);
		contentDiv.appendChild(modulesDiv);

		skillDiv.appendChild(actionsDiv);
		skillDiv.appendChild(contentDiv);
		skillsList.appendChild(skillDiv);
	});
	renderSkillsSummary();
}

//Modules on Skill section interactions
function handleModuleHover(e) {
	const moduleSlot = e.target;
	const moduleName = moduleSlot.dataset.module;

	if (!moduleName) return;

	const skillElement = moduleSlot.closest(".skill");
	const skillIndex = Array.from(document.querySelectorAll(".skill")).indexOf(skillElement);

	const allSlots = Array.from(moduleSlot.parentElement.children);
	const moduleIndex = allSlots.indexOf(moduleSlot);

	const skill = activeCharacter.skills[skillIndex];
	const skillModule = skill?.modules[moduleIndex];
	const skillRestriction = skillModule?.restriction;

	const module = moduleLibrary.find(m => m.name === moduleName);
	if (!module) return; 

	const baseRestrictions = getModuleRestrictions(moduleName);

	let restrictionText = "None";
	if (skillRestriction) {
		if (typeof skillRestriction === "object") {
			restrictionText = `${skillRestriction.name} (${skillRestriction.type}) (selected)`;
		} else {
			restrictionText = `${skillRestriction} (selected)`;
		}
	} else if (baseRestrictions.length > 0) {
		restrictionText = baseRestrictions.join(", ") + " (available)";
	}

	showTooltip(module, restrictionText, moduleSlot);

	if (module.category === "Rango") {
		let endIndex = allSlots.findIndex((slot, index) =>
			index > moduleIndex &&
			(slot.dataset.category === "Rango" || slot.dataset.category === "Area")
		);

		endIndex = endIndex === -1 ? allSlots.length : endIndex + 1;
		allSlots.slice(moduleIndex, endIndex).forEach(slot => {
			slot.classList.add("highlighted");
		});
	}

	if (e.target.classList.contains("restriction-item")) {
		const restriction = e.target.textContent;
		showRestrictionTooltip(restriction, e.target);
		return;
	}
}

function handleModuleUnhover(e) {
	// Hide tooltip
	hideTooltip();
	
	// Remove highlighting
	Array.from(document.querySelectorAll(".module-slot")).forEach(slot => {
		slot.classList.remove("highlighted");
	});
}	

function handleDragStart(e) {
	const moduleSlot = e.target;
	if (!moduleSlot.dataset.module) {
		e.preventDefault();
		return;
	}
	
	draggedModule = moduleSlot;
	moduleSlot.classList.add('dragging');
	e.dataTransfer.setData('text/plain', moduleSlot.dataset.module);
	e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
	const moduleSlot = e.target;
	moduleSlot.classList.remove('dragging');
	draggedModule = null;
	
	Array.from(moduleSlot.parentElement.children).forEach(slot => {
		slot.classList.remove('drop-target');
	});
	
	const restrictionIcon = moduleSlot.querySelector('.restriction-icon');
	if (restrictionIcon && !moduleSlot.dataset.module) {
		restrictionIcon.style.opacity = 0;
	}
}

// Update the handleDrop function to properly handle restriction icons
function handleDrop(e) {
	e.preventDefault();
	const target = e.target;
	if (target.classList.contains('module-slot')) {
		target.classList.remove('drop-target');
		
		// Store all elements and data from both slots
		const draggedContent = draggedModule.innerHTML;
		const draggedModuleData = draggedModule.dataset.module;
		const draggedCategory = draggedModule.dataset.category;
		
		const targetContent = target.innerHTML;
		const targetModuleData = target.dataset.module;
		const targetCategory = target.dataset.category;
		
		// Swap everything including HTML content
		draggedModule.innerHTML = targetContent;
		draggedModule.dataset.module = targetModuleData;
		draggedModule.dataset.category = targetCategory;
		
		target.innerHTML = draggedContent;
		target.dataset.module = draggedModuleData;
		target.dataset.category = draggedCategory;
		
		// Update empty class states
		draggedModule.classList.toggle('empty', !draggedModule.dataset.module);
		target.classList.toggle('empty', !target.dataset.module);
		
		// Reattach event listeners to the restriction icons in both slots
		reattachRestrictionIconListeners(draggedModule);
		reattachRestrictionIconListeners(target);
	}
}

// Add this helper function to reattach event listeners to restriction icons
function reattachRestrictionIconListeners(slot) {
	const restrictionIcon = slot.querySelector('.restriction-icon');
	if (!restrictionIcon) return;
	
	// Get the skill and module index
	const skillElement = slot.closest('.skill-form') || slot.closest('.skill');
	if (!skillElement) return;
	
	let skillIndex;
	if (skillElement.id.startsWith('skill-')) {
		skillIndex = parseInt(skillElement.id.replace('skill-', ''));
	} else {
		// For forms, we need to find the index differently
		const forms = document.querySelectorAll('.skill-form');
		skillIndex = Array.from(forms).indexOf(skillElement);
	}
	
	const allSlots = Array.from(slot.parentElement.children);
	const moduleIndex = allSlots.indexOf(slot);
	
	const skill = activeCharacter.skills[skillIndex];
	if (!skill || !skill.modules) return;
	
	// Reattach tooltip and click events
	restrictionIcon.addEventListener("mouseenter", () => {
		const moduleName = slot.dataset.module;
		const module = moduleLibrary.find(m => m.name === moduleName);
		if (!module) return;
		
		const moduleObj = skill.modules[moduleIndex];
		const restriction = moduleObj?.restriction || null;
		showTooltip(module, restriction, restrictionIcon);
	});
	
	restrictionIcon.addEventListener("mouseleave", hideTooltip);
	
	restrictionIcon.addEventListener("click", (e) => {
		e.stopPropagation();
		showGenericModuleRestrictions(restrictionIcon, skill, moduleIndex);
	});
	
	// Reattach hover behavior for the slot
	slot.addEventListener("mouseenter", () => {
		if (restrictionIcon && !restrictionIcon.style.opacity) {
			restrictionIcon.style.opacity = 1;
		}
	});
	
	slot.addEventListener("mouseleave", () => {
		if (restrictionIcon && restrictionIcon.style.opacity === "1") {
			restrictionIcon.style.opacity = 0;
		}
	});
}

function handleDragOver(e) {
	e.preventDefault();
	const target = e.target;
	if (target.classList.contains('module-slot')) {
		target.classList.add('drop-target');
		e.dataTransfer.dropEffect = 'move';
	}
}

function getTotalSlots(skill) {
	let slots = 5; // Base slots

	// --- Normal restrictions ---
	skill.restrictions.forEach(restriction => {
		switch (restriction) {
			case 'Doble [+2 ☐ ]': slots += 2; break;
			case '+1 PE [+1 ☐ ]': slots += 1; break;
			case '+3 PE [+2 ☐ ]': slots += 2; break;
			case '+6 PE [+3 ☐ ]': slots += 3; break;
			case '+10 PE [+4 ☐ ]': slots += 4; break;
		}
	});

	// --- Perk-based bonuses ---
	skill.restrictions.forEach(restriction => {
					const perk = activeCharacter.perks.find(p => 
							p.name === restriction && p.type === "restriction"
					);
					if (perk) {
							const bonus = parseInt(perk.slots) || 0;
							slots += bonus;
					}
			});
	// --- Special gimmick override ---
	if (skill.restrictions.includes(" Gimmick")) {
		if (activeCharacter.perks.some(p => p.name === "Gimmick Set")) {
			slots = 2;
		} else {
			slots = 1;
		}
	}

	if (skill.restrictions.includes(" Transformación")) {
		if (activeCharacter.perks.some(p => p.name === "Bendición De Luna 2")) {
			slots = 3;
		}
		else if (activeCharacter.perks.some(p => p.name === "Bendición De Luna")) {
			slots = 2;
		}
		else {
			slots = 1;
		}
	}


	return slots;
}

// Calculate skill cost
function calculateSkillCost(modules, skillRestrictions = []) {
	// Group modules by name
	const grouped = modules.reduce((acc, m) => {
		acc[m.name] = acc[m.name] || [];
		acc[m.name].push(m);
		return acc;
	}, {});

	let cost = 0;

	for (const [name, mods] of Object.entries(grouped)) {
		const tierKey = Object.keys(activeCharacter.modules || {}).find(tk =>
			(activeCharacter.modules[tk] || []).some(m => m.name === name)
		);
		const tierNum = tierKey ? parseInt(tierKey.replace("tier", ""), 10) : 1;

		const X = mods.length;
		cost += (X * tierNum) + (X > 1 ? factorial(X - 1) : 0);
	}

	// Handle Ineficiente
	if (skillRestrictions.includes("Ineficiente [+2 ☐ ]")) cost *= 2;

	// Handle module restrictions
	modules.forEach(moduleObj => {
		if (!moduleObj.restriction) return;

		let restrictionType = typeof moduleObj.restriction === 'string'
			? moduleObj.restriction
			: moduleObj.restriction.type;

		if (!restrictionType) return;

		if (restrictionType.includes("-1 SP")) cost -= 1;
		else if (restrictionType.includes("-2 SP")) cost -= 2;
		else if (restrictionType.includes("-3 SP")) cost -= 3;
		else if (restrictionType.includes("Maestria")) {
			const tierKey = Object.keys(activeCharacter.modules || {}).find(tk =>
				(activeCharacter.modules[tk] || []).some(m => m.name === moduleObj.name)
			);
			const tierNum = tierKey ? parseInt(tierKey.replace("tier", ""), 10) : 1;
			cost -= tierNum;
		}
	});

	// Force cost = 0 if Gimmick or Transformación restriction is active
	if (
		skillRestrictions.includes(" Gimmick") ||
		// skillRestrictions.includes("") ||
		skillRestrictions.includes(" Transformación")
	) {
		cost = 0;
	}

	return Math.max(cost, 0);
}

// Helper factorial
function factorial(n) {
	return n <= 1 ? 1 : n * factorial(n - 1);
}

function showRestrictionTooltip(restrictionName, element) {
		// Create dynamic descriptions from character's perks
		const descriptions = {
				"Doble [+2 ☐ ]": "This skill costs 2 actions in order to activate it",
				"+1 PE [+1 ☐ ]": "Consume 1 Energy Point (+1 Module slot)",
				"+3 PE [+2 ☐ ]": "Consume 3 Energy Points (+2 Module slots)",
				"+6 PE [+3 ☐ ]": "Consume 6 Energy Points (+3 Module slots)", 
				"+10 PE [+4 ☐ ]": "Consume 10 Energy Points (+4 Module slots)"
		};

		// Add perk-based restrictions
		activeCharacter.perks.forEach(perk => {
				if (perk.type === "restriction") {
						descriptions[perk.name] = perk.description;
				}
		});

		const content = `<strong>${restrictionName}</strong><br>${
				descriptions[restrictionName] || "No description available"
		}`;

		const tooltip = document.createElement("div");
		tooltip.className = "restriction-tooltip";
		tooltip.innerHTML = content;

		document.body.appendChild(tooltip);

		// Get element position
		const rect = element.getBoundingClientRect();
		let top = rect.bottom + window.scrollY + 5;
		let left = rect.left + window.scrollX;

		// Prevent overflow
		const tooltipWidth = tooltip.offsetWidth;
		const tooltipHeight = tooltip.offsetHeight;

		if (left + tooltipWidth > window.innerWidth) {
				left = window.innerWidth - tooltipWidth - 10;
		}
		if (top + tooltipHeight > window.innerHeight) {
				top = rect.top - tooltipHeight - 10;
		}

		tooltip.style.position = "absolute";
		tooltip.style.top = `${top}px`;
		tooltip.style.left = `${left}px`;
		tooltip.style.zIndex = "1000";

		// Close tooltip on outside click
				element.addEventListener("mouseleave", () => {
						tooltip.remove();
				}, { once: true });
	
}

function getModuleRestrictions(moduleName) {
	return Object.values(activeCharacter.modules)
		.flat()
		.filter(m => m.name === moduleName)
		.flatMap(m => m.restrictions)
		.filter(r => r)
		.reduce((acc, curr) => {
			if (!acc.includes(curr)) acc.push(curr);
			return acc;
		}, []);
}




//Summary
function renderSummary() {
	if (!activeCharacter) return;

	// Get current HP/EP values from inputs or activeCharacter
	const currentHpInput = document.getElementById("currentHp");
	const currentEpInput = document.getElementById("currentEp");
	
	// Calculate max values
	const recalculated = calculateSecondaryStats(
		activeCharacter.stats,
		activeCharacter.secondaryStats,
		activeCharacter.permanentBonuses || {}
	);

	const maxHp = recalculated.hp.value + recalculated.hp.temp;
	const maxEp = recalculated.ep.value + recalculated.ep.temp;

	// Update activeCharacter with current values
	if (currentHpInput) {
		activeCharacter.currentHP = parseInt(currentHpInput.value, 10) || activeCharacter.currentHP || maxHp;
	}
	if (currentEpInput) {
		activeCharacter.currentEP = parseInt(currentEpInput.value, 10) || activeCharacter.currentEP || maxEp;
	}
	
	const currentHp = activeCharacter.currentHP;
	const currentEp = activeCharacter.currentEP;

	// Calculate percentage
	const hpPercent = maxHp ? (currentHp / maxHp) * 100 : 0;
	const epPercent = maxEp ? (currentEp / maxEp) * 100 : 0;

	// Update bar widths
	const hpBar = document.querySelector(".summary-hp .bar-fill");
	const epBar = document.querySelector(".summary-ep .bar-fill");

	if (hpBar) hpBar.style.width = hpPercent + "%";
	if (epBar) epBar.style.width = epPercent + "%";

	// Update input values
	if (currentHpInput) currentHpInput.value = currentHp;
	if (currentEpInput) currentEpInput.value = currentEp;
	
	// Update skills and perks summaries
	renderSkillsSummary();
	renderPerksSummary();
	
	// Save changes to Supabase
	saveCharacterData();
}

function renderSkillsSummary() {
	const summarySkills = document.getElementById("summary-skills");
	summarySkills.innerHTML = "";

	if (!activeCharacter.skills || activeCharacter.skills.length === 0) {
		summarySkills.innerHTML = "<div class='no-skills'>No skills learned yet</div>";
		return;
	}

	activeCharacter.skills.forEach(skill => {
		if (!skill.stats) skill.stats = ["mig", "dex"];

		const skillDiv = document.createElement("div");
		skillDiv.className = "summary-skill";

		// --- Header: name + restrictions ---
		const headerDiv = document.createElement("div");
		headerDiv.className = "skill-header";

		const nameDiv = document.createElement("div");
		nameDiv.className = "skill-name";
		nameDiv.textContent = skill.name;
		headerDiv.appendChild(nameDiv);

		if (skill.restrictions && skill.restrictions.length > 0) {
			const restrictionDiv = document.createElement("div");
			restrictionDiv.className = "skill-restriction";
			restrictionDiv.textContent = `${skill.restrictions.join(", ")}`;
			restrictionDiv.style.marginLeft = "10px";
			headerDiv.appendChild(restrictionDiv);
		}

		// --- Stats ---
		const statsDiv = document.createElement("div");
		statsDiv.className = "skill-stats";
		const stat1 = skill.stats[0] || "mig";
		const stat2 = skill.stats[1] || "dex";

		const moduleMod = (skill.modules.filter(m => m.name === "Apuntar").length * 2);
		const baseAtk = (activeCharacter.secondaryStats.atk.value || 0) + (activeCharacter.secondaryStats.atk.temp || 0);
		const totalATK = baseAtk + moduleMod;

		statsDiv.textContent = `${stat1.toUpperCase()} (d${activeCharacter.stats[stat1].dice}) + ` +
							`${stat2.toUpperCase()} (d${activeCharacter.stats[stat2].dice}) + ${totalATK}`;

		// --- Modules ---
		const modulesDiv = document.createElement("div");
		modulesDiv.className = "skill-modules";

		skill.modules.forEach(moduleObj => {

			const found = findModuleDefByName(moduleObj.name);

			const displayEmote = found?.emote ?? saved.emote ?? "?";
			const displayCategory = moduleObj.category ?? moduleObj.category ?? "Custom";
			const span = document.createElement("span");
			span.className = "module-slot";
			span.textContent = displayEmote;
			span.dataset.module = moduleObj.name;
			span.dataset.category = displayCategory;
			span.title = moduleObj.name;

			// Restriction handling (only show if restriction exists)
			if (moduleObj.restriction) {
				const restrictionIcon = document.createElement("div");
				restrictionIcon.className = "restriction-icon";
				restrictionIcon.textContent = "R";

				restrictionIcon.addEventListener("mouseenter", () => {
					showTooltip(resolvedModule, moduleObj.restriction, restrictionIcon);
				});
				restrictionIcon.addEventListener("mouseleave", hideTooltip);

				span.appendChild(restrictionIcon);
			}

			modulesDiv.appendChild(span);
		});

		skillDiv.appendChild(headerDiv);
		skillDiv.appendChild(statsDiv);
		skillDiv.appendChild(modulesDiv);

		summarySkills.appendChild(skillDiv);
	});
}

function renderPerksSummary() {
	const summaryPerks = document.getElementById("summary-perks");
	summaryPerks.innerHTML = "";

	if (!activeCharacter.perks || activeCharacter.perks.length === 0) {
		summaryPerks.innerHTML = "<div class='no-perks'>No perks learned yet</div>";
		return;
	}

	// Get unique catalogs/archetypes
	const catalogs = [...new Set(activeCharacter.perks.map(p => p.catalog || "Origen"))];

	catalogs.forEach(catalog => {
		// Filter perks for this catalog and exclude restrictions
		const filteredPerks = activeCharacter.perks
			.filter(p => (p.catalog || "Origen") === catalog && p.type !== "restriction");

		// 🔑 Skip rendering if only restrictions (no perks left)
		if (filteredPerks.length === 0) return;

		const archetypeDiv = document.createElement("div");
		archetypeDiv.className = "archetype";

		const archetypeTitle = document.createElement("strong");
		archetypeTitle.textContent = catalog.charAt(0).toUpperCase() + catalog.slice(1);
		archetypeDiv.appendChild(archetypeTitle);

		const perkListDiv = document.createElement("div");
		perkListDiv.className = "perk-list";

		filteredPerks.forEach(perk => {
			const label = document.createElement("label");
			label.textContent = perk.name;
			perkListDiv.appendChild(label);
		});

		archetypeDiv.appendChild(perkListDiv);
		summaryPerks.appendChild(archetypeDiv);
	});
}

function updateImageDisplay()  {
	if (!activeCharacter || !activeCharacter.image) {
		charImageDisplay.src = "";
		charImageDisplay.style.display = "none";
		charImageButton.style.display = "inline-block";
	} else {
		charImageDisplay.src = activeCharacter.image;
		charImageDisplay.style.display = "block";
		charImageButton.style.display = "none";
	}
};

function setupCharacterImage() {
	const charImageButton = document.getElementById("charImageButton");
	const charImageInput = document.getElementById("charImageInput");
	const charImageDisplay = document.getElementById("charImageDisplay");

	if (!charImageButton || !charImageInput || !charImageDisplay) return;

	// Initial display
	updateImageDisplay();

	// Click button or image to open file picker
	charImageButton.addEventListener("click", () => charImageInput.click());
	charImageDisplay.addEventListener("click", () => charImageInput.click());

	// Handle image selection
	charImageInput.addEventListener("change", () => {
		const file = charImageInput.files[0];
		if (!file || !activeCharacter) return;

		const reader = new FileReader();
		reader.onload = function(e) {
			activeCharacter.image = e.target.result;
			updateImageDisplay();
			saveCharacterData();
		};
		reader.readAsDataURL(file);
	});

	// Update display whenever the character selector changes
	document.getElementById("characterSelector").addEventListener("change", updateImageDisplay);
	

}

