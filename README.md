# AI Function Calling Demo

This Next.js application demonstrates AI function calling with the ability to chain multiple AI functions together. It features a simple API endpoint at `/api/ask-ai` that can process text through various AI functions.

## Features

- ✅ Next.js application with TypeScript
- ✅ API endpoint at `/api/ask-ai` for AI function processing
- ✅ Function chaining capability (Summarize → Translate)
- ✅ Simulated AI calls with option for real OpenAI integration
- ✅ Simple user interface for testing

## AI Functions Implemented

1. **Text Summarization**: Condenses input text into a shorter summary
2. **Text Translation**: Translates text into different languages (French, Spanish, German, Italian)

## How It Works

The application provides two methods of AI function calling:

### Simulated Mode (Default)
- No API key required
- Quick responses for demonstration purposes
- Simulated processing of text data

### Real API Mode
- Requires an OpenAI API key set as an environment variable
- Makes actual calls to OpenAI's API for text processing
- Set `USE_REAL_API=true` in your environment variables

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── ask-ai/         # API endpoint for AI function calls
│   │       └── route.ts    # API route handler
│   ├── page.tsx            # Main app page with UI
├── services/
│   └── ai/
│       ├── chain.ts        # Function chaining logic
│       ├── summarizer.ts   # Text summarization function
│       └── translator.ts   # Text translation function
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Using the API

Send a POST request to `/api/ask-ai` with the following JSON body:

```json
{
  "text": "Your text to process",
  "functions": ["summarize", "translate"],
  "targetLanguage": "French"
}
```

The API will return a JSON response with the processed result and details about each processing step:

```json
{
  "result": "Final processed text",
  "steps": [
    {
      "function": "summarize",
      "output": "Summarized text"
    },
    {
      "function": "translate",
      "output": "Translated text"
    }
  ]
}
```

## Using Real OpenAI API

To use the real OpenAI API:

1. Get an API key from [OpenAI](https://platform.openai.com/account/api-keys)
2. Set environment variables:
   ```
   OPENAI_API_KEY=your-api-key
   USE_REAL_API=true
   ```

## Technologies Used

- Next.js
- TypeScript
- OpenAI API
