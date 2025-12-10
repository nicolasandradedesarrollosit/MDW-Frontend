import {Table, TableHeader, TableRow, TableColumn, TableBody, TableCell} from "@heroui/table"

import { Input } from "@heroui/input"

import { Pagination } from "@heroui/pagination"

import { useMemo, useState, useEffect } from "react"

import { useSelector } from "react-redux"

import { RootState } from "@/redux/store"

import { Button } from "@heroui/button"

import { useModal } from "@/hooks/useModal"

import ModalCreateProd from "./modalCreateProd"
import ModalEditProd from "./modalEditProd"
import ModalDeleteProd from "./modalDeleteProd"
import ModalCreateProdSize from "./modalCreateProdSize"
import ModalEditProdSize from "./modalEditProdSize"
import ModalDeleteProdSize from "./modalDeleteProdSize"
import ModalViewImage from "./modalViewImage"

export interface DeleteProdSizeModalProps {
    id: string | null;
}

export default function TableProducts() {
    const productsState = useSelector((state: RootState) => state.products);
    const categoriesState = useSelector((state: RootState) => state.categories);
    const productSizesState = useSelector((state: RootState) => state.productSize);
    const [selectId, setSelectId] = useState<string | null>(null);
    const { onOpen: onOpenCreateProd } = useModal('createProdModal');
    const { onOpen: onOpenEditProd } = useModal('editProdModal');
    const { onOpen: onOpenDeleteProd } = useModal('deleteProdModal');
    const { onOpen: onOpenCreateProdSize } = useModal('createProdSizeModal');
    const { onOpen: onOpenEditProdSize } = useModal('editProdSizeModal');
    const { onOpen: onOpenDeleteProdSize } = useModal('deleteProdSizeModal');
    const { onOpen: onOpenViewImage } = useModal('viewImageModal');
    



    const svgSearch = (
        <svg className="w-[15px] h-[15px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 376 384">
            <path fill="currentColor" d="m267 235l106 106l-32 32l-106-106v-17l-6-6q-39 33-90 33q-58 0-98.5-40.5T0 138.5t40.5-98t98-40.5t98 40.5T277 139q0 51-33 90l6 6h17zm-128 0q40 0 68-28t28-68t-28-68t-68-28t-68 28t-28 68t28 68t68 28z"/>
        </svg>
    )

    const svgEdit = (
        <svg className="w-[10px] h-[10px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 384 384">
            <path fill="currentColor" d="M0 304L236 68l80 80L80 384H0v-80zM378 86l-39 39l-80-80l39-39q6-6 15-6t15 6l50 50q6 6 6 15t-6 15z"/>
        </svg>
    )

    const svgDelete = (
        <svg className="w-[10px] h-[10px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 304 384"><path fill="currentColor" d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"/>
        </svg>
    )

    type Product = {
        name: string;
        description: string;
        price: number;
        url_image: string;
        name_category: string;
    };

    type ProductSize = {
        _id?: string;
        id_product?: string;
        name?: string; 
        size: string;
        stock: number;
        url_image?: string;
        name_category?: string;
    }

    const [page, setPage] = useState(1);
    const [filterName, setFilterName] = useState("");
    const rowsPerPage = 10;
    const [sectionProductSize, setSectionProductSize] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const categoryMap = useMemo(() => {
        const map = new Map();
        categoriesState.categories.forEach((cat: { id: string; name: string }) => {
            map.set(cat.id, cat.name);
        });
        return map;
    }, [categoriesState.categories]);

    const productsWithCategories = useMemo(() => {
        return productsState.products.map((product: any) => ({
            ...product,
            name_category: categoryMap.get(product.id_category) || 'Sin categoría'
        }));
    }, [productsState.products, categoryMap]);

    const rows = useMemo(() => {
        if (!filterName) return productsWithCategories;
        const term = filterName.toLowerCase();
        return productsWithCategories.filter((p: { name: string }) => (p.name || "").toLowerCase().includes(term));
    }, [productsWithCategories, filterName]);

    const pages = Math.max(1, Math.ceil(rows.length / rowsPerPage));

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return rows.slice(start, end);
    }, [page, rows]);
    const itemsSizes = useMemo(() => {
        const productsList = productsState.products || [];
        const mapped = (productSizesState.sizes || []).map((productSize: any) => {
            const product = productsList.find((p: any) => p._id === productSize.id_product || p.id === productSize.id_product);
            return {
                ...productSize,
                name: product?.name || productSize.name || '',
                url_image: product?.url_image || productSize.url_image || '',
                name_category: categoryMap.get(product?.id_category) || 'Sin categoría'
            } as ProductSize;
        });
        if (!filterName) return mapped;
        const term = filterName.toLowerCase();
        return mapped.filter((p: any) => (p.name || '').toLowerCase().includes(term) || (p.size || '').toLowerCase().includes(term));
    }, [productSizesState.sizes, productsState.products, categoryMap, filterName]);

    const pagesSizes = Math.max(1, Math.ceil(itemsSizes.length / rowsPerPage));

    const itemsSizesPaginated = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return itemsSizes.slice(start, end);
    }, [page, itemsSizes]);

    useEffect(() => {
        setPage(1);
    }, [filterName]);

    return (
        <div className="flex flex-col items-center w-full min-h-screen overflow-x-hidden">
            <div className="w-full border-b border-black/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 md:px-6 lg:px-8 py-4 sm:py-6 max-w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent tracking-wider">
                        Productos
                    </h1>
                    <Button variant="solid" color="default" className="bg-black text-white" size="sm" onPress={() => setSectionProductSize(!sectionProductSize)}>
                        {sectionProductSize ? 'Cambiar a Producto' : 'Cambiar a Producto Talle'}
                    </Button>
                    <Button variant="solid" color="default" className="bg-[#F5F5DC] text-black" size="sm" onPress={() => sectionProductSize ? onOpenCreateProdSize() : onOpenCreateProd()}>
                        {sectionProductSize ? 'Agregar Producto Talle' : 'Agregar Producto'}
                    </Button>
                    <Input
                        className="w-full sm:w-auto sm:max-w-[280px] bg-white/90"
                        placeholder="Buscar por nombre"
                        startContent={svgSearch}
                        value={filterName}
                        onChange={(e) => setFilterName((e.target as HTMLInputElement).value)}
                        size="sm"
                    />
                    
                </div>
            </div>

                {!sectionProductSize && (
                    <div className="w-95/100 px-4 md:px-6 lg:px-8 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)] lg:max-w-[calc(100vw-4rem)] mt-24">
                    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <Table
                            className="w-full"
                            removeWrapper
                            aria-label="Tabla de productos"
                            bottomContent={
                                pagesSizes > 1 ? (
                                    <div className="flex w-full justify-center py-4 px-2">
                                        <Pagination
                                            isCompact
                                            showControls
                                            showShadow
                                            color="primary"
                                            page={page}
                                            total={pagesSizes}
                                            onChange={(page) => setPage(page)}
                                            size="sm"
                                        />
                                    </div>
                                ) : null
                            }
                            classNames={{
                                base: "overflow-visible",
                                table: "min-w-[600px]",
                                thead: "[&>tr]:first:bg-gray-50",
                                th: "bg-gray-50 text-xs font-semibold uppercase tracking-wider py-3 px-3",
                                td: "py-3 px-3",
                            }}
                        >
                            <TableHeader>
                                <TableColumn className="min-w-[100px]">
                                    <div className="text-left">NOMBRE</div>
                                </TableColumn>
                                <TableColumn className="min-w-[100px]">
                                    <div className="text-left">DESCRIPCIÓN</div>
                                </TableColumn>
                                <TableColumn className="min-w-[160px]">
                                    <div className="text-left">PRECIO</div>
                                </TableColumn>
                                <TableColumn className="min-w-[70px]">
                                    <div className="text-center">IMAGEN</div>
                                </TableColumn>
                                <TableColumn className="min-w-[80px]">
                                    <div className="text-center">CATEGORÍA</div>
                                </TableColumn>
                                <TableColumn className="min-w-[80px]">
                                    <div className="text-center">ACCIONES</div>
                                </TableColumn>
                            </TableHeader>
                            <TableBody 
                                emptyContent={
                                    <div className="text-center py-8 text-gray-500">
                                        {filterName 
                                            ? "No se encontraron productos con ese nombre" 
                                            : "No hay productos para mostrar"}
                                    </div>
                                } 
                                items={items}
                            >
                                {(item: Product) => (
                                    <TableRow 
                                        key={(item as any)._id || item.name}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <TableCell className="text-left">
                                            <div title={item.name} className="truncate max-w-[120px] font-medium">
                                                {item.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <div title={item.description} className="truncate max-w-[120px] font-medium">
                                                {item.description}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <div className="truncate max-w-[180px] text-gray-600">
                                                {item.price ? `$${item.price.toLocaleString()}` : '-'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center">
                                                {item.url_image ? (
                                                    <img 
                                                        src={item.url_image} 
                                                        className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-90"
                                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=IMG';
                                                        }}
                                                        onClick={() => { setSelectedImage(item.url_image || null); onOpenViewImage(); }}
                                                        role="button"
                                                        aria-label={`Abrir imagen de ${item.name}`}
                                                        tabIndex={0}
                                                        onKeyDown={(e: React.KeyboardEvent<HTMLImageElement>) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault();
                                                                setSelectedImage(item.url_image || null);
                                                                onOpenViewImage();
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                                        Sin img
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="text-gray-600">
                                                {item.name_category}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-row justify-center items-center gap-2">
                                                <Button title="Editar" isIconOnly variant="solid" color="warning" className="text-white" onPress={() => { setSelectId((item as any)._id || null); onOpenEditProd(); }}>
                                                    {svgEdit}
                                                </Button>
                                                <Button title="Eliminar" isIconOnly variant="solid" color="danger" className="text-white" onPress={() => { setSelectId((item as any)._id || null); onOpenDeleteProd(); }}>
                                                    {svgDelete}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                )}
                {(sectionProductSize) && (
                    <div className="w-95/100 px-4 md:px-6 lg:px-8 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)] lg:max-w-[calc(100vw-4rem)] mt-24">
                    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <Table
                            className="w-full"
                            removeWrapper
                            aria-label="Tabla de productos talles"
                            bottomContent={
                                pages > 1 ? (
                                    <div className="flex w-full justify-center py-4 px-2">
                                        <Pagination
                                            isCompact
                                            showControls
                                            showShadow
                                            color="primary"
                                            page={page}
                                            total={pages}
                                            onChange={(page) => setPage(page)}
                                            size="sm"
                                        />
                                    </div>
                                ) : null
                            }
                            classNames={{
                                base: "overflow-visible",
                                table: "min-w-[600px]",
                                thead: "[&>tr]:first:bg-gray-50",
                                th: "bg-gray-50 text-xs font-semibold uppercase tracking-wider py-3 px-3",
                                td: "py-3 px-3",
                            }}
                        >
                            <TableHeader>
                                <TableColumn className="min-w-[100px]">
                                    <div className="text-left">NOMBRE</div>
                                </TableColumn>
                                <TableColumn className="min-w-[100px]">
                                    <div className="text-left">TALLE</div>
                                </TableColumn>
                                <TableColumn className="min-w-[160px]">
                                    <div className="text-left">STOCK</div>
                                </TableColumn>
                                <TableColumn className="min-w-[80px]">
                                    <div className="text-center">IMAGEN</div>
                                </TableColumn>
                                <TableColumn className="min-w-[80px]">
                                    <div className="text-center">ACCIONES</div>
                                </TableColumn>
                            </TableHeader>
                            <TableBody 
                                emptyContent={
                                    <div className="text-center py-8 text-gray-500">
                                        {filterName 
                                            ? "No se encontraron productos con ese nombre" 
                                            : "No hay productos para mostrar"}
                                    </div>
                                } 
                                items={itemsSizesPaginated}
                            >
                                {(item: ProductSize) => (
                                    <TableRow 
                                        key={item._id || `${item.name}_${item.size}`}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <TableCell className="text-left">
                                            <div title={item.name} className="truncate max-w-[120px] font-medium">
                                                {item.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <div title={item.size} className="truncate max-w-[120px] font-medium">
                                                {item.size}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <div className="truncate max-w-[180px] text-gray-600">
                                                {item.stock !== undefined && item.stock !== null ? item.stock.toLocaleString() : '-'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center">
                                                {item.url_image ? (
                                                    <img 
                                                        src={item.url_image} 
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-90"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=IMG';
                                                        }}
                                                        onClick={() => { setSelectedImage(item.url_image || null); onOpenViewImage(); }}
                                                        role="button"
                                                        aria-label={`Abrir imagen de ${item.name}`}
                                                        tabIndex={0}
                                                        onKeyDown={(e: React.KeyboardEvent<HTMLImageElement>) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault();
                                                                setSelectedImage(item.url_image || null);
                                                                onOpenViewImage();
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                                        Sin img
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-row justify-center items-center gap-2">
                                                <Button onPress={() => {
                                                    const idToSet = (item as any)._id || null;
                                                    console.debug('TableProducts - Deleting product size id:', idToSet);
                                                    setSelectId(idToSet);
                                                    onOpenEditProdSize();
                                                }} 
                                                title="Editar" isIconOnly variant="solid" color="warning" className="text-white">
                                                    {svgEdit}
                                                </Button>
                                                <Button onPress={() => {
                                                    const idToSet = (item as any)._id || null;
                                                    console.debug('TableProducts - Deleting product size id:', idToSet);
                                                    setSelectId(idToSet);
                                                    onOpenDeleteProdSize();
                                                }} title="Eliminar" isIconOnly variant="solid" color="danger" className="text-white">
                                                    {svgDelete}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                )}
                <ModalCreateProd />
                <ModalEditProd id={selectId} />
                <ModalDeleteProd id={selectId} />
                <ModalCreateProdSize />
                <ModalEditProdSize id={selectId} />
                <ModalDeleteProdSize id={selectId} />
                <ModalViewImage imageUrl={selectedImage} onCloseCallback={() => setSelectedImage(null)} />
            </div>
            )
}