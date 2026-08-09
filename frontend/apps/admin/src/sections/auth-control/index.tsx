import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@workspace/ui/components/table";
import { useTranslation } from "react-i18next";
import AppleForm from "./forms/apple-form";
import DeviceForm from "./forms/device-form";
import EmailSettingsForm from "./forms/email-settings-form";
import FacebookForm from "./forms/facebook-form";
import GithubForm from "./forms/github-form";
import GoogleForm from "./forms/google-form";
import PhoneSettingsForm from "./forms/phone-settings-form";
import TelegramForm from "./forms/telegram-form";

export default function AuthControl() {
  const { t } = useTranslation("auth-control");

  const formSections = [
    {
      title: t("communicationMethods", "Communication Methods"),
      forms: [
        { component: EmailSettingsForm },
        { component: PhoneSettingsForm },
      ],
    },
    {
      title: t("socialAuthMethods", "Social Authentication Methods"),
      forms: [
        { component: AppleForm },
        { component: GoogleForm },
        { component: FacebookForm },
        { component: GithubForm },
        { component: TelegramForm },
      ],
    },
    {
      title: t("deviceAuthMethods", "Device Authentication Methods"),
      forms: [{ component: DeviceForm }],
    },
  ];

  return (
    <div className="space-y-8">
      {formSections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2 className="mb-4 font-semibold text-lg">{section.title}</h2>
          <Table>
            <TableBody>
              {section.forms.map((form, formIndex) => {
                const FormComponent = form.component;
                return (
                  <TableRow key={formIndex}>
                    <TableCell>
                      <FormComponent />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
