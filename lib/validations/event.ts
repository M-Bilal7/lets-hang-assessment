import { z } from 'zod';

// Event form validation schema with custom error messages
export const eventFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  dateTime: z.date({
    error: 'Date and time is required',
  }),
  location: z
    .string()
    .min(1, 'Location is required')
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location must be less than 100 characters'),
  cost: z
    .string()
    .min(1, 'Cost is required')
    .refine(
      (val) => {
        const num = parseFloat(val.replace(/[^0-9.]/g, ''));
        return !isNaN(num) && num >= 0;
      },
      { message: 'Please enter a valid cost' }
    ),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;