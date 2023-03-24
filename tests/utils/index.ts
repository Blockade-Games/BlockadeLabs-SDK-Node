import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  api_key: process.env.API_KEY || '',
};
