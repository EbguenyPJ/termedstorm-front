import React from "react";
import RegisterBrand from "./components/RegisterBrandUI";
import BreadcrumbClient from "../../../../../components/UI/Breadcrumb";

const addBrandPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <BreadcrumbClient />
      <RegisterBrand />
    </div>
  );
};

export default addBrandPage;
