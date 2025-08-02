
import { z } from 'zod';

// Hello message schema
export const helloMessageSchema = z.object({
  message: z.string(),
  timestamp: z.coerce.date()
});

export type HelloMessage = z.infer<typeof helloMessageSchema>;

// Input schema for personalized greeting
export const greetingInputSchema = z.object({
  name: z.string().min(1).max(100)
});

export type GreetingInput = z.infer<typeof greetingInputSchema>;
