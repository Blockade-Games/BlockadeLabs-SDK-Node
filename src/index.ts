import { AxiosInstance } from 'axios';
import { z } from 'zod';
import FormData from 'form-data';

import { prodApi, stagingApi } from '@/services/api';
import { getSkyboxStylesResponse, generateSkyboxRequest, generateSkyboxResponse } from '@/schemas/skybox';

type BlockadeLabsSdkConstructor = {
  api_key: string;
  env?: 'production' | 'staging';
};

type Error = {
  message: string;
};

export class BlockadeLabsSdk {
  private api_key: string;
  private api: AxiosInstance;

  constructor({ api_key, env }: BlockadeLabsSdkConstructor) {
    this.api_key = api_key;
    this.api = env === 'production' ? prodApi : stagingApi;
  }

  async getSkyboxStyles(): Promise<z.infer<typeof getSkyboxStylesResponse> | Error> {
    try {
      const { data } = await this.api.get(`/skybox/styles?api_key=${this.api_key}`);

      const validator = getSkyboxStylesResponse.safeParse(data);

      if (validator.success === false) {
        return {
          message: validator.error.message,
        };
      }

      return validator.data;
    } catch (_err) {
      return {
        message: 'Unexpected error retrieving skybox styles',
      };
    }
  }

  async generateSkybox({
    prompt,
    skybox_style_id,
    webhook_url,
  }: z.infer<typeof generateSkyboxRequest>): Promise<z.infer<typeof generateSkyboxResponse> | Error> {
    try {
      const formData = new FormData();

      formData.append('api_key', this.api_key);
      formData.append('prompt', prompt);
      formData.append('skybox_style_id', skybox_style_id);

      if (webhook_url) {
        formData.append('webhook_url', webhook_url);
      }

      const { data } = await this.api.post('/skybox', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Content-Length': `${formData.getLengthSync()}` },
      });

      const validator = generateSkyboxResponse.safeParse(data);

      if (validator.success === false) {
        return {
          message: validator.error.message,
        };
      }

      return validator.data;
    } catch (_err) {
      return {
        message: 'Unexpected error generating new skybox',
      };
    }
  }
}
