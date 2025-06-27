import BreadcrumbClient from "@/components/UI/Breadcrumb";
import RegisterCategory from "./components/RegisterCategoryUI";

const addProductPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <BreadcrumbClient />
      <RegisterCategory />
    </div>
  )
};

export default addProductPage;