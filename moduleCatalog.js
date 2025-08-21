import moduleLibrary from './moduleLibrary.js';

const moduleCatalog = {
	architect: {
		tier1: [
			{ name: "Físico", restriction: null },
			{ name: "Psíquico", restriction: null },
			{ name: "Tierra", restriction: null },
			{ name: "Luz", restriction: null },
			{ name: "Prestidigitación 1", restriction: null },
			{ name: "Pausa", restriction: null },
			{ name: "Identificar 1", restriction: null },
			{ name: "Traje", restriction: "Modificas la vestimenta del objetivo actual para convertirla en una version tunica de su traje que mantiene las mismas propiedades" },
			{ name: "Bolsillo Dimensional", restriction: "Los objetivos deben ser objetos. Solo puedes acumular un máximo de 1 casilla en volumen dentro del espacio" },
			{ name: "Inmovilizar 1", restriction: "El objetivo solo puede usar su MOV para acercarse al usuario de la skill"},
			{ name: "Alterar Emoción", restriction: "Solo puede ser usado para darle emociones positivas" },
			{ name: "Proyectil 1", restriction: "Rango Magico" },
			{ name: "Área 1", restriction: "Rango Magico" },
			{ name: "Área Remota 1", restriction: "Rango Magico" },
			{ name: "Orbe 1", restriction: "Rango Magico" },
		],
		tier2: [
			{ name: "Terraformar 2", restriction: null },
			{ name: "Prestidigitación 2", restriction: null },
			{ name: "Inmovilizar 2", restriction: null },
			{ name: "Ceguera Selectiva", restriction: null },
			{ name: "Oferta de Trabajo", restriction: "+1 PE coste de activación" },
			{ name: "Cura 2", restriction: "Solo afecta a objetos o estructuras inanimadas. Este requeimiento no puede ser negado"},
			{ name: "Dispel", restriction: "+1 PE coste de activación" },
			{ name: "Desplazar 2", restriction: "El objetivo no puede ser forzado a entrar en terreno dañino" },
			{ name: "Vínculo Telepático", restriction: "+2 PE coste de activación. Puedes expandir la duración indefinidamente utilizando una acción durante tu turno." },
			{ name: "Invertir Movimiento 2", restriction: "Solo puedes activarlo cuando el objetivo se aleja." },
			{ name: "Mover 2", restriction: "El movimiento debe acercar el objetivo al usuario" },
			{ name: "Origen 2", restriction: null },
			{ name: "Exclusión 2", restriction: null },
			{ name: "Proyectil 2", restriction: "Rango Magico" },
			{ name: "Línea 2", restriction: "Rango Magico" },
		],
		tier3: [
				{ name: "Santuario", restriction: null },
				{ name: "Inmovilizar 3", restriction: null },
				{ name: "Levitar", restriction: "Este efecto termina si el objetivo recibe daño de tierra" },
				{ name: "Percepción Remota", restriction: "Requiere una esfera de cristal, dentro de la cual se proyecta la imagen." },
				{ name: "Aumento de Alcance", restriction: null },
				{ name: "Terraformar 3", restriction: null },
				{ name: "Reflejar", restriction: null },
				{ name: "Efecto Ilusorio", restriction: null },
				{ name: "Invertir Movimiento 3", restriction: "Solo puede ser usado cuando el objetivo se acerca." },
				{ name: "Escudo 3", restriction: "+2 PE al coste de activación. Solo puedes aumentar la defensa mágica." },
				{ name: "Restringir 3", restriction: null },
				{ name: "Orden 3", restriction: "Debes declarar la acción escogida vocalmente, solo las criaturas que te puedan escuchar y entender son afectadas por este rango." },
				{ name: "Objetivo Multiple 3", restriction: "Rango Magico, +1 PE coste de activación" },
				{ name: "Área 3", restriction: "Rango Magico" },
				{ name: "Objetivo 3", restriction:	"Rango Mágico, para activar este rango debes tener un objeto personal de gran importancia, o una parte del cuerpo (Ex. pelo, uña, diente) del objetivo, el cual es consumido al activar esta skill."},
			],
		perks: {
			tier1: [
				{ name: "Acceso al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Culto al orbe.", 
				 type: "perk" 
				},
				{ name: "Templo personal", 
				 description: "Siempre que tengas acceso a un objeto perfectamente esférico, puedes	usar una acción para convertirlo temporalmente en un punto de contacto para cualquier Astral Core del cual tengas al menos 1 perk.Solo puedes usar esta acción una vez, y recuperas el uso tras una escena de descanso. El efecto de esta perk termina al final de la escena", 
				 type: "perk" 
				},
				{ name: "Call of the Hive [+1 ☐ ]", 
				 description: "El objetivo debe ser un portador de Core.", 
				 type: "restriction",slots:"+1" 
				},
				{ name: "Area Instantanea [+1 ☐ ]", 
				 description: "Una skill con esta restricción debe tener un rango de tipo área. No creas un Área de Efecto al usar esta skill.", 
				 type: "restriction", slots:"+1"
				},
				{ name: "Maestria 1", 
				 description: "Ganas maestría en un módulo Tier 1 del Culto al Orbe.", 
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
		tier1: [
			{ name: "Oscuridad", restriction: null},
			{ name: "Rayo", restriction: null},
			{ name: "Prestidigitación 1", restriction: null},
			{ name: "Secundaria Añadida", restriction: null},
			{ name: "Inmovilizar 1", restriction: null},
			{ name: "Identificar Herida", restriction: null},
			{ name: "Alterar Emoción", restriction: "La emocion debe ser terror"},
			{ name: "Movimiento Añadido", restriction: "Solo puedes utilizar el movimiento para acercarte en direccion a uno de los objetivos de rango de skill."},
			{ name: "Mensaje", restriction: "El objetivo debe ser un animal no humanoide."},
			{ name: "Traje", restriction: "Debe ser una prenda de ropa que hayas vestido en el pasado."},
			{ name: "Transformar", restriction: "+1 PE Coste de activación."},
			{ name: "Nocturna", restriction: "+1 PE Coste de activación. Solo afecta al rango self."},
			{ name: "Toque", restriction: "Rango Físico"},
			{ name: "Proyectil 1", restriction: "Rango Físico"},
			{ name: "Área 1", restriction: "Rango Magico. No eres afectado por este rango, el area debe estar centrada en el usuario"},
			{ name: "Línea 1", restriction: "Rango Físico"},
		],
		tier2: [
			{ name: "Apuntar", restriction: null},
			{ name: "Mover 2", restriction: null},
			{ name: "Cura 2", restriction: "+1 al coste de PE. Solo afecta al rango self."},
			{ name: "Vuelo", restriction: "Solo puede ser aplicado al	rango self. Este efecto termina al recibir daño."},
			{ name: "Incrementar Defensa 2", restriction: "No puede ser añadido añadido a una skill mas de una vez"},
			{ name: "Origen 2", restriction: null},
			{ name: "Teletransportar 2", restriction: null},
			{ name: "Oferta de Trabajo", restriction: null},
			{ name: "Debuff 2", restriction: null},
			{ name: "Resistencia Elemental", restriction: "+2 al coste de PE. Solo puedes escoger entre frio, Físico o oscuridad."},
			{ name: "Reducir Daño 2", restriction: "+2 PE, En vez de elemento, puedes escoger entre rango magico o Físico."},
			{ name: "Proyectil 2", restriction: "Rango Magico"},
			{ name: "Objetivo 2", restriction: "Rango Magico. El objetivo debe tener contacto visual con el usuario (estar conciente de la presencia del usuario, y poder verlo."},
			{ name: "Detectar 2", restriction: "Si tienes una orden legal contra una criatura en particular, este efecto no puede fallar."},
			{ name: "Resistencia Añadida", restriction: "+1 al coste de PE"},
		],
		tier3: [
			{ name: "Ataque Efectivo", restriction: null },
			{ name: "Buff 3", restriction: "Solo se puede aplicar al rango self" },
			{ name: "Incrementar Defensa 3", restriction: "+2 al coste de PE" },
			{ name: "Inmovilizar 3", restriction: null },
			{ name: "Ininterrumpido", restriction: null },
			{ name: "Superioridad", restriction: "Requiere de un documento o licencia oficial de la corte que confirme tu identidad" },
			{ name: "Identificar 3", restriction: "Descubres el historial criminal del objetivo" },
			{ name: "Reducir Daño 3", restriction: "+1 al coste de PE" },
			{ name: "Escudo 3", restriction: "+1 al coste de PE" },
			{ name: "Santuario", restriction: "No puede ser aplicado al rango self" },
			{ name: "Área 3", restriction: "Rango mágico, No eres afectado por este rango, esta área siempre está centrada en el usuario" },
			{ name: "Familiar 3", restriction: "El familiar es débil al daño de luz" },
			{ name: "Contraataque", restriction: "-1 acción en tu siguiente turno. También puedes activar este módulo cuando un aliado a rango de toque sufre daño" },
			{ name: "Orden 3", restriction: "+1 al coste de PE" },
			{ name: "Origen Añadido", restriction: "+2 al coste de PE, Mientras este módulo esté activo, tu apariencia cambia a una obviamente mágica." },
		],
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
				{ name: "Acceso al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de la Corte De Luna.", 
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
				{ name: "Habes Corpus [+1 ☐ ]", 
				 description: "Solo puedes usar esta skill mientras estas en oscuridad parcial o total.", 
				 type: "restriction", slots: "+1"
				},				
				{ name: "Maestria 1", 
				 description: "Ganas maestría en un módulo Tier 1 de la Corte De Luna.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Acceso al Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de la Corte De Luna.", 
				 type: "perk" 
				},
				{ name: "Bendición De Luna", 
				 description: `Debes tener el Perk de "Transformación" para poder ganar este perk. Añade +1 espacio de módulo maximo a los espacios otorgados por el perk de Transformación.`, 
				 type: "perk" 
				},
				{ name: "La Arbitración de Luna", 
				 description: "Mientras seas	afectado por 🐺, puedes	incrementar en 1 tamaño	una de tus stats, al hacerlo, reduce en 1 tamaño una stat distinta. Estos efectos no	pueden ser resistidos", 
				 type: "perk" 
				},
				{ name: "Corpus Amittere [+2 ☐ ]", 
				 description: "Sólo puedes usar esta skill mientras estés bajo el efecto de 🐺. 🐺 termina tras utilizar esta skill.", 
				 type: "restriction", slots: "+2"
				},				
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 2 de la Corte De Luna.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Acceso al Tier 2", 
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
		tier1: [
			{ name: "Viento", restriction: null},
			{ name: "Rayo", restriction: null},
			{ name: "Físico", restriction: null},
			{ name: "Hielo", restriction: null},
			{ name: "Prestidigitación 1", restriction: null},
			{ name: "Spiderwalk", restriction: null},
			{ name: "Movimiento Añadido", restriction: "+1 al coste de PE."},
			{ name: "Bolsillo Dimensional", restriction: "+1 al coste de PE. Requiere de una mochila o bolsa. Solo puedes guardar cosas que quepan por la boca de la bolsa."},
			{ name: "Mensaje", restriction: null},
			{ name: "Dibujar", restriction: "Requiere de un escáner"},
			{ name: "Teletransportar Objeto 1", restriction: "Además de objetos equipados, al usar este modulo también puedes enviar objetos guardados en tu 🎒."},
			{ name: "Identificar 1", restriction: "Requiere un escáner. Puedes identificar al dueño legal del objetivo, si tiene alguno."},
			{ name: "Toque", restriction: "Rango Físico"},
			{ name: "Línea 1", restriction: "Rango Físico."},
			{ name: "Objetivo 1", restriction: "Rango Magico. Requiere de un escáner"},
		],
		tier2: [
			{ name: "Mover 2", restriction: null},
			{ name: "Terraformar 2", restriction: null},
			{ name: "Velocidad 2", restriction: null},
			{ name: "Detectar 2", restriction: null},
			{ name: "Movimiento Adicional", restriction: null},
			{ name: "Resistencia Añadida", restriction: "+1 al coste de PE"},
			{ name: "Incrementar Defensa 2", restriction: "Solo afecta a la defensa fisica. No puede ser añadido añadido a una skill mas de una vez."},
			{ name: "Apuntar", restriction: null},
			{ name: "Prestidigitación 2", restriction: null},
			{ name: "Desplazar 2", restriction: null},
			{ name: "Vuelo", restriction: "+1 al coste de PE por objetivo afectado."},
			{ name: "Teletransportar 2", restriction: "+1 al coste de PE. Requiere una mochila o bolsa, de la cual sacas el objeto."},
			{ name: "Vínculo Telepático", restriction: "El objetivo y los usuarios deben tener un audicular equipado."},
			{ name: "Línea 2", restriction: "Rango magico, requiere un escaner."},
			{ name: "Objetivo Multiple 2", restriction: "Rango magico. Requiere de un escáner"},
		],
		tier3: [
			{ name: "Levitar", restriction: null},
			{ name: "Aumento de Alcance", restriction: null},
			{ name: "Teletransportar 3", restriction: "+1 al coste de PE."},
			{ name: "Movimiento Instantaneo", restriction: "+1 al coste de PE. Solo puede ser aplicado al rango self."},
			{ name: "Reducir Daño 3", restriction: "null"},
			{ name: "Rastro de Efectos", restriction: null},
			{ name: "Contraataque", restriction: "+3 al coste de PE"},
			{ name: "Familiar 3", restriction: null},
			{ name: "Escudo 3", restriction: "+2 al coste de PE"},
			{ name: "Acierto Certero", restriction: "+1 al coste de PE"},
			{ name: "Placeholder", restriction: null},
		],
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
				{ name: "Acceso al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Zephyr Express.", 
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
				{ name: "Maestria 1", 
				 description: "Ganas maestría en un módulo Tier 1 del Zephyr Express.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Acceso al Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Zephyr Express.", 
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
				{ name: "Pinball", 
				 description: "Cuando un objetivo es empujado por una de tus skills, este se convierte en un proyectil. Si dicho proyectil impacta contra otro objetivo, tanto el proyectil como el nuevo objetivo reciben daño Físico igual al LR de la tirada de ataque.", 
				 type: "perk",
				},				
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 2 del Zephyr Express.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Acceso al Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Zephyr Express.", 
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
				{ name: "Placeholder", 
				 description: "..", 
				 type: "restriction", slots: "+2"
				},				
				{ name: "Maestria 3", 
				 description: "Ganas maestría en un módulo Tier 3 del Zephyr Express.", 
				 type: "perk" 
				},
			],
		},
	},	
	sacrificio: {
		tier1: [
			{ name: "Fuego", restriction: null},
			{ name: "Físico", restriction: null},
			{ name: "Luz", restriction: null},
			{ name: "Identificar Herida", restriction: null},
			{ name: "Debuff 1", restriction: null},
			{ name: "Buff 1", restriction: "Solo puedes aplicar este efecto con rangos de toque o área, el efecto termina si el objetivo sale del area o se separa de tu rango de toque."},
			{ name: "Pausa", restriction: null},
			{ name: "Cura 1", restriction: "Requiere un kit de primeros auxilios. Un objetivo solo puede ser afectado por este modulo 1 vez por escena."},
			{ name: "Dibujar", restriction: "Si tu objetivo es una criatura que hayas afectado con los modulos 🩹 o 🤕 en la escena actual, este modulo acierta automaticamente"},
			{ name: "Ración", restriction: "+1 al coste de PE."},
			{ name: "Alterar Emoción", restriction: null},
			{ name: "Inmovilizar 1", restriction: "Requiere un rollo de vendajes"},
			{ name: "Toque", restriction: "Rango Magico o Físico (decidido en creación.)"},
			{ name: "Área Remota 1", restriction: "Rango Magico."},
			{ name: "Área 1", restriction: "Rango Magico."},
			{ name: "Objetivo 1", restriction: "Rango Magico. El objetivo debe estar afectado por 🪧"},
		],
		tier2: [
			{ name: "Prestidigitación 2", restriction: null},
			{ name: "Cura 2", restriction: "+1 PE."},
			{ name: "Dispel", restriction: "+1 PE."},
			{ name: "Resistencia Añadida", restriction: "+1 PE."},
			{ name: "Resistencia Elemental", restriction: "+2 al coste de PE, Solo puedes escoger, fuego, luz, oscuridad, o hielo."},
			{ name: "Apuntar", restriction: null},
			{ name: "Detectar 2", restriction: "Este efecto acierta automaticamente contra objetivos con la Marca del Fénix."},
			{ name: "Incrementar Defensa 2", restriction: "No puede añadirse mas de una copia de este modulo a la misma skill."},
			{ name: "Vuelo", restriction: "Solo puede ser aplicado al rango self. Este efecto termina cuando el objetivo recibe daño."},
			{ name: "Exclusión 2", restriction: null},
			{ name: "Línea 2", restriction: "Rango Físico"},
			{ name: "Imbuir Criatura", restriction: null},
			{ name: "Objetivo 2", restriction: "Rango Magico, el objetivo debe estar afectado por tu Karma Sign"},
			{ name: "Placeholder", restriction: null},
			{ name: "Placeholder", restriction: null},
			
		],
		tier3: [
			{ name: "Santuario", restriction: null},
			{ name: "Levitar", restriction: "Este efecto termina inmediatamente si el objetivo recibe daño de hielo"},
			{ name: "Buff 3", restriction: "+1 al coste de PE por objetivo afectado"},
			{ name: "Superioridad", restriction: "El objetivo debe estar bajo el efecto de tu Karma Sign."},
			{ name: "Reducir Daño 3", restriction: "+1 al coste de PE por objetivo afectado"},
			{ name: "Orden 3", restriction: "+2 al coste de PE"},
			{ name: "Contraataque", restriction: "+1 al coste de PE. El unico objetivo de esta skill debe ser la criatura que te causo el daño."},
			{ name: "Enjambre de Proyectiles Vivientes", restriction: "Rango Magico"},
			{ name: "Área 3", restriction: "Rango Magico"},
			{ name: "Placeholder", restriction: null},
			{ name: "Placeholder", restriction: null},
			{ name: "Placeholder", restriction: null},

		],
		statUpgrades: {
			tier1: [
				{ 
					name: "HP +1", 
					description: "Permanent +1 to Max HP"
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
				{ name: "Acceso al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier del Vita Karma.", 
				 type: "perk" 
				},
				{ name: "Firma de Karma", 
				 description: "Cuando aplicas 🪧sobre una criatura a la que hayas curado o te haya hecho daño como resultado de una tirada de ataque, puedes convertir 🪧 en tu Karma Sign, una marca permanente que no puede ser resistida.", 
				 type:"perk" },
				{ name: "Payback [+1 ☐ ]", 
				 description: "El objetvio debe tener tu Karma Sign", 
				 type: "restriction", slots: "+1",
				},
				{ name: "Life Lane [+1 ☐ ]", 
				 description: "Recibes daño igual al LR, este daño no puede ser bloqueado", 
				 type: "restriction", slots: "+1",
				},
				{ name: "Maestria 1", 
				 description: "Ganas maestría en un módulo Tier 1 de Vita Karma.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Acceso al Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Vita Karma.", 
				 type: "perk" 
				},
				{ name: "Placeholder", 
				 description: ".", 
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
				{ name: "Maestria 2", 
				 description: "Ganas maestría en un módulo Tier 2 de Vita Karma.", 
				 type: "perk" 
				},
			],
			tier3: [
				{ name: "Acceso al Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Vita Karma.", 
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
				{ name: "Maestria 3", 
				 description: "Ganas maestría en un módulo Tier 3 de Vita Karma.", 
				 type: "perk" 
				},
			],

		},
	},
	bruja: {
		tier1: [
			{ name: "Rayo", restriction: null},
			{ name: "Fuego", restriction: null},
			{ name: "Físico", restriction: null},
			{ name: "Secundaria Añadida", restriction: null},
			{ name: "Identificar Herida", restriction: "Si es aplicado sobre un objeto, aprendes cualquier problema mundano que esté afectando su funcionamiento."},
			{ name: "Pausa", restriction: null},
			{ name: "Buff 1", restriction: "Este efecto termina en el momento en el que el objetivo reciba daño."},
			{ name: "Ilusión Aromatica", restriction: null},
			{ name: "Crear 1", restriction: null},
			{ name: "Proyectil Viviente 1", restriction: "Rango Físico, requiere un coponente, que es consumido como munición."},
			{ name: "Línea 1", restriction: "Rango Físico, requiere un coponente, que es consumido como munición."},
			{ name: "Transformar", restriction: "En vez de al usuario, "},
			{ name: "Placeholder", restriction: null},
			{ name: "Placeholder", restriction: null},
			{ name: "Placeholder", restriction: null},
		],
		tier2: [
			{ name: "Transformar 2", restriction: "+1 al coste de PE por cada criatura afectada. No tienes que pagar este coste al afectar objetos."},
			{ name: "Incrementar Defensa 2", restriction: "+1 al coste de PE"},
			{ name: "Resistencia Elemental", restriction: null},
			{ name: "Invertir Movimiento 2", restriction: null},
			{ name: "Dispel", restriction: null},
			{ name: "Cura 2", restriction: "+1 al coste de PE por cada objetivo afectado."},
			{ name: "Velocidad 2", restriction: null},
			{ name: "Olvido Selectivo", restriction: "+1 al coste de PE"},
			{ name: "Exclusión 2", restriction: null},
			{ name: "Línea 2", restriction: "Rango Físico, requiere un coponente, que es consumido como munición."},
			{ name: "Crear 2", restriction: "Rango Magico, +2 al coste de PE"},
			{ name: "Imbuir Criatura", restriction: "Rango Magico"},
			{ name: "Aura", restriction: null},

		],
		tier3: [
			{ name: "Furia", restriction: null},			
			{ name: "Buff 3", restriction: null},			
			{ name: "Incrementar Defensa 3", restriction: "+1 al coste de PE por objetivo afectado"},			
			{ name: "Olvido", restriction: null},			
			{ name: "Ceguera Selectiva", restriction: null},			
			{ name: "Levitar", restriction: null},			
			{ name: "Reducir Daño 3", restriction: "Puedes elegir 2 elementos en lugar de solo 1."},			
			{ name: "Origen Añadido", restriction: "+2 al coste de PE por objetivo afectado"},			
			{ name: "Restringir 3", restriction: "+1 al coste de PE por objetivo afectado"},			
			{ name: "Imperceptible", restriction: null},			
			{ name: "Acierto Certero", restriction: "+2 al coste de PE"},			
		],
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
				{ name: "Acceso al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Wiccrat's Curse.", 
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
				{ name: "Maestria 1", 
				 description: "Ganas maestría en un módulo Tier 1 de Wiccrat's Curse.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Acceso al Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Wiccrat's Curse.", 
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
				{ name: "Acceso al Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Wiccrat's Curse.", 
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
				{ name: "Maestria 3", 
				 description: "Ganas maestría en un módulo Tier 3 de Wiccrat's Curse.", 
				 type: "perk" 
				},
			],
		},
	},
	invocador: {
		tier1: [
			{ name: "Psíquico", restriction: null},
			{ name: "Oscuridad", restriction: null},
			{ name: "Luz", restriction: null},
			{ name: "Prestidigitación 1", restriction: null},
			{ name: "Secundaria Añadida", restriction: null},
			{ name: "Cura 1", restriction: "+1 al coste de PE, puedes ignorar este coste al utilizarlo con una invocación como unico objetivo."},
			{ name: "Traje", restriction: "+1 al coste de PE, puedes ignorar este coste al utilizarlo con una invocación como unico objetivo"},
			{ name: "Toque", restriction: "Rango Magico"},
			{ name: "Proyectil Viviente 1", restriction: "Rango Magico"},
		],
		tier2: [
			{ name: "Oferta de Trabajo", restriction: "+1 al coste de PE, puedes ignorar este coste al utilizarlo con una invocación como unico objetivo"},
			{ name: "Vínculo Telepático", restriction: "+1 al coste de PE, puedes ignorar este coste al utilizarlo con una invocación como unico objetivo"},
			{ name: "Desplazar 2", restriction: "+1 al coste de PE."},
			{ name: "Mover 2", restriction: null},
			{ name: "Resistencia Añadida", restriction: null},
		],
		tier3: [
			{ name: "Placeholder", restriction: null},			
			{ name: "Placeholder", restriction: null},			
			{ name: "Placeholder", restriction: null},			
			{ name: "Familiar 3", restriction: null},			
			{ name: "Placeholder", restriction: null},			
		],
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
				{ name: "Acceso al Tier 2", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Umbra Employment Agency.", 
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
				 description: "Ganas maestría en un módulo Tier 1 de Umbra Employment Agency.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Acceso al Tier 3", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Umbra Employment Agency.", 
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
				{ name: "Acceso al Tier 4", 
				 description: "Debes comprar este modulo para ganar acceso al siguiente tier de Umbra Employment Agency.", 
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
		tier1: [
			{ name: "placeholder", restriction: null},
		],
		tier2: [],
		tier3: [],
		statUpgrades: {
			tier1: [
				{ name: "WLP +1", description: "Gain +1 WLP." },
			],
			tier2: [],
			tier3: [
				{ name: "WLP +2", description: "Gain +2 WLP." }
			]
		},
		perks: {
			tier1: [
				{ name: "Gimmick", type: "perk", description: "Consigues una gimmick de 1 espacio. <br> Al conseguir esta perk, escoge 1 módulo de efecto y una restricción de tu self core para equipar a la gimmick. Durante las escenas de laboratorio puedes cambiar la restricción o el módulo de tus gimmicks pagando 5 SP por cada cambio realizado. <br> Al utilizar una skill, si pagas el precio de la restricción o cumples con sus requisitos puedes activar una gimmick para aplicar sus módulos de efecto a uno de los rangos de la skill. Tras activar una gimmick de esta forma, no puedes volver a utilizarla hasta el inicio de tu siguiente turno." },
			],
			tier2: [
				{name:"Gimmick Set", type: "perk", description: "Puedes equipar un módulo de efecto adicional a tus gimmicks con restricciones de +2 ☐ o más espacios."}
			],
			tier3: [
				{name:"Gimmick Draw", type: "perk", description: "Ganas una gimmick adicional. <br> Al conseguir esta perk, escoge 1 módulo de efecto y una restricción de tu self core para equipar a la gimmick. Los módulos de efecto de esta gimmick deben ser distintos a los de tus otras gimmicks. <br> Solo puedes activar 1 gimmick por acción."}
			]
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
		.map(module => ({ name: module.name, restriction: "Abissal" })),
			tier2: moduleLibrary
		.filter((module, index, arr) => {
			const firstModuleIndex = arr.findIndex(m => m.name === "Cura 2");
			const lastModuleIndex = arr.findIndex(m => m.name === "Interceptar");
			return index >= firstModuleIndex && 
				 index <= lastModuleIndex && 
				 !module.name.startsWith("Placeholder");
		})
		.map(module => ({ name: module.name, restriction: "Abissal" })),
			tier3: moduleLibrary
		.filter((module, index, arr) => {
			const firstModuleIndex = arr.findIndex(m => m.name === "Ataque Efectivo");
			const lastModuleIndex = arr.findIndex(m => m.name === "Acierto Certero");
			return index >= firstModuleIndex && 
				 index <= lastModuleIndex && 
				 !module.name.startsWith("Placeholder");
		})
		.map(module => ({ name: module.name, restriction: "Abissal" })),
			tier4: moduleLibrary
		.filter((module, index, arr) => {
			const firstModuleIndex = arr.findIndex(m => m.name === "Acción Forzada");
			const lastModuleIndex = arr.findIndex(m => m.name === "Irresistible");
			return index >= firstModuleIndex && 
				 index <= lastModuleIndex && 
				 !module.name.startsWith("Placeholder");
		})
		.map(module => ({ name: module.name, restriction: "Abissal" })),
			tier5: moduleLibrary
		.filter((module, index, arr) => {
			const firstModuleIndex = arr.findIndex(m => m.name === "Pregunta");
			const lastModuleIndex = arr.findIndex(m => m.name === "Ataque Múltiple");
			return index >= firstModuleIndex && 
				 index <= lastModuleIndex && 
				 !module.name.startsWith("Placeholder");
		})
		.map(module => ({ name: module.name, restriction: "Abissal" })),
		perks: {
			tier1: [
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
			],
			tier2: [
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
				{ name: "Desventaja", 
				 description: "Escoge una desventaja de los Perks de Origen.", 
				 type: "perk" 
				},
			],
			tier3: [
				{
				name: "Desventaja", 
				description: "Escoge una desventaja de los Perks de Origen.", 
				type: "perk" 
				},
				{
				name: "Desventaja", 
				description: "Escoge una desventaja de los Perks de Origen.", 
				type: "perk" 
				},
				{
				name: "Desventaja", 
				description: "Escoge una desventaja de los Perks de Origen.", 
				type: "perk" 
				},
				{
				name: "Desventaja", 
				description: "Escoge una desventaja de los Perks de Origen.", 
				type: "perk" 
				},
				{
				name: "Desventaja", 
				description: "Escoge una desventaja de los Perks de Origen.", 
				type: "perk" 
				},
				{
				name: "Desventaja", 
				description: "Escoge una desventaja de los Perks de Origen.", 
				type: "perk" 
				},
			],
				},
		statUpgrades: {
				tier1: [
						{ name: "HP -3"},
						{ name: "HP -3"},
						{ name: "HP -3"},
						{ name: "HP -3"},
						{ name: "EP -1"},
				],
				tier2: [
						{ name: "HP -3"},
						{ name: "HP -4"},
						{ name: "EP -2"},
						{ name: "HP -4"},
						{ name: "HP -5"},
				],
				tier3: [
						{ name: "HP -4"},
						{ name: "HP -5"},
						{ name: "Stat DOWN!"},
						{ name: "HP -5"},
						{ name: "HP -5"},
				],
				tier4: [
						{ name: "HP -4"},
						{ name: "HP -5"},
						{ name: "Stat DOWN!"},
						{ name: "HP -5"},
						{ name: "HP -5"},
				],
				tier5: [
						{ name: "HP -4"},
						{ name: "HP -5"},
						{ name: "Stat DOWN!"},
						{ name: "HP -5"},
						{ name: "HP -5"},
				],
			},
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