
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import type { HelloWorldResponse } from '../../server/src/schema';

function App() {
  const [helloData, setHelloData] = useState<HelloWorldResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHelloWorld = async () => {
    setIsLoading(true);
    try {
      const response = await trpc.hello.query();
      setHelloData(response);
    } catch (error) {
      console.error('Failed to fetch hello world:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            🌍 Hello World App
          </CardTitle>
          <CardDescription className="text-gray-600">
            Click the button to fetch a greeting from the server
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={fetchHelloWorld} 
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? '🔄 Loading...' : '👋 Say Hello'}
          </Button>
          
          {helloData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-lg font-semibold text-green-800 mb-2">
                {helloData.message}
              </p>
              <p className="text-sm text-green-600">
                📅 {new Date(helloData.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
