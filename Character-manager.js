import moduleLibrary from './moduleLibrary.js';
import moduleCatalog from './moduleCatalog.js';

//global variables
let activeCharacter = {};
let activeCatalog = "";
window.showSection = showSection;
window.showCatalog = showCatalog;

const jobEffects = [
	"Tras tirar tus stats, puedes reemplazar una de ellas por un 5.",
	"Tus tiradas pares por debajo de 6 se consideran críticos.",
	"Ganas un +3 a las secundarias de tu oficio.",
	"En cualquier momento durante el combate, puedes gastar +1 PE para usar una secundaria relacionada con tu oficio como una acción gratuita.",
	"Al fallar una tirada enfrentada de tu oficio, puedes gastar 2 PE para convertir el fallo en un acierto.",
	"Ignoras cualquier desventaja circunstancial que afecte tus tiradas del oficio."
];




function setActiveCharacter(characterId) {
	const characters = JSON.parse(localStorage.getItem('characters') || '{}');
	const selectedCharacter = characters[characterId];

	if (selectedCharacter) {
		activeCharacter = selectedCharacter;
		populateCharacterData(selectedCharacter);
		console.log("Active character set:", activeCharacter);
	} else {
		console.error("Character ID not found:", characterId);
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
document.getElementById("importCharacter").addEventListener("change", function(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = function(e) {
				try {
						const characterData = JSON.parse(e.target.result);
						
						// Generate unique ID for the new character
						const newCharacterId = `char_${Date.now()}`;
						
						// Load existing characters
						const characters = JSON.parse(localStorage.getItem('characters') || '{}');
						
						// Add new character
						characters[newCharacterId] = characterData;
						
						// Save to localStorage
						localStorage.setItem('characters', JSON.stringify(characters));
						
						// Update UI
						const characterSelector = document.getElementById("characterSelector");
						const newOption = new Option(characterData.name, newCharacterId);
						characterSelector.add(newOption);
						characterSelector.value = newCharacterId;
						
						// Set as active character and populate data
						setActiveCharacter(newCharacterId);
			
						// Reset file input
						event.target.value = '';
				} catch (e) {
						alert("Error importing character: Invalid or corrupted file format");
						console.error("Import error:", e);
				}
		};
		reader.readAsText(file);
});

document.getElementById("newCharacter").addEventListener("click", () => {
	const characters = JSON.parse(localStorage.getItem('characters') || '{}');

	const newCharacterId = `char_${Date.now()}`; // Unique ID based on timestamp
	const newCharacter = {
		name: `New Character ${Object.keys(characters).length + 1}`,
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
			tier1: [], tier2: [], tier3: [], tier4: [], tier5: [],
		},
		perks: [],
		sp: 0,
		ce: 0,
	};

	// Save new character
	characters[newCharacterId] = newCharacter;
	localStorage.setItem('characters', JSON.stringify(characters));

	// Update selector
	const characterSelector = document.getElementById("characterSelector");
	const newOption = document.createElement("option");
	newOption.value = newCharacterId;
	newOption.textContent = newCharacter.name;
	characterSelector.appendChild(newOption);

	// Select new character
	characterSelector.value = newCharacterId;
	setActiveCharacter(newCharacterId);
});

document.getElementById("deleteCharacter").addEventListener("click", () => {
	const characterSelector = document.getElementById("characterSelector");
	const characterId = characterSelector.value;
	let characters = JSON.parse(localStorage.getItem('characters') || '{}');

	if (!characters[characterId]) {
		alert("No character selected or character doesn't exist.");
		return;
	}

	// Confirm deletion
	if (!confirm(`Are you sure you want to delete ${characters[characterId].name}?`)) {
		return;
	}

	delete characters[characterId]; // Remove from storage
	localStorage.setItem('characters', JSON.stringify(characters));

	// Remove from selector
	characterSelector.querySelector(`option[value="${characterId}"]`).remove();

	if (Object.keys(characters).length === 0) {
		// If all characters are deleted, create a default one
		document.getElementById("newCharacter").click();
	} else {
		// Select first available character
		const firstCharacterId = Object.keys(characters)[0];
		characterSelector.value = firstCharacterId;
		setActiveCharacter(firstCharacterId);
	}
});

function saveCharacterData() {
	console.log("Saving data...");

	const characterSelector = document.getElementById("characterSelector");
	const selectedCharacterIndex = characterSelector.value;

	if (!selectedCharacterIndex) {
		console.error("No character selected to save!");
		return;
	}

	const updatedCharacter = gatherCharacterData();

	// Preserve current temp values when recalculating secondary stats
	updatedCharacter.secondaryStats = calculateSecondaryStats(
		updatedCharacter.stats,
		updatedCharacter.secondaryStats // Pass current secondary stats to retain temp values
		
	);

	activeCharacter = updatedCharacter;
	const characters = JSON.parse(localStorage.getItem("characters") || "{}");
	characters[selectedCharacterIndex] = activeCharacter;
	localStorage.setItem("characters", JSON.stringify(characters));

	console.log("Character data saved:", activeCharacter);
	loadSelfCoreContent();
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
        }
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

function populateCharacterSelector() {
	const characterSelector = document.getElementById('characterSelector');
	if (!characterSelector) {
		console.error("Character selector element not found!");
		return;
	}

	const characters = JSON.parse(localStorage.getItem('characters') || '{}');
	if (typeof characters !== 'object' || Array.isArray(characters)) {
		console.error("Characters in localStorage is not a valid object!", characters);
		return;
	}

	Object.keys(characters).forEach((key) => {
		const char = characters[key];
		const option = document.createElement('option');
		option.value = key;
		option.textContent = char.name || 'Unnamed Character';
		characterSelector.appendChild(option);
	});

	console.log("Characters populated:", characters);
}

function updateStatUpgrades() {
    activeCharacter.permanentBonuses = {};

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
                    activeCharacter.permanentBonuses[stat] = (activeCharacter.permanentBonuses[stat] || 0) + amount;
                }
            }

            const upgradesRow = document.querySelector(`#catalogContent .collapsible-section[data-tier="${tierKey}"] .stat-upgrades-row`);
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

    saveCharacterData();
}

	
document.addEventListener("DOMContentLoaded", () => {
	const characterSelector = document.getElementById("characterSelector");

	// Check if characters exist in localStorage
	let characters = JSON.parse(localStorage.getItem('characters') || '{}');
	if (Object.keys(characters).length === 0) {
		// Create a default character if none exist
		const defaultCharacter = {
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
			perks:[],
			sp: { value: 0, temp: 0 },
			ce: { value: 0, temp: 0 },
			permanentBonuses: {},
			statUpgrades: {},


		};

		// Save default character to localStorage
		characters["default"] = defaultCharacter;
		localStorage.setItem('characters', JSON.stringify(characters));
	}

	// Populate the selector
	populateCharacterSelector();

	// Load the first character as active
	const firstCharacterId = Object.keys(characters)[0];
	if (firstCharacterId) {
		setActiveCharacter(firstCharacterId);
	}

	// Handle character selection changes
	characterSelector.addEventListener("change", event => {
		setActiveCharacter(event.target.value);
	});

	// Reusable function to attach event listeners and save data
	function attachSaveListeners(elements, callback) {
		elements.forEach(id => {
			const element = document.getElementById(id);
			if (element) {
				const eventType = element.tagName === 'SELECT' ? 'change' : 'input';
				element.addEventListener(eventType, () => {
					saveCharacterData();
					populateCharacterData(activeCharacter);
					if (callback) callback();
				});
			} else {
				console.warn(`Element with ID "${id}" not found.`);
			}
		});
	}

	// Listeners for character data
	const charNameInput = document.getElementById("charName");
	if (charNameInput) {
		attachSaveListeners([charNameInput.id]);
	} else {
		console.warn("Character name input element not found.");
	}

	const stats = ['mig', 'dex', 'wlp', 'int', 'stl'];
	const statsIds = stats.map(stat => [`${stat}Dice`, `${stat}Temp`]).flat();
	attachSaveListeners(statsIds);

	const secondaryStats = ['hp', 'ep', 'df', 'dm', 'impr', 'mov', 'atk', 'dmg'];
	const secondaryStatsIds = secondaryStats.map(stat => [`${stat}`, `${stat}Temp`]).flat();
	attachSaveListeners(secondaryStatsIds);

	// Set up jobs section
	const addJobButton = document.getElementById("addJob");
	if (addJobButton) {
		addJobButton.addEventListener("click", addJob);
	} else {
		console.warn("Add Job button not found.");
	}
	
	document.getElementById("currentHp").addEventListener("input", renderSummary);
	document.getElementById("currentEp").addEventListener("input", renderSummary);

	// Attach event listeners for CE and SP inputs across all sections
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
	document.getElementById("addSkill").addEventListener("click", () => {
		const skillForm = createSkillForm();
		document.getElementById("skillsList").appendChild(skillForm);
	});


	setupCharacterImage();
	calculateAvailableJobs();
	loadSelfCoreContent();
	loadOriginPerks();
	updateSPDisplay();
});

