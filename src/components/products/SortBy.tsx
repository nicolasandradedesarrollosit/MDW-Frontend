import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import {Radio, RadioGroup} from "@heroui/radio";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useModal } from "@/hooks/useModal";

import { Button } from "@heroui/button";

export default function SortBy() {
  const { isOpen, onOpenChange } = useModal('sortModal');
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get('sort') || null;
  const [selectedSort, setSelectedSort] = useState<string | null>(initialSort);
  useEffect(() => {
      setSelectedSort(searchParams.get('sort'));
  }, [searchParams]);

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
                        <div className="flex flex-row items-center gap-3">
                            <div className="text-left">
                                <h1 className="tracking-wider text-white/90 text-lg sm:text-xl md:text-2xl font-bold">
                                </h1>
                                <p className="text-white/60 text-sm">Ordenar productos</p>
                            </div>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center gap-4 py-4">
                            <p className='text-white/80 text-sm sm:text-base md:text-lg text-center px-2'>
                                Elige una de las opciones...
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 py-4">
                            <RadioGroup value={selectedSort ?? undefined} onValueChange={(v) => setSelectedSort(v)} orientation="vertical" className="flex flex-col gap-4">
                                <Radio value="price_asc" classNames={{
                                    label: "text-white ml-2 text-xl"
                                }}>
                                    Precio: de menor a mayor
                                </Radio>
                                <Radio value="price_desc" classNames={{
                                    label: "text-white ml-2 text-xl"
                                }}>
                                    Precio: de mayor a menor
                                </Radio>
                                <Radio value="name_asc" classNames={{
                                    label: "text-white ml-2 text-xl"
                                }}>
                                    Nombre: A a Z
                                </Radio>
                                <Radio value="name_desc" classNames={{
                                    label: "text-white ml-2 text-xl"
                                }}>
                                    Nombre: Z a A
                                </Radio>
                                <Radio value="create_asc" classNames={{
                                    label: "text-white ml-2 text-xl"
                                }}>
                                    Más nuevos a más antiguos
                                </Radio>
                                <Radio value="create_desc" classNames={{
                                    label: "text-white ml-2 text-xl"
                                }}>
                                  Más antiguos a más nuevos
                                </Radio>
                            </RadioGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
                            <Button 
                                color="default" 
                                variant="light" 
                                onPress={onClose}
                                className="w-full sm:w-auto bg-white text-black"
                                size={isMobile ? "md" : "lg"}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                color="primary"
                                variant="solid"
                                className="w-full sm:w-auto text-sm sm:text-base"
                                size={isMobile ? "md" : "lg"}
                                onPress={() => {
                                    const params = new URLSearchParams(searchParams);
                                    if (selectedSort) {
                                        params.set('sort', selectedSort);
                                    } else {
                                        params.delete('sort');
                                    }
                                    setSearchParams(params, { replace: true });
                                    onClose();
                                }}
                            >
                                Filtrar
                            </Button>
                        </div>
                    </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>
  )
}