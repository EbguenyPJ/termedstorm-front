import RegisterProductUI from "@/app/(views)/add/addproduct/components/RegisterProductUI";
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
