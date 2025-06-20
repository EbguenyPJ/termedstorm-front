import { useCartStore } from "@/app/stores/cartStore";

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
};

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    if (product.stock > 0) {
      addItem({ ...product, quantity: 1 });
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <button
      onClick={handleAdd}
      disabled={isOutOfStock}
      className={`text-sm rounded-lg bg-accent py-2 px-2 text-white hover:bg-[#0d0d0d] transition-colors cursor-pointer
        ${
          isOutOfStock
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-primary-600"
        }`}
    >
      {isOutOfStock ? "Sin stock" : "Agregar al carrito"}
    </button>
  );
};
