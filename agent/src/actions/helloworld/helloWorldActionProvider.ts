import {
    ActionProvider,
    WalletProvider,
    CreateAction,
    EvmWalletProvider,
  } from "@coinbase/agentkit";
  import { Abi, encodeFunctionData, Hex } from "viem";
  import { Network } from "@coinbase/agentkit/dist/network";
  import { z } from "zod";
  import { helloWorldGetGreetingSchema, helloWorldSetGreetingSchema } from "./schemas";
  import { helloWorldAbi, helloWorldContractAddress } from "./contract";
  
  class HelloWorldSetValueActionProvider extends ActionProvider<WalletProvider> {
    constructor() {
      super("hello-world-action-provider", []);
    }
  
    @CreateAction({
      name: "setGreeting",
      description: "Set a new greeting for the Hello World contract",
      schema: helloWorldSetGreetingSchema,
    })
    async setGreeting(
      walletProvider: EvmWalletProvider,
      args: z.infer<typeof helloWorldSetGreetingSchema>
    ): Promise<string> {
      try {
        const fakeGreeting = args.newGreeting??"Hello Potato";
  
        const tx = await walletProvider.sendTransaction({
          to: helloWorldContractAddress as Hex,
          data: encodeFunctionData({
            abi: helloWorldAbi,
            functionName: "store",
            args: [fakeGreeting],
          })
        });
  
        return `Upgraded ${fakeGreeting} ETH into HelloWorld. See transaction: https://sepolia.basescan.org/tx/${tx}`;
      } catch (error) {
        return `Error upgrading ETH: ${error}`;
      }
    }

    @CreateAction({
        name: "getGreeting",
        description: "Get the current greeting for the Hello World contract",
        schema: helloWorldGetGreetingSchema,
    })
    async getGreeting(
        walletProvider: EvmWalletProvider,
        args: z.infer<typeof helloWorldGetGreetingSchema>
    ): Promise<string> {
        const greeting = await walletProvider.readContract({
            address: helloWorldContractAddress as Hex,
            abi: helloWorldAbi as Abi,
            functionName: "retrieve",
        });
        return greeting as string;
    }
  
    supportsNetwork = (network: Network) => true;
  }
  
  export const helloWorldActionProvider = () =>
    new HelloWorldSetValueActionProvider();
  