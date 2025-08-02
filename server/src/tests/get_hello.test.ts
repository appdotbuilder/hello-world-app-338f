
import { describe, expect, it } from 'bun:test';
import { getHello } from '../handlers/get_hello';

describe('getHello', () => {
  it('should return hello world message', async () => {
    const result = await getHello();

    expect(result.message).toEqual('Hello, World!');
    expect(result.timestamp).toBeDefined();
    expect(typeof result.timestamp).toBe('string');
  });

  it('should return valid ISO timestamp', async () => {
    const result = await getHello();

    // Verify timestamp is a valid ISO string
    const parsedDate = new Date(result.timestamp);
    expect(parsedDate).toBeInstanceOf(Date);
    expect(parsedDate.toISOString()).toEqual(result.timestamp);
  });

  it('should return current timestamp', async () => {
    const beforeCall = new Date();
    const result = await getHello();
    const afterCall = new Date();

    const resultDate = new Date(result.timestamp);
    expect(resultDate.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
    expect(resultDate.getTime()).toBeLessThanOrEqual(afterCall.getTime());
  });

  it('should return consistent message format', async () => {
    const result1 = await getHello();
    const result2 = await getHello();

    expect(result1.message).toEqual(result2.message);
    expect(result1.message).toEqual('Hello, World!');
  });
});
