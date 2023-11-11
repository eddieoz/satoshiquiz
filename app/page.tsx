'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      <div className="container mx-auto px-10 md:px-28">
        <h1 className="text-4xl font-bold text-center pt-20 pb-6">Test your knowledge about Bitcoin with ChatGPT, learn and earn Sats!</h1>
        <h2 className="text-md md:text-xl font-light text-center pb-8 px-8 lg:px-26">I'm creating 10 questions about Bitcoin. If you can correctly answer all the questions in the 1st attempt, I'll send you gift. <br />Prepare your <b>Nostr npub</b> and let's play.</h2>
        <p className="text-xs font-extralight text-gray-500 text-center xs:px-24">
          This demo was built with just Next.js, OpenAI's API, and{' '}
          <a 
            href="https://github.com/eddieoz/nostr-blokitos-sats"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            Nostr Blokitos Sats APIs.
          </a>
          </p>
          <p className="text-xs font-extralight text-gray-500 text-center xs:px-24">
            To receive the prize, <b>you need a valid NOSTR account with your LN Address</b> linked to your profile. Check out the repo{' '}
          <a 
            href="https://github.com/eddieoz/satoshiquiz"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            here
          </a>
        </p>
        <p className="text-xs font-extralight text-gray-500 text-center xs:px-24">
          10 correct answers in a row will == some sats.
        </p>
      </div>
      <div className="flex flex-col w-full max-w-md pt-20 pb-48 mx-auto stretch">
        {messages.length > 0
          ? messages.map((m, index) => (
              <div key={index} className="whitespace-pre-wrap py-1">
                {m.role === 'user' ? <span className="text-lg font-bold text-cyan-600">You: </span>: <span className="text-lg font-bold text-purple-600">Satoshi Quiz: </span>}
                {m.role === 'assistant' ? m.content : m.content}
              </div>
            ))
          : null}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-10 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Ask your question..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
