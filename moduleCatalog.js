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
				{ name: "Laboratorio Portátil", 
				 description: "Siempre que tengas acceso a tus herramientas de trabajo, puedes usar una acción para que tu o un aliado pueda utilizar uno de los siguientes efectos: <br> - Modifica o crea una skill con tus SP disponibles. <br> - Compra 1 módulo con tus CE disponibles. <br> - Escoge 1 Perk de un catálogo y tier disponible. <br> Solo puedes usar esta acción una vez y recuperas el uso tras una escena de descanso.", 
				 type: "perk" 
				},
				{ name: "Call of the Hive [+1 ☐ ]", 
				 description: "El objetivo debe tener al menos 1 perk.", 
				 type: "restriction",slots:"+1" 
				},
				{ name: "Area Instantanea [+1 ☐ ]", 
				 description: "Una skill con esta restricción debe tener un rango de tipo área. No creas Áreas de Efecto al usar esta skill.", 
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
					description: "Puedes pagar +1 EP para hacer reroll a una o ambas stats de una tirada, una vez activas este perk, no puedes volver a activarlo hasta el final de tu siguiente ronda. No puedes activar este perk como reacción a una pifia.",
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
				{ name: "Placeholder [+2 ☐ ]",
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
					name: "DM +1", 
				},
				{ 
					name: "HP +4", 
				},
				{ 
					name: "Job +1", 
				},
				{
					name: "EP +2", 
				},
				{ 
					name: "DM +1", 
				}
			],
			tier2: [
				{ 
					name: "HP +4", 
				},
				{ 
					name: "DMG +1", 
				},
				{ 
					name: "Job +1", 
				},
				{
					name: "HP +6", 
				},
				{ 
					name: "DM +2", 
				}
			],
			tier3: [
				{ 
					name: "EP +1", 
				},
				{
					name: "DM +1", 
				},
				
				{ 
					name: "Stat Up!", 
					description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{ 
					name: "HP +6", 
				},
				{ 
					name: "DMG +2", 
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
					name: "DF +1", 
				},
				{ 
					name: "HP +4", 
				},
				{ 
					name: "HP +8", 
				},
				{
					name: "EP +2", 
				},
				{ 
					name: "DMG +2", 
				}
			],
			tier2: [
				{ 
					name: "HP +4", 
				},
				{ 
					name: "DF +1", 
				},
				{ 
					name: "Job +1", 
				},
				{
					name: "HP +6", 
				},
				{ 
					name: "DMG +2", 
				}
			],
			tier3: [
				{ 
					name: "HP +4", 
				},
				{ 
					name: "DMG +1", 
				},				
				{ 
					name: "Stat Up!", 
					description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{
					name: "EP +1", 
				},
				{ 
					name: "DF +2", 
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
				{ name: "Interés Común", 
				 description: `Al usar la acción de Resistir, puedes aplicar uno de los siguientes beneficios adicionales: <br>
				- Resiste un módulo adicional. <br>
				- Resiste el mismo módulo sobre hasta 2 objetivos adicionales dentro de tu rango de toque. <br>
				- Elimina el área de efecto resistida por completo. <br>
				`, 
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
				{ name: "Habes Corpus [+1 ☐ ]", 
				 description: "Solo puedes usar esta skill mientras estás bajo el efecto del módulo 🐺.", 
				 type: "restriction", slots: "+1"
				},
				{ name: "Ex Post Facto [-2 ☐ ]:", 
				 description: "Puedes usar esta skill como una acción gratuita directamente después de utilizar una acción de resistencia.", 
				 type: "restriction", slots: "-2"
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
				{ name: "Corpus Amittere [+2 ☐ ]", 
				 description: "Sólo puedes usar esta skill mientras estés bajo el efecto de 🐺. 🐺 termina tras utilizar esta skill.", 
				 type: "restriction", slots: "+2"
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
					name: "MOV +2", 
				},
				{ 
					name: "HP +4", 
				},
				{ 
					name: "ATK +1", 
				},
				{
					name: "EP +2", 
				},
				{ 
					name: "DF +1", 
				}
			],
			tier2: [
				{ 
					name: "EP +1", 
				},
				{ 
					name: "ATK +1", 
				},
				{ 
					name: "MOV +2", 
				},
				{
					name: "DF +1", 
				},
				{ 
					name: "EQUIP +1", 
				},
			],
			tier3: [
				{
					name:"HP +4",
				},
				{
					name:"MOV +2",
				},
				{ 
					name: "Stat Up!", 
					description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{ 
					name: "EP +2", 
				},
				{ 
					name: "IMPR +1", 
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
					name: "HP +6", 
				},
				{ 
					name: "DM +1", 
				},
				{ 
					name: "HP +6", 
				},
				{
					name: "HP +6", 
				},
				{ 
					name: "DMG +2", 
				}
			],
			tier2: [
				{ 
					name: "HP +4", 
				},
				{ 
					name: "DMG +1", 
				},
				{ 
					name: "MOV +2", 
				},
				{
					name: "HP +6", 
				},
				{ 
					name: "EP +2", 
				},
			],
			tier3: [
				{
					name:"HP +4",
				},
				{
					name:"DMG +1",
				},
				{ 
					name: "Stat Up!", 
					description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."
				},
				{ 
					name: "HP +6", 
				},
				{ 
					name: "DMG +2", 
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
				 description: "El objetivo debe tener tu Marca, la cual desaparece tras ser afectado por esta skill.", 
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
				 description: "Como acción gratuita al inicio de tu turno de cada uno de tus turnos puedes lanzar tu MIG para recibir daño igual al resultado. Hasta el final de tu turno, aumenta tu DMG igual al daño recibido por esta Perk.", 
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
				{ name: "EQUIP +1",},
				{ name: "HP +4",},
				{ name: "DM +1",},
				{ name: "EP +2",},
				{ name: "ATK +2",}
			],
			tier2: [
				{ name: "EP +1",},
				{ name: "ATK +1",},
				{ name: "IMPR +1",},
				{ name: "EP +2",},
				{ name: "DMG +2",}
			],
			tier3: [
				{ name: "EP +1",},
				{ name: "DM +1",},
				{ name: "Stat Up!",},
				{ name: "EP +2",},
				{ name: "DMG +2",}
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
				{ name: "Reloading  [+1 ☐ ]", 
				 description: "Una vez activada, esta skill no puede volver a ser usada hasta que utilices una interacción con objeto para recargarla.", 
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
				{ name: "Recycle", 
				 description: "Durante cada escena de laboratorio, puedes borrar 1 skill de tu selfcore, y recuperar SP igual a la mitad del valor de la skill eliminada.", 
				 type: "perk" 
				},
				{ name: "Infusion [+2 ☐ ]", 
				 description: "Esta skill queda imbuida en un objeto a tu elección, y no puede ser activada sin tener el objeto especifico equipado. Si el objeto ya es un equipamiento, debe tener slots para la skill.", 
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
				{ name: "Recharge [+2 ☐ ]", 
				 description: "Debes reposar esta skill para poder volver a usarla. Esta Skill solo puede volver a activarse después del inicio de tu turno dos rondas tras cada uso.", 
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
				{ name: "EP +2", },
				{ name: "ATK +1", },
				{ name: "Job +1", },
				{ name: "HP +4", },
				{ name: "EP +2", }
			],
			tier2: [
				{ name: "EP +1", },
				{ name: "DMG +1", },
				{ name: "MOV +1", },
				{ name: "EP +2", },
				{ name: "DMG +2", }
			],
			tier3: [
				{ name: "EP +1", },
				{ name: "ATK +1", },
				{ name: "Stat Up!", description: "Permanently increase the dice size of one Stat of your choice, to a max of 12."},
				{ name: "HP +6", },
				{ name: "ATK +2", }
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
				{ name: "Team Lead", 
				 description: "Al utilizar módulos de Rango de objetivo, siempre puedes seleccionar a tus invocaciones activas como uno de tus objetivos de la skill, aun si no cumplen los requerimientos para ser seleccionados.", 
				 type: "perk" 
				},
				{ name: "Contractual Obligations [+1 ☐ ]", 
				 description: "Si no puedes pagar uno de los costes o cumplir uno de los requerimientos de modulos en esta skill, entonces no puedes usar esta skill en absoluto.", 
				 type: "restriction", slots: "+1"
				},				
			],
			tier2: [
				{ name: "Invocador Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Invocador.", 
				 type: "perk" 
				},
				{ name: "Team Synergy", 
				 description: "Una vez por turno, mientras tengas a una invocación a rango de toque, puedes utilizar una acción para que la invocación tome un turno adicional inmediatamente.", 
				 type: "perk" 
				},
				{ name: "Cut your losses", 
				 description: "Cuando un ataque contra ti acierta, puedes cambiar el objetivo a una de tus invocaciones distancia de toque. Una vez activas este perk, no puedes volver a activarlo hasta el inicio de tu siguiente turno.", 
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
				{ name: "Avatar", 
				 description: `Al utilizar el módulo de 🧚, puedes cambiar su duración de "pasiva" a "escena", para invocar al familiar en forma de un Avatar.<br>El Avatar comparte turno contigo, siempre se mantiene a 1 casilla de ti y es inmune a los efectos de área. Al hacer tiradas de Stats, el usuario puede reemplazar una o ambas de sus Stats por las de su Avatar. <br>En combate, el avatar puede utilizar 1 acción durante tu turno para: <br>- Utilizar una de sus skills. <br>- Utilizar una acción de movimiento para desplazar a su usuario. <br>- Utilizar una secundaria. <br>- Aplicar sus efectos pasivos al usuario hasta el inicio de su siguiente ronda.`, 
				 type: "perk" 
				},
				{ name: "Worker's Wrongs [+3 ☐ ]", 
				 description: "Este modulo debe incluir una invocacion. Cada vez que una criatura invocada por esta skill es reducida a 0 HP, debes pagar -1 PE. No puedes usar una skill con esta restriccion si tienes 0 PE restante.", 
				 type: "restriction", slots: "+3"
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
				{ name: "ATK +1"},
				{ name: "HP +4"},
				{ name: "MOV +2"},
				{ name: "EP +2"},
				{ name: "DMG +2"}
			],
			tier2: [
				{ name: "HP +4"},
				{ name: "DMG +1"},
				{ name: "IMPR +1"},
				{ name: "EP +2"},
				{ name: "ATK +2"}],
			tier3: [
				{ name: "EP +1"},
				{ name: "ATK +1"},
				{ name: "STAT UP!", description: "Aumenta un dado de Stat en un tamaño." },
				{ name: "HP +6"},
				{ name: "DMG +2"},

			]
		},
		perks: {
			tier1: [
				{ name: "Evocador Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Evocador.", 
				 type: "perk" 
				},
				{ name: "Gimmick", type: "perk", slots:"-4",
				description: "Consigues una gimmick de 1 espacio. <br> Al conseguir esta perk, escoge 1 módulo de efecto y una restricción de tu self core para equipar a la gimmick. Durante las escenas de laboratorio puedes cambiar la restricción o el módulo de tus gimmicks pagando 5 SP por cada cambio realizado. <br> Al utilizar una skill, si pagas el precio de la restricción o cumples con sus requisitos puedes activar una gimmick para aplicar sus módulos de efecto a uno de los rangos de la skill. Tras activar una gimmick de esta forma, no puedes volver a utilizarla hasta el inicio de tu siguiente turno." 
				},
				{ name: "Elementalist", type: "perk",
				description: "Una vez por ronda, al utilizar una skill con un o más de un módulo de elemento [🔥, ❄️, 🌪️, ⚡ y 🧱], puedes cambiarlos libremente a otro elemento de la lista a tu elección." 
				},

			],
			tier2: [
				{ name: "Evocador Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Evocador.", 
				 type: "perk" 
				},
				{name:"Gimmick Draw", type: "perk", 
					description: "Ganas una gimmick adicional. <br> Al conseguir esta perk, escoge 1 módulo de efecto y una restricción de tu self core para equipar a la gimmick. Los módulos de efecto de esta gimmick deben ser distintos a los de tus otras gimmicks. <br> Solo puedes activar 1 gimmick por acción."
				},
				{name:"Elemental Scorch", type: "perk", 
					description: `Al aplicar daño elemental ([🔥, ❄️, 🌪️, ⚡ y 🧱] en un rango de Área, puedes pagar +3PE para extender la duración del módulo de daño de “instantáneo” a “escena".`
				},
				{name:"Elemental Backslash [+2 ☐ ]",
					description: "Tras usar esta skill, ganas vulnerabilidad a 1 tipo de daño elemental [🔥, ❄️, 🌪️, ⚡ y 🧱] (definido durante creación) hasta el final de tu siguiente turno.",
					type: "restriction", slots: "+2"
				},

			],
			tier3: [
				{ name: "Evocador Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks de Evocador.", 
				 type: "perk" 
				},
				{name:"Detonate", type: "perk", 
					description: "Al acertar una tirada de ataque contra 1 único objetivo, puedes escoger uno o más de los módulos que le estén afectando y estén en tu Self Core. Por cada módulo escogido, paga 1 EP; los efectos escogidos terminan y el objetivo recibe 5 puntos de un daño elemental [🔥, ❄️, 🌪️, ⚡ y 🧱] a tu elección, por cada efecto terminado"
				},
				{name:"Gimmick Set", type: "perk", 
					description: "Puedes equipar un módulo de efecto adicional a tus gimmicks con restricciones de +2 ☐ o más espacios."
				},
				{name:"Tactician [+2 ☐ ]",
					description: "Esta skill solo afecta a objetivos que esté actualmente bajo el efecto de uno o más módulos que estén en tu Self Core.",
					type: "restriction", slots: "+2"
				},
				{name:"Elemental Imbalance [+3 ☐ ]",
					description: "Esta skill debe tener al menos 1 módulo elemental [🔥, ❄️, 🌪️, ⚡ y 🧱]. Tras usar esta skill, ganas Vulnerabilidad a un elemento en base al módulo elemental de la skill: \n[🔥→❄️, ❄️→⚡, ⚡→🧱, 🧱→🌪️, 🌪️→🔥]. \nMantienes esta Vulnerabilidad hasta que vuelvas a usar una skill con esta restricción.",
					type: "restriction", slots: "+3"
				},
			]
		},
	},
	alquimista: {
		tier1: [],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ name: "DMG +1"},
				{ name: "HP +4"},
				{ name: "EQUIP +1"},
				{ name: "EP +2"},
				{ name: "DMG +2"}
			],
			tier2: [
				{ name: "EP +1"},
				{ name: "ATK +1"},
				{ name: "IMPR +1"},
				{ name: "HP +6"},
				{ name: "ATK +2"}],
			tier3: [
				{ name: "HP +4"},
				{ name: "DMG +1"},
				{ name: "STAT UP!", description: "Aumenta un dado de Stat en un tamaño." },
				{ name: "EP +2"},
				{ name: "ATK +2"},

			]
		},
		perks: {
			tier1: [
				{ name: "Alquimista Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de perks del Alquimista.", 
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
				 description: "Si fallas una tirada de ataque con esta skill, recibes HR de daño.", 
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
			description: "Escoge uno de tus oficios, puedes escoger un segundo efecto escogido.",
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
			description: "No necesitas dormir, comer, o respirar. Puedes realizar trabajos ligeros y sin perder las ventajas de una escena de descanso.",
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
			{
			name: "Cuerpo Elemental",
			description: "Escoge un módulo elemental entre [🔥, ❄️, 🧱, 🌪️ y ⚡]. Gana resistencia al tipo de daño del módulo escogido, cuando eres impactado por una skill que incluye el módulo escogido, puedes seleccionar 1 de los módulos de efecto de la skill, no eres afectado por ese módulo.",
			type: "perk"
			},
			{
			name: "Core Expert",
			description: "Durante tus escenas de descanso, puedes remover tu self core y reemplazarlo por otro core válido en tu posesión. Remover un self core con esta perk no lo daña de ninguna forma, y le permite retener su poder original y todas sus skills y perks.",
			type: "perk"
			},
			{
			name: "Abyss Weaver",
			description: "[Requiere la desventaja “Abyss Bearer”] Utiliza 5 CE para comprar módulos del Catálogo Abissal. Estos módulos no cuentan como parte de la progresión para propósitos de mejoras o perks del catálogo Abissal.",
			type: "perk"
			},
			{
			name: "Multitasker",
			description: "Durante el combate, una vez por turno, puedes consumir 1 PE para realizar una secundaria como acción gratuita.",
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
			{
			name: "Desenfocado",
			description: "No puedes utilizar tus acciones de mantenimiento o interacción con objetos de forma gratuita. Siempre debes consumir una acción para tomarlas.",
			type: "perk"
			},
			{
			name: "Juramento",
			description: "Siempre debes pagar los costes o seguir los requerimientos impuestos por las restricciones de modulo o skill.",
			type: "perk"
			},
			{
			name: "Patoso",
			description: "Reduce tus espacios de equipo a 0.",
			type: "perk"
			}, 
			{
			name: "Gluttony",
			description: "Sufres hambre constante e intensa. Al final de cada escena de suspenso, acción, pierdes 3 EP. Puedes reducir el EP perdido en -1 por cada ración consumida durante la escena.",
			type: "perk"
			},
			{
			name: "Wrath",
			description:"Si recibes daño de cualquier fuente, en tu siguiente turno deberás incluir a la fuente del daño como objetivo de una tirada de ataque o pagar 4 EP al final del turno.",
			type:"perk"
			},
		]
	},
	SecretRestrictions: [
		{	
			name: " Gimmick", type: "restriction",
			description: "Sets skill cost to 0 and slots to 1 (or 2 with Gimmick Set).",
			catalog: "SecretRestrictions", tier: "1"
		},
		{
			name: " Transformación", type: "restriction",
			description: "Skill cost set to 0 and grants 1 module slot (plus bonuses from Bendición De Luna perks).",
			catalog: "SecretRestrictions", tier: "1"
		},
		{
			name: "Innata", type: "restriction",
			description: "Skill cost set to 0 and grants 1 module slot active as a passive.",
			catalog: "SecretRestrictions", tier: "1"
		},

	]
	
};

export default moduleCatalog;