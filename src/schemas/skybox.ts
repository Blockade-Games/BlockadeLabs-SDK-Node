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
  negative_text: z.string().optional(),
  enhance_prompt: z.boolean().optional(),
  seed: z.number().optional(),
  skybox_style_id: z.number().optional(),
  remix_id: z.number().optional(),
  remix_obfuscated_id: z.string().optional(),
  control_image: z.any().optional(),
  control_model: z.string().optional(),
  return_depth: z.boolean().optional(),
  webhook_url: z.string().optional(),
});

export const generateSkyboxResponse = z.object({
  id: z.number(),
  skybox_style_id: z.number(),
  skybox_style_name: z.string(),
  status: z.string(),
  type: z.string(),
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
  // Non documented data
  skybox_id: z.number().optional(),
  skybox_name: z.string().optional(),
  prompt: z.string().optional(),
  seed: z.number().optional(),
  negative_text: z.string().optional(),
  depth_map_url: z.string().optional(),
  remix_imagine_id: z.string().or(z.number()).nullish(),
});
