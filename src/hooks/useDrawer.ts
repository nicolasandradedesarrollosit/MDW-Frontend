import { useDispatch, useSelector } from "react-redux";
import {openDrawer, closeDrawer, alternateDrawer} from "@/redux/drawerHome/sliceDrawer";
import type { RootState, AppDispatch } from "@/redux/store";

export const useDrawer = (drawerId: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.drawer.open[drawerId] || false);

    console.log(`useDrawer[${drawerId}] - isOpen:`, isOpen);

    const onOpen = () => {
        console.log(`useDrawer[${drawerId}] - onOpen called`);
        dispatch(openDrawer(drawerId));
    };
    
    const onClose = () => {
        dispatch(closeDrawer(drawerId));
    };
    
    const onToggle = () => {
        dispatch(alternateDrawer(drawerId));
    };

    const onOpenChange = (open: boolean) => {
        if (open) {
            dispatch(openDrawer(drawerId));
        } else {
            dispatch(closeDrawer(drawerId));
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