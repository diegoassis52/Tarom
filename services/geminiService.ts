
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const generateText = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text:", error);
    return "Ocorreu um erro ao buscar a interpretação. Tente novamente.";
  }
};

const generateJson = async (prompt: string, schema: any) => {
   try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating JSON:", error);
    return null;
  }
}

export const getDailyReading = async (cardName: string) => {
  const prompt = `Para a carta de tarô "${cardName}", gere um "significadoGeral" e um "conselhoPratico".`;
  const schema = {
    type: Type.OBJECT,
    properties: {
      significadoGeral: { type: Type.STRING, description: 'O significado geral da carta em 2-3 frases.' },
      conselhoPratico: { type: Type.STRING, description: 'Um conselho prático baseado na carta em 2-3 frases.' },
    },
    required: ['significadoGeral', 'conselhoPratico'],
  };
  return await generateJson(prompt, schema);
};

export const getQuickAnswer = async (question: string, cardName: string) => {
  const prompt = `Responda a pergunta "${question}" com base na carta de tarô "${cardName}". Forneça uma resposta curta e direta de no máximo 3 linhas.`;
  return await generateText(prompt);
};

export const getAreaReadingInterpretation = async (area: string, spreadTitle: string, cards: { name: string; position?: string }[]) => {
  const cardList = cards.map(c => c.position ? `${c.position}: ${c.name}` : c.name).join(', ');
  const prompt = `Faça uma interpretação de tarô para a área de "${area}", na tiragem "${spreadTitle}". As cartas são: ${cardList}. Analise as cartas em suas posições (se houver) e forneça uma interpretação coesa e um conselho final. Mantenha a resposta concisa e inspiradora.`;
  return await generateText(prompt);
};

export const getWeeklyReading = async (cardNames: string[]) => {
  const prompt = `Para as cartas de tarô "${cardNames.join('", "')}", gere um "resumoSemana" e um "conselhoSemana". O resumo deve descrever a energia geral da semana com base na combinação das três cartas. O conselho deve ser uma orientação prática sobre como aproveitar melhor essa energia.`;
  const schema = {
    type: Type.OBJECT,
    properties: {
      resumoSemana: { type: Type.STRING, description: 'Um resumo da energia da semana em 2-4 frases.' },
      conselhoSemana: { type: Type.STRING, description: 'Um conselho prático para a semana em 2-4 frases.' },
    },
    required: ['resumoSemana', 'conselhoSemana'],
  };
  return await generateJson(prompt, schema);
};

export const getPersonalArcanaInterpretation = async (cardName: string, userName: string) => {
  const prompt = `Para o usuário ${userName}, cujo arcano de nascimento é "${cardName}", gere uma análise pessoal. Crie os campos "forcas", "desafios" e "conselho". "Forças" deve descrever os pontos positivos e talentos associados a esta carta. "Desafios" deve apontar as possíveis dificuldades ou lições a aprender. "Conselho" deve ser uma orientação sobre como equilibrar a energia deste arcano na vida. Seja inspirador e direto.`;
  const schema = {
    type: Type.OBJECT,
    properties: {
      forcas: { type: Type.STRING, description: 'As forças e talentos do usuário com base no arcano.' },
      desafios: { type: Type.STRING, description: 'Os desafios e lições a aprender.' },
      conselho: { type: Type.STRING, description: 'Um conselho para equilibrar a energia do arcano.' },
    },
    required: ['forcas', 'desafios', 'conselho'],
  };
  return await generateJson(prompt, schema);
};


// Fix: Add missing getArcanaDetails function to fetch card meanings.
export const getArcanaDetails = async (cardName: string) => {
  const prompt = `Gere uma descrição detalhada para a carta de tarô "${cardName}". Inclua os seguintes campos: "significadoGeral", "amor", "trabalho", "saude", "dinheiro", e "conselho". Para cada campo, forneça um texto conciso e inspirador.`;
  const schema = {
    type: Type.OBJECT,
    properties: {
      significadoGeral: { type: Type.STRING, description: 'O significado geral da carta.' },
      amor: { type: Type.STRING, description: 'A interpretação da carta para a área do amor.' },
      trabalho: { type: Type.STRING, description: 'A interpretação da carta para a área do trabalho.' },
      saude: { type: Type.STRING, description: 'A interpretação da carta para a área da saúde.' },
      dinheiro: { type: Type.STRING, description: 'A interpretação da carta para a área do dinheiro.' },
      conselho: { type: Type.STRING, description: 'Um conselho prático baseado na carta.' },
    },
    required: ['significadoGeral', 'amor', 'trabalho', 'saude', 'dinheiro', 'conselho'],
  };
  return await generateJson(prompt, schema);
};
