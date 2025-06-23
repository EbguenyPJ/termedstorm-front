"use client";

import React from "react";
import CardCategory from "@/components/UI/Cards/CardCategory";
import BreadcrumbClient from "@/components/UI/Breadcrumb";
import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { ICard } from "@/interfaces";
import Link from "next/link";


export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    api
      .get(`/categories`)
      .then((res) => {
        setCategories(res.data);
        console.log("categories", res.data);
      })
      .catch((err) => console.error("Error al obtener categorías:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center mt-10">Cargando categorías...</p>;



  return (
    <>
      <BreadcrumbClient />
      <div className="flex flex-wrap justify-center gap-y-10">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Link href={`/shop/categories/${category.slug}`} key={index}>
              <CardCategory
                name={category.name}
                image={category.image}
                slug={category.slug}
              />
            </Link>
          ))
        ) : (
          <div className="w-full h-60 flex justify-center items-center">
            <p className="text-center text-gray-500 text-lg w-full">
              No hay categorías disponibles.
            </p>
          </div>
        )}
      </div>
    </>
  );
}