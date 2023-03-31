import { z } from 'zod';

export const getGeneratorsResponse = z.array(
  z.object({
    id: z.number(),
    generator: z.string(),
    name: z.string(),
    label: z.string(),
    // NOTE: generators params can be changed all the time, so I'm leaving they as any here.
    params: z.record(z.string(), z.any()),
    sort_order: z.number().nullable(),
  }),
);

export const generateImagineRequest = z.object({
  generator: z.string(),
  // NOTE: generators params can be changed all the time, so I'm leaving they as any here.
  // You can see all the generators params for each generator calling getGenerators.
  generator_data: z.record(z.string(), z.any()),
  webhook_url: z.string().optional(),
});

export const generateImagineResponse = z.object({
  id: z.number(),
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
  type: z.string(),
  generator: z.string(),
  // NOTE: generators params can be changed all the time, so I'm leaving they as any here.
  // You can see all the generators params for each generator calling getGenerators.
  generator_data: z.record(z.string(), z.any()),
});

export const getImagineByIdRequest = z.object({
  id: z.string().or(z.number()),
});

export const getImagineByIdResponse = z.object({
  id: z.number(),
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
  dispatched_at: z.string().or(z.date()),
  processing_at: z.string().or(z.date()),
  completed_at: z.string().or(z.date()),
  type: z.string(),
  generator: z.string(),
  // NOTE: generators params can be changed all the time, so I'm leaving they as any here.
  // You can see all the generators params for each generator calling getGenerators.
  generator_data: z.record(z.string(), z.any()),
});

export const getImagineByObfuscatedIdRequest = z.object({
  obfuscated_id: z.string().or(z.number()),
});

export const getImagineByObfuscatedIdResponse = z.object({
  id: z.number(),
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
  dispatched_at: z.string().or(z.date()),
  processing_at: z.string().or(z.date()),
  completed_at: z.string().or(z.date()),
  type: z.string(),
  generator: z.string(),
  // NOTE: generators params can be changed all the time, so I'm leaving they as any here.
  // You can see all the generators params for each generator calling getGenerators.
  generator_data: z.record(z.string(), z.any()),
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
      dispatched_at: z.string().or(z.date()),
      processing_at: z.string().or(z.date()),
      completed_at: z.string().or(z.date()),
      type: z.string(),
      generator: z.string(),
      // NOTE: generators params can be changed all the time, so I'm leaving they as any here.
      // You can see all the generators params for each generator calling getGenerators.
      generator_data: z.record(z.string(), z.any()),
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
