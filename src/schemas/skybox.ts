import { z } from 'zod';

export const getSkyboxStylesResponse = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    'max-char': z.string(),
    image: z.string().or(z.null()),
    sort_order: z.number(),
  }),
);

export const generateSkyboxRequest = z.object({
  prompt: z.string(),
  skybox_style_id: z.number(),
  webhook_url: z.string().optional(),
});

export const generateSkyboxResponse = z.object({
  id: z.number(),
  skybox_style_id: z.number(),
  skybox_style_name: z.string(),
  status: z.string(),
  queue_position: z.number(),
  file_url: z.string(),
  thumb_url: z.string(),
  title: z.string(),
  user_id: z.number(),
  username: z.string(),
  // TODO: find this type here
  error_message: z.null().or(z.any()),
  obfuscated_id: z.string(),
  pusher_channel: z.string(),
  pusher_event: z.string(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
});
