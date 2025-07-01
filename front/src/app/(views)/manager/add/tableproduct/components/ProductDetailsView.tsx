"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IProductVariant, IProductSize, IApiProductExtended, ISize } from '@/interfaces/product-extended';
import { ButtonAccent } from '@/components/UI/Buttons/Buttons';
import Input from '@/components/UI/Inputs/Input';
import Select from '@/components/UI/Inputs/InputFormik'
import api from '@/lib/axiosInstance';
import { CgSpinner } from "react-icons/cg";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import MultipleImagesCloudinaryButton from '@/components/UI/Buttons/MultipleImagesCloudinaryButton';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

interface ICategory {
    id: string;
    name: string;
}
interface ISubCategory {
    id: string;
    name: string;
}
interface IBrand {
    id: string;
    name: string;
}

interface ProductDetailsViewProps {
    product: IApiProductExtended;
    onClose: () => void;
}

const ProductSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    purchase_price: Yup.number().required('El precio de compra es obligatorio').positive('Debe ser un número positivo'),
    sale_price: Yup.number().required('El precio de venta es obligatorio').positive('Debe ser un número positivo'),
    description: Yup.string().optional(),
    category_id: Yup.string().required('La categoría es obligatoria'),
    sub_category_id: Yup.string().required('La subcategoría es obligatoria'),
    brand_id: Yup.string().required('La marca es obligatoria'),
});