function calculateAvailableJobs() {
	// Retrieve the selected character's data
	const characterSelector = document.getElementById("characterSelector");
	const selectedCharacterIndex = characterSelector.value;

	if (!selectedCharacterIndex) {
		console.error("No character selected for calculating available jobs!");
		return;
	}

	// Load character data from localStorage
	const characters = JSON.parse(localStorage.getItem("characters") || "{}");
	const selectedCharacter = characters[selectedCharacterIndex];

	if (!selectedCharacter) {
		console.error("Character data not found!");
		return;
	}

	// Retrieve stats from JSON
	const intBase = parseInt(selectedCharacter.stats.int.dice || 8);
	const intTemp = parseInt(selectedCharacter.stats.int.temp || 0);
	const wlpBase = parseInt(selectedCharacter.stats.wlp.dice || 8);
	const wlpTemp = parseInt(selectedCharacter.stats.wlp.temp || 0);

	// Calculate totals
	const intTotal = intBase + intTemp;
	const wlpTotal = wlpBase + wlpTemp;

	// Calculate available jobs
	const maxJobs = Math.floor((intTotal + wlpTotal) / 6) || 1;
	const jobs = selectedCharacter.jobs || [];
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

// Update calculateUsedCE function
function calculateUsedCE() {
	if (!activeCharacter.modules) return 0;
	
	return Object.entries(activeCharacter.modules).reduce((total, [tierKey, modules]) => {
		const tierNumber = parseInt(tierKey.replace("tier", "")) || 0;

		// Count each module separately for each catalog it belongs to
		return total + modules.reduce((sum, module) => sum + (module.catalogs.length * tierNumber), 0);
	}, 0);
}

function syncExperienceInputs() {
	const ceValue = activeCharacter.ce || 0;
	const seValue = activeCharacter.sp || 0;
	
	document.querySelectorAll('[id^="ce"], [id^="se"]').forEach(input => {
		if(input.id.includes("ce")) input.value = ceValue;
		if(input.id.includes("se")) input.value = seValue;
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
					if (skill.modules.includes(moduleName) && skill.moduleRestrictions?.[moduleName]) {
						restriction = skill.moduleRestrictions[moduleName];
						break;
					}
				}
			}

			if (!restriction) {
				restriction = moduleCatalog[activeCatalog]?.[button.dataset.tier]
					?.find(m => m.name === moduleName)?.restriction || null;
			}

			showTooltip(module, restriction, button);
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
                                    activeCharacter.perks.push({
                                        ...perk, catalog: coreName, tier: tierKey
                                    });
                                    perkButton.classList.add("learned");
                                } else {
                                    activeCharacter.perks.splice(index, 1);
                                    perkButton.classList.remove("learned");
                                }
                                saveCharacterData();
                                updatePerkAvailability(coreName, tierKey);
								updateStatUpgrades()
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
  
  // Check if already learned
  const isLearned = activeCharacter.perks.some(p => 
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
  const index = activeCharacter.perks?.findIndex(p => 
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
		let tooltip = document.getElementById("tooltip");
		if (!tooltip) {
				tooltip = document.createElement("div");
				tooltip.id = "tooltip";
				tooltip.className = "module-tooltip";
				document.body.appendChild(tooltip);
		}

		// Check if the item is a module or a perk
		const isModule = "category" in item;

		// Set tooltip content
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

		// Get all dimensions
		const rect = button.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Calculate position
		let top = rect.bottom + 5, left = rect.left;
		if (left + tooltip.offsetWidth > viewportWidth) left = viewportWidth - tooltip.offsetWidth - 10;
		if (left < 10) left = 10;
		if (top + tooltip.offsetHeight > viewportHeight) top = rect.top - tooltip.offsetHeight - 5;

		// Apply position
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
		const perk = (moduleCatalog[activeCatalog] &&
              moduleCatalog[activeCatalog].perks &&
              moduleCatalog[activeCatalog].perks[button.dataset.tier] || [])
              .find(p => p.name === perkName);

		if (perk) {
			button.addEventListener("mouseenter", () => showTooltip(perk, null, button));
			button.addEventListener("mouseleave", hideTooltip);
		}
	});
}

