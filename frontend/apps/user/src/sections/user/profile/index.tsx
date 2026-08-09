import ChangePassword from "./change-password";
import NotifySettings from "./notify-settings";
import ThirdPartyAccounts from "./third-party-accounts";

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:*:flex-auto">
      <ThirdPartyAccounts />
      <NotifySettings />
      <ChangePassword />
    </div>
  );
}
