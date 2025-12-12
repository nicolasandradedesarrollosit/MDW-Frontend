import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import ButtonSize from "./ButtonSize";
import {NumberInput} from "@heroui/number-input";
import { Button } from "@heroui/button";
import {addToast} from "@heroui/toast"

export default function ProductCard() {
    const productId = useParams().id;
    const products = useSelector((state: any) => state.products?.products ?? []);
    const product = products.find((p: any) => p._id === productId || p.id === productId);
    const categories = useSelector((state: any) => state.categories?.categories ?? []);
    const category = categories.find((c: any) => c._id === product?.id_category || c.id === product?.id_category);
    const productSizes = useSelector((state: any) => state.productSize?.sizes ?? []);
    const productSizesForProduct = productSizes.filter((ps: any) => ps.id_product === productId || ps.id_product === product?._id);
    const {isAuthenticated} = useSelector((state: any) => state.auth);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const handleSelectSize = (size: string) => setSelectedSize(prev => (prev === size ? null : size));
    const [quantity, setQuantity] = useState<number>(1);

    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setQuantity(1);
    }, [selectedSize]);

    const selectedSizeData = productSizesForProduct.find((ps: any) => ps.size === selectedSize);
    const maxQuantity = selectedSizeData?.stock ?? 0;
    const isAddToCartDisabled = selectedSize === null || quantity <= 0 || quantity > maxQuantity;

    type ToastResult = { success: boolean; title: string; description: string; color: 'success' | 'danger' | 'warning' | undefined };

    const handleCart = (): ToastResult => {
        if (!product || !selectedSize) return { success: false, title: 'Talle faltante', description: 'Selecciona un talle.', color: 'danger' };
        if (!isAuthenticated) return { success: false, title: 'No autenticado', description: 'Debes iniciar sesión para agregar al carrito.', color: 'danger' };
        if (quantity <= 0) return { success: false, title: 'Cantidad inválida', description: 'La cantidad debe ser mayor que 0.', color: 'danger' };

        const stock = selectedSizeData?.stock ?? 0;
        if (stock <= 0) return { success: false, title: 'Sin stock', description: 'No hay stock disponible para este talle.', color: 'danger' };

        const cartItem = {
            productId: product._id ?? product.id,
            name: product.name,
            size: selectedSize,
            quantity: quantity,
            price: product.price,
            url_image: product.url_image
        };

        let cartObj: Record<string, any> = {};
        try {
            const cartJson = localStorage.getItem('cart');
            cartObj = cartJson ? JSON.parse(cartJson) : {};
        } catch (err) {
            return { success: false, title: 'Error del carrito', description: 'No se pudo leer el carrito desde localStorage.', color: 'danger' };
        }

        const pid = product._id ?? product.id;
        const baseKey = `${pid}-${selectedSize}`;

        try {
            const existingSamePriceKey = Object.keys(cartObj).find((k) => {
                const it = cartObj[k];
                return it?.productId === pid && it?.size === selectedSize && it?.price === product.price;
            });

            if (existingSamePriceKey) {
                const existing = cartObj[existingSamePriceKey];
                const requested = existing.quantity + cartItem.quantity;
                if (requested > stock) {
                    existing.quantity = stock;
                    cartObj[existingSamePriceKey] = existing;
                    localStorage.setItem('cart', JSON.stringify(cartObj));
                    return { success: false, title: 'Stock limitado', description: `Se ajustó la cantidad al stock disponible (${stock}).`, color: 'warning' };
                }
                existing.quantity = requested;
                cartObj[existingSamePriceKey] = existing;
                localStorage.setItem('cart', JSON.stringify(cartObj));
                setQuantity(1);
                return { success: true, title: 'Producto añadido', description: 'El producto fue añadido al carrito.', color: 'success' };
            }

            if (cartObj[baseKey] && cartObj[baseKey].price !== product.price) {
                const newKey = `${baseKey}-${Date.now()}`;
                const itemToAdd = { ...cartItem };
                if (itemToAdd.quantity > stock) {
                    itemToAdd.quantity = stock;
                    cartObj[newKey] = itemToAdd;
                    localStorage.setItem('cart', JSON.stringify(cartObj));
                    return { success: false, title: 'Stock limitado', description: `Se ajustó la cantidad al stock disponible (${stock}).`, color: 'warning' };
                }
                cartObj[newKey] = itemToAdd;
                localStorage.setItem('cart', JSON.stringify(cartObj));
                setQuantity(1);
                return { success: true, title: 'Producto añadido', description: 'El producto fue añadido al carrito.', color: 'success' };
            }

            const itemToAdd = { ...cartItem };
            if (itemToAdd.quantity > stock) {
                itemToAdd.quantity = stock;
                cartObj[baseKey] = itemToAdd;
                localStorage.setItem('cart', JSON.stringify(cartObj));
                return { success: false, title: 'Stock limitado', description: `Se ajustó la cantidad al stock disponible (${stock}).`, color: 'warning' };
            }
            cartObj[baseKey] = itemToAdd;
            localStorage.setItem('cart', JSON.stringify(cartObj));
            setQuantity(1);
            return { success: true, title: 'Producto añadido', description: 'El producto fue añadido al carrito.', color: 'success' };
        } catch (err) {
            return { success: false, title: 'Error', description: 'Ocurrió un error al actualizar el carrito.', color: 'danger' };
        }
    };

    return (
        <div className="h-auto py-32 w-full bg-gradient-to-br from-gray-200 via-white to-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                <nav className="mb-8 lg:mb-12">
                    <div className="flex items-center gap-2 text-sm">
                        <Link 
                            to="/products" 
                            className="text-gray-500 hover:text-gray-900 transition-colors font-medium uppercase tracking-wide"
                        >
                            Productos
                        </Link>
                        {category && (
                            <>
                                <span className="text-gray-300">/</span>
                                <span className="text-gray-700 font-medium uppercase tracking-wide">
                                    {category.name}
                                </span>
                            </>
                        )}
                    </div>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                    <div className="relative">
                        <div className="sticky top-8 bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <img
                                    src={product?.url_image}
                                    alt={product?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 lg:gap-10">
                        <div className="space-y-3">
                            {category && (
                                <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                                    {category.name}
                                </div>
                            )}
                            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                {product?.name}
                            </h1>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                                    ${product?.price?.toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-500 font-medium">ARS</span>
                            </div>
                            
                            {product?.description && (
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                Selecciona tu talle
                            </h3>
                            
                            {productSizesForProduct.length === 0 ? (
                                <div className="p-6 bg-red-400 rounded-2xl">
                                    <p className="text-white font-medium">No hay talles disponibles</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {productSizesForProduct.map((ps: any) => (
                                        <div 
                                            key={ps._id} 
                                            className="flex flex-col gap-2 p-4 bg-white rounded-xl"
                                        >
                                            <ButtonSize 
                                                size={ps.size} 
                                                isSelected={selectedSize === ps.size} 
                                                onSelect={handleSelectSize} 
                                            />
                                            <div className="text-center">
                                                <span className="text-xs font-medium text-gray-600">
                                                    Stock: <span className="font-bold text-gray-900">{ps.stock ?? '-'}</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                                <div className="w-full sm:w-48 flex flex-col">
                                    <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                        Cantidad
                                    </label>
                                    <NumberInput
                                        className="w-full"
                                        isDisabled={selectedSize === null}
                                        value={quantity}
                                        min={1}
                                        max={maxQuantity}
                                        onChange={(e: any) => setQuantity(Number((e.target as HTMLInputElement).value))}
                                        onValueChange={(v: any) => setQuantity(Number(v))}
                                        isInvalid={selectedSize !== null && (quantity <= 0 || quantity > maxQuantity)}
                                        errorMessage="Cantidad inválida"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col sm:justify-start">
                                    <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide opacity-0 pointer-events-none">
                                        -
                                    </label>
                                    <Button
                                        isDisabled={isAddToCartDisabled || !isAuthenticated || isProcessing}
                                        className="w-full h-12 bg-gray-900 text-white font-semibold text-base uppercase tracking-wider rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition-colors duration-200"
                                        onPress={() => {
                                            if (isProcessing) return;
                                            setIsProcessing(true);
                                            try {
                                                const res = handleCart();
                                                try {
                                                    addToast({
                                                        title: res.title,
                                                        description: res.description,
                                                        color: res.color,
                                                        timeout: 1000
                                                    });
                                                    setTimeout(() => {
                                                        window.location.reload();
                                                    }, 1500);
                                                } catch (tErr) {
                                                    console.warn('Toast error', tErr);
                                                }
                                            } finally {
                                                setIsProcessing(false);
                                            }
                                        }}
                                    >
                                        {selectedSize === null ? 'Selecciona un talle' : 'Añadir al carrito'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}