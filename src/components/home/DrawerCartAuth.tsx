import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, DrawerContent } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useDrawer } from "@/hooks/useDrawer";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { addToast } from "@heroui/toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function DrawerCartAuth() {
    const navigate = useNavigate();
    const {authState} = useAuth();
    const {isOpen, onClose} = useDrawer('cart');
    const userId = authState?.id ?? null;

    const productSizes = useSelector((state: any) => state.productSize?.sizes ?? state.productSizes?.productSizes ?? []);

    const [mobile, setMobile] = useState(false);
    const [cartObj, setCartObj] = useState<Record<string, any>>(() => {
        try {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : {};
        } catch {
            return {};
        }
    });

    const handleCartCheckout = useCallback(async () =>   {
        const cartJson = localStorage.getItem('cart');
        if (!userId) {
            addToast({ title: 'Usuario no autenticado', description: 'Debes iniciar sesión para completar la compra.', color: 'info' as any, timeout: 2000 });
            return;
        }
        if (!cartJson) {
            addToast({ title: 'Carrito vacío', description: 'No hay productos en el carrito para pagar.', color: 'info' as any, timeout: 2000 });
            return;
        }
        const cart = JSON.parse(cartJson);
        if (Object.keys(cart).length === 0) {
            addToast({ title: 'Carrito vacío', description: 'No hay productos en el carrito para pagar.', color: 'info' as any, timeout: 2000 });
            return;
        }
        try {
            navigate('/order')
            onClose();
        }
        catch (err) {
            addToast({ title: 'Error', description: 'Hubo un error al enviar tu orden. Intenta nuevamente.', color: 'danger', timeout: 2000 });
            return;
        }
    }, [userId, onClose]);
    
    const processingRef = useRef<Record<string, boolean>>({});

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartObj));
        } catch (err) {
        }
    }, [cartObj]);

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'cart') {
                try {
                    setCartObj(e.newValue ? JSON.parse(e.newValue) : {});
                } catch {
                    setCartObj({});
                }
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const getStockFor = useCallback((productId: string, size: string) => {
        const ps = productSizes.find((p: any) => (p.id_product === productId || p._id === productId) && p.size === size);
        return ps?.stock ?? 0;
    }, [productSizes]);

    const handleIncrement = useCallback((key: string) => {
        if (processingRef.current[key]) return;
        
        processingRef.current[key] = true;
        
        setCartObj((prev) => {
            const copy = { ...prev };
            const it = copy[key];
            if (!it) {
                processingRef.current[key] = false;
                return prev;
            }
            const stock = getStockFor(it.productId, it.size);
            if (stock <= 0) {
                addToast({ title: 'Sin stock', description: 'No hay stock para este talle.', color: 'danger', timeout: 2000 });
                processingRef.current[key] = false;
                return prev;
            }
            if (it.quantity + 1 > stock) {
                it.quantity = stock;
                addToast({ title: 'Stock limitado', description: `Se ajustó la cantidad al stock disponible (${stock}).`, color: 'warning' as any, timeout: 2000 });
            } else {
                it.quantity += 1;
            }
            copy[key] = it;
            
            setTimeout(() => {
                processingRef.current[key] = false;
            }, 100);
            
            return copy;
        });
    }, [getStockFor]);

    const handleDecrement = useCallback((key: string) => {
        if (processingRef.current[key]) return;
        
        processingRef.current[key] = true;
        
        setCartObj((prev) => {
            const copy = { ...prev };
            const it = copy[key];
            if (!it) {
                processingRef.current[key] = false;
                return prev;
            }
            
            if (it.quantity > 1) {
                it.quantity -= 1;
                copy[key] = it;
            } else {
                copy[key] = it;
                addToast({ title: 'Cantidad mínima', description: 'Presiona Eliminar para remover el producto.', color: 'info' as any, timeout: 2000});
            }
            
            setTimeout(() => {
                processingRef.current[key] = false;
            }, 100);
            
            return copy;
        });
    }, []);

    const handleRemove = useCallback((key: string) => {
        setCartObj((prev) => {
            const copy = { ...prev };
            const it = copy[key];
            if (!it) return prev;
            delete copy[key];
            addToast({ title: 'Producto eliminado', description: `${it.name} fue removido del carrito.`, color: 'success', timeout: 2000 });
            return copy;
        });
    }, []);

    const items = useMemo(() => Object.entries(cartObj), [cartObj]);
    const total = useMemo(() => items.reduce((s, [, it]: any) => s + (it.price * it.quantity || 0), 0), [items]);

    return (
        <Drawer
            className='bg-black'
            size={mobile ? 'full' : '2xl'}
            isOpen={isOpen}
            onClose={onClose}
            placement='right'
            backdrop='blur'
        >
            <DrawerContent>
                <DrawerHeader className="px-4 sm:px-6">
                    <div className='flex flex-col w-full items-center mt-4 sm:mt-8 md:mt-12 gap-4 sm:gap-6 md:gap-8'>
                        <h1 className="tracking-wider text-white/80 text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center">
                            CARRITO DE COMPRAS
                        </h1>
                    </div>
                </DrawerHeader>
                <DrawerBody className="overflow-x-hidden px-4 sm:px-6">
                    <div className="flex flex-col items-center h-auto w-full pt-4 sm:pt-6">
                        {items.length === 0 ? (
                            <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium text-center">Tu carrito está vacío.</p>
                        ) : (
                            <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-full">
                                {items.map(([key, it]: any) => {
                                    const stock = getStockFor(it.productId, it.size);
                                    return (
                                        <div key={key} className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white/6 p-3 sm:p-4 rounded-lg w-full min-w-0">
                                            <img 
                                                className="object-cover w-20 h-20 sm:w-16 sm:h-16 rounded-lg flex-shrink-0 self-center sm:self-start" 
                                                src={it.url_image} 
                                                alt={it.name} 
                                            />
                                            
                                            <div className="flex-1 min-w-0 flex flex-col gap-2">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-white/90 font-semibold text-sm sm:text-base truncate">{it.name}</p>
                                                        <p className="text-white/70 uppercase text-xs sm:text-sm">Talle: {it.size}</p>
                                                        <p className="text-white/60 text-xs sm:text-sm">Stock: {stock}</p>
                                                    </div>
                                                    
                                                    <div className="text-white/90 font-bold text-base sm:text-lg whitespace-nowrap self-start sm:self-auto">
                                                        ${(it.price * it.quantity).toLocaleString()} ARS
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleDecrement(key)}
                                                            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors flex-shrink-0"
                                                            aria-label="disminuir"
                                                        >
                                                            -
                                                        </button>

                                                        <div className="w-10 text-center text-white/90 flex-shrink-0">{it.quantity}</div>

                                                        <button
                                                            onClick={() => handleIncrement(key)}
                                                            disabled={stock <= 0 || it.quantity >= stock}
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                                                                stock <= 0 || it.quantity >= stock 
                                                                    ? "bg-white/10 text-white/40 cursor-not-allowed" 
                                                                    : "bg-white text-black cursor-pointer hover:bg-white/90"
                                                            }`}
                                                            aria-label="aumentar"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <Button 
                                                        variant="light" 
                                                        color="danger" 
                                                        size="sm"
                                                        className="flex-shrink-0" 
                                                        onPress={() => handleRemove(key)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {total > 0 && (
                        <div className='flex justify-between items-center w-full text-white/90 font-semibold py-6 sm:py-8 text-base sm:text-lg border-t border-white/10 mt-4'>
                            <span>Total</span>
                            <span>${total.toLocaleString()} ARS</span>
                        </div>
                    )}
                </DrawerBody>
                <DrawerFooter className="px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8">
                    <Button 
                        color='danger' 
                        variant='light' 
                        onPress={onClose}
                        className="w-full sm:w-auto"
                    >
                        Cerrar
                    </Button>
                    <Button 
                        color='primary' 
                        variant="solid" 
                        isDisabled={items.length === 0 || !userId} 
                        onPress={handleCartCheckout}
                        className="w-full sm:w-auto"
                    >
                        Ir a pagar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}