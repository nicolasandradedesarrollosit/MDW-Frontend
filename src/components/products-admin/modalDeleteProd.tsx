import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal"

import { deleteProduct } from "@/services/productService";

import {useModal} from '@/hooks/useModal';

import {Button} from "@heroui/button";

import { useState, useEffect } from "react";



export default function ModalDeleteProd({ id }: { id?: string | null }) {

    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {isOpen, onOpenChange} = useModal('deleteProdModal');

    useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 640);
            };
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            }
    }, []);

    const handleDeleteProduct = async (id?: string | null) => {
        if (!id) return;
        try {
            setIsLoading(true);
            await deleteProduct(id);
        }
        catch (err) {
            console.error('Error deleting product size:', err);
        }
        finally {
            setIsLoading(false);
            window.location.reload();
        }
    }

    return (
        <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={isMobile ? "3xl" : "xl"}
        backdrop="blur"
        scrollBehavior="inside"
                classNames={{
                    body: "py-6 sm:py-8 px-4 sm:px-6 flex flex-col items-center justify-start",
                    base: "bg-black text-white max-h-[95vh] rounded-lg shadow-xl",
                    header: "text-center pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6",
                    footer: "border-t-[1px] border-[#292f46] py-4 sm:py-5 px-4 sm:px-6",
                    closeButton: "hover:bg-white/5 active:bg-white/10 top-2 right-2 sm:top-3 sm:right-3",
                }} 
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 items-center">
                            Eliminar Producto
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col items-center gap-4 py-4">
                                <p className='text-white/80 text-sm sm:text-base md:text-lg text-center px-2'>
                                    ¿Estás seguro que deseas eliminar este producto?
                                </p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
                                <Button 
                                    color="default" 
                                    variant="light" 
                                    onPress={onClose}
                                    className="w-full sm:w-auto"
                                    size={isMobile ? "md" : "lg"}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    color="danger"
                                    variant="solid"
                                    onPress={async () => {
                                        await handleDeleteProduct(id);
                                        onClose();
                                    }}
                                    isLoading={isLoading}
                                    className="w-full sm:w-auto text-sm sm:text-base"
                                    size={isMobile ? "md" : "lg"}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}