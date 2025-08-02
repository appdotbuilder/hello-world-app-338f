
import { type HelloWorldResponse } from '../schema';

export async function getHelloWorld(): Promise<HelloWorldResponse> {
    // This handler returns a simple "Hello, World!" message with timestamp
    // No database interaction or complex logic needed
    return {
        message: 'Hello, World!',
        timestamp: new Date().toISOString()
    };
}
