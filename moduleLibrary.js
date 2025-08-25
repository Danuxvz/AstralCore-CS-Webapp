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
		restrictions:"Un objetivo solo puede ser afectado por este modulo 1 vez por escena."
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
		restrictions: "Fisico o Magico"
	},
	{
		name: "Proyectil 1",
		category: "Rango",
		description: "Disparas un proyectil que viaja una distancia de 15 casillas.",
		emote: "🗡️",
		restrictions: "Fisico o Mágico"
	},
	{
		name: "Área 1",
		category: "Rango",
		description: "Afectas a un área de 3x3 casillas.",
		emote: "🔴",
		restrictions: "Mágico"
	},
	{
		name: "Orbe 1",
		category: "Rango",
		description: "Afectas a un área esférica diminuta que se origina flotando a distancia de 2 casillas o menos de ti. El área se mantiene siempre a la misma distancia y posición relativa a ti.",
		emote: "🏐",
		restrictions: "Mágico"
	},
	{
		name: "Área Remota 1",
		category: "Rango",
		description: "Afectas un área de una casilla que se origina a 5 casillas o menos de ti.",
		emote: "🔹",
		restrictions: "Mágico"
	},
	{
		name: "Línea 1",
		category: "Rango",
		description: "Afectas a un área lineal que se extiende hasta una distancia de 3 casillas, y se origina desde el usuario.",
		emote: "🍡",
		restrictions: "Fisico"
	},
	{
		name: "Objetivo 1",
		category: "Rango",
		description: "Afectas a un objetivo a 12 casillas o menos de ti.",
		emote: "👉",
		restrictions: "Mágico"
	},
	{
		name: "Proyectil Viviente 1",
		category: "Rango",
		description: "Invocas a 1 proyectil viviente que contiene los módulos dentro de este rango. <br>Los Proyectiles vivientes tienen un MOV de 7, HR+5 de HP,y al final de cada uno de sus turnos pierden -5 HP. <br>En combate toman su turno directamente después de ti, y únicamente pueden usar acciones para intentar impactar contra un objetivo, haciendo una tirada de ataque con las stats de esta skill. En un acierto, el proyectil desaparece y los efectos son aplicados. ",
		emote: "🐝",
		restrictions: "Fisico o Magico"
	},
	{
		name: "Crear 1",
		category: "Rango",
		description: "Creas un objeto que contiene el resto de módulos dentro de este rango. Cualquier criatura puede usar una acción para consumir el objeto creado, y activar esta skill como el usuario.",
		emote: "🎁",
		restrictions: "Mágico"
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
		restrictions: "+2 Coste de PE"
	},
	
	// 2 Skill Points Modules
	{
		name: "Cura 2",
		category: "Efecto",
		description: "El objetivo recupera 10 HP.",
		emote: "🩹",
		restrictions: "+2 al coste de PE"
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
		restrictions: "+1 al coste de PE"

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
		restrictions: "+1 al coste de PE"
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
		restrictions: "El objetivo pierde 2 PE cuando este efecto termina",
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
		restrictions: "No puedes añadir múltiples copias de este módulo a una skill",
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
	{
		name: "Iniciativa 2",
		category: "Efecto",
		description: "El objetivo repite su tirada de iniciativa, y reemplaza su iniciativa actual con el nuevo resultado. Si un objetivo está tomando su turno en el momento en el que es afectado, este continúa con su turno con normalidad, y solo cambia su iniciativa hasta el inicio de la siguiente ronda.",
		emote: "🚦",
	},

	
	// Rangos
	{
		name: "Línea 2",
		category: "Rango",
		description: "Afectas a un área lineal que se extiende hasta 6 casillas.",
		emote: "➡️",
		restrictions: "Mágico"
	},
	{
		name: "Proyectil 2",
		category: "Rango",
		description: "Disparas un proyectil que viaja 25 casillas.",
		emote: "🏹",
		restrictions: "Físico"
	},
	{
		name: "Conexión Eléctrica",
		category: "Rango",
		description: "Afectas objetivos a menos de 5 casillas de conexiones eléctricas que conecten a distancia de toque de ti.",
		emote: "🔌",
		restrictions: "Mágico"
	},
	{
		name: "Objetivo 2",
		category: "Rango",
		description: "Afectas a un objetivo que puedas ver.",
		emote: "👁️",
		restrictions: "Mágico"
	},
	{
		name: "Objetivo Multiple 2",
		category: "Rango",
		description: "Afectas a 2 objetivos a 8 casillas o menos.",
		emote: "✌️",
		restrictions: "Mágico"
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
		name: "Reacción 2",
		category: "Especial",
		description: "Una vez por ronda, puedes consumir una acción del próximo turno para activar fuera de turno.",
		emote: "⏰",
	},
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
		restrictions: "+2 al coste de EP",
	},


	// 3 Skill Points Modules
	{
		name: "Ataque Efectivo",
		category: "Efecto",
		description: "Para cálculos de HR en esta skill, puedes sumar el resultado de ambas stats.",
		emote: "👹",
		restrictions: "+ 1 PE"
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
		restrictions: "+1 al coste de EP"
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
		description: "Aumentas la defensa física o mágica (definido en creación) hasta el inicio del siguiente turno en +5. (Este efecto cuenta como instantáneo).",
		emote: "🛡️",
		restrictions: "+2 al coste de EP"
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
		restrictions: "+2 al coste de EP"
	},
	{
		name: "Restringir 3",
		category: "Efecto",
		description: "Escoge una stat (Definida durante creación). El objetivo es incapaz de utilizar cualquier acción que no incluya la stat escogida.",
		emote: "🕺",
	},

	{
		name: "Iniciativa 3",
		category: "Efecto",
		description: "Intercambia libremente los valores de iniciativa entre los objetivos afectados. Si uno de los objetivos está tomando su turno en el momento en el que es afectado, este continúa con su turno con normalidad, y solo cambia su iniciativa al inicio de la siguiente ronda.",
		emote: "🚏",
	},


		// Rangos
	{
		name: "Lluvia de Proyectiles",
		category: "Rango",
		description: "Disparas 5 proyectiles a distintos objetivos desde el cielo.",
		emote: "🌧️",
		restrictions: "Físico"
	},
	{
		name: "Aura",
		category: "Rango",
		description: "Afectas a todos los objetivos a rango de toque.",
		emote: "🌀",
		restrictions: "Mágico"
	},
	{
		name: "Área 3",
		category: "Rango",
		description: "Afectas área de 5x5 casillas.",
		emote: "🔶",
		restrictions: "Físico o Mágico"
	},
	{
		name: "Objetivo Multiple 3",
		category: "Rango",
		description: "Afectas a todos los objetivos que a 5 casillas o menos de ti que estés viendo.",
		emote: "👀",
		restrictions: "Mágico"
	},	
	{
		name: "Objetivo 3",
		category: "Rango",
		description: "Afectas objetivos aunque no puedas verlos.",
		emote: "🐑",
		restrictions: "Mágico"
	},
	{
		name: "Enjambre de Proyectiles Vivientes",
		category: "Rango",
		description: "Invocas 3 proyectiles vivientes con módulos.",
		emote: "🍯",
		restrictions: "Físico o Mágico"
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
		restrictions: "Mágico"
	},
	{
		name: "Orden 3",
		category: "Rango",
		description: "Escoge una acción secundaria (Definida durante creacion). Todas las criaturas en escena que escuchen tu voz deben utilizar la secundaria escogida antes del final de sus turnos, o ser automáticamente afectados por este rango. Para propósitos de este rango, el HR se considera un 5.",
		emote: "🫡",
		restrictions: "Mágico"
	},


	// Especiales
	{
		name: "Reacción 5",
		category: "Especial",
		description: "Una vez por ronda, puedes consumir +2 PE para activar esta skill fuera de tu turno.",
		emote: "⏲️",
	},

	{
		name: "Contraataque",
		category: "Especial",
		description: "Una skill con este módulo se activa automáticamente al sufrir daño.",
		emote: "🌵",
		restrictions: "+ 1 al coste de EP"
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

export default moduleLibrary;
