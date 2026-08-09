import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Switch } from "@workspace/ui/components/switch";
import { AreaCodeSelect } from "@workspace/ui/composed/area-code-select";
import { EnhancedInput } from "@workspace/ui/composed/enhanced-input";
import { Icon } from "@workspace/ui/composed/icon";
import { unitConversion } from "@workspace/ui/utils/unit-conversions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useGlobalStore } from "@/stores/global";

interface UserFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
  update?: boolean;
}

export default function UserForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: Readonly<UserFormProps<T>>) {
  const { t } = useTranslation("user");
  const { common } = useGlobalStore();
  const { currency } = common;

  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    email: z.email(t("invalidEmailFormat", "Invalid email format")),
    telephone_area_code: z.string().optional(),
    telephone: z.string().optional(),
    password: z.string().optional(),
    referer_id: z.number().optional(),
    refer_code: z.string().optional(),
    referral_percentage: z.number().optional(),
    only_first_purchase: z.boolean().optional(),
    is_admin: z.boolean().optional(),
    balance: z.number().optional(),
    gift_amount: z.number().optional(),
    commission: z.number().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  useEffect(() => {
    form?.reset(initialValues);
  }, [form, initialValues]);

  async function handleSubmit(data: { [x: string]: any }) {
    const bool = await onSubmit(data as T);

    if (bool) setOpen(false);
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
            setOpen(true);
          }}
        >
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] max-w-full gap-0 md:max-w-screen-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100dvh-48px-36px-36px-env(safe-area-inset-top))]">
          <Form {...form}>
            <form
              className="space-y-4 px-6 pt-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("userEmail", "Email")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t("userEmailPlaceholder", "Enter email")}
                        {...field}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("telephone", "Phone")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t(
                          "telephonePlaceholder",
                          "Enter phone number"
                        )}
                        prefix={
                          <FormField
                            control={form.control}
                            name="telephone_area_code"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <AreaCodeSelect
                                    className="w-32 rounded-none border-y-0 border-l-0"
                                    onChange={(value) => {
                                      form.setValue(
                                        field.name,
                                        value.phone as string
                                      );
                                    }}
                                    placeholder={t(
                                      "areaCodePlaceholder",
                                      "Area code"
                                    )}
                                    simple
                                    value={field.value}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        }
                        {...field}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password", "Password")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        autoComplete="new-password"
                        placeholder={t("passwordPlaceholder", "Enter password")}
                        {...field}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("refererId", "Referer ID")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t(
                          "refererIdPlaceholder",
                          "Enter referer ID"
                        )}
                        {...field}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="refer_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("inviteCode", "Invite Code")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t(
                          "inviteCodePlaceholder",
                          "Enter invite code"
                        )}
                        {...field}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referral_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("referralPercentage", "Referral Percentage")}
                    </FormLabel>
                    <FormControl>
                      <EnhancedInput
                        max={100}
                        min={0}
                        placeholder={t(
                          "referralPercentagePlaceholder",
                          "Enter percentage"
                        )}
                        type="number"
                        {...field}
                        onValueChange={(value) => {
                          form.setValue(field.name, Number(value));
                        }}
                        suffix="%"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="only_first_purchase"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-x-2">
                    <FormLabel>
                      {t("onlyFirstPurchase", "First Purchase Only")}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("balance", "Balance")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t("balancePlaceholder", "Enter balance")}
                        prefix={currency?.currency_symbol ?? "$"}
                        type="number"
                        {...field}
                        formatInput={(value) =>
                          unitConversion("centsToDollars", value)
                        }
                        formatOutput={(value) =>
                          unitConversion("dollarsToCents", value)
                        }
                        min={0}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gift_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("giftAmount", "Gift Amount")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t(
                          "giftAmountPlaceholder",
                          "Enter gift amount"
                        )}
                        prefix={currency?.currency_symbol ?? "$"}
                        type="number"
                        {...field}
                        formatInput={(value) =>
                          unitConversion("centsToDollars", value)
                        }
                        formatOutput={(value) =>
                          unitConversion("dollarsToCents", value)
                        }
                        min={0}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("commission", "Commission")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t(
                          "commissionPlaceholder",
                          "Enter commission"
                        )}
                        prefix={currency?.currency_symbol ?? "$"}
                        type="number"
                        {...field}
                        formatInput={(value) =>
                          unitConversion("centsToDollars", value)
                        }
                        formatOutput={(value) =>
                          unitConversion("dollarsToCents", value)
                        }
                        min={0}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_admin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("manager", "Administrator")}</FormLabel>
                    <FormControl>
                      <div className="pt-2">
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <SheetFooter className="flex-row justify-end gap-2 pt-3">
          <Button
            disabled={loading}
            onClick={() => {
              setOpen(false);
            }}
            variant="outline"
          >
            {t("cancel", "Cancel")}
          </Button>
          <Button disabled={loading} onClick={form.handleSubmit(handleSubmit)}>
            {loading && (
              <Icon className="mr-2 animate-spin" icon="mdi:loading" />
            )}{" "}
            {t("confirm", "Confirm")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
