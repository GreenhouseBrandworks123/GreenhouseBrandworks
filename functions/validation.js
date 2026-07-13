const { z } = require("zod");

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number."),

  company: z
    .string()
    .trim()
    .min(2, "Company name is required.")
    .max(100, "Company name is too long."),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long."),

  captchaToken: z
    .string()
    .min(1, "Captcha verification is required."),
});

const jobApplicationSchema = z.object({
  jobId: z.string().min(1),
  jobTitle: z.string().min(1),

  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50)
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number."),

  resumeURL: z
    .string()
    .url("Invalid resume URL."),

  portfolio: z
    .string()
    .trim()
    .optional(),

  message: z
    .string()
    .trim()
    .max(2000)
    .optional(),

  captchaToken: z
    .string()
    .min(1, "Captcha verification is required."),
});

module.exports = {
  contactSchema,
  jobApplicationSchema,
};