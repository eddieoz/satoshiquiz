"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import va from "@vercel/analytics";
import clsx from "clsx";
import { GithubIcon, LoadingCircle, SendIcon } from "./icons";
// import { Bot, User } from "lucide-react";
import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Textarea from "react-textarea-autosize";
import { toast } from "sonner";

const examples = [
  "I'm ready! Start the game!",
  "Let's play!",
  "Start the game!",
  "I want to play!",
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
  let logo = '/opengraph-image.png'

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
        <a
          href="http://satoshiquiz.eddieoz.com"
          target="_blank"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
        >
          {// add the satoshi quiz logo
          }
          <img src="/opengraph-image.png" alt="logo" className="h-32" />
        </a>
        <a
          href="https://github.com/eddieoz/satoshiquiz"
          target="_blank"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
        >
          <GithubIcon />
        </a>
      </div>
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-gray-200 py-8",
              message.role === "user" ? "bg-white" : "bg-gray-100",
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  "p-1.5 text-white",
                  message.role === "assistant" ? "bg-orange-200" : "bg-black",
                )}
              >
                {message.role === "user" ? (
                  <User width={20} />
                ) : (
                  // <Bot width={20} />
                  <img src={logo} alt="Satoshi Quiz" className="inline-block w-8 h-8 mr-2 rounded-full" />
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
              Welcome to Satoshi Quiz!!
            </h1>
            <h2 className="text-lg font-semibold text-black">
              Test your knowledge about Bitcoin with ChatGPT, learn and earn Sats!
            </h2>
            <p className="text-gray-500">
              This is an open-source AI chatbot to demo a learn and earn game integrating with Nostr, Lightning Network and Bitcoin.
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
          Built by {" "}
          <a
            href="https://primal.net/p/npub1atrrqav7xyur93xszyaeuyyzy70mpmax488grndfaz3kddyc3dyquawyga"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            @eddieoz
          </a>{" "}
          . Support the Quiz: {" "}
          <a
            href="lightning:LNURL1DP68GURN8GHJ7AMPD3KX2APWWDSHGUE59EKXJEN99AKXUATJD3CZ7MT6V9XXZ4QC0JK6M"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            ⚡ eddieoz@sats4.life
          </a>
        </p>
      </div>
      
      <div className="fixed bottom-0 hidden w-full flex flex-col items-right px-0 sm:flex">
        <p className="text-right text-xs text-gray-400 mr-5">
          <a
            href="lightning:LNURL1DP68GURN8GHJ7AMPD3KX2APWWDSHGUE59EKXJEN99AKXUATJD3CZ7MT6V9XXZ4QC0JK6M"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            <img
              src="https://www.eddieoz.com/content/images/2023/11/qr-code-bloco.png"
              alt="Lightning Tips"
              className="inline-block w-32 h-32 mr-1"
            />
          </a><br />⚡ Support the Quiz ⚡<br />
        </p>
      </div>
    </main>
  );
}
