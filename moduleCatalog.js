import moduleLibrary from './moduleLibrary.js';

const moduleCatalog = {
	architect: {
		tier1: [],
		tier2: [],
		tier3: [],
		perks: {
			tier1: [
				{ name: "Acceso al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Culto al orbe.", 
				 type: "perk" 
				},
				{ name: "Laboratorio Portatil", 
				 description: "Siempre que tengas acceso a tus herramientas de trabajo, puedes usar una acción para que tu o un aliado pueda utilizar uno de los siguientes efectos: <br> - Modifica una de sus skills con tus SP disponibles. <br> - Compra 1 modulo con tus CE disponibles. <br> - Escoge 1 Perk de un catalogo y tier disponible. <br> Solo puedes usar esta acción una vez y recuperas el uso tras una escena de descanso.", 
				 type: "perk" 
				},
				{ name: "Call of the Hive [+1 ☐ ]", 
				 description: "El objetivo debe tener al menos 1 perk.", 
				 type: "restriction",slots:"+1" 
				},
				{ name: "Area Instantanea [+1 ☐ ]", 
				 description: "Una skill con esta restricción debe tener un rango de tipo área. No creas un Área de Efecto al usar esta skill.", 
				 type: "restriction", slots:"+1"
				},
				{ name: "Maestria 1", 
				 description: "Ganas maestría en un módulo Tier 1.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Acceso al Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Culto al orbe.", 
				 type: "perk" 
				},
				{ name: "Mathemagics", 
				 description: "Al crear skills, o al improvisar con rangos de tipo área, puedes diseñar la forma del área a gusto. La nueva forma debe mantener siempre el mismo número de casillas que el área original, y ninguna casilla puede alejarse a más de 4 casillas del área original.", 
				 type: "perk" 
				},
				{ name: "Lucky",
					description: "Una vez por escena, puedes hacer reroll a una de tus tiradas de dado de stat. No puedes activar este perk como reacción a una pifia.",
					type: "perk",
				},				
				{ name: "Ineficiente [+2 ☐ ]",
					description: "Una skill con esta restricción cuesta el doble de SE al comprarla.",
					type: "restriction", slots:"+2"
				},
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 3 del Culto al Orbe.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Acceso al Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Culto al orbe.", 
				 type: "perk" 
				},
				{ name: "Absolute Territory", 
				 description: "Cuando creas un área de efecto utilizando una de tus skills sin improvisar, puedes aplicar automáticamente los efectos del área cada vez que una criatura inicia su turno dentro o entra en el área, sin necesidad de hacer una tirada de ataque. Al aplicar los efectos de esta forma, tu HR siempre se considera un 5.", 
				 type: "perk" 
				},
				{ name: "Masoquista",
					description: "Al crear una skill, puedes añadirle hasta 2 restricciones de skill, en vez de solo 1.",
					type: "perk",
				},				
				{ name: "Placeholder [+1 ☐ ]",
					description: ".",
					type: "restriction", slots:"+2"
				},
				{ name: "Maestria 3", 
				 description: "Ganas maestría en un módulo Tier 3 del Culto al Orbe.", 
				 type: "perk" 
				},
			],
		},
		statUpgrades: {
			tier1: [
				{ 
					name: "HP +1", 
					description: "Permanent +1 to Max HP"
				},
				{ 
					name: "HP +2", 
					description: "Permanent +2 to Max HP"
				},
				{ 
							name: "EP +1", 
							description: "Permanent +1 to Max Energy Points"
						},
						{
							name: "HP +2", 
							description: "Permanent +2 to Max HP"
						},
						{ 
							name: "EP +1", 
							description: "Permanent +1 to Max Energy Points"
				}
			],
			tier2: [
				{ 
					name: "HP +3", 
					description: "Permanent +3 to Max HP"
				},
				{ 
					name: "EP +1", 
					description: "Permanent +1 to Max Energy Points"
				},
				{ 
							name: "DM +1", 
							description: "Permanent +1 to Magic Defense"
						},
						{
							name: "HP +5", 
							description: "Permanent +5 to Max HP"
						},
						{ 
							name: "EP +2", 
							description: "Permanent +2 to Max Energy Points"
				}
			],
			tier3: [
				{ 
					name: "HP +4", 
					description: "Permanent +4 to Max HP"
				},
				{
							name: "IMPR +1", 
							description: "Permanent +2 to Max HP (Total +5)"
						},
				
				{ 
							name: "Stat Up!", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
						},
				{ 
					name: "EP +1", 
					description: "Permanent +1 to Max Energy Points"
				},
						{ 
							name: "HP +5", 
							description: "Permanent +5 to the amount of Jobs you can learn."
				}
			],
			},
	},
	paladin: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ 
					name: "HP +1", 
					description: "Permanent +1 to Max HP"
				},
				{ 
					name: "HP +2", 
					description: "Permanent +2 to Max HP"
				},
				{ 
							name: "EP +1", 
							description: "Permanent +1 to Max Energy Points"
						},
						{
							name: "HP +3", 
							description: "Permanent +3 to Max HP"
						},
						{ 
							name: "Job +1", 
							description: "Permanent +1 to the amount of jobs you can learn"
				}
			],
			tier2: [
				{ 
					name: "HP +3", 
					description: "Permanent +3 to Max HP"
				},
				{ 
					name: "HP +5", 
					description: "Permanent +5 to Max HP"
				},
				{ 
							name: "DF +1", 
							description: "Permanent +1 to Defense"
						},
						{
							name: "EP+1 ", 
							description: "Permanent +1 to Max Energy Points"
						},
						{ 
							name: "Oficio +1", 
							description: "Permanent +1 to the amount of jobs you can have"
				}
			],
			tier3: [
				{ 
					name: "HP +4", 
					description: "Permanent +4 to Max HP"
				},
				{ 
					name: "EP +1", 
					description: "Permanent +1 to Max Energy Points"
				},				
				{ 
							name: "Stat Up!", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
						},
				{
							name: "HP +4", 
							description: "Permanent +4 to Max HP"
						},
						{ 
							name: "DF +1", 
							description: "Permanent +1 to your Defense."
				}
			],			
		},
		perks: {
			tier1: [
				{ name: "Paladín Oscuro al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Paladín oscuro.", 
				 type: "perk" 
				},
				{ name: "Transformación", 
				 description: "Tienes 1 espacio de módulo específico para transformación, puedes colocar cualquier módulo de tu self core en estos espacios. Al activar una transformación con 🐺, todos los módulos de este perk son activados sobre ti como si fueran los efectos de una skill pasiva. Cuando 🐺 termina, tambien lo hacen todos los modulos activados por esta perk.", 
				type:"perk"
				},
				{ name: "Umbra Vadium [+1 ☐ ]", 
				 description: "Solo puedes usar esta skill mientras estas en oscuridad parcial o total.", 
				 type: "restriction", slots: "+1"
				},				
				{ name: "Caveat Emptor [+1 ☐ ]", 
				 description: "Debes explicar de forma audible y dramática los efectos de esta skill antes de activarla.", 
				 type: "restriction", slots: "+1"
				},
				{ name: "Habes Corpus [+1 ☐ ]", 
				 description: "Solo puedes usar esta skill mientras estás bajo el efecto del módulo 🐺.", 
				 type: "restriction", slots: "+1"
				},								
			],
			tier2: [
				{ name: "Paladín Oscuro Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Paladín oscuro.", 
				 type: "perk" 
				},
				{ name: "Bendición De Luna", 
				 description: `Debes tener el Perk de "Transformación" para poder ganar este perk. Añade +1 espacio de módulo maximo a los espacios otorgados por el perk de Transformación.`, 
				 type: "perk" 
				},
				{ name: "La Arbitración de Luna", 
				 description: "Mientras seas afectado por 🐺, puedes incrementar en 1 tamaño una de tus stats, al hacerlo, reduce en 1 tamaño una stat distinta. Estos efectos no pueden ser resistidos", 
				 type: "perk" 
				},
				{ name: "Corpus Amittere [+2 ☐ ]", 
				 description: "Sólo puedes usar esta skill mientras estés bajo el efecto de 🐺. 🐺 termina tras utilizar esta skill.", 
				 type: "restriction", slots: "+2"
				},				
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 2.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Paladín oscuro Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de la Corte De Luna.", 
				 type: "perk" 
				},
				{ name: "Bendición De Luna 2", 
				 description: `Debes tener el Perk de "Transformación" para poder ganar este perk. Añade +1 espacio de módulo maximo a los espacios otorgados por el perk de Transformación.`, 
				 type: "perk" 
				},
				{ name: "Upyr", 
				 description: "Escoge 1 elemento entre Oscuridad, Hielo, y Tierra. Mientras seas afectado por 🐺 ganas resistencia al daño físico y al daño del elemento escogido, pero también te vuelves vulnerable a un elemento entre Fuego, Luz, y Curación. Ambos elementos deben ser elegidos al escoger este perk,", 
				 type: "perk" 
				},
				{ name: "Legem Terrae [+3 ☐ ]", 
				 description: "Si esta skill es utilizada en cualquier momento de forma que Rompa las leyes locales, pierdes permanentemente esta skill y el SE gastado en ella.", 
				 type: "restriction", slots: "+3"
				},				
				{ name: "Maestria 3", 
				 description: "Ganas maestría en un módulo Tier 3 de la Corte De Luna.", 
				 type: "perk" 
				},
			],
		},
	},	
	repartidor: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ 
					name: "HP +1", 
					description: "Permanent +1 to Max HP"
				},
				{ 
					name: "HP +1", 
					description: "Permanent +1 to Max HP"
				},
				{ 
							name: "HP +2", 
							description: "Permanent +2 to Max HP"
						},
						{
							name: "MOV +1", 
							description: "Permanent +1 to MOV"
						},
						{ 
							name: "PE +1", 
							description: "Permanent +1 to Max PE"
				}
			],
			tier2: [
				{ 
					name: "HP +2", 
					description: "Permanent +2 to Max HP"
				},
				{ 
					name: "HP +3", 
					description: "Permanent +3 to Max HP"
				},
				{ 
							name: "MOV +1", 
							description: "Permanent +1 to MOV"
						},
						{
							name: "HP+3 ", 
							description: "Permanent +3 to Max HP"
				},
						{ 
							name: "EP +1", 
							description: "Permanent +1 to the amount of jobs you can have"
				},
			],
			tier3: [
				{
					name:"HP +3",
					description:"No one is going to read this"
				},
				{
					name:"EP +1",
					description:"No one is going to read this"
				},
				{ 
							name: "Stat Up!", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{ 
							name: "MOV +1", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{ 
							name: "EP +2", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
			],	
		},
		perks: {
			tier1: [
				{ name: "Repartidor Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Repartidor.", 
				 type: "perk" 
				},
				{ name: "Nimble", 
				 description: "Al utilizar una accion de movimiento, puedes moverte atravez de espacios ocupados por otras criaturas. Este tipo de movimiento te cuesta el doble de lo normal. No puedes acabar el turno en la misma casilla que otra criatura.", 
				 type: "perk" 
				},
				{ name: "Endeble [+1 ☐ ]", 
				 description: "Cuando una criatura utiliza la acción resistencia para terminar uno de los efectos aplicados por esta skill, la resistencia acierta automáticamente.", 
				 type: "restriction", slots: "+1", 
				},
				{ name: "Over-encumbered [+1 ☐ ]", 
				 description: "Reduce tu MOV a la mitad hasta el final de tu siguiente turno.", 
				 type: "restriction", slots: "+1"
				},				
				{ name: "Quick Action [-2 ☐ ]", 
				 description: "Cuando consumes una accion para utilizar una acción de movimiento, puedes usar este ataque como parte de la misma acción.", 
				 type: "restriction", slots: "-2"
				},
			],
			tier2: [
				{ name: "Repartidor Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Repartidor.", 
				 type: "perk" 
				},
				{ name: "Disengage", 
				 description: "Al iniciar tu turno dentro de un área de efecto, puedes usar una acción de movimiento antes de que el dueño del area haga el ataque.", 
				 type: "perk" 
				},
				{ name: "Need a breather [+2 ☐ ]", 
				 description: "No puedes usar la accion de MOV hasta el inicio de tu siguiente turno.", 
				 type: "restriction", slots: "+2",
				},
				{ name: "Need to Rush [+2 ☐ ]", 
				 description: "Sólo puedes usar esta acción tras gastar todo tu MOV avanzando en línea recta en el turno.", 
				 type: "restriction", slots: "+2"
				},
				{ name: "Pinball", 
				 description: "Cuando un objetivo es empujado por una de tus skills, este se convierte en un proyectil. Si dicho proyectil impacta contra otro objetivo, tanto el proyectil como el nuevo objetivo reciben daño Físico igual al LR de la tirada de ataque.", 
				 type: "perk",
				},				
			],
			tier3: [
				{ name: "Repartidor Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Repartidor.", 
				 type: "perk" 
				},
				{ name: "Dart", 
				 description: "Cuando un objetivo es empujado por una de tus skills, este se convierte en un proyectil. En un impacto, Aplica cualquier efecto activo sobre el objetivo en impacto.", 
				 type: "perk" 
				},
				{ name: "Vehiculo Personal", 
				 description: "Al utilizar el módulo de 🧚, puedes invocar a el familiar en forma de un vehículo personal. El vehículo tiene 1 asiento de conductor y 1 de pasajero, y puede ser abordado o desembarcado con una interacción con objetos. Todas las criaturas a bordo se desplazan al mismo tiempo cuando el vehículo o el conductor utiliza una acción de movimiento. En su turno, el conductor puede utilizar su acción de movimiento, para desplazarse un número de casillas igual a su MOV+el MOV del vehículo, al hacerlo el MOV del vehículo es reducido a 0 hasta el final de su siguiente turno.", 
				 type: "perk" 
				},
				{ name: "Supersonic", 
				 description: "Durante tu turno, puedes usar una acción para consumir una cantidad de EP a tu elección por cada punto de EP consumido, aumenta tu MOV en +3 hasta el final de tu siguiente ronda.", 
				 type: "Perk",
				},
			],
		},
	},	
	sacrificio: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ 
					name: "HP +2", 
					description: "Permanent +2 to Max HP"
				},
				{ 
					name: "HP +2", 
					description: "Permanent +1 to Max HP"
				},
				{ 
							name: "HP +3", 
							description: "Permanent +2 to Max HP"
						},
						{
							name: "EP +1", 
							description: "Permanent +1 to MOV"
						},
						{ 
							name: "HP +4", 
							description: "Permanent +1 to Max PE"
				}
			],
			tier2: [
				{ 
					name: "HP +2", 
					description: "Permanent +2 to Max HP"
				},
				{ 
					name: "HP +3", 
					description: "Permanent +3 to Max HP"
				},
				{ 
							name: "EP +1", 
							description: "Permanent +1 to MOV"
						},
						{
							name: "HP +3", 
							description: "Permanent +3 to Max HP"
				},
						{ 
							name: "EP +1", 
							description: "Permanent +1 to the amount of jobs you can have"
				},
			],
			tier3: [
				{
					name:"HP +5",
					description:"No one is going to read this"
				},
				{
					name:"EP +1",
					description:"No one is going to read this"
				},
				{ 
							name: "Stat Up!", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{ 
							name: "MOV +1", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{ 
							name: "EP +2", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
			],	
		},
		perks: {
			tier1: [
				{ name: "Sacrificio Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Sacrificio.", 
				 type: "perk" 
				},
				{ name: "Karma", 
				 description: "Cuando aplicas 🪧 sobre una criatura a la que hayas curado o te haya hecho daño como resultado de una tirada de ataque, puedes convertir 🪧 en una “Marca”, la Marca es de duración permanente y no puede ser resistida.", 
				 type:"perk" },
				{ name: "Payback [+1 ☐ ]", 
				 description: "El objetvio debe tener tu Karma Sign", 
				 type: "restriction", slots: "+1",
				},
				{ name: "Life Lane [+1 ☐ ]", 
				 description: "Recibes daño igual al LR, este daño no puede ser bloqueado", 
				 type: "restriction", slots: "+1",
				},
				{ name: "Blood Donation", 
				 description: "Puedes usar una acción para reducir tu HP máximo una cantidad a tu elección (a un máximo de 2x tu MIG máximo). Al hacerlo, escoge a un aliado en escena distinto a ti para recibir el siguiente beneficio:<br> - El objetivo es curado 3 HP por cada 1 HP sacrificado <br> - El objetivo recupera 1 EP por cada 5 HP sacrificados <br>Recuperas 1 MIG de la HP Máxima sacrificada en una escena de descanso.",
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Sacrificio Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Sacrificio.", 
				 type: "perk" 
				},
				{ name: "Blood Boost", 
				 description: "Añade las siguientes opciones a los beneficios del Perk (Blood Donation).<br> - El objetivo aumenta el tamaño de 1 de sus stats por cada 4 HP sacrificados <br> - El objetivo resiste automáticamente  1 módulo  que le esté  afectando por cada 3 HP sacrificados", 
				 type: "perk" 
				},
				{ name: "Battle Medic", 
				 description: "Puedes sumar tu DMG a los HP que cures usando acciones.", 
				 type: "perk" 
				},
				{ name: "Embers to Ashes [+2 ☐ ]", 
				 description: "Por cada objetivo que sea afectado por esta skill, 1 casilla de fuego en escena es consumida. Si no hay suficientes fuentes de fuego en escena para pagar por un objetivo, esta skill no tiene efecto sobre dicho objetivo.", 
				 type: "restriction", slots: "+2",
				},
				{ name: "With Interest [+2 ☐ ]", 
				 description: "El objetivo debe tener tu Karma Sign, la cual desaparece tras ser afectado por esta skill.", 
				 type: "restriction", slots: "+2",
				},
			],
			tier3: [
				{ name: "Sacrificio Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Sacrificio.", 
				 type: "perk" 
				},
				{ name: "Blood Drive", 
				 description: "Utilizar la acción del Perk Blood Donation para sacrificar HP Máximos, puedes escoger más de una de las opciones para repartir tu HP entre ellas.", 
				 type: "perk" 
				},
				{ name: "Bloody Blade", 
				 description: "Como acción gratuita al inicio de tu turno de cada uno de tus turnos puedes lanzar tu MIG para recibir daño igual al resultadoComo acción gratuita al inicio de tu turno de cada uno de tus turnos puedes lanzar tu MIG para recibir daño igual al resultado. Hasta el final de tu turno, aumenta tu DMG igual al daño recibido por este Perk.", 
				 type: "perk" 
				},
				{ name: "Maestria 3", 
				 description: "Ganas maestría en un módulo Tier 3.", 
				 type: "perk" 
				},
			],

		},
	},
	bruja: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ 
				name: "HP +2", 
				},
				{ 
				name: "EP +1", 
				},
				{ 
							name: "DMG +1", 
						},
						{
							name: "HP +3", 
						},
						{ 
							name: "EP +1", 
				}
			],
			tier2: [
				{ 
				name: "HP +5", 
				},
				{ 
				name: "ATK +1", 
				},
				{ 
							name: "EP +2", 
						},
						{
							name: "EQUIP +1 ", 
						},
						{ 
							name: "IMPR +1", 
				}
			],
			tier3: [
				{ 
				name: "EP +1", 
				},
				{ 
				name: "DMG +2", 
				},				
				{ 
							name: "Stat Up!", 
						},
				{
				name: "HP +7", 
						},
						{ 
							name: "EP +2", 
				}
			],			
		},
		perks: {
			tier1: [
				{ name: "Bruja Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Bruja.", 
				 type: "perk" 
				},
				{ name: "Tools of Trade", 
				 description: "Si otra criatura tiene equipado algún objeto imbuido con una de tus skills, este puede activarla como si fuera su propia skill.", 
				 type: "perk" 
				},
				{ name: "Tool Juggling", 
				 description: "Puedes guardar uno de tus objetos equipados y equiparte un nuevo objeto como parte de la misma interacción con objeto.", 
				 type: "perk" 
				},
				{ name: "Tools Required! [+1 ☐ ]", 
				 description: "Esta skill queda asociada a un tipo objeto, equipamiento, o material a tu elección (definido durante creación), y no puede ser activada sin tener el objeto escogido equipado.", 
				 type: "restriction", slots: "+1"
				},

			],
			tier2: [
				{ name: "Bruja Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Bruja.", 
				 type: "perk" 
				},
				{ name: "Not Built For This", 
				 description: "Al activar una skill con requerimientos, puedes ignorar 1 de los requerimientos y activar su efecto igualmente. Al utilizar este perk, te vuelves incapaz de volver a activar la skill escogida hasta el final de la escena.", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: ".", 
				 type: "perk" 
				},
				{ name: "Infusion [+2 ☐ ]", 
				 description: "Esta skill queda asociada a un objeto a tu elección, y no puede ser activada sin tener el objeto equipado.", 
				 type: "restriction", slots: "+2"
				},				
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 2 de Wiccrat's Curse.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Bruja Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Bruja.", 
				 type: "perk" 
				},
				{ name: "Deconstruct", 
				 description: "Durante una escena de laboratorio, puedes modificar libremente tus skills aprendidas, añadiendo módulos nuevos (al coste regular), moviendo los módulos actuales de sitio (a ningún coste), o hasta borrando módulos existentes, pero no puedes cambiar las restricciones de skill.", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: ".", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: "..", 
				 type: "restriction", slots: "+2"
				},

			],
		},
	},
	invocador: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ 
					name: "HP +2", 
					description: "Permanent +1 to Max HP"
				},
				{ 
					name: "HP +2", 
					description: "Permanent +2 to Max HP"
				},
				{ 
							name: "EP +1", 
							description: "Permanent +1 to Max Energy Points"
						},
						{
							name: "HP +3", 
							description: "Permanent +3 to Max HP"
						},
						{ 
							name: "Job +1", 
							description: "Permanent +1 to the amount of jobs you can learn"
				}
			],
			tier2: [
				{ 
					name: "HP +3", 
					description: "Permanent +3 to Max HP"
				},
				{ 
					name: "HP +5", 
					description: "Permanent +5 to Max HP"
				},
				{ 
							name: "DF +1", 
							description: "Permanent +1 to Defense"
						},
						{
							name: "EP+1 ", 
							description: "Permanent +1 to Max Energy Points"
						},
						{ 
							name: "Oficio +1", 
							description: "Permanent +1 to the amount of jobs you can have"
				}
			],
			tier3: [
				{ 
					name: "HP +4", 
					description: "Permanent +4 to Max HP"
				},
				{ 
					name: "EP +1", 
					description: "Permanent +1 to Max Energy Points"
				},				
				{ 
							name: "Stat Up!", 
							description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
						},
				{
							name: "HP +4", 
							description: "Permanent +4 to Max HP"
						},
						{ 
							name: "DF +1", 
							description: "Permanent +1 to your Defense."
				}
			],			
		},
		perks: {
			tier1: [
				{ name: "Invocador Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de invocador.", 
				 type: "perk" 
				},
				{ name: "Beneficios Materiales", 
				 description: "Cuando usas una skill con un rango de invocación, puedes seleccionar un objeto que tengas equipado y convertirlo en un Objeto Animado. Los Objetos Animados actúan como las invocaciones, pero tienen +10 hp adicional, y además pueden utilizar cualquier skill imbuida en el objeto utilizado siempre y cuando	no requiera PE. Si los HP de la invocacion son reducidos a 0, el objeto utilizado por esta skill es destruido.", 
				 type: "perk" 
				},
				{ name: "On Call Workforce", 
				 description: "Si tienes una o más invocaciones en escena, puedes usar una acción para activar este perk y retirar prematuramente una de ellas. Mientras esté guardada de esta forma, la invocación ignora los límites de tiempo y deja de recibir daño. En cualquier momento, puedes gastar una acción para traerla de vuelta sin necesidad de pagar nuevamente sus requerimientos.", 
				 type: "perk", 
				},				
				{ name: "Contractual Obligations [+1 ☐ ]", 
				 description: "Si no puedes pagar uno de los costes o cumplir uno de los requerimientos de modulos en esta skill, entonces no puedes usar esta skill en absoluto.", 
				 type: "restriction", slots: "+1"
				},				
				{ name: "Maestria 1", 
				 description: "Ganas maestría en un módulo Tier 1.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Invocador Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Invocador.", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: ".", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: ".", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: "..", 
				 type: "restriction", slots: "+2"
				},				
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 2 de Umbra Employment Agency.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Invocador Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Invocador.", 
				 type: "perk" 
				},
				{ name: "Worker's Wrongs [+3 ☐ ]", 
				 description: "Este modulo debe incluir una invocacion. Cada vez que una criatura invocada por esta skill es reducida a 0 HP, debes pagar -1 PE. No puedes usar una skill con esta restriccion si tienes 0 PE restante.", 
				 type: "restriction", slots: "+2"
				},				
				{ name: "Maestria 3", 
				 description: "Ganas maestría en un módulo Tier 3 de Umbra Employment Agency.", 
				 type: "perk" 
				},
			],
		},
	},
	evocador: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ name: "HP +2"},
				{ name: "DMG +1"},
				{ name: "HP +2"},
				{ name: "EP +1"},
				{ name: "IMPR +1"}
			],
			tier2: [
				{ name: "HP +4"},
				{ name: "ATK +1"},
				{ name: "IMPR +1"},
				{ name: "DMG +1"},
				{ name: "EP +2"}],
			tier3: [
				{ name: "HP +6"},
				{ name: "EP +1"},
				{ name: "STAT UP!", description: "Aumenta un dado de Stat en un tamaño." },
				{ name: "EP +1"},
				{ name: "DMG +2"},

			]
		},
		perks: {
			tier1: [
				{ name: "Evocador Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Evocador.", 
				 type: "perk" 
				},
				{ name: "Gimmick", type: "perk", description: "Consigues una gimmick de 1 espacio. <br> Al conseguir esta perk, escoge 1 módulo de efecto y una restricción de tu self core para equipar a la gimmick. Durante las escenas de laboratorio puedes cambiar la restricción o el módulo de tus gimmicks pagando 5 SP por cada cambio realizado. <br> Al utilizar una skill, si pagas el precio de la restricción o cumples con sus requisitos puedes activar una gimmick para aplicar sus módulos de efecto a uno de los rangos de la skill. Tras activar una gimmick de esta forma, no puedes volver a utilizarla hasta el inicio de tu siguiente turno." },
			],
			tier2: [
				{ name: "Evocador Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Evocador.", 
				 type: "perk" 
				},
				{name:"Gimmick Set", type: "perk", description: "Puedes equipar un módulo de efecto adicional a tus gimmicks con restricciones de +2 ☐ o más espacios."}
			],
			tier3: [
				{ name: "Evocador Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Evocador.", 
				 type: "perk" 
				},
				{name:"Gimmick Draw", type: "perk", description: "Ganas una gimmick adicional. <br> Al conseguir esta perk, escoge 1 módulo de efecto y una restricción de tu self core para equipar a la gimmick. Los módulos de efecto de esta gimmick deben ser distintos a los de tus otras gimmicks. <br> Solo puedes activar 1 gimmick por acción."}
			]
		},
	},
	alquimista: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ name: "HP +2", 
					description: "Permanent +1 to Max HP"
				},
				{ name: "ATK +1", 
					description: "Permanent +2 to Max HP"
				},
				{ name: "EP +1", 
					description: "Permanent +1 to Max Energy Points"
				},
				{
				name: "HP +3", 
					description: "Permanent +3 to Max HP"
				},
				{ 
				name: "Job +1", 
					description: "Permanent +1 to the amount of jobs you can learn"
				}
			],
			tier2: [
				{ 
					name: "HP +3", 
					description: "Permanent +3 to Max HP"
				},
				{ 
					name: "EP +1", 
				},
				{ 
					name: "DM +1", 
					description: "Permanent +1 to Magical Defense"
				},
				{
					name: "ATK +1 ", 
				},
				{ 
					name: "Oficio +1", 
					description: "Permanent +1 to the amount of jobs you can have"
				}
			],
			tier3: [
				{ 
					name: "HP +4", 
					description: "Permanent +4 to Max HP"
				},
				{ 
					name: "EP +1", 
					description: "Permanent +1 to Max Energy Points"
				},				
				{ 
					name: "Stat Up!", 
					description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{
					name: "HP +4", 
					description: "Permanent +4 to Max HP"
				},
				{ 
					name: "ATK +2"
				}
			],			
		},
		perks: {
			tier1: [
				{ name: "Alquimista Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks deAlquimista.", 
				 type: "perk" 
				},
				{ name: "Fabricate", 
				 description: "Durante las escenas de descanso, puedes crear hasta 3 cantidad de objetos consumibles como lo harias en una escena de laboratorio", 
				 type: "perk", 
				},				
				{ name: "Handy", 
				 description: `Al utilizar tus skils, puedes sustituir cualquier restricción de tus módulos por "consume un material de tu inventario que incluya este modulo.`, 
				 type: "perk" 
				},
				{ name: "Formulaic [+1 ☐ ]", 
				 description: "No puedes improvisar con esta skill.", 
				 type: "restriction", slots: "+1"
				},
				{ name: "Fragile [+1 ☐ ]", 
				 description: "Si fallas una tirada de ataque con esta skill, recibes LR de daño.", 
				 type: "restriction", slots: "+1"
				},


			],
			tier2: [
				{ name: "Alquimista Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Alquimista.", 
				 type: "perk" 
				},
				{ name: "Reciclaje", 
				 description: `Al utilizar un objeto consumible, recuperas el material "Scraps" el cual contiene 1 de los módulos del objeto consumido.`, 
				 type: "perk" 
				},
				{ name: "Gourmet", 
				 description: `Al crear un objeto consumible usando el perk de "Fabricate" puedes designarlo como un "Efímero", haciendo que el consumible, ademas de su efecto habitual, cure 20 HP o recupere 2 EP al usuario del objeto. <br> Los Efímeros son inmediatamente consumidos al inicio de tu siguiente escena de descanso sin aplicar ningún efecto.`, 
				 type: "perk" 
				},
				{ name: "SpellCard [+2 ☐ ]", 
				 description: "solo puedes usar esta skill mientras tengas el equivalente en módulos a la skill en objetos en tu inventario. Los objetos son consumidos al usar esta skill", 
				 type: "restriction", slots: "+2"
				},				
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 2.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Acceso al Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Alquimista.", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: ".", 
				 type: "perk" 
				},
				{ name: "Placeholder [+3 ☐ ]", 
				 description: ".", 
				 type: "restriction", slots: "+3"
				},				
			],
		},
	},

	abisso: {
		tier1: moduleLibrary
			.filter((module, index, arr) => {
				const firstModuleIndex = arr.findIndex(m => m.name === "Físico");
				const lastModuleIndex = arr.findIndex(m => m.name === "Nocturna");
				return index >= firstModuleIndex &&
					index <= lastModuleIndex &&
					!module.name.startsWith("Placeholder");
			})
			.map(module => ({
				name: module.name,
			})),
		tier2: moduleLibrary
			.filter((module, index, arr) => {
				const firstModuleIndex = arr.findIndex(m => m.name === "Cura 2");
				const lastModuleIndex = arr.findIndex(m => m.name === "Interceptar");
				return index >= firstModuleIndex &&
					index <= lastModuleIndex &&
					!module.name.startsWith("Placeholder");
			})
			.map(module => ({
				name: module.name,
			})),
		tier3: moduleLibrary
			.filter((module, index, arr) => {
				const firstModuleIndex = arr.findIndex(m => m.name === "Ataque Efectivo");
				const lastModuleIndex = arr.findIndex(m => m.name === "Acierto Certero");
				return index >= firstModuleIndex &&
					index <= lastModuleIndex &&
					!module.name.startsWith("Placeholder");
			})
			.map(module => ({
				name: module.name,
			})),
		tier4: moduleLibrary
			.filter((module, index, arr) => {
				const firstModuleIndex = arr.findIndex(m => m.name === "Acción Forzada");
				const lastModuleIndex = arr.findIndex(m => m.name === "Irresistible");
				return index >= firstModuleIndex &&
					index <= lastModuleIndex &&
					!module.name.startsWith("Placeholder");
			})
			.map(module => ({
				name: module.name,
			})),
		tier5: moduleLibrary
			.filter((module, index, arr) => {
				const firstModuleIndex = arr.findIndex(m => m.name === "Pregunta");
				const lastModuleIndex = arr.findIndex(m => m.name === "Ataque Múltiple");
				return index >= firstModuleIndex &&
					index <= lastModuleIndex &&
					!module.name.startsWith("Placeholder");
			})
			.map(module => ({
				name: module.name,
				restrictions: module.restrictions || []
			})),


		perks: {
			tier1: [],
			tier2: [],
			tier3: [],
		},
		statUpgrades: {},
	},

	origen: {
		ventajas: [
		{
			name: "Experto",
			description: "Escoge una de tus oficios, puedes escoger un segundo efecto escogido.",
			type: "perk"
			},
			{
			name: "Reflejos Rapidos",
			description: "+3 a tus tiradas de iniciativa, puedes obtener este perk mas de una vez.",
			type: "perk"
			},
			{
			name: "Resistencia Experta",
			description: "Puedes aplicar tus ventajas de oficio a tus tiradas de resistencia, las reglas de cuando puedes aplicar tu oficio continuan aplicando.",
			type: "perk"
			},
			{
			name: "Cuerpo Puro",
			description: "No nesecitas dormir, comer, o respirar.",
			type: "perk"
			},
			{
			name: "Enorme",
			description: "Ocupas un espacio de 2x2 casillas en lugar de 1x1. Otras criaturas pueden subirse a tus hombros o espalda con una como si fueras un vehiculo, y todas las criaturas a bordo se desplazan al mismo tiempo cuando utilizas tu acción de movimiento. Si tienes a mas de 1 criatura a bordo, reduce tu MOV en -5 por cada criatura adicional. Ganas el trabajo \"Peso Pesado\".",
			type: "perk"
			},
			{
			name: "Diminuto",
			description: "Ocupas menos de una casilla de espacio, en lugar de 1x1. Puedes ocupar o pasar por la misma casilla que otra criatura sin ninguna desventaja. Ganas el trabajo \"Discreto\".",
			type: "perk"
			},
			{
			name: "Habilidad Innata",
			description: "Escoge un modulo Tier 1 o 2 de duracion mayor a instantanea de cualquier catalogo (execptuando el catalogo abisal), recibes los efectos de este modulo perpetuamente como si fuera parte de una pasiva. El modulo escogido no puede ser resistido.",
			type: "perk"
			},
		],
		desventajas: [
			{ 
			name: "Paria", 
			description: "Eres marcado visualmente por el abisso, la mayoria de portadores de Core te veran como alguien sospechoso o peligroso.", 
			type: "perk" 
			},
			{
			name: "Abiss Bearer", 
			description: "Al sacar una pifia o un critico utilizando una skill con un modulo abissal, el objetivo de la skill debe comprar 1 modulo abissal, o reducir sus HP maximos en -8.", 
			type: "perk" 
			},
			{
			name: "Agotado", 
			description: "Al pagar puntos de energia, tambien debes pagar una cantidad identica de HP.", 
			type: "perk" 
			},
			{
			name: "Ceguera",
			description: "No puedes ver. Como consecuencia, no puedes utilizar la stat de Int para tus tiradas de ataque. Ademas, si no tienes localizado a un objetivo con certeza, no puedes utilizar skills o secundarias que dependan de tu vista.",
			type: "perk"
			},
			{
			name: "Vulnerabilidad Elemental",
			description: "Ganas una vulnerabilidad a dos de los siguientes elementos: (Fuego, Hielo, Tierra, Rayo, Viento, psiquico).",
			type: "perk"
			},
			{
			name: "Vulnerabilidad Existencial",
			description: "Ganas una vulnerabilidad a uno de los siguientes elementos: (Fisico, Luz, Oscuridad, Cura).",
			type: "perk"
			},
		]
	}
};

export default moduleCatalog;