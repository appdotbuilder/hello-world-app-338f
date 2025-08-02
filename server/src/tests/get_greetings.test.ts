
import { describe, expect, it } from 'bun:test';
import { getGreetings } from '../handlers/get_greetings';

describe('getGreetings', () => {
  it('should return hello world message', async () => {
    const result = await getGreetings();

    expect(result.message).toEqual('Hello, World!');
    expect(result.timestamp).toBeDefined();
    expect(typeof result.timestamp).toBe('string');
  });

  it('should return valid ISO timestamp', async () => {
    const result = await getGreetings();
    
    const timestamp = new Date(result.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.toISOString()).toEqual(result.timestamp);
  });

  it('should return current timestamp', async () => {
    const beforeCall = new Date();
    const result = await getGreetings();
    const afterCall = new Date();
    
    const resultTimestamp = new Date(result.timestamp);
    expect(resultTimestamp >= beforeCall).toBe(true);
    expect(resultTimestamp <= afterCall).toBe(true);
  });
});
