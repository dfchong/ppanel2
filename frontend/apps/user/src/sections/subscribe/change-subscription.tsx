"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { querySubscribeList } from "@workspace/ui/services/user/subscribe";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import Purchase from "./purchase";

interface ChangeSubscriptionProps {
  subscribe: API.Subscribe;
}

export default function ChangeSubscription({
  subscribe,
}: Readonly<ChangeSubscriptionProps>) {
  const { t, i18n } = useTranslation("subscribe");
  const locale = i18n.language;
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<API.Subscribe>();

  const unitTimeMap: Record<string, string> = {
    Day: t("Day", "Day"),
    Hour: t("Hour", "Hour"),
    Minute: t("Minute", "Minute"),
    Month: t("Month", "Month"),
    NoLimit: t("NoLimit", "No Limit"),
    Year: t("Year", "Year"),
  };

  const { data: subscribeList } = useQuery({
    queryKey: ["querySubscribeList", locale],
    queryFn: async () => {
      const { data } = await querySubscribeList({ language: locale });
      return data.data?.list || [];
    },
  });

  // 其它可购买的套餐（排除当前已订阅套餐）。限时与不限时订阅不可互转，
  // 因此仅允许"限时→限时 / 不限时→不限时"变更。
  const currentNoLimit = subscribe.unit_time === "NoLimit";
  const alternatives = subscribeList?.filter(
    (item) =>
      item.id !== subscribe.id &&
      item.show &&
      (item.unit_time === "NoLimit") === currentNoLimit
  );
  // 是否存在被限时规则过滤掉的其它可购套餐（用于区分空态文案）
  const crossLimitBlocked = subscribeList?.some(
    (item) =>
      item.id !== subscribe.id &&
      item.show &&
      (item.unit_time === "NoLimit") !== currentNoLimit
  );

  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            {t("changeSubscription", "Change Subscription")}
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-screen-md">
          <DialogHeader>
            <DialogTitle>
              {t("changeSubscriptionTitle", "Change Subscription")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            {alternatives?.length ? (
              alternatives.map((item) => {
                const unitTime =
                  unitTimeMap[item.unit_time!] || item.unit_time || "Month";
                return (
                  <Button
                    className="flex h-auto w-full items-center justify-between gap-2 py-4"
                    key={item.id}
                    onClick={() => {
                      setOpen(false);
                      setTarget(item);
                    }}
                    variant="outline"
                  >
                    <span className="line-clamp-2 text-left">{item.name}</span>
                    <span className="shrink-0 font-semibold">
                      <Display type="currency" value={item.unit_price} />
                      <span className="font-medium text-muted-foreground text-sm">
                        /{unitTime}
                      </span>
                    </span>
                  </Button>
                );
              })
            ) : crossLimitBlocked ? (
              <p className="text-muted-foreground text-sm">
                {t(
                  "changeSubscriptionCrossLimitHint",
                  "Changing between limited and no-limit subscriptions is not supported. Please unsubscribe first, then buy the new plan."
                )}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                {t(
                  "changeSubscriptionEmpty",
                  "No other subscription available"
                )}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Purchase
        setSubscribe={setTarget}
        subscribe={target}
        title={t("changeSubscriptionTitle", "Change Subscription")}
        fromUserSubscribeId={subscribe.id}
      />
    </>
  );
}
