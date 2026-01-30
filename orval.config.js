import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: './petstore.json',
    output: {
      httpClient: "axios",
      target: './src/api/petstore.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/mutator/client.ts',
          name: 'customInstance',
        },
      },
    },
  },
});