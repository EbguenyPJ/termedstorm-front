import React from "react";
import CategoryList from "./[...slug]/components/DetailProduct";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

export default function CategoriesPage() {
  return (
    <>
      <BreadcrumbClient />
      <CategoryList />
    </>
  );
}
