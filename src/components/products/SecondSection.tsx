import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom";
import {RootState} from "@/redux/store"
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";

export interface SecondSectionProps {
    categorySlugs?: string[] | null | undefined;
}

export default function SecondSection({ categorySlugs }: SecondSectionProps) {
    const productsState = useSelector((state: RootState) => state.products);

    const categoriesState = useSelector((state: RootState) => state.categories);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sortParam = searchParams.get('sort') || undefined;

    const filteredProducts = useMemo(() => {
        const slugs = (categorySlugs || []).filter(Boolean).map(s => String(s).toLowerCase());
        if (!slugs || slugs.length === 0) return productsState.products;
        const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/\s+/g, '-');
        if (!categoriesState?.categories || categoriesState.categories.length === 0) return productsState.products;
        const desired = new Set<string>();
        (categoriesState?.categories || []).forEach((c: any) => {
            const name = String(c?.name || '');
            const nameNorm = normalize(name);
            const idStr = String(c?.id || '');
            if (slugs.includes(nameNorm) || slugs.includes(name.toLowerCase()) || slugs.includes(idStr)) {
                desired.add(idStr);
            }
        });
        if (desired.size === 0) return [];
        return productsState.products.filter(p => desired.has(String(p.id_category)));
    }, [productsState.products, categoriesState?.categories, categorySlugs]);

    const sortedProducts = useMemo(() => {
        if (!sortParam) return filteredProducts;
        const arr = [...filteredProducts];
        switch (sortParam) {
            case 'price_asc':
                return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
            case 'price_desc':
                return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
            case 'name_asc':
                return arr.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
            case 'name_desc':
                return arr.sort((a, b) => String(b.name || '').localeCompare(String(a.name || '')));
            case 'create_asc':
                return arr.sort((a, b) => (new Date(b.createdAt || 0).getTime()) - (new Date(a.createdAt || 0).getTime()));
            case 'create_desc':
                return arr.sort((a, b) => (new Date(a.createdAt || 0).getTime()) - (new Date(b.createdAt || 0).getTime()));
            default:
                return filteredProducts;
        }
    }, [filteredProducts, sortParam]);

    useEffect(() => {
        console.log('SecondSection - productsState:', productsState);
    }, [productsState]);    
    
    return (
        <section className="flex flex-col items-center h-auto w-full px-4 py-8 md:py-12 lg:py-24">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {sortedProducts.map((item, index) => (
                        <Card 
                            classNames={{
                                base: "w-full h-auto bg-white border border-gray-200"
                            }} 
                            key={index} 
                            isFooterBlurred 
                            isPressable 
                            shadow="sm" 
                            onPress={() => navigate(`/single-product/${item._id}`)}
                        >
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    alt={item.name}
                                    className="block w-full h-48 sm:h-56 md:h-64 object-cover"
                                    radius="none"
                                    shadow="none"
                                    width="100%"
                                    src={item.url_image}
                                />
                            </CardBody>
                            <CardFooter className="flex-col items-start gap-2 p-4 bg-white/95 backdrop-blur-sm">
                                <div className="flex flex-col w-full gap-1">
                                    <p className="text-sm md:text-base font-semibold text-black line-clamp-2">{item.name}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                                </div>
                                <div className="flex justify-between items-center w-full mt-2">
                                    <p className="text-lg md:text-xl font-bold text-black">${item.price?.toLocaleString()}<span className="text-sm ml-1 text-gray-500">ARS</span></p>
                                    <Button onPress={() => {
                                        navigate(`/single-product/${item._id}`);
                                    }} size="sm" className="bg-black text-white">Ver Más</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}