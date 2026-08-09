import { describe, expect, it } from "vitest";
import { emailSettingsSchema } from "./email-settings-schema";

describe("email settings schema", () => {
  it("keeps configurable subjects and unknown backend fields", () => {
    const result = emailSettingsSchema.parse({
      id: 1,
      method: "email",
      enabled: true,
      config: {
        enable_verify: true,
        enable_domain_suffix: false,
        platform: "smtp",
        verify_email_subject: "Verify {{.SiteName}}",
        expiration_email_subject: "Expired {{.ExpireDate}}",
        maintenance_email_subject: "Maintenance {{.MaintenanceDate}}",
        traffic_exceed_email_subject: "Traffic exceeded",
        future_backend_option: "preserved",
        platform_config: {
          ssl: true,
          future_smtp_option: "preserved",
        },
      },
    });

    expect(result.config).toMatchObject({
      verify_email_subject: "Verify {{.SiteName}}",
      expiration_email_subject: "Expired {{.ExpireDate}}",
      maintenance_email_subject: "Maintenance {{.MaintenanceDate}}",
      traffic_exceed_email_subject: "Traffic exceeded",
      future_backend_option: "preserved",
      platform_config: {
        future_smtp_option: "preserved",
      },
    });
  });
});
