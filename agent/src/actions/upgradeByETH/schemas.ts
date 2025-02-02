import { z } from "zod";

export const upgradeByEthSchema = z
  .object({
    amount: z.string().describe("The amount of ETH to upgrade"),
  })
  .strip()
  .describe("Instructions for upgrading ETH into a Superfluid ETH");
