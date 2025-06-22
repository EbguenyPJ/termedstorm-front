import React from "react";
import BreadcrumbClient from "@/components/UI/Breadcrumb";
import BrandList from "./components/BrandList";

export default function BrandsPage() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 min-w-[90vw] max-w-[1100px] min-h-[80vh] max-h-[800px] overflow-auto">
      <BreadcrumbClient />
      <BrandList />
    </div>
  );
}
