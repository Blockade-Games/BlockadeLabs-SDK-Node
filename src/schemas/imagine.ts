import { z } from 'zod';

export const getImagineByIdRequest = z.object({
  id: z.string().or(z.number()),
});

export const getImagineByIdResponse = z.object({
  id: z.number(),
  obfuscated_id: z.string(),
  user_id: z.number(),
  username: z.string(),

  status: z.string(),
  queue_position: z.number(),
  pusher_channel: z.string(),
  pusher_event: z.string(),
  // TODO: find this type here
  error_message: z.null().or(z.any()),

  type: z.string(),
  title: z.string(),
  prompt: z.string().optional(),
  seed: z.number().optional(),
  skybox_style_id: z.number().optional(),
  skybox_style_name: z.string().optional(),

  file_url: z.string(),
  thumb_url: z.string(),
  depth_map_url: z.string().optional(),

  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  dispatched_at: z.string().or(z.date()),
  processing_at: z.string().or(z.date()),
  completed_at: z.string().or(z.date()),
});

export const getImagineByObfuscatedIdRequest = z.object({
  obfuscated_id: z.string().or(z.number()),
});

export const getImagineByObfuscatedIdResponse = z.object({
  id: z.number(),
  obfuscated_id: z.string(),
  user_id: z.number(),
  username: z.string(),

  status: z.string(),
  queue_position: z.number(),
  pusher_channel: z.string(),
  pusher_event: z.string(),
  // TODO: find this type here
  error_message: z.null().or(z.any()),

  type: z.string(),
  title: z.string(),
  prompt: z.string().optional(),
  seed: z.number().optional(),
  skybox_style_id: z.number().optional(),
  skybox_style_name: z.string().optional(),

  file_url: z.string(),
  thumb_url: z.string(),
  depth_map_url: z.string().optional(),

  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  dispatched_at: z.string().or(z.date()),
  processing_at: z.string().or(z.date()),
  completed_at: z.string().or(z.date()),
});

export const getImagineHistoryRequest = z
  .object({
    status: z.string(),
    limit: z.number(),
    offset: z.number(),
    order: z.literal('ASC').or(z.literal('DESC')),
    imagine_id: z.number(),
    query: z.string(),
    generator: z.string(),
  })
  .partial()
  .optional();

export const getImagineHistoryResponse = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      obfuscated_id: z.string(),
      user_id: z.number(),
      username: z.string(),

      status: z.string(),
      queue_position: z.number(),
      pusher_channel: z.string(),
      pusher_event: z.string(),
      error_message: z.null().or(z.any()),

      type: z.string(),
      title: z.string(),
      prompt: z.string().optional(),
      seed: z.number().optional(),
      skybox_style_id: z.number().optional(),
      skybox_style_name: z.string().optional(),

      file_url: z.string(),
      thumb_url: z.string(),
      depth_map_url: z.string().optional(),

      created_at: z.string().or(z.date()),
      updated_at: z.string().or(z.date()),
      dispatched_at: z.string().or(z.date()),
      processing_at: z.string().or(z.date()),
      completed_at: z.string().or(z.date()),
    }),
  ),
  totalCount: z.number(),
  has_more: z.boolean(),
});

export const cancelImagineRequest = z.object({
  id: z.string().or(z.number()),
});

export const cancelImagineResponse = z.object({ success: z.boolean() });

export const cancelAllPendingImaginesResponse = z.object({ success: z.boolean() });

export const deleteImagineRequest = z.object({
  id: z.string().or(z.number()),
});

export const deleteImagineResponse = z.object({ success: z.string(), id: z.string() });
