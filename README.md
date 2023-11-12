# Satoshi Quiz GPT using Vercel AI SDK, Next.js, OpenAI, Nostr and Lightning Network

This example shows how to use the [Vercel AI SDK](https://sdk.vercel.ai/docs), [Next.js](https://nextjs.org), [OpenAI](https://openai.com),  to create a bitcoin-enabled GPT chat bot that can send Bitcoin transactions. In this example, the GPT is creating a quiz with 10 questions, and if the player can correctly answers all of them, the GPT will send the player a prize.

## Requirements

To create locally you need to:

1. Sign up for [OpenAI's developer platform](https://platform.openai.com/signup) and create an API KEY.

## Tech Stack

Satoshi Quiz is built on the following stack:

- [Next.js](https://nextjs.org/) – framework
- [OpenAI Functions](https://platform.openai.com/docs/guides/gpt/function-calling) - AI completions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI streaming library
- [Vercel](https://vercel.com) – deployments
- [TailwindCSS](https://tailwindcss.com/) – styles
- [Nostr](https://github.com/nbd-wtf/nostr-tools) - Nostr zaps
- [Alby](https://github.com/getAlby/js-lightning-tools) - Lightning tools
- [Nostr Blokitos Sats](https://github.com/eddieoz/nostr-blokitos-sats) - Implementation of a bot for Nostr and Alby

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/eddieoz/satoshiquiz/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/eddieoz/satoshiquiz/pull) to add new features/make quality-of-life improvements/fix bugs.

## Author

- Eddieoz ([@eddieoz](https://twitter.com/eddieoz))
- From the initial work of ([@ianDAOs](https://github.com/ianDAOs/demo-crypto-llm-20questions_)) and ([@steven-tey](https://github.com/steven-tey/chathn))

## License

Licensed under the [MIT license](https://github.com/eddieoz/satoshiquiz/blob/main/LICENSE.md).
