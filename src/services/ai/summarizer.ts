import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function summarizeText(text: string): Promise<string> {
  try {
    if (process.env.USE_REAL_API === 'true') {
      const response = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes text.',
          },
          {
            role: 'user',
            content: `Summarize the following text in a concise paragraph:\n\n${text}`,
          },
        ],
        max_tokens: 250,
      });

      return response.choices[0]?.message?.content || 'Failed to summarize text.';
    } 
    
    console.log('Simulating text summarization...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return `This is a simulated summary of: "${text.slice(0, 50)}${text.length > 50 ? '...' : ''}"`;
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw new Error('Failed to summarize text');
  }
}