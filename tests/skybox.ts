import { describe, it, expect } from 'vitest';
import { BlockadeLabsSdk } from '@/index';
import { env } from './utils';

describe.concurrent('Skybox Suite', () => {
  it('Should retrieve Skybox Styles', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const styles = await sdk.getSkyboxStyles();

    expect(Array.isArray(styles)).toBe(true);
  });

  it('Should create an new Skybox and check endpoint response', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const skybox = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    expect(
      (() => {
        if (skybox.error_message) return false;

        if (skybox.skybox_style_id !== 2) return false;

        return true;
      })(),
    ).toBe(true);
  });
});
