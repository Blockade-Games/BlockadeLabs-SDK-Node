# BlockadeLabs SDK

BlockadeLabs SDK for TypeScript/JavaScript

## Envs Supported

- Node.js
- Modern browsers

## How to Install

```
$ yarn add @blockadelabs/sdk

# or

$ npm i @blockadelabs/sdk
```

## Basic Usage

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY, // REQUIRED
});
```

## Methods Doc

#### getSkyboxStyles

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

const styles = await sdk.getSkyboxStyles();
```

#### generateSkybox

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

const generation = await sdk.generateSkybox({
  prompt: 'PROMPT_GOES_HERE', // Required
  skybox_style_id: 2, // Required
  webhook_url: 'YOUR_WEBHOOK_URL', // Optional
});
```

#### Remix Skybox

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

const generation = await sdk.generateSkybox({
  prompt: 'PROMPT_GOES_HERE', // Required
  skybox_style_id: 2, // Required
  remix_id: 1, // OR remix_obfuscated_id
  webhook_url: 'YOUR_WEBHOOK_URL', // Optional
});
```

#### getImagineById

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

const imagine = await sdk.generateImagine({
  generator: 'stable',
  generator_data: {
    prompt: 'PROMPT_GOES_HERE',
  },
});

const imagineResult = await sdk.getImagineById({
  id: imagine.id, // REQUIRED
});
```

#### getImagineByObfuscatedId

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

const imagine = await sdk.generateImagine({
  generator: 'stable',
  generator_data: {
    prompt: 'PROMPT_GOES_HERE',
  },
});

const imagineResult = await sdk.getImagineByObfuscatedId({
  obfuscated_id: imagine.obfuscated_id, // REQUIRED
});
```

#### getImagineHistory

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

const imagineHistory = await sdk.getImagineHistory();

const imagineHistoryWithFilters = await sdk.getImagineHistory({
  status: 'STATUS', // OPTIONAL
  limit: 10, // OPTIONAL
  offset: 0, // OPTIONAL
  order: 'ASC', // OPTIONAL
  imagine_id: 1, // OPTIONAL
  query: 'PROMPT', // OPTIONAL
  generator: 'GENERATOR', // OPTIONAL
});
```

#### cancelImagine

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

const generateImagine = await sdk.generateImagine({
  generator: 'stable',
  generator_data: { prompt: 'PROMPT_GOES_HERE' },
});

await sdk.cancelImagine({
  id: generateImagine.id, // REQUIRED
});
```

#### cancelAllPendingImagines

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

await sdk.cancelAllPendingImagines();
```

#### deleteImagine

```ts
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

const sdk = new BlockadeLabsSdk({
  api_key: YOUR_API_KEY,
});

await sdk.deleteImagine({
  id: IMAGINE_ID_GOES_HERE, // REQUIRED
});
```
