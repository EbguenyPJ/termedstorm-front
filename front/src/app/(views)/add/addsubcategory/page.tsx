import React from "react";
import RegisterSubCategory from "./components/RegisterSubCategoryUI";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

const addSubCategoryPage = () => {
    return(
        <div>
            <BreadcrumbClient />
            <RegisterSubCategory />
        </div>
    )
}

export default addSubCategoryPage;