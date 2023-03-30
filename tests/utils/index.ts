import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  api_key: process.env.API_KEY || '',
};

export const readFileAsBuffer = (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

export const readImageAsUint8Array = (filePath: string): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const uint8Array = new Uint8Array(data.buffer);
        resolve(uint8Array);
      }
    });
  });
};

export const delay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};
