import RegisterProductUI from "@/app/(views)/manager/add/addproduct/components/RegisterProductUI";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

const addProductPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <BreadcrumbClient />
      <RegisterProductUI />;
    </div>
  );
};

export default addProductPage;
