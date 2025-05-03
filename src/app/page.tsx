'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(['summarize']);
  const [targetLanguage, setTargetLanguage] = useState('French');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }
    
    if (selectedFunctions.length === 0) {
      setError('Please select at least one AI function');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          functions: selectedFunctions,
          targetLanguage,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to process request');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFunctionToggle = (func: string) => {
    setSelectedFunctions(prev => 
      prev.includes(func) 
        ? prev.filter(f => f !== func) 
        : [...prev, func]
    );
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AI Function Calling Demo</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Test chaining AI functions for text processing
        </p>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="input-text" className="block mb-2 font-medium">
              Enter Text to Process:
            </label>
            <textarea
              id="input-text"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 min-h-[150px] bg-white dark:bg-gray-800"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter some text to process with AI functions..."
            />
          </div>
          
          <div>
            <p className="block mb-2 font-medium">Select AI Functions to Apply:</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFunctions.includes('summarize')}
                  onChange={() => handleFunctionToggle('summarize')}
                  className="rounded"
                />
                <span>Summarize</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFunctions.includes('translate')}
                  onChange={() => handleFunctionToggle('translate')}
                  className="rounded"
                />
                <span>Translate</span>
              </label>
            </div>
          </div>
          
          {selectedFunctions.includes('translate') && (
            <div>
              <label htmlFor="target-language" className="block mb-2 font-medium">
                Select Target Language:
              </label>
              <select
                id="target-language"
                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
              </select>
            </div>
          )}
          
          {error && (
            <div className="text-red-500 p-2 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Processing...' : 'Process Text'}
          </button>
        </form>
        
        {result && (
          <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4">Results:</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Final Result:</h3>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                {result.result}
              </div>
            </div>
            
            {result.steps && result.steps.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Processing Steps:</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  {result.steps.map((step: any, index: number) => (
                    <li key={index}>
                      <p><strong>{step.function}</strong>:</p>
                      <p className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md mt-1">
                        {step.output}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>AI Function Calling Demo - Intern Assignment</p>
      </footer>
    </div>
  );
}
