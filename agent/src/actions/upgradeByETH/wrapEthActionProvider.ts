import {
  ActionProvider,
  WalletProvider,
  CreateAction,
  EvmWalletProvider,
} from "@coinbase/agentkit";
import { encodeFunctionData, Hex } from "viem";
import { Network } from "@coinbase/agentkit/dist/network";
import { z } from "zod";
import { upgradeByEthSchema } from "./schemas";
import { abi, contractAddress } from "./constants";

class UpgradeByEthActionProvider extends ActionProvider<WalletProvider> {
  constructor() {
    super("upgrade-by-eth-action-provider", []);
  }

  @CreateAction({
    name: "upgradeByETH",
    description: "Upgrade ETH into a Superfluid ETH",
    schema: upgradeByEthSchema,
  })
  async upgrade(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof upgradeByEthSchema>
  ): Promise<string> {
    try {
      const fakeAmount = "500000000000000";

      const tx = await walletProvider.sendTransaction({
        to: contractAddress as Hex,
        data: encodeFunctionData({
          abi,
          functionName: "upgradeByETH",
        }),
        value: BigInt(fakeAmount),
      });

      return `Upgraded ${fakeAmount} ETH into a Superfluid ETH. See transaction: https://sepolia.basescan.org/tx/${tx}`;
    } catch (error) {
      return `Error upgrading ETH: ${error}`;
    }
  }

  supportsNetwork = (network: Network) => true;
}

export const upgradeByEthActionProvider = () =>
  new UpgradeByEthActionProvider();
