
import { z } from 'zod';

// Simple hello world response schema
export const helloWorldResponseSchema = z.object({
  message: z.string(),
  timestamp: z.string()
});

export type HelloWorldResponse = z.infer<typeof helloWorldResponseSchema>;
