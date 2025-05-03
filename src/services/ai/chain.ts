import { summarizeText } from './summarizer';
import { translateText } from './translator';

type AIFunction = 'summarize' | 'translate';
type LanguageOption = 'French' | 'Spanish' | 'German' | 'Italian';

interface ChainOptions {
  functions: AIFunction[];
  text: string;
  targetLanguage?: LanguageOption;
}

export async function chainAIFunctions(options: ChainOptions): Promise<{
  result: string;
  steps: Array<{ function: string; output: string }>;
}> {
  const { functions, text, targetLanguage = 'French' } = options;
  let currentText = text;
  const steps: Array<{ function: string; output: string }> = [];

  try {
    for (const func of functions) {
      switch (func) {
        case 'summarize':
          currentText = await summarizeText(currentText);
          steps.push({ function: 'summarize', output: currentText });
          break;
        case 'translate':
          currentText = await translateText(currentText, targetLanguage);
          steps.push({ function: 'translate', output: currentText });
          break;
        default:
          throw new Error(`Unsupported AI function: ${func}`);
      }
    }

    return {
      result: currentText,
      steps,
    };
  } catch (error) {
    console.error('Error in AI function chain:', error);
    throw new Error('Failed to process AI function chain');
  }
}