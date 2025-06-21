//global variables
let activeCharacter = {};

let activeCatalog = "";

const jobEffects = [
	"Tras tirar tus stats, puedes reemplazar una de ellas por un 5.",
	"Tus tiradas pares por debajo de 6 se consideran críticos.",
	"Ganas un +3 a las secundarias de tu oficio.",
	"En cualquier momento durante el combate, puedes gastar +1 PE para usar una secundaria relacionada con tu oficio como una acción gratuita.",
	"Al fallar una tirada enfrentada de tu oficio, puedes gastar 2 PE para convertir el fallo en un acierto.",
	"Ignoras cualquier desventaja circunstancial que afecte tus tiradas del oficio."
];

const moduleLibrary = [
	// 1 Skill Point Modules
	{
		name: "Placeholder",
		category: "Special",
		description: "Dani aun no ha pensado en que poner aqui, y promete que lo hara mejor en el futuro.",
		emote: "🇳/🇦",
	},
	{
		name: "Físico",
		category: "Efecto",
		description: "El objetivo recibe HR de daño físico.",
		emote: "💥",
	},
	{
		name: "Fuego",
		category: "Efecto",
		description: "El objetivo recibe HR de daño de fuego.",
		emote: "🔥",
	},
	{
		name: "Hielo",
		category: "Efecto",
		description: "El objetivo recibe HR de daño de hielo.",
		emote: "❄️",
	},
	{
		name: "Viento",
		category: "Efecto",
		description: "El objetivo recibe HR de daño de viento.",
		emote: "🌪️",
	},
	{
		name: "Rayo",
		category: "Efecto",
		description: "El objetivo recibe HR de daño de rayo.",
		emote: "⚡",
	},
	{
		name: "Tierra",
		category: "Efecto",
		description: "El objetivo recibe HR de daño de tierra.",
		emote: "🧱",
	},
	{
		name: "Oscuridad",
		category: "Efecto",
		description: "El objetivo recibe HR de daño de oscuridad.",
		emote: "🌑",
	},
	{
		name: "Luz",
		category: "Efecto",
		description: "El objetivo recibe HR de daño de luz.",
		emote: "☀️",
	},
	{
		name: "Psíquico",
		category: "Efecto",
		description: "Haces HR de daño Psíquico.",
		emote: "🧠",
	},
	{
		name: "Cura 1",
		category: "Efecto",
		description: "El objetivo recupera LR de HP.",
		emote: "🤕",
	},
	{
		name: "Prestidigitación 1",
		category: "Efecto",
		description: "Al activar este efecto el usuario puede escoger una de las siguientes opciones. Solo puede escoger opciones para los que haya aprendido el módulo relacionado.",
		emote: "🎨",
		effects: [
			{
				emote: "💥",
				description: "Haces una interacción con objeto en el rango afectado. Debe ser algo simple que no requiera una tirada de dado."
			},
			{
				emote: "🔥",
				description: "Aumentas la temperatura, extinguir una llama, o expandes una llama ya existente a otro objeto a rango corto."
			},
			{
				emote: "❄️",
				description: "Reduces la temperatura, alteras la dirección hacia la que fluye el agua, o cambias el estado del agua descubierta entre sólido, agua, y gas."
			},
			{
				emote: "🌪️",
				description: "Creas un olor, una corriente de aire capaz de apagar llamas y disipar gases, o empujas a un objetivo una casilla en cualquier dirección."
			},
			{
				emote: "⚡",
				description: "Haces una interacción con un aparato electrónico en el rango afectado. Puedes atraer 1 objetivo mayormente metálico 1 x hacia ti."
			},
			{
				emote: "🧱",
				description: "Ensucias al objetivo. Si el objetivo es tierra o piedra suelta, puedes moverlo 1 x hacia cualquier dirección."
			},
			{
				emote: "🌑",
				description: "Limpias al objetivo. Mueves tu sombra, dentro del rango, cambiando su forma y posición a gusto."
			},
			{
				emote: "☀️",
				description: "Por el resto de la escena, el objetivo produce un brillo menor a x de él."
			},
			{
				emote: "🧠",
				description: "Envias un mensaje mental al objetivo sin tener que verbalizar, el objetivo te escucha y puede responderte inmediatamente con 1 frase, tras lo cual este efecto termina."
			}
			]
	},
	{
		name: "Mensaje",
		category: "Efecto",
		description: "Puedes comunicarte con el objetivo con normalidad como si hablaran el mismo idioma por el resto de la escena.",
		emote: "🗨️",
	},
	{
		name: "Secundaria Añadida",
		category: "Efecto",
		description: "Esta skill también cuenta como una secundaria relacionada a uno de tus oficios al ser usada (definida durante creación).",
		emote: "🧑‍🔧",
	},
	{
		name: "Movimiento Añadido",
		category: "Efecto",
		description: "Usas una acción de movimiento como parte de esta skill.",
		emote: "🚶",
	},
	{
		name: "Spiderwalk",
		category: "Efecto",
		description: "Hasta el final de tu siguiente turno, el objetivo puede utilizar su movimiento con normalidad por superficies verticales, y caminar boca abajo por los techos, manteniendo sus manos libres.",
		emote: "🕷️",
	},
	{
		name: "Ración",
		category: "Efecto",
		description: "El objetivo recibe los nutrientes de una ración completa.",
		emote: "🍠",
	},
	{
		name: "Alterar Emoción",
		category: "Efecto",
		description: "Por el resto de la escena, haces que el objetivo sienta una emoción profundamente (definida durante creación).",
		emote: "🎭",
	},
	{
		name: "Bolsillo Dimensional",
		category: "Efecto",
		description: "Por el resto de la escena, el objetivo desaparece de la escena y es transportado a una dimensión de bolsillo. Puedes usar una acción de mantenimiento para hacer reaparecer a los objetivos afectados en una zona segura frente a ti.",
		emote: "🎒",
	},
	{
		name: "Identificar Herida",
		category: "Efecto",
		description: "Aprendes los HP actuales del objetivo. Si este efecto es aplicado sobre una herida, puedes aprender el tipo de daño que causó la herida.",
		emote: "📝",
	},
	{
		name: "Traje",
		category: "Efecto",
		description: "Cambias inmediatamente la vestimenta del objetivo.",
		emote: "👔",
	},
	{
		name: "Transformar",
		category: "Efecto",
		description: "Cambias tu apariencia a una obviamente mágica por el resto de la escena, si eres afectado una segunda vez por este módulo, el efecto termina. Una vez este efecto termina, todos los módulos que te estén afectando terminan instantáneamente.",
		emote: "🐺",
	},
	{
		name: "Identificar 1",
		category: "Efecto",
		description: "Identificas el nombre y oficios del objetivo. Si el objetivo está afectado por una skill, puedes identificar sus efectos y restricciones.",
		emote: "📟",
	},
	{
		name: "Inmovilizar 1",
		category: "Efecto",
		description: "El objetivo no puede utilizar la acción de movimiento hasta el final de tu siguiente turno.",
		emote: "🚷",
	},
	{
		name: "Dibujar",
		category: "Efecto",
		description: "Dejas una efecto visual, un dibujo, o un mensaje escrito, sobre la superficie del objetivo. Este módulo es de duración indefinida, pero puede ser resistido como cualquier otro efecto.",
		emote: "🪧",
	},
	{
		name: "Teletransportar Objeto 1",
		category: "Efecto",
		description: "El objetivo recibe un objeto que tengas equipado. En caso de que el objetivo sea una criatura, lo debe recibir en una o ambas manos. En caso de que haya más de un objetivo, tú eliges quien lo recibe.",
		emote: "📨",
	},
	{
		name: "Debuff 1",
		category: "Efecto",
		description: "La próxima vez que el objetivo realice una acción, este recibe un -3 al acierto.",
		emote: "🫗",
	},
	{
		name: "Buff 1",
		category: "Efecto",
		description: "Hasta el final de la escena, el objetivo gana un +1 a sus tiradas de ataque.",
		emote: "👯",
	},
	{
		name: "Ilusión Aromatica",
		category: "Efecto",
		description: "El objetivo recibe un olor particular. Este efecto es inmediato, pero el olor queda impregnado sobre el objetivo hasta que se intente limpiar.",
		emote: "🐽",
	},
	{
		name: "Ilusión Sensorial",
		category: "Efecto",
		description: "El objetivo recibe una ilusión sensorial. Este efecto puede llegar a hacer sentir dolor, pero no infringir daño directamente.",
		emote: "💆",
	},

		// Rangos
	{
		name: "Toque",
		category: "Rango",
		description: "Afectan a un objetivo a distancia de toque.",
		emote: "👊",
	},
	{
		name: "Proyectil 1",
		category: "Rango",
		description: "Disparas un proyectil que viaja una distancia de 15 casillas.",
		emote: "🗡️",
	},
	{
		name: "Área 1",
		category: "Rango",
		description: "Afectas a un área de 3x3 casillas.",
		emote: "🔴",
	},
	{
		name: "Orbe 1",
		category: "Rango",
		description: "Afectas a un área esférica diminuta que se origina flotando a distancia de 2 casillas o menos de ti. El área se mantiene siempre a la misma distancia y posición relativa a ti.",
		emote: "🏐",
	},
	{
		name: "Área Remota 1",
		category: "Rango",
		description: "Afectas un área de una casilla que se origina a 5 casillas o menos de ti.",
		emote: "🔹",
	},
	{
		name: "Línea 1",
		category: "Rango",
		description: "Afectas a un área lineal que se extiende hasta una distancia de 3 casillas, y se origina desde el usuario.",
		emote: "🍡",
	},
	{
		name: "Objetivo 1",
		category: "Rango",
		description: "Afectas a un objetivo a 12 casillas o menos de ti.",
		emote: "👉",
	},
	{
		name: "Proyectil Viviente 1",
		category: "Rango",
		description: "Invocas a 1 proyectil viviente que contiene los módulos dentro de este rango. <br>Los Proyectiles vivientes tienen un MOV de 7, HR+5 de HP,y al final de cada uno de sus turnos pierden -5 HP. <br>En combate toman su turno directamente después de ti, y únicamente pueden usar acciones para intentar impactar contra un objetivo, haciendo una tirada de ataque con las stats de esta skill. En un acierto, el proyectil desaparece y los efectos son aplicados. ",
		emote: "🐝",
	},
	{
		name: "Crear 1",
		category: "Rango",
		description: "Creas un objeto que contiene el resto de módulos dentro de este rango. Cualquier criatura puede usar una acción para consumir el objeto creado, y activar esta skill como el usuario.",
		emote: "🎁",
	},
	
	// Especiales
	{
		name: "Pausa",
		category: "Especial",
		description: "Los módulos a la derecha se aplican pero no activan hasta usar acción de mantenimiento. Al final de escena se activan todos.",
		emote: "⏸️",
	},
	{
		name: "Nocturna",
		category: "Especial",
		description: "Se activa automáticamente bajo luz de luna. Efectos terminan bajo luz solar.",
		emote: "🌃",
	},
	
	// 2 Skill Points Modules
	{
		name: "Cura 2",
		category: "Efecto",
		description: "El objetivo recupera 10 HP.",
		emote: "🩹",
	},
	{
	name: "Prestidigitación 2",
	category: "Efecto",
	description: "Al activar este efecto el usuario puede escoger una de las siguientes opciones. Solo puede escoger opciones para los que haya aprendido el módulo relacionado.",
	emote: "🌈",
	effects: [
		{
			emote: "🔥",
			description: "Creas un fuego en las casillas objetivo. Una criatura que termine su turno dentro del fuego recibe 5 de daño de fuego."
		},
		{
			emote: "❄️",
			description: "Hasta el final de la escena, creas una corriente de agua en las casillas objetivo. Una criatura que termine su turno dentro de la corriente es movida por la corriente hasta que salga del rango."
		},
		{
			emote: "🌪️",
			description: "Hasta el final de la escena, creas un tornado en las casillas objetivo. Una criatura que termina su turno en el tornado es empujada 5 casillas en una dirección a tu elección."
		},
		{
			emote: "⚡",
			description: "Hasta el final de la escena, creas una tormenta eléctrica en las casillas objetivo. Una criatura que termina su turno en la tormenta recibe 5 de daño eléctrico cada vez que utiliza una skill con requerimiento."
		},
		{
			emote: "🧱",
			description: "Hasta el final de la escena, creas arena movediza en las casillas objetivo. La arena reduce el Mov de las criaturas que caminan por ella en -3."
		},
		{
			emote: "🌑",
			description: "Hasta el final de la escena, creas un área de noche mágica en las casillas objetivo."
		},
		{
			emote: "☀️",
			description: "Hasta el final de la escena, creas un área de día mágico en las casillas objetivo."
		}
	]
},
	{
		name: "Oferta de Trabajo",
		category: "Efecto",
		description: "Por el resto de la escena, el objetivo gana 1 oficio a tu elección (definido durante creación).",
		emote: "💼",
	},	
	{
		name: "Dispel",
		category: "Efecto",
		description: "Terminas un efecto que haya sido aplicado sobre el objetivo durante esta escena.",
		emote: "🧯",
	},
	{
		name: "Invertir Movimiento 2",
		category: "Efecto",
		description: "Hasta el final de la escena, cada vez que el objetivo usa MOV para acercarse o alejarse al usuario de esta skill, puedes invertir la dirección de su movimiento.",
		emote: "😵‍💫",
	},
	{
		name: "Debuff 2",
		category: "Efecto",
		description: "Reduces el tamaño de dado de una de las stats (definida durante creación) por la escena.",
		emote: "🧑‍🦽",
	},
	{
		name: "Vuelo",
		category: "Efecto",
		description: "Otorga movimiento de vuelo por el resto de la escena.",
		emote: "🪽",
	},
	{
		name: "Movimiento Adicional",
		category: "Efecto",
		description: "Por el resto de la escena, el objetivo puede realizar una acción de movimiento gratuita adicional una vez por turno.",
		emote: "🏃‍♂️",
	},
	{
		name: "Mover 2",
		category: "Efecto",
		description: "Mueves a el objetivo 5 casillas en línea recta.",
		emote: "💨",
	},
	{
		name: "Velocidad 2",
		category: "Efecto",
		description: "Por la escena, el objetivo aumenta su MOV en +3.",
		emote: "🛹",
	},
	{
		name: "Desplazar 2",
		category: "Efecto",
		description: "Hasta el final de tu turno, cuando uses una acción de movimiento, el objetivo también es desplazado imitando tus movimientos.",
		emote: "🚂",
	},
	{
		name: "Teletransportar 2",
		category: "Efecto",
		description: "Este módulo se mantiene aplicado por una duración indefinida. Sin importar la distancia, el usuario puede utilizar una interacción con objeto para hacer aparecer el objetivo en su mano, y en caso de poder, equiparlo, este módulo termina tras ello.",
		emote: "📑",
	},
	{
		name: "Resistencia Elemental",
		category: "Efecto",
		description: "Escoge un elemento (definido durante creación), ganas resistencia contra el elemento escogido por el resto de la escena.",
		emote: "💍",
	},
	{
		name: "Reducir Daño 2",
		category: "Efecto",
		description: "Este módulo se mantiene aplicado por una duración indefinida. La próxima vez que el objetivo recibe daño, reduce el daño de 1 elemento a tu elección a 0, este módulo termina tras ello.",
		emote: "🎈",
	},
	{
		name: "Detectar 2",
		category: "Efecto",
		description: "Aprendes la ubicación exacta de todos los objetivos dentro del rango. Si la tirada de ataque de una skill con este módulo falla, aun aprendes la cantidad de objetivos dentro del área afectada.",
		emote: "🚩",
	},
	{
		name: "Vínculo Telepático",
		category: "Efecto",
		description: "Creas un vínculo telepático con el objetivo, hasta el final de tu siguiente turno, tu y los objetivo pueden comunicarse sin necesidad de hablar.",
		emote: "🦻",
	},
	{
		name: "Olvido Selectivo",
		category: "Efecto",
		description: "Escoge 5 palabras (definidas durante creación). Por el resto de la escena, el objetivo olvida por completo las palabras escogidas, y es incapaz de vocalizar las palabras o palabras similares.",
		emote: "🙊",
	},
	{
		name: "Sordera Selectiva",
		category: "Efecto",
		description: "Por el resto de la escena, los objetivos sufren de sordera selectiva. Escoge una o más criaturas (sin importar si fueron afectadas por este efecto), el objetivo se vuelve incapaz de escuchar y comprender a los objetivos seleccionados.",
		emote: "🙉",
	},
	{
		name: "Incrementar Defensa 2",
		category: "Efecto",
		description: "El objetivo aumenta su defensa física o mágica (definido en creación) en +1 por el resto de la escena.",
		emote: "⛑️",
	},
	{
		name: "Resistencia Añadida",
		category: "Efecto",
		description: "Esta skill tambien cuenta como una tirada de resistencia contra uno de tus efectos activos.",
		emote: "🧽",
	},
	{
		name: "Inmovilizar 2",
		category: "Efecto",
		description: "El objetivo no puede utilizar la acción de movimiento hasta el final de la escena.",
		emote: "🚳",
	},
	{
		name: "Transformar 2",
		category: "Efecto",
		description: "Hasta el final de la escena, transformas las cualidades de un objetivo a otras cualidades equivalentes. Al afectar a un objeto, cambias el objeto por otro de valor, tamaño, y rareza equivalentes, que se componga por los mismos materiales que el original. Al afectar a una criatura, puedes cambiar cualidades físicas como su altura, género, o raza. Ademas, puedes consumir +2 PE para cambiar un perk de origen del objetivo por otro. ",
		emote: "🏷️",
	},
	{
		name: "Terraformar 2",
		category: "Efecto",
		description: "Creas una superficie navegable en el suelo bajo el objetivo. <br>La superficie cubre todas las casillas directamente bajo el objetivo, flota en sitio aún sin soportes, y se puede navegar a una velocidad de movimiento normal, aunque haya terreno difícil bajo ella.",
		emote: "🪜",
	},
	
	// Rangos
	{
		name: "Línea 2",
		category: "Rango",
		description: "Afectas a un área lineal que se extiende hasta 6 casillas.",
		emote: "➡️",
	},
	{
		name: "Proyectil 2",
		category: "Rango",
		description: "Disparas un proyectil que viaja 25 casillas.",
		emote: "🏹",
	},
	{
		name: "Conexión Eléctrica",
		category: "Rango",
		description: "Afectas objetivos a menos de 5 casillas de conexiones eléctricas que toques.",
		emote: "🔌",
	},
	{
		name: "Objetivo 2",
		category: "Rango",
		description: "Afectas a un objetivo que puedas ver.",
		emote: "👁️",
	},
	{
		name: "Objetivo Multiple 2",
		category: "Rango",
		description: "Afectas a 2 objetivos a 8 casillas o menos.",
		emote: "✌️",
	},
	{
		name: "Crear 2",
		category: "Rango",
		description: "Creas 3 objetos pequeños que contienen los modulos anidados dentro de este rango. Cualquier criatura puede usar una acción para consumir estos objetos, y activar la skill.",
		emote: "🫘",
	},
	{
		name: "Imbuir Criatura",
		category: "Rango",
		description: "Inscribes los módulos dentro de este rango sobre el objetivo. <br>El objetivo puede usar una acción de mantenimiento para aplicar uno de los módulos contenidos al rango de toque o de self como un ataque mágico.",
		emote: "🦸",
	},
	
	// Especiales
	{
		name: "Apuntar",
		category: "Especial",
		description: "Aumenta el acierto de esta skill en +2.",
		emote: "🔍",
	},
	{
		name: "Origen 2",
		category: "Especial",
		description: "Todos los rangos se originan desde el usuario sin anidarse.",
		emote: "⏯️",
	},
	{
		name: "Exclusión 2",
		category: "Especial",
		description: "Los módulos dentro de este rango no afectan a un tipo de objetivo específico (definido en creación)",
		emote: "▶️",
	},
	{
		name: "Interceptar",
		category: "Especial",
		description: "Cuando una criatura aparte del usuario improvise una skill, puedes utilizar esta skill, pero la criatura en cuestión debe ser el único objetivo.",
		emote: "📛",
	},

	// 3 Skill Points Modules
	{
		name: "Ataque Efectivo",
		category: "Efecto",
		description: "Para cálculos de HR en esta skill, puedes sumar el resultado de ambas stats.",
		emote: "👹",
	},
	{
		name: "Furia",
		category: "Efecto",
		description: "Reduce la defensa o defensa mágica del objetivo para aumentar su DMG. <br>Por cada punto que restes a las defensas, aumenta el DMG en +3. Puedes reducir un máximo de -5 entre las 2 defensas. <br>Al final de cada turno del objetivo, este efecto termina si el objetivo no ha hecho una tirada de ataque esta ronda.",
		emote: "💢",
	},
	{
		name: "Buff 3",
		category: "Efecto",
		description: "Aumentas el tamaño de dado de una de las stats (definida durante creación) por la escena.",
		emote: "💪",
	},
	{
		name: "Incrementar Defensa 3",
		category: "Efecto",
		description: "Aumentan defensa física o mágica (definido en creación) en +2 por la escena.",
		emote: "🪖",
	},
	{
		name: "Efecto Ilusorio",
		category: "Efecto",
		description: "Creas una ilusión que imita sólo en apariencia el efectos de cualquier otro módulo de tu self core (definido durante creación). La duración de este módulo depende del módulo estés imitando.",
		emote: "⚽",
	},
	{
		name: "Olvido",
		category: "Efecto",
		description: "El objetivo olvida un suceso. Mantiene la sensación de algo faltante y puede llegar a recordarlo de experimentar un suceso similar o idéntico.",
		emote: "❔",
	},
	{
		name: "Superioridad",
		category: "Efecto",
		description: "El objetivo te percibe como un superior de cualquier jerarquía a la que pertenezca. <br>Usando una acción, puedes darle una orden, obligandole a obedecer cualquier comando que coincida con sus motivaciones. Obtienes un +5 a cualquier tirada para convencer o intimidar al objetivo.",
		emote: "👑",
	},
	{
		name: "Recuerdo Falso",
		category: "Efecto",
		description: "Creas un recuerdo falso en el objetivo que es indistinguible de cualquier recuerdo real, requiriendo un análisis mágico para ser siquiera detectado. No permite borrar o modificar, solo crear.",
		emote: "🗂️",
	},
	{
		name: "Teletransportar 3",
		category: "Efecto",
		description: "El objetivo del rango a la izquierda de este módulo es teletransportado al punto de impacto del rango a la derecha de este módulo.",
		emote: "🎱",
	},
	{
		name: "Escudo 3",
		category: "Efecto",
		description: "Aumentas la defensa física o mágica (definido en creación) hasta el inicio del siguiente turno en +4. (Este efecto cuenta como instantáneo).",
		emote: "🛡️",
	},
	{
		name: "Terraformar 3",
		category: "Efecto",
		description: "Alteras el terreno afectado.",
		emote: "⚒️",
	},
	{
		name: "Identificar 3",
		category: "Efecto",
		description: "Al hacerlo, escoge una de las siguientes opciones: Descubrir las stats, descubrir un secreto del objetivo, o descubrir las debilidades elementales del objetivo.",
		emote: "🪪",
	},
	{
		name: "Ceguera Selectiva",
		category: "Efecto",
		description: "Hasta el inicio de tu siguiente turno, el objetivo sufre de ceguera selectiva. <br>Escoge una criatura u objeto (sin importar si fueron afectadas por este efecto), el objetivo se vuelve incapaz de mirar a lo seleccionado, volviéndolo invisible a sus ojos.",
		emote: "🙈",
	},
	{
		name: "Percepción Remota",
		category: "Efecto",
		description: "Expandes tu percepción como si observaras desde el objetivo afectado. Si el objetivo tiene skills, aprendes el nombre y efecto de una de (a elección del objetivo).",
		emote: "🧿",
	},
	{
		name: "Levitar",
		category: "Efecto",
		description: "El objetivo levita levemente sobre el suelo. Hasta el inicio de tu siguiente turno, el objetivo no puede usar su acción de movimiento, y al ser empujado, este se continua moviendo en la misma dirección y velocidad cada vez que este toma una acción o acción gratuita.",
		emote: "🕴️",
	},
	{
		name: "Movimiento Instantaneo",
		category: "Efecto",
		description: "Hasta el inicio de tu siguiente turno, cuando el objetivo utiliza una acción de movimiento, este puede en su lugar teletransportarse una distancia igual o menor a so MOV.",
		emote: "🛬",
	},
	{
		name: "Paso cuidadoso",
		category: "Efecto",
		description: "Hasta el final de la escena, mientras utiliza una acción de movimiento, el objetivo no es afectado por áreas de efectos.",
		emote: "👠",
	},

	{
		name: "Invertir Movimiento 3",
		category: "Efecto",
		description: "Hasta el final de la escena, cada vez que el objetivo se desplaza, voluntaria o involuntariamente, para acercarse o alejarse del usuario de esta skill, puedes invertir la dirección hacia la cual es desplazado.",
		emote: "💫",
	},
	{
		name: "Inmovilizar 3",
		category: "Efecto",
		description: "El objetivo no puede ser movido de su posición actual hasta el final de tu siguiente turno.",
		emote: "🚧",
	},
	{
		name: "Reducir Daño 3",
		category: "Efecto",
		description: "Reduces el daño que el objetivo recibe de un elemento (definido durante creación) por el resto de la escena en LR.",
		emote: "🐘",
	},
	{
		name: "Aumento de Alcance",
		category: "Efecto",
		description: "Aumenta el alcance de uno de rangos de esta skill en 5 casillas. Al afectar los rangos de toque, también puedes interactuar con objetos a mayor distancia de ti. Al afectar áreas, aumentas el radio del área en 1 casilla.",
		emote: "🦒",
	},
	{
		name: "Santuario",
		category: "Efecto",
		description: "Hasta el final de tu siguiente turno, el objetivo se vuelve incapaz de intencionalmente seleccionar a una criatura a tu elección (definida durante creación) como objetivo de sus skills.",
		emote: "✝️",
	},
	{
		name: "Ininterrumpido",
		category: "Efecto",
		description: "Este módulo se mantiene aplicado por una duración indefinida. Cuando una skill del objetivo es interrumpida exitosamente, este puede escoger un nuevo objetivo dentro del rango para su skill, este módulo termina tras ello.",
		emote: "😮‍💨",
	},
	{
		name: "Origen Añadido",
		category: "Efecto",
		description: "Hasta el final de la escena, el objetivo recibe los efectos de 1 perk racial.",
		emote: "🧬",
	},
	{
		name: "Restringir 3",
		category: "Efecto",
		description: "Escoge una stat (Definida durante creación). El objetivo es incapaz de utilizar cualquier acción que no incluya la stat escogida.",
		emote: "🕺",
	},

		// Rangos
	{
		name: "Lluvia de Proyectiles",
		category: "Rango",
		description: "Disparas 5 proyectiles a distintos objetivos desde el cielo.",
		emote: "🌧️",
	},
	{
		name: "Aura",
		category: "Rango",
		description: "Afectas a todos los objetivos a rango de toque.",
		emote: "🌀",
	},
	{
		name: "Área 3",
		category: "Rango",
		description: "Afectas área de 5x5 casillas.",
		emote: "🔶",
	},
	{
		name: "Objetivo Multiple 3",
		category: "Rango",
		description: "Afectas a todos los objetivos que a 5 casillas o menos de ti que estés viendo.",
		emote: "👀",
	},	
	{
		name: "Objetivo 3",
		category: "Rango",
		description: "Afectas objetivos aunque no puedas verlos.",
		emote: "🐑",
	},
	{
		name: "Enjambre de Proyectiles Vivientes",
		category: "Rango",
		description: "Invocas 3 proyectiles vivientes con módulos.",
		emote: "🍯",
	},
	{
		name: "Familiar 3",
		category: "Rango",
		description: "Una skill con este módulo debe ser activa como pasiva. Invocas a un familiar. El familiar es una criatura independiente, leal, pero capaz de tomar sus propias decisiones. <br>Al ser creado, el familiar recibe los módulos de efecto de este rango como efectos pasivos.	El familiar tiene un d6 para todas sus stats y 10 HP máximos, pero es incapaz de usar energía. <br>Durante creación puedes gastar +1 PE para elegir una de las siguientes mejoras, puedes tomar cada opción más de una vez:",
		effects: 
		[
			{emote: "-", description: "Aumentar dos de las stats base del familiar en un tamaño o una stat en 2 tamaños."},
			{emote: "-", description: "Aumentar los HP máximos del familiar en +15"},
			{emote: "-", description: "Darle una de tus skills al familiar (mientras la skill siga activa, no serás capaz de usar la skill elegida."}
		],
		emote: "🧚",
	},
	{
		name: "Rastro de Efectos",
		category: "Rango",
		description: "Hasta el final de este turno, con cada paso que das usando tu MOV, dejas atrás esta área de efecto en cada casilla que abandonas.",
		emote: "👣",
	},
	{
		name: "Orden 3",
		category: "Rango",
		description: "Escoge una acción secundaria (Definida durante creacion). Todas las criaturas en escena que escuchen tu voz deben utilizar la secundaria escogida antes del final de sus turnos, o ser automáticamente afectados por este rango. Para propósitos de este rango, el HR se considera un 5.",
		emote: "🫡",
	},


	// Especiales
	{
		name: "Contraataque",
		category: "Especial",
		description: "Una skill con este módulo se activa automáticamente al sufrir daño.",
		emote: "🌵",
	},
	{
		name: "Reflejar",
		category: "Especial",
		description: "Puedes reemplazar este módulo con uno de los modulos de la última skill que te haya afectado, o con un modulo que te este afectando actualmente.",
		emote: "🪞",
	},
	{
		name: "Imperceptible",
		category: "Especial",
		description: "Otras criaturas no pueden usar acciones gratuitas para reaccionar a una skill con este módulo. El objetivo de la skill no puede percibir tu acción, sólo el resultado.",
		emote: "🥷",
	},
	{
		name: "Acierto Certero",
		category: "Especial",
		description: "Independientemente del resultado de la tirada de stats, el acierto de una skill con este módulo siempre es un 13.",
		emote: "🎯",
	},

	// 4 Skill Points Modules
	{
		name: "Acción Forzada",
		category: "Efecto",
		description: "El objetivo realiza inmediatamente una acción de movimiento hacia una dirección que tu escojas, o realiza una acción secundaria a tu elección (definida durante creación).",
		emote: "🧸",
	},
	{
		name: "Restringir 4",
		category: "Efecto",
		description: "Escoge una stat (Definida durante creación). El objetivo es incapaz de utilizar cualquier acción que incluya la stat escogida.",
		emote: "🔒",
	},

	{
		name: "Invisibilidad",
		category: "Efecto",
		description: "Hasta el final de tu siguiente turno, el objetivo se vuelve invisible. Una criatura invisible gana un bono circunstancial a sus tiradas de sigilo, y solo puede ser seleccionado como objetivo de skills con un rango de área.",
		emote: "🕵️",
	},
	{
		name: "Sacrificio Vital",
		category: "Efecto",
		description: "Reduces el coste de energía de esta skill, pero pierdes 5 hp máxima por cada punto de PE que reduzcas (definido durante creación). Al final de la escena recuperas los puntos de golpe máximos (pero no la hp perdida).",
		emote: "C4",
	},
	{
		name: "Balance",
		category: "Efecto",
		description: "Reduce una o más stats a tu elección (definida durante creación) del objetivo hasta un mínimo de un d6. Por cada nivel de stat reducido, aumenta otra stat un nivel (definida durante creación).",
		emote: "📊",
	},
	
	// Rangos
	{
		name: "Aliado como Origen",
		category: "Rango",
		description: "Activas la skill como si fueras un aliado, afectándolo a él en lugar de a ti.",
		emote: "🫂",
	},
	{
		name: "Filtro de Módulo",
		category: "Rango",
		description: "Afectas a todos en escena afectados por un módulo específico.",
		emote: "🔖",
	},
	
	// Especiales
	{
		name: "Reacción 4",
		category: "Especial",
		description: "Una vez por ronda, consumes acción del próximo turno para activar fuera de turno.",
		emote: "⏰",
	},
	{
		name: "Skill Dinámica",
		category: "Especial",
		description: "Los módulos de efecto de esta skill que pidan definir una opción durante la creación de skill, te permiten en su lugar escoger una opción al activar la skill.",
		emote: "🔀",
	},
	{
		name: "Irresistible",
		category: "Especial",
		description: "Escoge 1 de los módulos de efecto de esta skill (Definido durante creación). Una vez aplicado, este efecto no puede ser resistido.",
		emote: "🗜️",
	},

	// 5 Skill Points Modules
	{
		name: "Pregunta",
		category: "Efecto",
		description: "Haz una pregunta de si o no sobre las acciones que el objetivo tomará en su siguiente turno. Hasta el inicio de tu siguiente turno, el objetivo debe usar sus acciones de forma que no contradiga su respuesta a tu pregunta.",
		emote: "🪬",
	},
	{
		name: "Pasaje Abismal",
		category: "Efecto",
		description: "El objetivo desaparece de la escena hasta el inicio de tu siguiente turno, y es transportado al abismo. Mientras el efecto se mantenga activo, el objetivo solo puede ser afectado por otras criaturas en escena afectadas por 🕳️. Cuando el efecto termina, el objetivo regresa a la escena en su posición original.",
		emote: "🕳️",
	},
	{
		name: "Inmunidad a Rango",
		category: "Efecto",
		description: "El objetivo no es afectado por 1 módulo de rango (definido durante creación) por el resto de la escena.",
		emote: "E5",
	},
	{
		name: "Supervivencia",
		category: "Efecto",
		description: "Cuando el objetivo es reducido a 0 HP, este no es derrotado y en lugar de eso se mantiene con 1 HP, tras ello este efecto termina.",
		emote: "🧟",
	},
	{
		name: "Acción Adicional",
		category: "Efecto",
		description: "El objetivo puede pagar 2 PE para realizar una acción directamente después tras la resolución de una skill con este módulo.",
		emote: "🦔",
	},
		// Rangos
	{
		name: "Área 5",
		category: "Rango",
		description: "Afectas a todos los objetivos en la escena.",
		emote: "🌆",
	},
	
	// Especiales
	{
		name: "Reacción 5",
		category: "Especial",
		description: "Una vez por ronda, puedes consumir +2 PE para activar esta skill fuera de tu turno.",
		emote: "⏲️",
	},
	{
		name: "Ataque Múltiple",
		category: "Especial",
		description: "Cada módulo de rango de esta skill se coincidiera un ataque independiente. Haz una tirada de ataque por cada módulo de rango, y selecciona un objetivo para cada ataque (puedes seleccionar al mismo objetivo varias veces).",
		emote: "💱",
	}
];

