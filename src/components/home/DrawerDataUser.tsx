import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerFooter } from "@heroui/drawer";
import { useDrawer } from "@/hooks/useDrawer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import {useModal} from "@/hooks/useModal";
import ModalLogOut from "@/components/common/ModalLogOut";

export default function DrawerDataUser() {
    const { isOpen, onClose } = useDrawer('profile');
    const { authState } = useAuth();
    const [mobile, setMobile] = useState(false);
    const { onOpen: onOpenLogOut } = useModal('logOutModal');
    

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
                            MI PERFIL
                        </h1>
                    </div>
                </DrawerHeader>
                <DrawerBody className='flex flex-col items-center px-4 sm:px-6 md:px-8'>
                    <div className='flex flex-col gap-4 w-full sm:w-5/6 md:w-2/3 mt-8 text-white'>
                        <div className='border-b border-white/20 pb-4'>
                            <p className='text-white/60 text-sm'>Nombre</p>
                            <p className='text-lg font-semibold'>{authState.name} {authState.lastName}</p>
                        </div>
                        <div className='border-b border-white/20 pb-4'>
                            <p className='text-white/60 text-sm'>Email</p>
                            <p className='text-lg font-semibold'>{authState.email}</p>
                        </div>
                        {authState.age && (
                            <div className='border-b border-white/20 pb-4'>
                                <p className='text-white/60 text-sm'>Edad</p>
                                <p className='text-lg font-semibold'>{authState.age}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center justify-center mt-12">
                        <Button variant="solid" color="danger" onPress={onOpenLogOut}>Cerrar Sesión</Button>
                    </div>
                </DrawerBody>
                <DrawerFooter className='px-4 sm:px-6'>
                    <Button color='danger' variant='light' onPress={onClose}>
                        Cerrar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
            <ModalLogOut />
        </Drawer>
    )
}