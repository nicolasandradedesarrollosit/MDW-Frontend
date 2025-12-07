import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal, toggleModal } from "@/redux/modal/sliceModal";
import type { RootState, AppDispatch } from "@/redux/store";

export const useModal = (modalId: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.modal.open[modalId] || false);

    const onOpen = () => {
        dispatch(openModal(modalId));
    };
    
    const onClose = () => {
        dispatch(closeModal(modalId));
    };
    
    const onToggle = () => {
        dispatch(toggleModal(modalId));
    };

    const onOpenChange = () => {
        dispatch(toggleModal(modalId));
    };

    return { 
        isOpen, 
        onOpen, 
        onClose, 
        onToggle,
        onOpenChange 
    };
}
