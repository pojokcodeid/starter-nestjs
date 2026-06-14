import { z } from 'zod';

/**
 * Zod schema untuk validasi update kucing
 * Semua field optional saat update (partial)
 */
export const updateCatSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  age: z.number().int().min(0).max(30).optional(),
  breed: z.string().min(1).optional(),
});

export type UpdateCatDto = z.infer<typeof updateCatSchema>;