const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ product, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editedVariants, setEditedVariants] = useState<IProductVariant[]>(product.variants || []);
    const [openModal, setOpenModal] = useState<string | undefined>();
    // const [variantToDelete, setVariantToDelete] = useState<IProductVariant | null>(null);
    // const [sizeToDelete, setSizeToDelete] = useState<IProductSize | null>(null);
    const [currentEditingSize, setCurrentEditingSize] = useState<IProductSize | null>(null);
    const [currentVariantId, setCurrentVariantId] = useState<string | null>(null);

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [isSavingProduct, setIsSavingProduct] = useState(false);
    const [productError, setProductError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [categoriesRes, subCategoriesRes, brandsRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/sub-categories'),
                    api.get('/brands'),
                ]);
                setCategories(categoriesRes.data);
                setSubCategories(subCategoriesRes.data);
                setBrands(brandsRes.data);
            } catch (err) {
                console.error("Error al cargar las opciones de categorías/marcas:", err);
                setProductError("No se pudieron cargar las opciones para categoría, subcategoría y marca.");
            }
        };
        fetchDropdownData();
    }, []);

    const handleSaveProduct = async (values: IApiProductExtended, { setSubmitting }: FormikHelpers<IApiProductExtended>) => {
        setIsSavingProduct(true);
        setProductError(null);
        try {
            const updateDto = {
                name: values.name,
                purchase_price: Number(values.purchase_price),
                sale_price: Number(values.sale_price),
                description: values.description,
                category_id: values.category_id,
                sub_category_id: values.sub_category_id,
                brand_id: values.brand_id,
            };
            toast.success('¡Cambios realizados!');
            await api.put(`/products/${product.id}`, updateDto);
            console.log("Producto principal actualizado con éxito.");
        } catch (err: any) {
            console.error("Error al actualizar el producto:", err);
            setProductError('Error al actualizar el producto. Intenta de nuevo.');
        } finally {
            setIsSavingProduct(false);
            setSubmitting(false);
        }
    };

    const handleVariantChange = (variantIndex: number, field: keyof IProductVariant, value: any) => {
        setEditedVariants(prevVariants =>
            prevVariants.map((v, index) =>
                index === variantIndex ? { ...v, [field]: value } : v
            )
        );
    };

    const handleSaveVariant = async (variant: IProductVariant) => {
        setLoading(true);
        setError(null);
        try {
            await api.put(`/product-variants/${variant.id}`, {
                description: variant.description,
                image: variant.image,
                color_id: variant.color.id,
            });
            console.log(`Variante actualizada con éxito.`);
        } catch (err: any) {
            console.error("Error al actualizar la variante:", err);
            setError('Error al actualizar la variante. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // const handleDeleteVariantClick = (variant: IProductVariant) => {
    //     setVariantToDelete(variant);
    //     setOpenModal('delete-variant');
    // };

    // const handleDeleteVariantConfirmed = async () => {
    //     if (!variantToDelete) return;
    //     setLoading(true);
    //     setError(null);
    //     setOpenModal(undefined);
    //     try {
    //         await api.delete(`/product-variants/${variantToDelete.id}`);
    //         setEditedVariants(prevVariants =>
    //             prevVariants.filter(v => v.id !== variantToDelete.id)
    //         );
    //         console.log(`Variante eliminada con éxito.`);
    //     } catch (err: any) {
    //         console.error("Error al eliminar la variante:", err);
    //         setError('Error al eliminar la variante. Intenta de nuevo.');
    //     } finally {
    //         setLoading(false);
    //         setVariantToDelete(null);
    //     }
    // };

    const handleEditSize = (size: IProductSize, variantIndex: number) => {
        setCurrentEditingSize(size);
        setCurrentVariantId(editedVariants[variantIndex].id);
        setOpenModal('edit-size');
    };

    const handleSaveSize = async () => {
        if (!currentEditingSize || currentVariantId === null) return;
        setLoading(true);
        setError(null);
        setOpenModal(undefined);
        try {
            await api.put(`/variant-sizes/${currentEditingSize.id}`, {
                stock: parseInt(String(currentEditingSize.stock)),
                size_id: currentEditingSize.size.id
            });
            setEditedVariants(prevVariants =>
                prevVariants.map((v) => {
                    if (v.id === currentVariantId) {
                        return {
                            ...v,
                            variantSizes: v.variantSizes?.map(s =>
                                s.id === currentEditingSize.id ? currentEditingSize : s
                            )
                        };
                    }
                    return v;
                })
            );
            console.log(`Talla actualizada con éxito.`);
        } catch (err: any) {
            console.error("Error al actualizar la talla:", err);
            setError('Error al actualizar la talla. Intenta de nuevo.');
        } finally {
            setLoading(false);
            setCurrentEditingSize(null);
            setCurrentVariantId(null);
        }
    };

    // const handleDeleteSizeClick = (size: IProductSize) => {
    //     setSizeToDelete(size);
    //     setOpenModal('delete-size');
    // };

    // const handleDeleteSizeConfirmed = async () => {
    //     if (!sizeToDelete) return;
    //     setLoading(true);
    //     setError(null);
    //     setOpenModal(undefined);
    //     try {
    //         await api.delete(`/variant-sizes/${sizeToDelete.id}`);
    //         setEditedVariants(prevVariants =>
    //             prevVariants.map(v => ({
    //                 ...v,
    //                 variantSizes: v.variantSizes?.filter(s => s.id !== sizeToDelete.id)
    //             }))
    //         );
    //         console.log(`Talla eliminada con éxito.`);
    //     } catch (err: any) {
    //         console.error("Error al eliminar la talla:", err);
    //         setError('Error al eliminar la talla. Intenta de nuevo.');
    //     } finally {
    //         setLoading(false);
    //         setSizeToDelete(null);
    //     }
    // };

    return (
        <div className="div-container bg-base-100 p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-base-300">Detalles del Producto: {product.name}</h2>
                <button
                    onClick={onClose}
                    className="bg-base-200 text-base-300 py-2 px-4 rounded-lg font-medium hover:bg-base-300 hover:text-base-100 focus:outline-none focus:ring-2 focus:ring-base-250 cursor-pointer"
                >
                    Cerrar Vista
                </button>
            </div>

            {(loading || isSavingProduct) && (
                <div className="flex justify-center items-center py-4">
                    <CgSpinner className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 text-base-300">Guardando cambios...</span>
                </div>
            )}

            {(error || productError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">¡Error!</strong>
                    <span className="block sm:inline"> {error || productError}</span>
                </div>
            )}

            <hr className="my-6" />
            <h3 className="text-2xl font-bold text-base-300 mb-4">Información Principal del Producto</h3>
            <Formik
                initialValues={product}
                enableReinitialize={true}
                onSubmit={handleSaveProduct}
                validationSchema={ProductSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Select
                                label="Nombre del Producto"
                                name="name"
                                type="text"
                                placeholder="Nombre del producto"
                            />
                            <Select
                                label="Precio de Compra"
                                name="purchase_price"
                                type="number"
                                placeholder="Precio de compra"
                            />
                            <Select
                                label="Precio de Venta"
                                name="sale_price"
                                type="number"
                                placeholder="Precio de venta"
                            />
                            <Select
                                label="Descripción"
                                name="description"
                                type="text"
                                placeholder="Descripción del producto"
                            />
                            <Select
                                label="Categoría"
                                name="category_id"
                                type="select"
                                options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                                placeholder="Selecciona una categoría"
                            />
                            <Select
                                label="Subcategoría"
                                name="sub_category_id"
                                type="select"
                                options={subCategories.map(subCat => ({ value: subCat.id, label: subCat.name }))}
                                placeholder="Selecciona una subcategoría"
                            />
                            <Select
                                label="Marca"
                                name="brand_id"
                                type="select"
                                options={brands.map(brand => ({ value: brand.id, label: brand.name }))}
                                placeholder="Selecciona una marca"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <ButtonAccent
                                textContent={isSubmitting ? "Guardando..." : "Guardar Cambios del Producto"}
                                type="submit"
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            {/* --- SECCIÓN DE VARIANTES */}
            <hr className="my-6" />
            <h3 className="text-2xl font-bold text-base-300 mb-4">Variantes ({editedVariants.length})</h3>
            <div className="space-y-4">
                {editedVariants.map((variant, variantIndex) => (
                    <div key={variant.id || variantIndex} className="border p-4 rounded-lg shadow-inner bg-base-200">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-base-300">Variante: <span className="font-normal text-base-250">{variant.description}</span></h4>
                            <button
                                // onClick={() => handleDeleteVariantClick(variant)}
                                className="text-accent hover:text-red-700 text-sm font-medium"
                            >
                                Eliminar Variante
                            </button>
                        </div>
                        {/* Formulario de edición de variante */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <Input
                                    label="Descripción"
                                    name="description"
                                    type="text"
                                    value={variant.description || ''}
                                    onChange={(e) => handleVariantChange(variantIndex, 'description', e.target.value)}
                                    placeholder="Descripción de la variante"
                                />
                            </div>
                            <div>
                                <label className="block text-md font-semibold text-base-250 mb-2">Color</label>
                                <div className="flex items-center gap-2">
                                    {variant.color?.hexCode && (
                                        <div
                                            className="w-6 h-6 rounded-full border border-base-250"
                                            style={{ backgroundColor: variant.color.hexCode }}
                                        />
                                    )}
                                    <span className="text-base-250">{
                                        variant.color?.color || variant.color?.id || '[Color no disponible]'
                                    }</span>
                                </div>
                            </div>
                            {/* Muestra todas las imágenes de la variante */}
                            <div className="col-span-2">
                                <label className="block text-md font-semibold text-base-250 mb-2">Imágenes de la Variante</label>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {variant.image.length > 0 ? (
                                        variant.image.map((imgUrl, imgIndex) => (
                                            <div key={`${variant.id}-${imgIndex}`} className="w-24 h-24 relative rounded overflow-hidden border border-base-300">
                                                <Image
                                                    src={imgUrl}
                                                    alt={`Imagen de la variante ${variant.description} - ${imgIndex + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-base-300 italic">No hay imágenes para esta variante.</p>
                                    )}
                                </div>
                                <MultipleImagesCloudinaryButton
                                    buttonText="Subir nuevas imágenes"
                                    onUploadSuccess={(urls: string[]) => {
                                        setEditedVariants(prevVariants => {
                                            return prevVariants.map(v => {
                                                if (v.id === variant.id) {
                                                    const uniqueImages = Array.from(new Set([...v.image, ...urls]));
                                                    return { ...v, image: uniqueImages };
                                                }
                                                return v;
                                            });
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <ButtonAccent
                                textContent="Guardar Cambios de Variante"
                                onClick={() => handleSaveVariant(variant)}
                            />
                        </div>

                        {/* Sección de Tallas */}
                        <h5 className="text-lg font-bold text-base-300 mt-8 mb-4">Tallas y Stock</h5>
                        <div className="space-y-4">
                            {variant.variantSizes && variant.variantSizes.length > 0 ? (
                                variant.variantSizes
                                    .filter(s => s?.size !== null && s?.size !== undefined)
                                    .map((size, sizeIndex) => (
                                        <div key={size.id || sizeIndex} className="flex items-center gap-4 p-4 rounded-md border border-base-250 bg-base-100">
                                            <span className="font-medium text-base-300">Talla (EUR): <span className="text-base-250">{size.size?.size_eur || 'N/A'}</span></span>
                                            <span className="font-medium text-base-300">Talla (US): <span className="text-base-250">{size.size?.size_us || 'N/A'}</span></span>
                                            <span className="font-medium text-base-300">Talla (CM): <span className="text-base-250">{size.size?.size_cm || 'N/A'}</span></span>
                                            <span className="font-medium text-base-300">Stock: <span className="text-base-250">{size.stock}</span></span>
                                            <div className="ml-auto flex gap-2">
                                                <button onClick={() => handleEditSize(size, variantIndex)} className="text-primary hover:underline text-sm font-medium">
                                                    Editar Talla
                                                </button>
                                                <button onClick={() => console.log()
                                                    // handleDeleteSizeClick(size)
                                                }
                                                    className="text-accent hover:underline text-sm font-medium"
                                                    >
                                                    Eliminar Talla
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-base-300 italic">No hay tallas y stock asignados a esta variante.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL PARA EDITAR TALLA */}
            <Modal show={openModal === 'edit-size'} size="md" popup onClose={() => setOpenModal(undefined)}>
                <ModalHeader>
                    <div className="flex justify-between items-center w-full">
                        <h3 className="text-xl font-bold">Editar Talla</h3>
                        <button onClick={() => setOpenModal(undefined)} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </ModalHeader>
                <ModalBody>
                    {currentEditingSize && (
                        <div className="space-y-4">
                            <Input
                                label="Talla EUR"
                                name="size_eur"
                                type="number"
                                value={String(currentEditingSize.size?.size_eur || '')}
                                onChange={(e) => setCurrentEditingSize({
                                    ...currentEditingSize,
                                    size: { ...currentEditingSize.size, size_eur: parseFloat(e.target.value) } as ISize
                                })}
                                placeholder="Talla EUR"
                            />
                            <Input
                                label="Stock"
                                name="stock"
                                type="number"
                                value={String(currentEditingSize.stock)}
                                onChange={(e) => setCurrentEditingSize({ ...currentEditingSize, stock: parseInt(e.target.value) || 0 })}
                                placeholder="Cantidad de stock"
                            />
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end gap-4 mt-6">
                        <ButtonAccent textContent="Guardar Cambios" onClick={handleSaveSize} />
                        <button
                            onClick={() => setOpenModal(undefined)}
                            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 cursor-pointer"
                        >
                            Cancelar
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ProductDetailsView;