import { z } from 'zod';

export const updateCatSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  age: z.number().min(0).max(30).optional(),
  breed: z.string().min(2).max(50).optional(),
});

export type UpdateCatDto = z.infer<typeof updateCatSchema>;
