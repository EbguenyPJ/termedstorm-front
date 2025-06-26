import BreadcrumbClient from "@/components/UI/Breadcrumb";
import RegisterCategory from "./components/RegisterCategoryUI";

const addProductPage = () => {
  return (
    <div className="p-4">
      <BreadcrumbClient />
      <RegisterCategory />
    </div>
  )
};

export default addProductPage;