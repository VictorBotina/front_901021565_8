
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchFromStrapi } from '@/lib/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function StrapiApiTestPage() {
  const [endpoint, setEndpoint] = useState('articles');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const data = await fetchFromStrapi(endpoint);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Test Strapi API</CardTitle>
          <CardDescription>
            Enter a Strapi API endpoint to fetch data and see the response.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-md items-center space-x-2">
            <Input
              type="text"
              placeholder="e.g., articles?populate=*"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              disabled={loading}
            />
            <Button onClick={handleFetch} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch'}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {response && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">API Response:</h3>
              <pre className="mt-2 h-[400px] w-full overflow-auto rounded-md bg-secondary p-4">
                <code>{JSON.stringify(response, null, 2)}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
