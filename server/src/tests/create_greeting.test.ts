
import { describe, expect, it } from 'bun:test';
import { createGreeting } from '../handlers/create_greeting';

describe('createGreeting', () => {
  it('should return hello world message', async () => {
    const result = await createGreeting();

    expect(result.message).toEqual('Hello, World!');
    expect(result.timestamp).toBeDefined();
    expect(typeof result.timestamp).toBe('string');
  });

  it('should return valid ISO timestamp', async () => {
    const result = await createGreeting();
    
    // Verify timestamp is a valid ISO string
    const timestamp = new Date(result.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.toISOString()).toEqual(result.timestamp);
  });

  it('should return consistent message format', async () => {
    const result1 = await createGreeting();
    const result2 = await createGreeting();

    expect(result1.message).toEqual(result2.message);
    expect(result1.message).toEqual('Hello, World!');
  });
});
