"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IBrand } from "@/interfaces";
import CardBrand from "@/components/UI/Cards/CardBrand"; 

const BrandList = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/brands`)
      .then((res) => {
        setBrands(res.data);
        console.log("brands", res.data);
      })
      .catch((err) => console.error("Error al obtener marcas:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando marcas...</p>;

  return (
    <div className="flex flex-wrap justify-center gap-y-10">
      {brands.length > 0 ? (
        brands.map((brand) => (
          <CardBrand
            key={brand.id} 
            name={brand.name}
            image={brand.image}
            id={brand.id}             
            subcategories={brand.subcategories} 
            brandKey={brand.brandKey}      
          />
        ))
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg w-full">
            No hay marcas disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandList;