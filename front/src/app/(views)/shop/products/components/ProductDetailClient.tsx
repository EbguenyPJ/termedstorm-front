"use client";

import ProductViewerClient from "./ProductViewerClient";


interface Size {
    id: string;
    size_us?: number;
    size_eur?: number;
    size_cm?: number;
}

interface Color {
    id: string;
    name: string;
}

interface Props {
    product: any;
    sizes: Size[];
    colors: Color[];
}

const ProductDetailClient: React.FC<Props> = ({ product, sizes, colors }) => {

    const getSizeLabel = (id: string): string => {
        const size = sizes.find((s) => s.id === id);
        if (!size) return id;
        return [
            size.size_us ? `US: ${size.size_us}` : null,
            size.size_eur ? `EUR: ${size.size_eur}` : null,
            size.size_cm ? `CM: ${size.size_cm}` : null,
        ]
            .filter(Boolean)
            .join(" - ");
    };

    const getColorLabel = (id: string): string => {
        const color = colors.find((c) => c.id === id);
        return color ? color.name : id;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <ProductViewerClient
                    product={{
                        name: product.name,
                        description: product.description,
                        sale_price: product.sale_price,
                    }}
                    variants={product.variants}
                    getColorLabel={getColorLabel}
                    getSizeLabel={getSizeLabel}
                />
            </div>
        </div>
    );
};

export default ProductDetailClient;
