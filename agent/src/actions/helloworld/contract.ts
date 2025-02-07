export const helloWorldContractAddress =
  "0x5C57dA52B765DbBA43177fB1418e4BC947C61BA4"; // in base sepolia

export const helloWorldAbi = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_text", type: "string" }],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
