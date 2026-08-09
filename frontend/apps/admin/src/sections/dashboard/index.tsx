import Billing from "./components/billing";
import Statistics from "./components/statistics";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Statistics />
      <Billing type="dashboard" />
    </div>
  );
}
