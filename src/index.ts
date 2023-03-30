import { AxiosInstance } from 'axios';
import { z } from 'zod';
import FormData from 'form-data';

import { prodApi, stagingApi } from '@/services/api';
import { getSkyboxStylesResponse, generateSkyboxRequest, generateSkyboxResponse } from '@/schemas/skybox';
import {
  cancelAllPendingImaginesResponse,
  cancelImagineRequest,
  cancelImagineResponse,
  deleteImagineRequest,
  deleteImagineResponse,
  generateImagineRequest,
  generateImagineResponse,
  getGeneratorsResponse,
  getImagineByIdRequest,
  getImagineByIdResponse,
  getImagineByObfuscatedIdRequest,
  getImagineByObfuscatedIdResponse,
  getImagineHistoryRequest,
  getImagineHistoryResponse,
} from '@/schemas/imagine';
import { InternalError } from '@/utils/error';

type BlockadeLabsSdkConstructor = {
  api_key: string;
  env?: 'production' | 'staging';
};

export class BlockadeLabsSdk {
  private api_key: string;
  private api: AxiosInstance;

  constructor({ api_key, env }: BlockadeLabsSdkConstructor) {
    this.api_key = api_key;
    this.api = env === 'production' ? prodApi : stagingApi;
  }

  async getSkyboxStyles(): Promise<z.infer<typeof getSkyboxStylesResponse>> {
    try {
      const { data } = await this.api.get(`/skybox/styles?api_key=${this.api_key}`);

      const responseValidator = getSkyboxStylesResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error retrieving skybox styles');
    }
  }

  async generateSkybox(input: z.infer<typeof generateSkyboxRequest>): Promise<z.infer<typeof generateSkyboxResponse>> {
    try {
      const requestValidator = generateSkyboxRequest.safeParse(input);

      if (requestValidator.success === false) {
        throw new InternalError(requestValidator.error.message);
      }

      const { prompt, skybox_style_id, webhook_url } = requestValidator.data;

      const formData = new FormData();

      formData.append('api_key', this.api_key);
      formData.append('prompt', prompt);
      formData.append('skybox_style_id', skybox_style_id);

      if (webhook_url) {
        formData.append('webhook_url', webhook_url);
      }

      const { data } = await this.api.post('/skybox', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.error) {
        throw new InternalError(`${data.error}`);
      }

      const responseValidator = generateSkyboxResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error generating new skybox');
    }
  }

  async getGenerators(): Promise<z.infer<typeof getGeneratorsResponse>> {
    try {
      const { data } = await this.api.get(`/generators?api_key=${this.api_key}`);

      const responseValidator = getGeneratorsResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error retrieving generators');
    }
  }

