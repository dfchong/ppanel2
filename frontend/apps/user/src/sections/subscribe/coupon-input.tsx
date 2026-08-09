"use client";

import { Input } from "@workspace/ui/components/input";
import type React from "react";
import { useTranslation } from "react-i18next";

interface CouponInputProps {
  coupon?: string;
  onChange: (value: string) => void;
}

const CouponInput: React.FC<CouponInputProps> = ({ coupon, onChange }) => {
  const { t } = useTranslation("subscribe");

  return (
    <>
      <div className="font-semibold">{t("coupon", "Coupon")}</div>
      <Input
        onChange={(e) => onChange(e.target.value.trim())}
        placeholder={t("enterCoupon", "Enter Coupon")}
        value={coupon}
      />
    </>
  );
};

export default CouponInput;
