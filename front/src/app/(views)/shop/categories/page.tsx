import React from "react";
import CategoryList from "./components/CategoryList";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

export default function CategoriesPage() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 min-w-[90vw] max-w-[1100px] min-h-[80vh] max-h-[800px] overflow-auto">
      <BreadcrumbClient />
      <CategoryList />
    </div>
  );
}
