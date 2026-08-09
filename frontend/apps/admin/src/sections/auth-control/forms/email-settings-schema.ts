import { z } from "zod";

export const emailSettingsSchema = z.object({
  id: z.number(),
  method: z.string(),
  enabled: z.boolean(),
  config: z
    .object({
      enable_verify: z.boolean(),
      enable_domain_suffix: z.boolean(),
      enable_notify: z.boolean().optional(),
      domain_suffix_list: z.string().optional(),
      verify_email_subject: z.string().optional(),
      verify_email_template: z.string().optional(),
      expiration_email_subject: z.string().optional(),
      expiration_email_template: z.string().optional(),
      maintenance_email_subject: z.string().optional(),
      maintenance_email_template: z.string().optional(),
      traffic_exceed_email_subject: z.string().optional(),
      traffic_exceed_email_template: z.string().optional(),
      platform: z.string(),
      platform_config: z
        .object({
          host: z.string().optional(),
          port: z.number().optional(),
          ssl: z.boolean(),
          user: z.string().optional(),
          pass: z.string().optional(),
          from: z.string().optional(),
          reply_to: z.string().optional(),
        })
        .passthrough()
        .optional(),
    })
    .passthrough()
    .optional(),
});

export type EmailSettingsFormData = z.infer<typeof emailSettingsSchema>;
