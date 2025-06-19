import BreadcrumbClient from "../../../../components/UI/Breadcrumb";
import ProfileClient from "./components/ProfileClientUI";

export default function ProfilePage() {
  return (
    <div className="p-4">
      <BreadcrumbClient />
      <ProfileClient />{" "}
    </div>
  );
}
