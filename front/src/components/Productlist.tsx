import { useEffect, useState } from "react";
import CardProduct from "./UI/Cards/CardProduct";
import { ICardProduct } from "@/interfaces";
import api from "@/lib/axiosInstance";
import { ApiProduct } from "@/interfaces";

interface ProductListProps {
  category?: string;
  subcategory?: string;
}

const ProductList: React.FC<ProductListProps> = ({ category, subcategory }) => {
  const [products, setProducts] = useState<ICardProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "/products";

    if (category && subcategory) {
      url = `/categories/${category}/subcategories/${subcategory}/products`;
    }

    api
      .get(url)
      .then((res) => {
        const fetchedProducts: ApiProduct[] = res.data;

const mappedProducts: ICardProduct[] = fetchedProducts.map((product) => {
  const imageUrl = product.image || product.variants?.[0]?.image?.[0] || "/placeholder-image.jpg";
  return {
    id: product.id,
    name: product.name,
    image: imageUrl,
    slug: product.name.toLowerCase().replace(/\s+/g, "-"),
    sale_price: product.sale_price,
  };
});

        setProducts(mappedProducts);
      })
      .catch((err: any) => console.error("Error al obtener productos:", err))
      .finally(() => setLoading(false));
  }, [category, subcategory]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="flex flex-wrap justify-center gap-y-10">
      {products.length > 0 ? (
        products.map((product: any) => (
          <CardProduct
            key={product.id}
            id={product.id}
            slug={product.name.toLowerCase().replace(/\s+/g, "-")}
            name={product.name}
            image={product.image}
            sale_price={product.sale_price}
          />
        ))
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg w-full">
            No hay productos disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
