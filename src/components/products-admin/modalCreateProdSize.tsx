import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";

import { Select, SelectItem } from "@heroui/select";

import { useState, useEffect } from "react";

import { useModal } from "@/hooks/useModal";

import { useSelector } from "react-redux";

import {RootState} from "@/redux/store";

import {Form} from "@heroui/form";

import { Input } from "@heroui/input";

import { Button } from "@heroui/button";

import { createProductSize } from "@/services/productSizeService";
import { setFetched as setProductSizesFetched } from '@/redux/productSize/sliceProductSize';
import { useDispatch } from 'react-redux';

export default function ModalCreateProdSize() {
    const productsState = useSelector((state: RootState) => state.products);
    
    const { isOpen, onOpenChange } = useModal('createProdSizeModal');
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({  
        id_product: '',
        size: '',
        stock: 0
    });

    const sizes = [
        {
            key: 's',
            label: 'Small'
        },
        {
            key: 'm',
            label: 'Medium'
        },
        {
            key: 'l',
            label: 'Large'
        },
        {
            key: 'xl',
            label: 'X-Large'
        }


    ]

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const createProdSize = async (closeModal: () => void) => {
        try {
            setIsLoading(true);
            const params = {
                id_product: formData.id_product,
                size: formData.size,
                stock: formData.stock
            }
            if (!params.id_product || typeof params.id_product !== 'string') {
                console.warn('createProdSize - id_product is invalid:', params.id_product);
            }
            const objectIdRegex = /^[a-f\d]{24}$/i;
            if (params.id_product && !objectIdRegex.test(params.id_product)) {
                console.warn('createProdSize - id_product does not match ObjectId format:', params.id_product);
            }

            await createProductSize(params);

            setFormData({
                id_product: '',
                size: '',
                stock: 0
            });

            closeModal();
            try { dispatch(setProductSizesFetched(false)); } catch (e) { /** noop */ }
        }
        catch (err) {
            console.error('Error en el registro:', err);
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
                    Crear nuevo producto talle
                </p>
              </ModalHeader>
              <ModalBody>
                <Form className='flex flex-col gap-5 sm:gap-6 w-full max-w-md'>
                    <Select
                        label="Producto"
                        placeholder="Selecciona un producto"
                        variant='bordered'
                        isRequired
                        selectedKeys={formData.id_product ? [formData.id_product] : []}
                        onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0];
                            setFormData((prev) => ({ ...prev, id_product: String(selectedKey) }));
                        }}
                        classNames={{
                            base: "w-full",
                            label: "text-xs sm:text-sm text-white/70 font-medium",
                            trigger: "bg-black hover:border-white/40 data-[hover=true]:bg-black/80 data-[open=true]:border-white/60 transition-all duration-200 rounded-xl min-h-[56px]",
                            innerWrapper: "text-white",
                            selectorIcon: "text-white/70",
                            value: "text-sm sm:text-base !text-white",
                            listboxWrapper: "max-h-[240px]",
                            listbox: "bg-black",
                            popoverContent: "bg-black shadow-xl shadow-black/50 rounded-xl",
                            errorMessage: "text-xs text-red-400"
                        }}
                        errorMessage={formData.id_product === '' ? "El producto es obligatorio" : undefined}
                        popoverProps={{
                            offset: 10,
                        }}
                        scrollShadowProps={{
                            hideScrollBar: true
                        }}
                    >
                        {productsState.products && productsState.products.length > 0 ? (
                            productsState.products.map((product: any, idx: number) => (
                                <SelectItem 
                                    key={product._id ?? product.id ?? `product-${idx}`}
                                    classNames={{
                                        base: "text-white",
                                    }}
                                >
                                    {product.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem key="no-products" isDisabled>
                                No hay productos disponibles
                            </SelectItem>
                        )}
                    </Select>
                
                    <Input 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors rounded-xl",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired 
                        label='Stock'
                        placeholder="100"
                        type="number"
                        value={formData.stock.toString()}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, stock: parseInt(value) || 0 }))}
                        errorMessage='El stock es obligatorio' 
                    />

                    <Select
                        label="Talle"
                        placeholder="Selecciona un talle"
                        variant='bordered'
                        isRequired
                        selectedKeys={formData.size ? [formData.size] : []}
                        onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0];
                            setFormData((prev) => ({ ...prev, size: String(selectedKey) }));
                        }}
                        classNames={{
                            base: "w-full",
                            label: "text-xs sm:text-sm text-white/70 font-medium",
                            trigger: "bg-black hover:border-white/40 data-[hover=true]:bg-black/80 data-[open=true]:border-white/60 transition-all duration-200 rounded-xl min-h-[56px]",
                            innerWrapper: "text-white",
                            selectorIcon: "text-white/70",
                            value: "text-sm sm:text-base !text-white",
                            listboxWrapper: "max-h-[240px]",
                            listbox: "bg-black",
                            popoverContent: "bg-black shadow-xl shadow-black/50 rounded-xl",
                            errorMessage: "text-xs text-red-400"
                        }}
                        errorMessage={formData.size === '' ? "El talle es obligatorio" : undefined}
                        popoverProps={{
                            offset: 10,
                        }}
                        scrollShadowProps={{
                            hideScrollBar: true
                        }}
                    >
                        {sizes.map((size) => (
                            <SelectItem 
                                key={size.key}
                                classNames={{
                                    base: "text-white",
                                }}
                            >
                                {size.label}
                            </SelectItem>
                        ))}
                    </Select>
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
                  onPress={() => createProdSize(onClose)}
                  className="text-sm sm:text-base"
                  size={isMobile ? "md" : "lg"}
                >
                    Crear Producto Talle
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}