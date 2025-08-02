
import { type HelloWorldResponse } from '../schema';

export const getHello = async (): Promise<HelloWorldResponse> => {
  return {
    message: "Hello, World!",
    timestamp: new Date().toISOString()
  };
};
