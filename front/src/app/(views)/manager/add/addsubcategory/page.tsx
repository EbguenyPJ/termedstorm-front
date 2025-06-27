import React from "react";
import RegisterSubCategory from "./components/RegisterSubCategoryUI";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

const addSubCategoryPage = () => {
    return(
        <div className="p-4 sm:p-6 md:p-8">
            <BreadcrumbClient />
            <RegisterSubCategory />
        </div>
    )
}

export default addSubCategoryPage;