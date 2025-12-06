import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, DrawerContent } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useDrawer } from "@/hooks/useDrawer";
import { useEffect, useState } from "react";

export default function DrawerCartAuth() {
    const {isOpen, onClose} = useDrawer('cart');

    const [mobile, setMobile] = useState(false);
        
    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    <p className="text-white">Estas autenticado - Carrito de compras</p>
                </DrawerBody>
                <DrawerFooter className='px-4 sm:px-6'>
                    <Button color='danger' variant='light' onPress={onClose}>
                        Cerrar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>   
    )
}