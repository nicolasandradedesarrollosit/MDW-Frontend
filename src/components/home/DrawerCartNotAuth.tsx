import {Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@heroui/drawer";
import {Alert} from "@heroui/alert";
import {Button} from "@heroui/button";
import {useEffect, useState} from "react";
import {useDrawer} from "@/hooks/useDrawer";

export default function DrawerCartNotAuth() {
    const { isOpen, onClose } = useDrawer('cart');
    const {onOpen: onOpenProfile} = useDrawer('profile');

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
                <DrawerBody className='flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 pt-8'>
                    <div className="w-full sm:w-5/6">
                        <Alert 
                            color="danger"
                            variant="solid"
                            description="Necesitas estar autenticado para ver el carrito de compras." 
                            endContent={
                                <Button  
                                    variant='solid' 
                                    onPress={() => { onOpenProfile(); onClose(); }}
                                    className="whitespace-nowrap min-w-fit text-xs sm:text-sm flex-shrink-0 bg-black text-white/90"
                                >
                                    Iniciar sesión
                                </Button>
                            }
                        />
                    </div>

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