import React from "react";
import RegisterSize from "./components/RegisterSizeUI";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

const addSizePage = () => {
    return(
        <div>
            <BreadcrumbClient />
            <RegisterSize />
        </div>
    )
}

export default addSizePage;