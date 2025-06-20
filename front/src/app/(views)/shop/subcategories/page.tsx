import React from "react";
import SubCategoryList from "./components/CategoryList";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

export default function SubCategoriesPage() {
  return (
    <>
      <BreadcrumbClient />
      <SubCategoryList />
    </>
  );
}
