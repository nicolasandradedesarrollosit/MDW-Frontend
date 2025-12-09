import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";

import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";

type Props = {
    imageUrl: string | null;
    alt?: string;
    onCloseCallback?: () => void;
};

export default function ModalViewImage({ imageUrl, alt, onCloseCallback }: Props) {
    const { isOpen, onOpenChange } = useModal('viewImageModal');
    const [isMobile, setIsMobile] = useState(false);
    const [wasOpen, setWasOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (wasOpen && !isOpen) {
            if (onCloseCallback) onCloseCallback();
        }
        setWasOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size={`${isMobile ? 'full' : '4xl'}`}
            placement={isMobile ? "center" : "center"}
            backdrop="blur"
            scrollBehavior="inside"
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
                            <h1 className="tracking-wider text-white/90 text-lg sm:text-xl md:text-2xl font-bold">VISTA PREVIA</h1>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex items-center justify-center w-full max-h-[70vh]">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={alt || 'Imagen del producto'}
                                        className="max-w-full max-h-[70vh] object-contain rounded-md"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-[250px] sm:h-[350px] flex items-center justify-center text-white/70 bg-black/40 rounded-md">
                                        Sin imagen disponible
                                    </div>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex flex-row gap-2 sm:gap-3 justify-center">
                            <Button color="danger" variant="light" onPress={() => { onClose(); if (onCloseCallback) onCloseCallback(); }}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
