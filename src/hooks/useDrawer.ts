import { useDispatch, useSelector } from "react-redux";
import {openDrawer, closeDrawer, alternateDrawer} from "@/redux/drawerHome/sliceDrawer";
import type { RootState, AppDispatch } from "@/redux/store";

export const useDrawer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.drawer.open);

    console.log('useDrawer - isOpen:', isOpen);

    const onOpen = () => {
        console.log('useDrawer - onOpen called');
        dispatch(openDrawer());
    };
    
    const onClose = () => {
        dispatch(closeDrawer());
    };
    
    const onToggle = () => {
        dispatch(alternateDrawer());
    };

    const onOpenChange = (open: boolean) => {
        if (open) {
            dispatch(openDrawer());
        } else {
            dispatch(closeDrawer());
        }
    };

    return { 
        isOpen, 
        onOpen, 
        onClose, 
        onToggle,
        onOpenChange 
    };
}