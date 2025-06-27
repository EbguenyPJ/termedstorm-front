import React from "react";
import SubCategoryList from "./components/SubCategoryList";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

export default function SubCategoriesPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <BreadcrumbClient />
      <SubCategoryList />
    </div>
  );
}
