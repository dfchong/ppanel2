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
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Combobox } from "@workspace/ui/composed/combobox";
import { DatePicker } from "@workspace/ui/composed/date-picker";
import { EnhancedInput } from "@workspace/ui/composed/enhanced-input";
import { Icon } from "@workspace/ui/composed/icon";
import { unitConversion } from "@workspace/ui/utils/unit-conversions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useSubscribe } from "@/stores/subscribe";

const formSchema = z.object({
  name: z.string(),
  code: z.string().optional(),
  count: z.number().optional(),
  type: z.number().optional(),
  discount: z.number().optional(),
  start_time: z.number().optional(),
  expire_time: z.number().optional(),
  subscribe: z.array(z.number()).nullish(),
  user_limit: z.number().optional(),
});

interface CouponFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function CouponForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: CouponFormProps<T>) {
  const { t } = useTranslation("coupon");

  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 1,
      ...initialValues,
    } as any,
  });

  useEffect(() => {
    form?.reset(initialValues);
  }, [form, initialValues]);

  async function handleSubmit(data: { [x: string]: any }) {
    const bool = await onSubmit(data as T);
    if (bool) setOpen(false);
  }

  const type = form.watch("type");

  const { subscribes } = useSubscribe();

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
      <SheetContent className="w-[500px] max-w-full md:max-w-screen-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-48px-36px-36px-env(safe-area-inset-top))]">
          <Form {...form}>
            <form
              className="space-y-4 px-6 pt-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.name", "Name")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                        placeholder={t(
                          "form.enterCouponName",
                          "Enter Coupon Name"
                        )}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.customCouponCode", "Custom Coupon Code")}
                    </FormLabel>
                    <FormControl>
                      <EnhancedInput
                        placeholder={t(
                          "form.customCouponCodePlaceholder",
                          "Custom Coupon Code (leave blank for auto-generation)"
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.type", "Coupon Type")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex gap-2"
                        defaultValue={String(field.value)}
                        onValueChange={(value) => {
                          form.setValue(field.name, Number(value));
                          form.setValue("discount", "");
                        }}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t(
                              "form.percentageDiscount",
                              "Percentage Discount"
                            )}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t("form.amountDiscount", "Amount Discount")}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === 1 && (
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("form.percentageDiscount", "Percentage Discount")}
                      </FormLabel>
                      <FormControl>
                        <EnhancedInput
                          max={100}
                          min={1}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                          placeholder={t("form.enterValue", "Enter Value")}
                          suffix="%"
                          type="number"
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type === 2 && (
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("form.amountDiscount", "Amount Discount")}
                      </FormLabel>
                      <FormControl>
                        <EnhancedInput
                          formatInput={(value) =>
                            unitConversion("centsToDollars", value)
                          }
                          formatOutput={(value) =>
                            unitConversion("dollarsToCents", value)
                          }
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                          placeholder={t("form.enterValue", "Enter Value")}
                          type="number"
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="subscribe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.specifiedServer", "Specified Subscription")}
                    </FormLabel>
                    <FormControl>
                      <Combobox<number, true>
                        multiple
                        onChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                        options={subscribes?.map((item) => ({
                          value: item.id!,
                          label: item.name!,
                        }))}
                        placeholder={t(
                          "form.selectServer",
                          "Select Subscription"
                        )}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.startTime", "Start Time")}</FormLabel>
                    <FormControl>
                      <DatePicker
                        disabled={(date: Date) =>
                          date < new Date(Date.now() - 24 * 60 * 60 * 1000)
                        }
                        onChange={(value: number | undefined) => {
                          form.setValue(field.name, value);
                        }}
                        placeholder={t("form.enterValue", "Enter Value")}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expire_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.expireTime", "Expire Time")}</FormLabel>
                    <FormControl>
                      <DatePicker
                        onChange={(value: number | undefined) => {
                          form.setValue(field.name, value);
                        }}
                        placeholder={t("form.enterValue", "Enter Value")}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.count", "Max Usage Count")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        min={0}
                        placeholder={t(
                          "form.countPlaceholder",
                          "Max Usage Count (leave blank for no limit)"
                        )}
                        step={1}
                        type="number"
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
                name="user_limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.userLimit", "Max Usage Count per User")}
                    </FormLabel>
                    <FormControl>
                      <EnhancedInput
                        min={0}
                        placeholder={t(
                          "form.userLimitPlaceholder",
                          "Max Usage Count per User (leave blank for no limit)"
                        )}
                        step={1}
                        type="number"
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
            {t("form.cancel", "Cancel")}
          </Button>
          <Button disabled={loading} onClick={form.handleSubmit(handleSubmit)}>
            {loading && (
              <Icon className="mr-2 animate-spin" icon="mdi:loading" />
            )}{" "}
            {t("form.confirm", "Confirm")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
