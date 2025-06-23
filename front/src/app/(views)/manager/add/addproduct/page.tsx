import RegisterProductUI from "@/app/(views)/manager/add/addproduct/components/RegisterProductUI";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

const addProductPage = () => {
  return (
    <div>
      <BreadcrumbClient />
      <RegisterProductUI />;
    </div>
  );
};

export default addProductPage;
