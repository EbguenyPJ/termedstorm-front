import React from "react";
import BreadcrumbClient from "@/components/UI/Breadcrumb";
import SizeManager from "./components/SizeManager";

const addSizePage = () => {
  return (
    <div className="p-4">
      <BreadcrumbClient />
      <div>
        <SizeManager />
      </div>
    </div>
  )
}

export default addSizePage;