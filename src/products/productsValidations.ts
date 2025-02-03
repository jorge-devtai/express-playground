import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  price: z.number().positive({ message: 'El precio debe ser positivo' }),
  description: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;