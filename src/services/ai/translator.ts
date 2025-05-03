import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function translateText(text: string, targetLanguage: string = 'French'): Promise<string> {
  try {
    if (process.env.USE_REAL_API === 'true') {
      const response = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that translates text to ${targetLanguage}.`,
          },
          {
            role: 'user',
            content: `Translate the following text to ${targetLanguage}:\n\n${text}`,
          },
        ],
        max_tokens: 250,
      });

      return response.choices[0]?.message?.content || 'Failed to translate text.';
    }
    
    console.log(`Simulating text translation to ${targetLanguage}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (targetLanguage.toLowerCase() === 'french') {
      return `Ceci est une traduction simulée de: "${text.slice(0, 30)}${text.length > 30 ? '...' : ''}"`;
    } else if (targetLanguage.toLowerCase() === 'spanish') {
      return `Esta es una traducción simulada de: "${text.slice(0, 30)}${text.length > 30 ? '...' : ''}"`;
    } else {
      return `This is a simulated translation to ${targetLanguage} of: "${text.slice(0, 30)}${text.length > 30 ? '...' : ''}"`;
    }
  } catch (error) {
    console.error(`Error translating text to ${targetLanguage}:`, error);
    throw new Error(`Failed to translate text to ${targetLanguage}`);
  }
}