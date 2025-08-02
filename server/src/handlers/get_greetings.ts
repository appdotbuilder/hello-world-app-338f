
import { type HelloWorldResponse } from '../schema';

export const getGreetings = async (): Promise<HelloWorldResponse> => {
  return {
    message: 'Hello, World!',
    timestamp: new Date().toISOString()
  };
};
