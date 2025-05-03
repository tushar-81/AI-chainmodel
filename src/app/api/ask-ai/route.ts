import { NextRequest, NextResponse } from 'next/server';
import { chainAIFunctions } from '@/services/ai/chain';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { text, functions, targetLanguage } = requestData;
    
    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!functions || !Array.isArray(functions) || functions.length === 0) {
      return NextResponse.json(
        { error: 'At least one function is required' },
        { status: 400 }
      );
    }

    const result = await chainAIFunctions({
      text,
      functions,
      targetLanguage,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing AI request:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}