function updatePerkAvailability(coreName, tier) {
	const modulesInTier = activeCharacter.modules[tier]?.length || 0;

	const perksAvailable = Math.floor(modulesInTier / 3);
	const existingPerks = activeCharacter.perks.filter(p => p.tier === tier
	).length;

	const availablePerks = Math.max(perksAvailable+1 - existingPerks, 0);

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
            const moduleTable = document.createElement("table");
            moduleTable.className = "module-table";

            // Table headers
            const headerRow = document.createElement("tr");
            ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"].forEach(tier => {
                const th = document.createElement("th");
                th.textContent = tier;
                headerRow.appendChild(th);
            });
            moduleTable.appendChild(headerRow);

            // Modules per tier
            const moduleRow = document.createElement("tr");
            for (let tier = 1; tier <= 5; tier++) {
                const tierCell = document.createElement("td");
                tierCell.className = "module-cell";
                const tierModules = activeCharacter.modules["tier" + tier] || [];

                tierModules.forEach(module => {
                    const moduleContainer = document.createElement("div");
                    moduleContainer.className = "module-container";

                    // Module emoji
                    const moduleDiv = document.createElement("div");
                    moduleDiv.className = "module-emote";
                    moduleDiv.textContent = module.emote;

                    // Restriction icon
                    if (module.restrictions.length) {
                        const restrictionIcon = document.createElement("div");
                        restrictionIcon.className = "restriction-icon";
                        restrictionIcon.textContent = "R";
                        moduleDiv.appendChild(restrictionIcon);
                    }

                    // Click to show details
                    moduleDiv.addEventListener("click", () => {
                        document.querySelectorAll(".module-detail-view").forEach(el => el.remove());
                        const detailView = document.createElement("div");
                        detailView.className = "module-detail-view";

                        let detailContent = `${module.emote} <em>(${module.category}, Tier ${tier})</em> - ${module.description}`;
                        if (module.restrictions.length) {
                            detailContent += `<br><strong>Restrictions:</strong> ${module.restrictions.join(", ")}`;
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

                    moduleContainer.appendChild(moduleDiv);
                    tierCell.appendChild(moduleContainer);
                });

                moduleRow.appendChild(tierCell);
            }
            moduleTable.appendChild(moduleRow);
            return moduleTable;
        }, 'modules');
        selfCoreContent.insertBefore(moduleSection, document.getElementById("notesContainer"));
    }

    // ===== PERKS SECTION =====
    if (activeCharacter.perks) {
        const perkSection = createCollapsibleSection("Perks", () => {
            const container = document.createElement("div");

            // Filter out restriction-type perks
            const filteredPerks = activeCharacter.perks.filter(perk => perk.type === "perk");

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

            return container;
        }, 'perks');
        selfCoreContent.insertBefore(perkSection, document.getElementById("notesContainer"));
    }

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

    perks.forEach(perk => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${perk.name}</strong>: ${perk.description}`;
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



// Skill creation/editing form
function createSkillForm(skill = {}, index) {
		let currentSkill = { ...skill }; // Local copy for new skills
		let isNew = index === undefined || index < 0;

		skill = Object.assign({ name: "", restrictions: [], stats: ["mig", "dex"], description: "", modules: [], moduleRestrictions: {} }, skill);

		const form = document.createElement("div");
		form.className = "skill-form";

		// Name input
		const nameInput = document.createElement("input");
		nameInput.type = "text";
		nameInput.placeholder = "Skill Name";
		nameInput.value = skill.name;
		form.appendChild(nameInput);

		// Stat selection (only two selects)
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
				select.value = skill.stats[i] || stats[i]; // Use provided skill stats or default ones
				statContainer.appendChild(select);
				if (i === 0) statContainer.appendChild(document.createTextNode(" + "));
		}
		
		form.appendChild(statContainer);

		// Restriction Handling
		const restrictionContainer = document.createElement("div");
		restrictionContainer.className = "restriction-container";

		const hasMasoquista = activeCharacter.perks?.some(p => p.name === "Masoquista" && p.type === "perk");
		const numRestrictions = hasMasoquista ? 2 : 1;

		const restrictions = [
				{ value: "", text: "No Restriction" },
				{ value: "Doble [+2 ☐ ]", text: "Acción doble [+2 ☐ ]" },
				{ value: "+1 PE [+1 ☐ ]", text: "Consumir Energía - 1 PE [+1 ☐ ]" },
				{ value: "+3 PE [+2 ☐ ]", text: "Consumir Energía - 3 PE [+2 ☐ ]" },
				{ value: "+6 PE [+3 ☐ ]", text: "Consumir Energía - 6 PE [+3 ☐ ]" },
				{ value: "+10 PE [+4 ☐ ]", text: "Consumir Energía - 10 PE [+4 ☐ ]" }
		];

		activeCharacter.perks?.forEach(perk => {
				if (perk.type === "restriction") {
						restrictions.push({ value: perk.name, text: `${perk.name}` });
				}
		});

		activeCharacter.skillRestrictions?.forEach(restriction => {
				if (!restrictions.some(r => r.value === restriction)) {
						restrictions.push({ value: restriction, text: `${restriction} (+1 Module)` });
				}
		});

		const restrictionSelects = [];
		for (let i = 0; i < numRestrictions; i++) {
				const select = document.createElement("select");
				restrictions.forEach(({ value, text }) => {
						const option = document.createElement("option");
						option.value = value;
						option.textContent = text;
						select.appendChild(option);
				});
				select.value = skill.restrictions[i] || "";
				restrictionContainer.appendChild(select);
				restrictionSelects.push(select);
		}
		form.appendChild(restrictionContainer);

		// Module slots container
		const moduleSlots = document.createElement("div");
		moduleSlots.className = "module-slots";

	    let currentModules;

		function updateModuleSlots() {
			moduleSlots.innerHTML = "";
			const newRestrictions = restrictionSelects.map(s => s.value);
			const totalSlots = getTotalSlots({ restrictions: newRestrictions });
			const storedSkill = (index > -1) ? activeCharacter.skills[index] : skill;
			currentModules = [...(storedSkill.modules || [])].slice(0, totalSlots);

			for (let i = 0; i < totalSlots; i++) {
				const moduleSlot = document.createElement("div");
				moduleSlot.className = "module-slot";

				if (currentModules[i]) {
					const moduleName = currentModules[i];
					const module = moduleLibrary.find(m => m.name === moduleName);
					moduleSlot.textContent = module ? module.emote : "?";
					moduleSlot.dataset.module = moduleName;
					moduleSlot.dataset.category = module ? module.category : "";

					// --- MODULE RESTRICTION ICON ---
					const skillElement = moduleSlot.closest(".skill");
					const skillIndex = Array.from(document.querySelectorAll(".skill")).indexOf(skillElement);
					const currentRestriction = storedSkill.moduleRestrictions?.[moduleName];

					const restrictionIcon = document.createElement("div");
					restrictionIcon.className = "restriction-icon";
					restrictionIcon.textContent = "R";
					restrictionIcon.title = currentRestriction || "None";

					if (!currentRestriction) {
						restrictionIcon.style.opacity = 0; // hide if none
						moduleSlot.addEventListener("mouseenter", () => restrictionIcon.style.opacity = 1);
						moduleSlot.addEventListener("mouseleave", () => restrictionIcon.style.opacity = 0);
					}

					restrictionIcon.addEventListener("click", (e) => {
						e.stopPropagation();
						showGenericModuleRestrictions(restrictionIcon, storedSkill, moduleName);
					});

					moduleSlot.appendChild(restrictionIcon);
				} else {
					moduleSlot.textContent = "+";
					moduleSlot.classList.add("empty");
					moduleSlot.dataset.module = "";
				}

				// --- DRAG & CLICK EVENTS ---
				moduleSlot.draggable = true;
				moduleSlot.addEventListener("dragstart", handleDragStart);
				moduleSlot.addEventListener("dragover", handleDragOver);
				moduleSlot.addEventListener("drop", handleDrop);
				moduleSlot.addEventListener("dragend", handleDragEnd);
				moduleSlot.addEventListener("mouseenter", handleModuleHover);
				moduleSlot.addEventListener("mouseleave", handleModuleUnhover);
				moduleSlot.addEventListener("click", e => {
					if (!moduleSlot.classList.contains("dragging")) {
						e.stopPropagation();
						const existingSelectors = document.querySelectorAll('.module-selector');
						existingSelectors.forEach(selector => selector.remove());
						showModuleSelection(moduleSlot, saveSkill, skill, index, currentModules);
					}
				});

				moduleSlots.appendChild(moduleSlot);
			}
		}
		
		updateModuleSlots();
		restrictionSelects.forEach(select => select.addEventListener("change", updateModuleSlots));
		form.appendChild(moduleSlots);

		// Description textarea
		const descriptionInput = document.createElement("textarea");
		descriptionInput.placeholder = "Skill Description";
		descriptionInput.value = skill.description;
		form.appendChild(descriptionInput);

		// Save button
		const saveButton = document.createElement("button");
		saveButton.textContent = "Save";

	function saveSkill(skill, index) {
		const modules = Array.from(moduleSlots.children).map(slot => slot.dataset.module).filter(m => m);
		const restrictions = restrictionSelects.map(s => s.value);

		currentSkill = {
			name: nameInput.value,
			stats: Array.from(statContainer.querySelectorAll("select")).map(s => s.value),
			restrictions,
			description: descriptionInput.value,
			modules,
			cost: calculateSkillCost(modules, restrictions, skill.moduleRestrictions),
			moduleRestrictions: skill.moduleRestrictions
		};

		if (!activeCharacter.skills) activeCharacter.skills = [];
		if (!isNew) {
			activeCharacter.skills[index] = currentSkill;
			saveCharacterData();
			updateSPDisplay();
    	}

	}

	// Update save button click event
	saveButton.addEventListener("click", () => {
		saveSkill(skill, index);
		if (isNew) {
			if (!activeCharacter.skills) activeCharacter.skills = [];
			activeCharacter.skills.push(currentSkill);
			index = activeCharacter.skills.length - 1; // Set index for future edits
			isNew = false;
    	}
		saveCharacterData();
	    updateSPDisplay();
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

// Update module selection to only show learned modules
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
					m.catalogs.some(catalog =>
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

function showGenericModuleRestrictions(icon, skill, moduleName) {
    if (!skill) return;

    // Remove any existing popup for this module
    document.querySelectorAll(`.restriction-popup[data-module="${moduleName}"]`).forEach(p => p.remove());

    if (!skill.moduleRestrictions) skill.moduleRestrictions = {};

    const currentRestriction = skill.moduleRestrictions[moduleName] || null;

    const restrictions = [
        { name: "None", type: "" },
        { name: "+1 PE coste de activación", type: "-1 SP" },
        { name: "Requiere un objeto específico como material", type:"-1 SP" },
        { name: "Solo afecta a objetivos que hayan recibido daño", type:"-1 SP" },
        { name: "El área debe estar centrada en el usuario", type: "-1 SP" },
        { name: "No afecta a objetos inanimados", type: "-1 SP" },
        { name: "Solo afecta a objetos o estructuras inanimadas", type: "-2 SP" },
        { name: "Requiere un componente menor, que es consumido", type:"-2 SP" },
        { name: "Este efecto termina si el objetivo recibe daño de un elemento (escogido durante creación)", type:"-2 SP" },
        { name: "Mientras este módulo está activo, tu apariencia cambia a una obviamente mágica", type:"-2 SP" },
        { name: "El objetivo debe estar afectado por otro módulo especificado en creación", type:"-3 SP" },
        { name: "Solo afecta a un objetivo si te ha hecho daño en esta escena", type:"-3 SP" },
        { name: "Este efecto termina cuando el objetivo recibe daño", type:"-3 SP" }
    ];

    const popup = document.createElement("div");
    popup.className = "restriction-popup";
    popup.dataset.module = moduleName; // track popup per module
    popup.innerHTML = "<strong>Select Restriction:</strong><br>";

    restrictions.forEach(r => {
        const label = document.createElement("label");
        label.className = "restriction-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `restriction-${moduleName}`;
        input.value = r.name;
        input.checked = currentRestriction?.name === r.name;

        input.addEventListener("change", () => {
            if (!skill.moduleRestrictions) skill.moduleRestrictions = {};

            if (r.name.toLowerCase() === "none") {
                delete skill.moduleRestrictions[moduleName];
                icon.title = "";
            } else {
                skill.moduleRestrictions[moduleName] = r;
                icon.title = `${r.name} (${r.type})`;
            }

            const newCost = calculateSkillCost(
                skill.modules || [],
                skill.restrictions || [],
                skill.moduleRestrictions
            );
            skill.cost = newCost;

            saveCharacterData();
        });

        label.appendChild(input);

        const labelText = r.name.toLowerCase() === "none"
            ? "None"
            : `${r.name} (${r.type})`;

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
					skill.restrictions || [],
					skill.moduleRestrictions || {}
				);
				costDiv.textContent = `Cost: ${liveCost} SE`;

				headerDiv.appendChild(nameDiv);

				const statsDiv = document.createElement("div");
				statsDiv.className = "skill-stats";

				const stat1 = skill.stats[0] || "mig";
				const stat2 = skill.stats[1] || "dex";
				const moduleMod = (skill.modules.filter(m => m === "Apuntar").length * 2);
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
				if (!skill.moduleRestrictions) skill.moduleRestrictions = {};

				const totalSlots = getTotalSlots(skill);
				const isEditMode = document.getElementById("skillsList").classList.contains("editing");

				for (let i = 0; i < totalSlots; i++) {
						const moduleSlot = document.createElement("div");
						moduleSlot.className = "module-slot";

						if (skill.modules[i]) {
								const module = moduleLibrary.find(m => m.name === skill.modules[i]);
								moduleSlot.textContent = module ? module.emote : "?";
								moduleSlot.dataset.module = skill.modules[i];
								moduleSlot.dataset.category = module ? module.category : "";
								moduleSlot.title = skill.modules[i];

								const baseRestrictions = getModuleRestrictions(skill.modules[i]);
								const skillRestriction = skill.moduleRestrictions[skill.modules[i]];

								if (baseRestrictions.length > 0 || skillRestriction) {
										const restrictionIcon = document.createElement("div");
										restrictionIcon.className = "restriction-icon";
										restrictionIcon.textContent = "R";
										restrictionIcon.title = `Active: ${skillRestriction || "None"}\nAvailable Restrictions:\n${baseRestrictions.join("\n")}`;
										restrictionIcon.addEventListener("click", (e) => {
												e.stopPropagation();
												showRestrictionPopup(restrictionIcon, skill.modules[i], moduleSlot);
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
}

function handleModuleHover(e) {

	const moduleSlot = e.target;
	const moduleName = moduleSlot.dataset.module;

	if (!moduleName) return;

	// Get the skill-specific restriction if it exists
	const skillElement = moduleSlot.closest(".skill");
	const skillIndex = Array.from(document.querySelectorAll(".skill")).indexOf(skillElement);
	const skillRestriction = activeCharacter.skills[skillIndex]?.moduleRestrictions?.[moduleName];

	// Get base module restrictions
	const module = moduleLibrary.find(m => m.name === moduleName);
	const baseRestrictions = getModuleRestrictions(moduleName);

	// Show tooltip with active restriction
	let restrictionText = "None";
	if (skillRestriction) {
		// If it’s an object, show its fields
		if (typeof skillRestriction === "object") {
			restrictionText = `${skillRestriction.name} (${skillRestriction.type}) (selected)`;
		} else {
			restrictionText = `${skillRestriction} (selected)`;
		}
	} else if (baseRestrictions.length > 0) {
		restrictionText = baseRestrictions.join(", ") + " (available)";
	}

	showTooltip(module, restrictionText, moduleSlot);

	// Highlight for "Rango" category
	if (module.category === "Rango") {
		const allSlots = Array.from(moduleSlot.parentElement.children);
		const currentIndex = allSlots.indexOf(moduleSlot);

		let endIndex = allSlots.findIndex((slot, index) =>
			index > currentIndex &&
			(slot.dataset.category === "Rango" || slot.dataset.category === "Area")
		);

		endIndex = endIndex === -1 ? allSlots.length : endIndex + 1;

		allSlots.slice(currentIndex, endIndex).forEach(slot => {
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
			
function getTotalSlots(skill) {
		let slots = 5; // Base slots

		skill.restrictions.forEach(restriction => {
				switch (restriction) {
						case 'Doble [+2 ☐ ]': slots += 2; break;
						case '+1 PE [+1 ☐ ]': slots += 1; break;
						case '+3 PE [+2 ☐ ]': slots += 2; break;
						case '+6 PE [+3 ☐ ]': slots += 3; break;
						case '+10 PE [+4 ☐ ]': slots += 4; break;
						// Add other restrictions as needed
				}
		});

		// Add perk-based slot bonuses
		skill.restrictions.forEach(restriction => {
				const perk = activeCharacter.perks.find(p => 
						p.name === restriction && p.type === "restriction"
				);
				if (perk) {
						const bonus = parseInt(perk.slots) || 0;
						slots += bonus;
				}
		});

		return slots;
}

// Calculate skill cost
function calculateSkillCost(modules, restrictions = [], moduleRestrictions = {}) {
    let cost = modules.reduce((total, moduleName) => {
        const tierKey = Object.keys(activeCharacter.modules || {}).find(tk =>
            (activeCharacter.modules[tk] || []).some(m => m.name === moduleName)
        );
        const tierNum = tierKey ? parseInt(tierKey.replace("tier", ""), 10) : 1;
        return total + tierNum;
    }, 0);

    // Skill-wide restriction multiplier
    if (restrictions.includes("Ineficiente [+2 ☐ ]")) cost *= 2;

    // Per-module discounts (supports {name,type} objects OR legacy strings)
    modules.forEach(m => {
        const r = moduleRestrictions?.[m];
        if (!r) return;
        const type = (typeof r === "object" && r.type) ? r.type : r; // fallback for strings
        if (typeof type === "string") {
            if (type.includes("-1 SP")) cost -= 1;
            else if (type.includes("-2 SP")) cost -= 2;
            else if (type.includes("-3 SP")) cost -= 3;
        }
    });

    return Math.max(cost, 0);
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

function handleDragOver(e) {
	e.preventDefault();
	const target = e.target;
	if (target.classList.contains('module-slot')) {
		target.classList.add('drop-target');
		e.dataTransfer.dropEffect = 'move';
	}
}

function handleDragEnd(e) {
	const moduleSlot = e.target;
	moduleSlot.classList.remove('dragging');
	draggedModule = null;
	
	// Remove drop-target class from all slots
	Array.from(moduleSlot.parentElement.children).forEach(slot => {
		slot.classList.remove('drop-target');
	});
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

function handleDrop(e) {
	e.preventDefault();
	const target = e.target;
	if (target.classList.contains('module-slot')) {
		target.classList.remove('drop-target');
		
		// Swap module data
		const tempModule = draggedModule.dataset.module;
		const tempCategory = draggedModule.dataset.category;
		
		draggedModule.dataset.module = target.dataset.module;
		draggedModule.dataset.category = target.dataset.category;
		draggedModule.textContent = target.textContent;
		
		target.dataset.module = tempModule;
		target.dataset.category = tempCategory;
		target.textContent = tempModule ? moduleLibrary.find(m => m.name === tempModule).emote || "?" : "+";
		
		// Update empty state
		draggedModule.classList.toggle('empty', !draggedModule.dataset.module);
		target.classList.toggle('empty', !target.dataset.module);
	}
}
		
function selectPerk(perk, coreName, tier) {
	if (perk.type === "restriction") {
		// Add the restriction to the character's available skill restrictions
		if (!activeCharacter.skillRestrictions) {
			activeCharacter.skillRestrictions = [];
		}
		activeCharacter.skillRestrictions.push(perk.name);
	} else {
		// Add the perk to the character's perk list
		if (!activeCharacter.perks) {
			activeCharacter.perks = [];
		}
		activeCharacter.perks.push({
			...perk,
			catalog: coreName,
			tier: tier
		});
	}
	saveCharacterData();
	updatePerkAvailability(coreName, tier);
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

function showRestrictionPopup(icon, moduleName, moduleSlot) {
		var restrictions = getModuleRestrictions(moduleName);
		if (restrictions.length < 2) return;

		// Find the skill index from the closest skill element
		var skillElement = moduleSlot.closest(".skill");
		var skillIndex = Array.from(document.querySelectorAll(".skill")).indexOf(skillElement);

		var popup = document.createElement("div");
		popup.className = "restriction-popup";
		popup.innerHTML = "<strong>Select Restriction:</strong>";

		restrictions.forEach(function (restriction, index) {
				var wrapper = document.createElement("div");
				wrapper.className = "restriction-option";

				var input = document.createElement("input");
				input.type = "radio";
				input.name = "restriction-" + moduleName + "-" + skillIndex;
				input.id = "restrict-" + moduleName + "-" + skillIndex + "-" + index;
				input.value = restriction;

				// Check if this restriction is the currently selected one
				var currentRestriction = activeCharacter.skills[skillIndex].moduleRestrictions?.[moduleName];
				input.checked = currentRestriction === restriction;

				input.addEventListener("change", function () {
						if (!activeCharacter.skills[skillIndex].moduleRestrictions) {
								activeCharacter.skills[skillIndex].moduleRestrictions = {};
						}
						activeCharacter.skills[skillIndex].moduleRestrictions[moduleName] = restriction;

						// Update the icon tooltip immediately
						icon.title = "Restriction: " + restriction;

						// Update the module's stored restrictions
						var module = activeCharacter.modules[moduleSlot.dataset.tier]?.find(function (m) {
								return m.name === moduleName && m.catalogs.includes(activeCatalog);
						});

						if (module) {
								module.activeRestriction = restriction;
						}

						saveCharacterData();
						renderSkills();
				});

				var label = document.createElement("label");
				label.htmlFor = input.id;
				label.textContent = restriction;

				wrapper.appendChild(input);
				wrapper.appendChild(label);
				popup.appendChild(wrapper);
		});

		document.body.appendChild(popup);

		// Get dimensions and position with boundary checks
		var rect = icon.getBoundingClientRect();
		var popupWidth = popup.offsetWidth;
		var popupHeight = popup.offsetHeight;
		
		var top = rect.bottom + window.scrollY;
		var left = rect.left + window.scrollX;

		// Adjust positioning to prevent overflow
		if (left + popupWidth > window.innerWidth) {
				left = window.innerWidth - popupWidth - 10;
		}
		if (top + popupHeight > window.innerHeight) {
				top = rect.top - popupHeight - 10;
		}

		popup.style.position = "absolute";
		popup.style.top = top + "px";
		popup.style.left = left + "px";
		popup.style.zIndex = "1000";

		// Close popup on outside click
		var clickHandler = function (e) {
				if (!popup.contains(e.target)) {
						popup.remove();
						document.removeEventListener("click", clickHandler);
				}
		};
		document.addEventListener("click", clickHandler);
}









//Summary
function renderSummary() {
  if (!activeCharacter) return;
	
	// Stats
	const currentHpInput = document.getElementById("currentHp");
    const currentEpInput = document.getElementById("currentEp");

	const recalculated = calculateSecondaryStats(
    activeCharacter.stats,
    activeCharacter.secondaryStats,
    activeCharacter.permanentBonuses || {}
	);

	const maxHp = recalculated.hp.value+recalculated.hp.temp;
	const maxEp = recalculated.ep.value+recalculated.ep.temp;

    let currentHp = parseInt(currentHpInput.value) ||18 ;
    let currentEp = parseInt(currentEpInput.value)|| 6;


    // Calculate percentage
    const hpPercent = maxHp ? (currentHp / maxHp) * 100 : 0;
    const epPercent = maxEp ? (currentEp / maxEp) * 100 : 0;

    // Update bar widths
    const hpBar = document.querySelector(".summary-hp .bar-fill");
    const epBar = document.querySelector(".summary-ep .bar-fill");

    if (hpBar) hpBar.style.width = hpPercent + "%";
    if (epBar) epBar.style.width = epPercent + "%";

	// Update Summary of Perks


	//Update Summary of Skills
	renderSkillsSummary();
	renderPerksSummary();
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

        // Header container: name + restrictions
        const headerDiv = document.createElement("div");
        headerDiv.className = "skill-header";

        // Name
        const nameDiv = document.createElement("div");
        nameDiv.className = "skill-name";
        nameDiv.textContent = skill.name;

        headerDiv.appendChild(nameDiv);

        // Restrictions
        if (skill.restrictions && skill.restrictions.length > 0) {
            const restrictionDiv = document.createElement("div");
            restrictionDiv.className = "skill-restriction";
            restrictionDiv.textContent = `${skill.restrictions.join(", ")}`;
            restrictionDiv.style.marginLeft = "10px";
            headerDiv.appendChild(restrictionDiv);
        }

        // Stats
        const statsDiv = document.createElement("div");
        statsDiv.className = "skill-stats";
        const stat1 = skill.stats[0] || "mig";
        const stat2 = skill.stats[1] || "dex";
        const moduleMod = (skill.modules.filter(m => m === "Apuntar").length * 2);
        const baseAtk = (activeCharacter.secondaryStats.atk.value || 0) + (activeCharacter.secondaryStats.atk.temp || 0);
        const totalATK = baseAtk + moduleMod;
        statsDiv.textContent = `${stat1.toUpperCase()} (d${activeCharacter.stats[stat1].dice}) + ` +
                               `${stat2.toUpperCase()} (d${activeCharacter.stats[stat2].dice}) + ${totalATK}`;

        // Modules
        const modulesDiv = document.createElement("div");
        modulesDiv.className = "skill-modules";
        skill.modules.forEach(m => {
            const module = moduleLibrary.find(mod => mod.name === m);
            const span = document.createElement("span");
            span.className = "module-slot";
            span.textContent = module ? module.emote : "?";
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
        const archetypeDiv = document.createElement("div");
        archetypeDiv.className = "archetype";

        const archetypeTitle = document.createElement("strong");
        archetypeTitle.textContent = catalog.charAt(0).toUpperCase() + catalog.slice(1);
        archetypeDiv.appendChild(archetypeTitle);

        const perkListDiv = document.createElement("div");
        perkListDiv.className = "perk-list";

        // Filter perks for this catalog and exclude restrictions
        const filteredPerks = activeCharacter.perks
            .filter(p => (p.catalog || "Origen") === catalog && p.type !== "restriction");

        filteredPerks.forEach(perk => {
            const label = document.createElement("label");
            label.textContent = perk.name;
            perkListDiv.appendChild(label);
        });

        archetypeDiv.appendChild(perkListDiv);
        summaryPerks.appendChild(archetypeDiv);
    });
}



function setupCharacterImage() {
    const charImageButton = document.getElementById("charImageButton");
    const charImageInput = document.getElementById("charImageInput");
    const charImageDisplay = document.getElementById("charImageDisplay");

    if (!charImageButton || !charImageInput || !charImageDisplay) return;

    const updateImageDisplay = () => {
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

