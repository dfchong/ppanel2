"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import { useTranslation } from "react-i18next";
import ConfigForm from "./config-form";
import { ProtocolForm } from "./protocol-form";

export default function Subscribe() {
  const { t } = useTranslation("subscribe");

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">
        {t("config.title", "Subscription Configuration")}
      </h2>
      <Card className="py-3">
        <CardContent>
          <ConfigForm />
        </CardContent>
      </Card>

      <ProtocolForm />
    </div>
  );
}
