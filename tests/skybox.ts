import { describe, it, expect } from 'vitest';
import { BlockadeLabsSdk } from '@/index';
import { delay, env } from './utils';

describe.concurrent('Skybox Suite', () => {
  it('Should retrieve Skybox Styles', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
      env: 'staging',
    });

    const styles = await sdk.getSkyboxStyles();

    expect(Array.isArray(styles)).toBe(true);
  });

  it('Should create an new Skybox and check endpoint response', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
      env: 'staging',
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

  it('Should create an new Skybox and remix it', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
      env: 'staging',
    });

    const skybox = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    // wait for imagine to be completed
    let completed = false;

    while (!completed) {
      const imagine = await sdk.getImagineById({ id: skybox.id });

      if (imagine.status === 'complete') completed = true;

      await delay(5000);
    }

    const remix = await sdk.generateSkybox({
      prompt: 'test2',
      skybox_style_id: 2,
      remix_id: skybox.id,
    });

    const remixImagine = await sdk.getImagineById({ id: remix.id });

    expect(
      (() => {
        if (remixImagine.error_message) return false;

        if (remixImagine.type !== 'skybox remix') return false;

        return true;
      })(),
    ).toBe(true);
  });
});
