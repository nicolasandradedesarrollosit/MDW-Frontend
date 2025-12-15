import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";

import { useState, useEffect } from "react";

import { useModal } from "@/hooks/useModal";

import {Form} from "@heroui/form";

import { Button } from "@heroui/button";

import { setFetched } from '@/redux/products/sliceProducts';

import { useDispatch } from 'react-redux';

import ButtonModalUpdate from "./buttonModalUpdate";

import { updateOrderStatus } from "@/services/cartService";

export default function ModalUpdateStateOrder({ id_order }: { id_order?: string | null }) {

    const { isOpen, onOpenChange } = useModal('modalUpdateStateOrder');
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (isOpen) {
        setNewStatus('');
      }
    }, [isOpen]);

    const editOrder = async (closeModal: () => void) => {
      try {
        if (!newStatus) {
            alert('Seleccioná un estado antes de enviar');
            return;
        }
        setIsLoading(true);
        await updateOrderStatus(id_order || '', newStatus);
        console.debug('ModalUpdateStateOrder - would call service to update order status', { id_order, newStatus });
        closeModal();
        dispatch(setFetched(false));
      }
        catch (err) {
            console.error('Error en el registro:', err);
            try {
                const msg = (err as any)?.message || 'Error al editar estado de pedido';
                const body = (err as any)?.body || '';
                alert(`${msg}${body ? '\n' + String(body).slice(0, 100) : ''}`);
            } catch (e) {
                throw e;
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size={`${isMobile ? 'full' : '3xl'}`} 
        placement={isMobile ? "center" : "top"}
        backdrop="blur"
        scrollBehavior="inside"
        disableAnimation
        classNames={{
          body: "py-6 sm:py-8 px-4 sm:px-6 flex flex-col items-center justify-start",
          base: "bg-black text-white max-h-[95vh]",
          header: "text-center pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6",
          footer: "border-t-[1px] border-[#292f46] py-4 sm:py-5 px-4 sm:px-6",
          closeButton: "hover:bg-white/5 active:bg-white/10 top-2 right-2 sm:top-3 sm:right-3",
        }} 
        >
        <ModalContent> 
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col w-full items-center gap-4 sm:gap-5">
                <h1 className="tracking-wider text-white/90 text-xl sm:text-2xl md:text-3xl font-bold">
                    MDW
                </h1>
                <p className='text-white/80 text-sm sm:text-base md:text-lg text-center px-2'>
                    Editar Estado de Pedido
                </p>
              </ModalHeader>
              <ModalBody>
                <Form className='flex flex-col items-center justify-center mt-8 gap-5 sm:gap-6 w-full max-w-md'>
                  {statusOptions.map((status) => (
                    <ButtonModalUpdate
                      key={status}
                      value={status}
                      selected={newStatus === status}
                      onSelect={(v) => setNewStatus(String(v || ''))}
                    />
                  ))}
                </Form>
              </ModalBody>
              <ModalFooter className="flex flex-row gap-2 sm:gap-3">
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  className="text-sm sm:text-base"
                  size={isMobile ? "md" : "lg"}
                >
                  Cerrar
                </Button>
                <Button 
                  isLoading={isLoading} 
                  color="primary" 
                  onPress={() => editOrder(onClose)}
                  className="text-sm sm:text-base"
                  size={isMobile ? "md" : "lg"}
                >
                    Editar Estado
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}