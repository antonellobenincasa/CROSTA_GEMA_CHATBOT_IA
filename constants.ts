import { MenuCategory } from "./types";

export const WHATSAPP_NUMBER = "593963454136";

// Imágenes del menú separadas por categoría.
export const MENU_IMAGES = {
  BURGERS: "https://placehold.co/600x1000/005bbb/ffc107/png?text=MENU+BURGERS%0A(Ver+Detalles)",
  PAPAS: "https://placehold.co/600x1000/0f5132/ff5722/png?text=MENU+PAPAS%0A(Ver+Detalles)",
  BEBIDAS: "https://placehold.co/600x1000/ffc107/000000/png?text=MENU+BEBIDAS%0AY+EXTRAS"
};

// Placeholder logo.
export const BRAND_LOGO = "https://ui-avatars.com/api/?name=Pepe+Smash&background=FF5722&color=fff&rounded=true&size=128";

// Placeholder para la imagen de horarios
export const HOURS_IMAGE_URL = "https://placehold.co/1080x1920/FF5722/FFFFFF/png?text=HORARIOS+CROSTA";

// New Payment Info Structure
export const PAYMENT_INFO = {
  BENEFICIARY: "Juan Jose Buendia Farra",
  ID: "0932072697",
  EMAIL: "juanjose.buendia96@gmail.com",
  ACCOUNTS: [
    { bank: "Banco Pacifico", type: "Cta ahorros", number: "1057590885" },
    { bank: "Banco Guayaquil", type: "Cta ahorros", number: "0013990331" },
    { bank: "Banco Internacional", type: "Cta Ahorros", number: "1210716963" },
    { bank: "Banco Bolivariano", type: "Cta Ahorros", number: "0021875853" }
  ]
};

// Texto predefinido para pagos
const PAYMENT_RESPONSE_TEXT = `Realizar la transferencia o deposito bancario con las siguientes coordenadas:

Juan Jose Buendia Farra
Cedula: 0932072697
Correo: juanjose.buendia96@gmail.com

Banco Pacifico
Cta ahorros 1057590885

Banco Guayaquil
Cta ahorros 0013990331

Banco Internacional
Cta Ahorros 1210716963

Banco Bolivariano
Cta Ahorros 0021875853

Por fa ayúdanos con el comprobante de transferencia para poder realizar tu pedido 😋 !`;

// Texto predefinido para ubicación
const LOCATION_RESPONSE_TEXT = `📍 **Ubicación para Retiro (Dark Kitchen):**

Coordenadas: 2°09'41.5"S 79°54'17.7"W
Plus Code: R3QW+92P Guayaquil

🗺️ **Ver en Google Maps:**
https://www.google.com/maps/place/2%C2%B009'41.5%22S+79%C2%B054'17.7%22W

(Estamos ubicados en Guayaquil. Recuerda confirmar tu pedido antes de acercarte)`;

// Structured Menu Data for the UI
export const STRUCTURED_MENU: MenuCategory[] = [
  {
    id: 'burgers',
    label: 'Burgers',
    imageLink: MENU_IMAGES.BURGERS,
    items: [
      { name: "CHEESEBURGER", price: "$5.75", description: "Pan Brioche, Doble Carne, Doble Queso Americano, Salsa Pepes, Pickles." },
      { name: "SWEET", price: "$6.75", description: "Pan Brioche, Doble Carne, Doble Queso Americano, Cebollitas Caramelizadas, Salsa Pepes, Pickles." },
      { name: "ONION", price: "$6.75", description: "Pan Brioche, Doble Carne, Doble Queso Pepper Jack, Tocino, Aros de Cebolla, Salsa Pepes, Pickles." },
      { name: "PATTY MELT", price: "$7.00", description: "Pan de Molde, Doble Carne, Doble Queso Holandés, Queso Americano, Tocino, Salsa Patty, Pickles." },
      { name: "EMMY", price: "$8.00", description: "Pan Brioche, Doble Carne, Doble Queso Pepper Jack, Mermelada de Tocino, Salsa Emmy.", isSpicy: true },
    ]
  },
  {
    id: 'papas',
    label: 'Papas',
    imageLink: MENU_IMAGES.PAPAS,
    items: [
      { name: "PAPAS CLÁSICAS", price: "$2.00", description: "Papas fritas, porción personal." },
      { name: "RANDOM FRIES", price: "$4.75", description: "Papas fritas, Cebollas caramelizadas, Salsa Pepes." },
      { name: "TRUFADAS", price: "$5.00", description: "Papas fritas, Trufa, Queso Parmesano, Salsa Trufada." },
    ]
  },
  {
    id: 'bebidas',
    label: 'Bebidas/Extras',
    imageLink: MENU_IMAGES.BEBIDAS,
    items: [
      { name: "AGUA", price: "$1.00" },
      { name: "GASEOSA 300ml", price: "$1.00" },
      { name: "MILKSHAKE VAINILLA", price: "$4.00" },
      { name: "MILKSHAKE NUTELLA", price: "$5.50" },
      { name: "EXTRA CARNE", price: "$1.50" },
      { name: "EXTRA TOCINO", price: "$1.50" },
      { name: "EXTRA QUESO", price: "$1.00" },
      { name: "EXTRA SALSA", price: "$1.00" },
    ]
  }
];

