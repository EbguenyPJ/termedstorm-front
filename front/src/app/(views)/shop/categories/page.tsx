import React from "react";
import CategoryList from "./components/CategoryList";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

export default function CategoriesPage() {
  return (
    <>
      <BreadcrumbClient />
      <CategoryList />
    </>
  );
}
