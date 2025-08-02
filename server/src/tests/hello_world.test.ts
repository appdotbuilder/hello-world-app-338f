
import { describe, expect, it } from 'bun:test';
import { getHelloWorld } from '../handlers/hello_world';

describe('getHelloWorld', () => {
  it('should return hello world message', async () => {
    const result = await getHelloWorld();

    expect(result.message).toEqual('Hello, World!');
    expect(result.timestamp).toBeDefined();
    expect(typeof result.timestamp).toBe('string');
  });

  it('should return valid ISO timestamp', async () => {
    const result = await getHelloWorld();
    
    // Verify timestamp is a valid ISO string
    const timestamp = new Date(result.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.toISOString()).toEqual(result.timestamp);
  });

  it('should return different timestamps on subsequent calls', async () => {
    const result1 = await getHelloWorld();
    
    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 1));
    
    const result2 = await getHelloWorld();

    expect(result1.message).toEqual(result2.message);
    expect(result1.timestamp).not.toEqual(result2.timestamp);
  });
});
