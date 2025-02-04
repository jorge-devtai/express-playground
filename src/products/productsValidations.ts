import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().optional(), // id es opcional
  name: z.string(),
  price: z.number(),
  description: z.string().optional(), // description es opcional
});

export type ProductInput = z.infer<typeof productSchema>;