  async generateImagine(
    input: z.infer<typeof generateImagineRequest>,
  ): Promise<z.infer<typeof generateImagineResponse>> {
    try {
      const requestValidator = generateImagineRequest.safeParse(input);

      if (requestValidator.success === false) {
        throw new InternalError(requestValidator.error.message);
      }

      const { generator, generator_data, webhook_url } = requestValidator.data;

      const formData = new FormData();

      formData.append('api_key', this.api_key);
      formData.append('generator', generator);

      if (webhook_url) {
        formData.append('webhook_url', webhook_url);
      }

      Object.entries(generator_data).map(([key, value]) => {
        if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
          formData.append(key, value, { filename: key, contentType: 'application/octet-stream' });
          return;
        }

        if (value instanceof Uint8Array) {
          // Check if it's an browser env
          if (typeof window !== 'undefined') {
            const blob = new Blob([value], { type: 'application/octet-stream' });
            formData.append(key, blob, key);
            return;
          }

          const buffer = Buffer.from(value);
          formData.append(key, buffer, { filename: key, contentType: 'application/octet-stream' });
          return;
        }

        formData.append(key, value);
      });

      const { data } = await this.api.post('/imagine/requests', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.error) {
        throw new InternalError(`${data.error}`);
      }

      const responseValidator = generateImagineResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error generating new imagine');
    }
  }

  async getImagineById(input: z.infer<typeof getImagineByIdRequest>): Promise<z.infer<typeof getImagineByIdResponse>> {
    try {
      const requestValidator = getImagineByIdRequest.safeParse(input);

      if (requestValidator.success === false) {
        throw new InternalError(requestValidator.error.message);
      }

      const { id } = requestValidator.data;

      const { data } = await this.api.get(`/imagine/requests/${id}?api_key=${this.api_key}`);

      if (data.error) {
        throw new InternalError(`${data.error}`);
      }

      const responseValidator = getImagineByIdResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError(`Unexpected error retrieving imagine: ${input.id}`);
    }
  }

  async getImagineByObfuscatedId(
    input: z.infer<typeof getImagineByObfuscatedIdRequest>,
  ): Promise<z.infer<typeof getImagineByObfuscatedIdResponse>> {
    try {
      const requestValidator = getImagineByObfuscatedIdRequest.safeParse(input);

      if (requestValidator.success === false) {
        throw new InternalError(requestValidator.error.message);
      }

      const { obfuscated_id } = requestValidator.data;

      const { data } = await this.api.get(`/imagine/requests/obfuscated-id/${obfuscated_id}?api_key=${this.api_key}`);

      if (data.error) {
        throw new InternalError(`${data.error}`);
      }

      const responseValidator = getImagineByObfuscatedIdResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError(`Unexpected error retrieving imagine: ${input.obfuscated_id}`);
    }
  }

  async getImagineHistory(
    input?: z.infer<typeof getImagineHistoryRequest>,
  ): Promise<z.infer<typeof getImagineHistoryResponse>> {
    try {
      const requestValidator = getImagineHistoryRequest.safeParse(input);

      if (requestValidator.success === false) {
        throw new InternalError(requestValidator.error.message);
      }

      const url = (() => {
        if (requestValidator.data) {
          const searchParams = new URLSearchParams();

          Object.entries(requestValidator.data).map(([key, value]) => {
            searchParams.append(key, String(value));
          });

          return `/imagine/myRequests?api_key=${this.api_key}&${searchParams.toString()}`;
        }

        return `/imagine/myRequests?api_key=${this.api_key}`;
      })();

      const { data } = await this.api.get(url);

      const responseValidator = getImagineHistoryResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error retrieving imagine history');
    }
  }

  async cancelImagine(input: z.infer<typeof cancelImagineRequest>): Promise<z.infer<typeof cancelImagineResponse>> {
    try {
      const requestValidator = cancelImagineRequest.safeParse(input);

      if (requestValidator.success === false) {
        throw new InternalError(requestValidator.error.message);
      }

      const { id } = requestValidator.data;

      const { data } = await this.api.delete(`/imagine/requests/${id}?api_key=${this.api_key}`);

      if (data.error) {
        throw new InternalError(`${data.error}`);
      }

      const responseValidator = cancelImagineResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error retrieving imagine history');
    }
  }

  async cancelAllPendingImagines(): Promise<z.infer<typeof cancelAllPendingImaginesResponse>> {
    try {
      const { data } = await this.api.delete(`/imagine/requests/pending?api_key=${this.api_key}`);

      const responseValidator = cancelAllPendingImaginesResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error retrieving imagine history');
    }
  }

  async deleteImagine(input: z.infer<typeof deleteImagineRequest>): Promise<z.infer<typeof deleteImagineResponse>> {
    try {
      const requestValidator = deleteImagineRequest.safeParse(input);

      if (requestValidator.success === false) {
        throw new InternalError(requestValidator.error.message);
      }

      const { id } = requestValidator.data;

      const { data } = await this.api.delete(`/imagine/deleteImagine/${id}?api_key=${this.api_key}`);

      if (data.error) {
        throw new InternalError(`${data.error}`);
      }

      const responseValidator = deleteImagineResponse.safeParse(data);

      if (responseValidator.success === false) {
        throw new InternalError(responseValidator.error.message);
      }

      return responseValidator.data;
    } catch (err) {
      if (err instanceof InternalError) throw new InternalError(err.message);

      throw new InternalError('Unexpected error retrieving imagine history');
    }
  }
}
