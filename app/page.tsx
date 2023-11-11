"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import va from "@vercel/analytics";
import clsx from "clsx";
import { VercelIcon, GithubIcon, LoadingCircle, SendIcon } from "./icons";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Textarea from "react-textarea-autosize";
import { toast } from "sonner";

const examples = [
  "I'm ready, lets start!",
  "Start the game",
  "I know everything, lets go!",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate limited");
        return;
      } else {
        va.track("Chat initiated");
      }
    },
    onError: (error) => {
      va.track("Chat errored", {
        input,
        error: error.message,
      });
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <div>
      <div className="container mx-auto px-10 md:px-28">
        <h1 className="text-4xl font-bold text-center pt-20 pb-6">Test your knowledge about Bitcoin with ChatGPT</h1>
        <h2 className="text-md md:text-xl font-light text-center pb-8 px-8 lg:px-26">I'm creating 10 questions about Bitcoin. If you can correctly answer all the questions, I'll send you gift. Let's play.</h2>
        <p className="text-xs font-extralight text-gray-500 text-center xs:px-24">
          This demo was built with just Next.js, OpenAI's API, and{' '}
          <a 
            href="https://docs.syndicate.io"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  "p-1.5 text-white",
                  message.role === "assistant" ? "bg-green-500" : "bg-black",
                )}
              >
                {message.role === "user" ? (
                  <User width={20} />
                ) : (
                  <Bot width={20} />
                )}
              </div>
              <ReactMarkdown
                className="prose mt-1 w-full break-words prose-p:leading-relaxed"
                remarkPlugins={[remarkGfm]}
                components={{
                  // open links in new tab
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))
      ) : (
        <div className="border-gray-200sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <h1 className="text-lg font-semibold text-black">
              Welcome to Satoshi Quiz!
            </h1>
            <p className="text-gray-500">
              This is an{" "}
              <a
                href="https://github.com/eddieoz/satoshiquiz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                open-source
              </a>{" "}
              AI chatbot that uses{" "}
              <a
                href="https://platform.openai.com/docs/guides/gpt/function-calling"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                OpenAI Functions
              </a>{" "}
              and{" "}
              <a
                href="https://sdk.vercel.ai/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                Vercel AI SDK
              </a>{" "}
              make a game using natural language.
            </p>
          </div>
          <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-7 sm:p-10">
            {examples.map((example, i) => (
              <button
                key={i}
                className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                onClick={() => {
                  setInput(example);
                  inputRef.current?.focus();
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-white"
                : "bg-green-500 hover:bg-green-600",
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-white",
                )}
              />
            )}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          Built with{" "}
          <a
            href="https://platform.openai.com/docs/guides/gpt/function-calling"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            OpenAI Functions
          </a>{" "}
          and{" "}
          <a
            href="https://sdk.vercel.ai/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            Vercel AI SDK
          </a>
          .{" "}
          <a
            href="https://github.com/eddieoz/satoshiquiz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            View the repo
          </a>{" "}
          or{" "}
          <a
            href="https://vercel.com/templates/next.js/chathn"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            deploy your own based on the original template
          </a>
          .
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
