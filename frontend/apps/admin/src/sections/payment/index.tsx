import Billing from "../dashboard/components/billing";
import PaymentTable from "./payment-table";

export default function Payment() {
  return (
    <>
      <PaymentTable />
      <div className="mt-5 flex flex-col gap-3">
        <Billing type="payment" />
      </div>
    </>
  );
}
