import { describe, it, expect } from 'vitest';
import { BlockadeLabsSdk } from '@/index';
import { delay, env } from './utils';

describe('Imagine Suite', () => {
  it.concurrent('Should create an new imagine and get him by ID', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const skybox = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const imagineResult = await sdk.getImagineById({ id: skybox.id });

    expect(
      (() => {
        if (!imagineResult.id) return false;

        if (imagineResult.error_message) return false;

        if (imagineResult.id !== skybox.id) return false;

        return true;
      })(),
    ).toBe(true);
  });

  it.concurrent('Should create an new imagine and get him by Obfuscated ID', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const skybox = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const imagineResult = await sdk.getImagineByObfuscatedId({ obfuscated_id: skybox.obfuscated_id });

    expect(
      (() => {
        if (!imagineResult.id) return false;

        if (imagineResult.error_message) return false;

        if (imagineResult.obfuscated_id !== skybox.obfuscated_id) return false;

        return true;
      })(),
    ).toBe(true);
  });

  it.concurrent('Should retrieve Imagine History', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const imagineHistory = await sdk.getImagineHistory();

    expect(Array.isArray(imagineHistory.data)).toBe(true);
    expect(imagineHistory.totalCount >= 0).toBe(true);
  });

  it.concurrent('Should retrieve Imagine History with limit 1', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const imagineHistory = await sdk.getImagineHistory({ limit: 1 });

    expect(Array.isArray(imagineHistory.data)).toBe(true);
    expect(imagineHistory.data.length <= 1).toBe(true);
    expect(imagineHistory.totalCount <= 1).toBe(true);
  });

  it.concurrent('Should retrieve Imagine History without the first imagine', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const fistImagineInHistory = (await sdk.getImagineHistory({ limit: 1 })).data[0];

    const imagineHistoryWithOffset = await sdk.getImagineHistory({ offset: 1 });

    expect(
      (() => {
        if (!fistImagineInHistory) return true;

        const firstItem = imagineHistoryWithOffset.data[0];

        if (!firstItem) return true;

        if (firstItem.id !== fistImagineInHistory.id) return true;

        return false;
      })(),
    ).toBe(true);
  });

  it.concurrent('Should get only completed imagines in history', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const imagineHistory = await sdk.getImagineHistory({ status: 'complete' });

    expect(
      (() => {
        for (const imagine of imagineHistory.data) {
          if (imagine.status === 'complete') continue;

          return false;
        }

        return true;
      })(),
    ).toBe(true);
  });

  it.concurrent('Should get imagine history in ASC and DESC order', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const imagineHistoryAsc = await sdk.getImagineHistory({ order: 'ASC' });
    const imagineHistoryDesc = await sdk.getImagineHistory({ order: 'DESC' });

    // ASC test
    expect(
      (() => {
        if (imagineHistoryAsc.data.length < 2 || imagineHistoryDesc.data.length < 2) return true;

        const firstItemDate = new Date(imagineHistoryAsc.data[0]?.created_at || '');
        const secondItemDate = new Date(imagineHistoryAsc.data[1]?.created_at || '');

        if (secondItemDate >= firstItemDate) return true;

        return false;
      })(),
    ).toBe(true);

    // DESC test
    expect(
      (() => {
        if (imagineHistoryAsc.data.length < 2 || imagineHistoryDesc.data.length < 2) return true;

        const firstItemDate = new Date(imagineHistoryDesc.data[0]?.created_at || '');
        const secondItemDate = new Date(imagineHistoryDesc.data[1]?.created_at || '');

        if (firstItemDate >= secondItemDate) return true;

        return false;
      })(),
    ).toBe(true);
  });

  it.concurrent('Should create an new imagine and find him on imagine history by ID', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const imagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const imagineHistory = await sdk.getImagineHistory({ imagine_id: imagine.id });

    expect(imagineHistory.totalCount === 1).toBe(true);
    expect(imagineHistory.data[0]?.id === imagine.id).toBe(true);
  });

  it.concurrent('Should create an new imagine and find him on imagine history by Title', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const imagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const imagineHistory = await sdk.getImagineHistory({ query: imagine.title });

    expect(imagineHistory.totalCount >= 1).toBe(true);
    expect(imagineHistory.data[0]?.id === imagine.id).toBe(true);
    expect(imagineHistory.data[0]?.title === imagine.title).toBe(true);
  });

  it.concurrent('Should create an new imagine and find him on imagine history by Prompt', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const imagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const imagineHistory = await sdk.getImagineHistory({ query: imagine.prompt });

    expect(imagineHistory.totalCount >= 1).toBe(true);
    expect(imagineHistory.data[0]?.prompt === imagine.prompt).toBe(true);
  });

  it.concurrent('Should create an new imagine and cancel him', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const generateImagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const cancelRequest = await sdk.cancelImagine({ id: generateImagine.id });

    const imagine = await sdk.getImagineById({ id: generateImagine.id });

    expect(cancelRequest.success).toBe(true);
    expect(imagine.status === 'abort').toBe(true);
  });

  // NOTE: the tests below should not be executed concurrent since they can affect the other ones
  it('Should create imagine requests and cancel all', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const firstGenerateImagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const secondGenerateImagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    const cancelAllRequest = await sdk.cancelAllPendingImagines();

    const firstImagine = await sdk.getImagineById({ id: firstGenerateImagine.id });
    const secondImagine = await sdk.getImagineById({ id: secondGenerateImagine.id });

    expect(cancelAllRequest.success).toBe(true);
    expect(firstImagine.status === 'abort').toBe(true);
    expect(secondImagine.status === 'abort').toBe(true);
  });

  it('Should create an new imagine and delete him', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const generateImagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });
    // wait for imagine to be completed
    let completed = false;

    while (!completed) {
      const imagine = await sdk.getImagineById({ id: generateImagine.id });

      if (imagine.status === 'complete') completed = true;

      await delay(5000);
    }

    const deleteRequest = await sdk.deleteImagine({ id: generateImagine.id });

    expect(Boolean(deleteRequest.success)).toBe(true);
    expect(String(generateImagine.id) === String(deleteRequest.id));
  });

  it.fails('Should fail when trying to retrieve an deleted imagine', async () => {
    const sdk = new BlockadeLabsSdk({
      api_key: env.api_key,
    });

    const generateImagine = await sdk.generateSkybox({
      prompt: 'test',
      skybox_style_id: 2,
    });

    // wait for imagine to be completed
    let completed = false;

    while (!completed) {
      const imagine = await sdk.getImagineById({ id: generateImagine.id });

      if (imagine.status === 'complete') completed = true;

      await delay(5000);
    }

    await sdk.deleteImagine({ id: generateImagine.id });

    // This should fail here
    await sdk.getImagineById({ id: generateImagine.id });
  });
});
