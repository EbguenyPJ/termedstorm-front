import CardProduct from "@/components/ui/Cards/CardProduct";
import { ICardProduct } from "@/interfaces";

const products: ICardProduct[] = [
  {
    name: "Zapatillas Deportivas",
    image: "/zapdeportivas.jpg",
    price: 28999,
    stock: 15,
  },
  {
    name: "Botas de Cuero con Tacón",
    image: "/botasc-tacon.jpg",
    price: 45999,
    stock: 8,
  },
  {
    name: "Sandalias con Plataforma",
    image: "/sandplataforma.jpg",
    price: 21999,
    stock: 20,
  },
  {
    name: "Zapatillas Deportivas",
    image: "/zapdeportivas.jpg",
    price: 28999,
    stock: 15,
  },
  {
    name: "Botas de Cuero con Tacón",
    image: "/botasc-tacon.jpg",
    price: 45999,
    stock: 8,
  },
  {
    name: "Sandalias con Plataforma",
    image: "/sandplataforma.jpg",
    price: 21999,
    stock: 20,
  },
];

export default async function Home() {
  return (
    <section className="bg-white rounded-lg shadow-xl my-8 p-8 min-w-[90vw] max-w-[1100px] min-h-[80vh] overflow-auto">
      <div className="mx-auto flex flex-wrap justify-center gap-10">
        {products.map((category, index) => (
          <CardProduct
            key={index}
            name={category.name}
            image={category.image}
            price={category.price}
          />
        ))}
      </div>
    </section>
  );
}
