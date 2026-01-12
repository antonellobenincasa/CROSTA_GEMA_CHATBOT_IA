import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Using gemini-3-pro-preview for complex reasoning (orders) and vision
const MODEL_NAME = "gemini-3-pro-preview"; 
// Using gemini-2.5-flash for Maps grounding as required by prompt features
const MAPS_MODEL_NAME = "gemini-2.5-flash";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGenAI = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return;
  }
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const startChat = () => {
  if (!ai) initializeGenAI();
  if (!ai) throw new Error("AI not initialized");

  chatSession = ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (
  text: string, 
  imageBase64?: string
): Promise<string> => {
  if (!ai || !chatSession) {
    startChat();
  }
  if (!chatSession) throw new Error("Failed to start chat session");

  try {
    let response: GenerateContentResponse;

    if (imageBase64) {
        // If there is an image, we send it as a part.
        // We handle the image flow slightly differently or use the chat history if supported widely,
        // but for safety in this demo, we'll assume the chat can handle multimodal history or we send a fresh request content.
        // gemini-3-pro-preview supports multimodal inputs in chat.
        
        const parts: any[] = [];
        parts.push({
            inlineData: {
                mimeType: "image/jpeg", // Assuming JPEG for simplicity from canvas/input
                data: imageBase64
            }
        });
        if (text) {
            parts.push({ text });
        }

        response = await chatSession.sendMessage({
            message: { role: 'user', parts }
        });

    } else {
        response = await chatSession.sendMessage({
            message: text
        });
    }

    return response.text || "Lo siento, no pude procesar eso.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tuve un problema de conexión. ¿Puedes intentarlo de nuevo?";
  }
};

// Function specifically for the Maps Grounding requirement
export const getDeliveryZoneInfo = async (userLocation?: {lat: number, lng: number}): Promise<string> => {
    if (!ai) initializeGenAI();
    if (!ai) throw new Error("AI not initialized");

    try {
        const config: any = {
            tools: [{ googleMaps: {} }],
        };

        if (userLocation) {
            config.toolConfig = {
                retrievalConfig: {
                    latLng: {
                        latitude: userLocation.lat,
                        longitude: userLocation.lng
                    }
                }
            }
        }

        const response = await ai.models.generateContent({
            model: MAPS_MODEL_NAME, // Must use 2.5-flash for maps
            contents: "Muestra restaurantes de hamburguesas cerca de mi ubicación o explica que CROSTA es solo delivery en Guayaquil.",
            config: config
        });

        // We return the text. In a real app we would parse groundingChunks for map widgets.
        return response.text || "No pude obtener información del mapa.";
    } catch (error) {
        console.error("Maps API Error", error);
        return "Hubo un error consultando el mapa.";
    }
}
