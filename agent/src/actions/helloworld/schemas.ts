import { z } from "zod";

export const helloWorldSetGreetingSchema = z
  .object({
    newGreeting: z.string().describe("The new greeting we will have"),
  })
  .strip()
  .describe("Set a new greeting for the Hello World contract");

export const helloWorldGetGreetingSchema = z
  .object({})
  .strip()
  .describe("Get the current greeting for the Hello World contract");

