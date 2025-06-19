import React from "react";
import RegisterBrand from "./components/RegisterBrandUI";
import BreadcrumbClient from "../../../../components/UI/Breadcrumb";

const addBrandPage = () => {
  return (
    <div className="p-2">
      <BreadcrumbClient />
      <RegisterBrand />
    </div>
  );
};

export default addBrandPage;