const moduleCatalog = {
	orb: {
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
	lunaCourt: {
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
	express: {
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
	vita: {
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
	wiccrat: {
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
	umbra: {
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
/*	karma: {
		tier1: [
			{ name: "Fuego", restriction: null},
		],
		tier2: [],
		statUpgrades: {
			tier1: [
				{ name: "WLP +1", description: "Gain +1 WLP." },
			],
			tier2: [],
		},
		perks: {
			tier1: [
				{ name: "Night Vision", description: "Gain enhanced vision in darkness." },
			],
			tier2: [],
		},
	}, 	*/
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
		se: 0,
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
	// Compute base values
	const hpBase = 3 * (parseInt(stats.mig.dice || 8, 10) + parseInt(stats.mig.temp || 0));
	const epBase = parseInt(stats.wlp.dice || 8, 10) + parseInt(stats.wlp.temp || 0);
	const dfBase = parseInt(stats.dex.dice || 8, 10) + parseInt(stats.dex.temp || 0);
	const dmBase = parseInt(stats.int.dice || 8, 10) + parseInt(stats.int.temp || 0);
	const imprBase = Math.max(
		0,
		Math.floor(
			(parseInt(stats.stl.dice || 8, 10) + parseInt(stats.stl.temp || 0) - 6) / 2
		)
	);
	const movBase = Math.floor(
		(parseInt(stats.mig.dice || 8, 10) +
			parseInt(stats.dex.dice || 8, 10) +
			parseInt(stats.mig.temp || 0) +
			parseInt(stats.dex.temp || 0)) /
			2
	);

	// Apply permanent bonuses
	const hpTotal = hpBase + (activeCharacter.permanentBonuses?.hp || 0);
	const epTotal = epBase + (activeCharacter.permanentBonuses?.ep || 0);
	const dfTotal = dfBase + (activeCharacter.permanentBonuses?.df || 0);
	const dmTotal = dmBase + (activeCharacter.permanentBonuses?.dm || 0);
	const imprTotal = imprBase + (activeCharacter.permanentBonuses?.impr || 0);
	const movTotal = movBase + (activeCharacter.permanentBonuses?.mov || 0);
	const atkTotal = (activeCharacter.permanentBonuses?.atk || 0);
	const dmgTotal = (activeCharacter.permanentBonuses?.dmg || 0);
	console.log(epTotal);
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
			value: (permanentBonuses.atk || 0),
			temp: currentSecondaryStats.atk?.temp || 0
		},
		dmg: {
			value: (permanentBonuses.dmg || 0),
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
		se: parseInt(document.getElementById("se") ? document.getElementById("se").value : 0) || 0,
		ce: parseInt(document.getElementById("ce") ? document.getElementById("ce").value : 0) || 0,
		permanentBonuses: activeCharacter.permanentBonuses || {},
		notes: activeCharacter.notes || "",
	};

	return characterData;
}

// Populate character data from imported JSON
function populateCharacterData(data) {
	console.log("Populating character data:", data);

	// Set character name
	const charNameInput = document.getElementById("charName");
	charNameInput.value = data.name || "";

	// Populate primary stats (flat structure)
	["mig", "dex", "int", "stl", "wlp"].forEach((stat) => {
		const diceElement = document.getElementById(stat + "Dice");
		const tempElement = document.getElementById(stat + "Temp");

		if (diceElement) {
			diceElement.value = data.stats?.[stat]?.dice || 8; // Default to 8
		} else {
			console.warn("Element " + stat + "Dice not found!");
		}

		if (tempElement) {
			tempElement.value = data.stats?.[stat]?.temp || 0; // Default to 0
		} else {
			console.warn("Element " + stat + "Temp not found!");
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

		// Get base value from calculation
		const baseValue = recalculatedSecondaryStats[stat]?.value || 0;
		const permanentBonus = data.permanentBonuses?.[stat] || 0;
		const tempValue = recalculatedSecondaryStats[stat]?.temp || 0;
		const total = baseValue + tempValue;

		if (valueElement) {
			valueElement.textContent = total + " (" + tempValue + ")";
		}

		if (tempElement) {
			tempElement.value = tempValue;
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
	document.getElementById("ce").value = data.ce || 0;
	document.getElementById("se").value = data.se || 0;
	updateCEDisplay();
	syncExperienceInputs();
	loadSelfCoreContent();
	updateSEDisplay();
	updateStatUpgrades();
	loadOriginPerks();


	// Populate jobs
	loadJobs(data.jobs || []);
	calculateAvailableJobs();

	// Populate skills
	renderSkills();

	// Load learned modules for the character
	loadLearnedModules();
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
	activeCharacter.permanentBonuses = {}; // Reset bonuses

	Object.keys(moduleCatalog).forEach(catalogName => {
		const catalog = moduleCatalog[catalogName];
		if (!catalog.statUpgrades) return;

		Object.keys(catalog.statUpgrades).forEach(tierKey => {
			const tier = tierKey;
			const statUpgradeList = catalog.statUpgrades[tier];
			if (!statUpgradeList) return;

			// Count modules in this catalog and tier
			const modulesInTier = activeCharacter.modules[tier] || [];
			const moduleCount = modulesInTier.filter(module => 
				module.catalogs.includes(catalogName)
			).length;

			const earnedUpgrades = Math.floor(moduleCount / 3);

			for (let i = 0; i < earnedUpgrades; i++) {
				const upgradeIndex = i % statUpgradeList.length;
				const upgrade = statUpgradeList[upgradeIndex];
				const match = upgrade.name.match(/(HP|EP|MOV|DF|DM|IMPR|ATK|DMG)\s+\+(\d+)/i);
				
				if (match) {
					const stat = match[1].toLowerCase();
					const amount = parseInt(match[2], 10);
					activeCharacter.permanentBonuses[stat] = (activeCharacter.permanentBonuses[stat] || 0) + amount;
				}
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
			se: { value: 0, temp: 0 },
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
	
	// Attach event listeners for CE and SE inputs across all sections
	document.querySelectorAll('#ce, #se, #ceCore, #seSkills').forEach(input => {
		input.addEventListener("change", () => {
			activeCharacter.secondaryStats.ce = parseInt(document.getElementById("ce").value) || 0;
			activeCharacter.secondaryStats.se = parseInt(document.getElementById("se").value) || 0;
			saveCharacterData();
			syncExperienceInputs();
			updateCEDisplay();
			updateSEDisplay();
		});
	});
	
	// Add skill button
	document.getElementById("addSkill").addEventListener("click", () => {
		const skillForm = createSkillForm();
		document.getElementById("skillsList").appendChild(skillForm);
	});
	
	calculateAvailableJobs();
	loadSelfCoreContent();
	loadOriginPerks();
	updateSEDisplay();
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
	const seValue = activeCharacter.se || 0;
	
	document.querySelectorAll('[id^="ce"], [id^="se"]').forEach(input => {
		if(input.id.includes("ce")) input.value = ceValue;
		if(input.id.includes("se")) input.value = seValue;
	});
}

function calculateUsedSE() {
	if (!activeCharacter.skills) return 0;
	return activeCharacter.skills.reduce((total, skill) => total + (skill.cost || 0), 0);
}
	
function updateSEDisplay() {
	const totalSE = activeCharacter.se || 0;
	const usedSE = calculateUsedSE();
	document.getElementById("seCounter").textContent = 
		`${usedSE} SE / ${totalSE} SE max`;
}

	// Attach tooltip events to module buttons
function attachTooltipToModuleButtons() {
		document.querySelectorAll(".module-button").forEach(button => {
				const moduleName = button.dataset.module;
				const module = moduleLibrary.find(m => m.name === moduleName);
				const restriction = moduleCatalog[activeCatalog][button.dataset.tier]
						.find(m => m.name === moduleName).restriction || null;

				if (module) {
						button.addEventListener("mouseenter", () => showTooltip(module, restriction, button));
						button.addEventListener("mouseleave", hideTooltip);
				}
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

	const tierModules = activeCharacter.modules[tier];
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
			moduleData.restrictions.length > 0 ? moduleData.restrictions.join(", ") : "None";
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

                            const modulesInTier = activeCharacter.modules[tierKey]?.filter(m =>
                                m.catalogs.includes(coreName)
                            ).length || 0;
                            const earnedUpgrades = Math.floor(modulesInTier / 3);
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
	
function unlockStatUpgrade(coreName, tier) {
	const statUpgrades = moduleCatalog[coreName].statUpgrades[tier];
	if (!statUpgrades || statUpgrades.length === 0) return;

	if (!activeCharacter.statUpgrades) activeCharacter.statUpgrades = {};
	if (!activeCharacter.statUpgrades[coreName]) activeCharacter.statUpgrades[coreName] = {};
	if (!activeCharacter.statUpgrades[coreName][tier]) activeCharacter.statUpgrades[coreName][tier] = [];

	// Get the next stat upgrade in order
	const nextStatUpgrade = statUpgrades[activeCharacter.statUpgrades[coreName][tier].length];
	if (nextStatUpgrade) {
		activeCharacter.statUpgrades[coreName][tier].push(nextStatUpgrade);
		console.log("Unlocked Stat Upgrade:", nextStatUpgrade.name);
		saveCharacterData();
	}
}

function updatePerkAvailability(coreName, tier) {
	const modulesInTier = activeCharacter.modules[tier].filter(m => 
		m.catalogs.includes(coreName)
	).length;

	const perksAvailable = Math.floor(modulesInTier / 3);
	const existingPerks = activeCharacter.perks.filter(p => 
		p.catalog === coreName && p.tier === tier
	).length;

	const availablePerks = Math.max(perksAvailable - existingPerks, 0);

	// Target the PERK SECTION TITLE instead of tier title
	const perkTitle = document.querySelector(`#catalogContent .perkTitle[data-tier="${tier}"]`);
	
	if (perkTitle) {
		let badge = perkTitle.querySelector(".perk-badge");
		if (!badge) {
			badge = document.createElement("span");
			badge.className = "perk-badge";
			perkTitle.appendChild(badge);
		}

		badge.textContent = availablePerks > 0 ? `${availablePerks} perk${availablePerks !== 1 ? 's' : ''} disponible!` : "";
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
    selfCoreContent.innerHTML = "";

    if (!activeCharacter.modules && !activeCharacter.perks) {
        selfCoreContent.innerHTML = "<p>No modules or perks learned yet.</p>";
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
        selfCoreContent.appendChild(moduleSection);
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
        selfCoreContent.appendChild(perkSection);
    }

    // ===== NOTES SECTION =====
    const notesSection = document.createElement("div");
    notesSection.className = "notes-section";

    const notesTitle = document.createElement("h3");
    notesTitle.textContent = "Notes";
    notesSection.appendChild(notesTitle);

    const notesTextarea = document.createElement("textarea");
    notesTextarea.className = "notes-textarea";
    notesTextarea.placeholder = "Write your notes here...";
    notesTextarea.value = activeCharacter.notes || "";

    notesTextarea.addEventListener("input", e => {
        activeCharacter.notes = e.target.value;
        saveCharacterData();
    });

    notesSection.appendChild(notesTextarea);
    selfCoreContent.appendChild(notesSection);

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
		const stats = ["mig", "dex", "int", "stl", "wlp"];
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
								const module = moduleLibrary.find(m => m.name === currentModules[i]);
								moduleSlot.textContent = module ? module.emote : "?";
								moduleSlot.dataset.module = currentModules[i];
								moduleSlot.dataset.category = module ? module.category : "";
						} else {
								moduleSlot.textContent = "+";
								moduleSlot.classList.add("empty");
								moduleSlot.dataset.module = "";
						}

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
										showModuleSelection(moduleSlot, saveSkill, skill, index);
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

		const newSkill = {
			name: nameInput.value,
			stats: Array.from(statContainer.querySelectorAll("select")).map(s => s.value),
			restrictions,
			description: descriptionInput.value,
			modules,
			cost: calculateSkillCost(modules, restrictions),
			moduleRestrictions: skill.moduleRestrictions
		};

		if (!activeCharacter.skills) activeCharacter.skills = [];
		if (index > -1) activeCharacter.skills[index] = newSkill;
		else activeCharacter.skills.push(newSkill);

		saveCharacterData();
		updateSEDisplay();
	}

	// Update save button click event
	saveButton.addEventListener("click", () => {
		saveSkill(skill, index);
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
function showModuleSelection(slot, saveSkill, skill, index) {
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
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const rect = slot.getBoundingClientRect();
		let mouseX = rect.left + window.scrollX;
		let mouseY = rect.bottom + window.scrollY;
		const selectorWidth = 500;
		const selectorHeight = 300;

		// Adjust horizontal position
		if (mouseX + selectorWidth > viewportWidth) {
				mouseX = viewportWidth - selectorWidth - 10;
		} else {
				mouseX = Math.max(mouseX, 10);
		}

		// Adjust vertical position
		if (mouseY + selectorHeight > viewportHeight + window.scrollY) {
				mouseY = rect.top+window.scrollY - selectorHeight - 10;
		} else {
				mouseY = Math.max(mouseY, 10);
		}

		selector.style.left = `${mouseX}px`;
		selector.style.top = `${mouseY}px`;
		selector.style.position = "absolute";
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

// Delete skill
function deleteSkill(index) {
	if (!activeCharacter.skills) return;
	activeCharacter.skills.splice(index, 1);
	saveCharacterData(); 
	renderSkills();
	updateSEDisplay();
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
				costDiv.textContent = `Cost: ${skill.cost} SE`;

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
		restrictionText = skillRestriction + " (selected)";
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
function calculateSkillCost(modules, restrictions = []) {
		const moduleCount = {}; // Track occurrences of each module
		let cost = modules.reduce((total, moduleName) => {
				moduleCount[moduleName] = (moduleCount[moduleName] || 0) + 1;
				
				for (const [tierKey, tierModules] of Object.entries(activeCharacter.modules)) {
						const module = tierModules.find(m => m.name === moduleName);
						if (module) {
								const tier = parseInt(tierKey.replace("tier", ""), 10);
								const additionalCost = tier + moduleCount[moduleName] - 1;
								return total + additionalCost;
						}
				}

				console.warn("Module \"" + moduleName + "\" not found. Defaulting to tier 1.");
				return total + 1;
		}, 0);
	console.log(restrictions)
		
		if (restrictions.includes("Ineficiente [+2 ☐ ]")) {
				cost *= 2;
		}

		return cost;
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

