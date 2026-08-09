import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  order_no: z.string().optional(),
});

export const Route = createFileRoute("/(main)/purchasing/order/")({
  validateSearch: searchSchema,
});
