import BreadcrumbClient from "@/components/UI/Breadcrumb";
import ColorManager from "./components/ColorManager";

const addColorPage = () => {
  return (
    <div className="p-4">
      <BreadcrumbClient />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <ColorManager />
      </div>
    </div>
  );
};

export default addColorPage;
