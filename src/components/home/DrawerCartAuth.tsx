import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, DrawerContent } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useDrawer } from "@/hooks/useDrawer";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { addToast } from "@heroui/toast";

export default function DrawerCartAuth() {
    const {isOpen, onClose} = useDrawer('cart');

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
                addToast({ title: 'Sin stock', description: 'No hay stock para este talle.', color: 'danger' });
                processingRef.current[key] = false;
                return prev;
            }
            if (it.quantity + 1 > stock) {
                it.quantity = stock;
                addToast({ title: 'Stock limitado', description: `Se ajustó la cantidad al stock disponible (${stock}).`, color: 'warning' as any });
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
                addToast({ title: 'Cantidad mínima', description: 'Presiona Eliminar para remover el producto.', color: 'info' as any });
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
            addToast({ title: 'Producto eliminado', description: `${it.name} fue removido del carrito.`, color: 'success' });
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
                <DrawerHeader>
                    <div className='flex flex-col w-full items-center mt-8 sm:mt-12 md:mt-16 gap-6 sm:gap-8 md:gap-12 px-4'>
                        <h1 className="tracking-wider text-white/80 text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            CARRITO DE COMPRAS
                        </h1>
                    </div>
                </DrawerHeader>
                <DrawerBody>
                    <div className="flex flex-col items-center h-auto w-full pt-6 px-4">
                        {items.length === 0 ? (
                            <p className="text-white/70 text-lg md:text-xl font-medium">Tu carrito está vacío.</p>
                        ) : (
                            <div className="flex flex-col gap-4 w-full">
                                {items.map(([key, it]: any) => {
                                    const stock = getStockFor(it.productId, it.size);
                                    return (
                                        <div key={key} className="flex justify-between items-center bg-white/6 p-4 rounded-lg">
                                            <img className="object-cover w-16 h-16 rounded-lg" src={it.url_image} alt={it.name} />
                                            <div className="flex-1 px-4">
                                                <p className="text-white/90 font-semibold">{it.name}</p>
                                                <p className="text-white/70 uppercase text-sm">Talle: {it.size}</p>
                                                <p className="text-white/60 text-sm">Stock: {stock}</p>

                                                <div className="mt-2 flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleDecrement(key)}
                                                        className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                                                        aria-label="disminuir"
                                                    >
                                                        -
                                                    </button>

                                                    <div className="w-10 text-center text-white/90">{it.quantity}</div>

                                                    <button
                                                        onClick={() => handleIncrement(key)}
                                                        disabled={stock <= 0 || it.quantity >= stock}
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                                            stock <= 0 || it.quantity >= stock 
                                                                ? "bg-white/10 text-white/40 cursor-not-allowed" 
                                                                : "bg-white text-black cursor-pointer hover:bg-white/90"
                                                        }`}
                                                        aria-label="aumentar"
                                                    >
                                                        +
                                                    </button>

                                                    <Button variant="light" color="danger" className="ml-4" onPress={() => handleRemove(key)}>
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="text-white/90 font-bold">${(it.price * it.quantity).toLocaleString()} ARS</div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {total > 0 && (
                        <div className='flex justify-between items-center w-full text-white/90 font-semibold py-8'>
                            <span>Total</span>
                            <span>${total.toLocaleString()} ARS</span>
                        </div>
                    )}
                </DrawerBody>
                <DrawerFooter className="px-12 flex flex-row gap-8">
                    <Button color='danger' variant='light' onPress={onClose}>
                        Cerrar
                    </Button>
                    <Button color='primary' variant="solid" isDisabled={items.length === 0} onPress={() => addToast({ title: 'Pago', description: 'Funcionalidad de pago no implementada.', color: 'warning' as any })}>
                        Pagar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}