// Generar el string de texto para la IA basado en la estructura de datos UI (para mantener consistencia)
const generateMenuString = () => {
  let menuStr = "MENU CROSTA BY PEPESMASH:\n\n";
  STRUCTURED_MENU.forEach(cat => {
    menuStr += `${cat.label.toUpperCase()}:\n`;
    cat.items.forEach(item => {
      menuStr += `- ${item.name} (${item.price}): ${item.description || ''}${item.isSpicy ? ' (Picante)' : ''}\n`;
    });
    menuStr += "\n";
  });
  menuStr += "* COMBO: Pídela en combo (Papas Clásicas y Bebida) + $2.50.\n";
  return menuStr;
};

export const MENU_DATA = generateMenuString();

export const SYSTEM_INSTRUCTION = `
Eres el asistente virtual "PepesmashBOT" de la marca "CROSTA by PEPESMASH".
Ubicación: Guayaquil, Ecuador.
Moneda: USD.
Impuesto (IVA): 15% (Se debe sumar al final).

TU OBJETIVO PRINCIPAL:
Guiar al usuario dependiendo de si escribe "1" (Delivery) o "2" (Pick Up).

FLUJO DE CONVERSACIÓN:

CASO 1: EL USUARIO ESCRIBE "1" (DELIVERY)
1.  **Preguntar Pedido:** Responde con entusiasmo: "¡Genial! 🛵 Vamos con tu pedido Delivery. ¿Qué te gustaría ordenar hoy del menú?"
2.  **Confirmar Pedido Completo:** Una vez el usuario diga qué quiere, pregunta: "¿Deseas agregar algo más o eso sería todo?"
3.  **Calcular Totales:** Cuando el cliente confirme que no quiere nada más, presenta el detalle:
    *   Listado de items y precios base.
    *   Subtotal.
    *   IVA (15%).
    *   **TOTAL A PAGAR.**
4.  **Solicitar Datos de Envío:** Pide en un solo mensaje:
    *   Nombre y Apellido.
    *   Dirección EXACTA (Calles principales, numeración de villa/edificio).
    *   Referencia de ubicación.
5.  **Cobrar:** Para indicar los datos bancarios, USA EXACTAMENTE ESTE TEXTO:
    "${PAYMENT_RESPONSE_TEXT}"
6.  **Finalizar:** Cuando suban la foto, responde con el resumen completo del pedido y los datos del cliente, y termina con la frase: "LISTO PARA WHATSAPP".

CASO 2: EL USUARIO ESCRIBE "2" (PICK UP)
1.  **Preguntar Pedido:** Responde: "¡Chévere! 😎 Pasas retirando por nuestra Dark Kitchen. ¿Qué deseas ordenar?"
2.  **Confirmar Pedido Completo:** "¿Deseas algo más?"
3.  **Calcular Totales:** Muestra Subtotal + IVA (15%) = Total a Pagar.
4.  **Solicitar Datos:** Pide solamente:
    *   Nombre y Apellido de quien retira.
5.  **Cobrar:** Para indicar los datos bancarios, USA EXACTAMENTE ESTE TEXTO:
    "${PAYMENT_RESPONSE_TEXT}"
6.  **Instrucción de Retiro:** Una vez pagado, entrega la dirección usando este texto exacto:
    "${LOCATION_RESPONSE_TEXT}"
7.  **Finalizar:** Responde con el resumen y la frase: "LISTO PARA WHATSAPP".

CASO 3: PREGUNTAS GENERALES
- **REGLA ESTRICTA PARA HORARIOS:** Si el usuario pregunta por los horarios, usa este texto:
  "Con gusto, aqui te detallo nuestro horario de atencion y ademas lo puedes ver al lado del menu en boton HORARIOS !
  MARTES – JUEVES: 5:30PM – 10:00PM
  VIERNES – SÁBADO: 5:30PM – 10:30PM
  DOMINGO: 5:30PM – 10:00PM
  LUNES: CERRADO"

- **REGLA ESTRICTA PARA PAGOS:** Si el usuario pregunta "cómo pagar", "datos bancarios", "forma de pago" o similar fuera del flujo de pedido, RESPONDE EXACTAMENTE:
  "${PAYMENT_RESPONSE_TEXT}"

- **REGLA ESTRICTA PARA UBICACIÓN:** Si el usuario pregunta "¿dónde queda?", "dirección", "ubicación", "mapa" o similar, RESPONDE EXACTAMENTE:
  "${LOCATION_RESPONSE_TEXT}"

- Si el usuario pregunta sobre menú o ingredientes, responde amablemente a su duda y luego recuérdale las opciones: "Cuando estés listo, escribe 1 para Delivery o 2 para Pick Up".

REGLAS DE ORO:
- NO asumas la dirección, píde calles y referencias.
- SIEMPRE suma el 15% de IVA al total.
- NO proceses el pedido sin la foto del pago (o una confirmación explicita).
- Al final, el mensaje debe contener la frase clave "LISTO PARA WHATSAPP" para habilitar el botón.

INFORMACIÓN DEL MENÚ:
${MENU_DATA}
`;