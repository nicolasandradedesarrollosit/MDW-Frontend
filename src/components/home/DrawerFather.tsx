import {useAuth} from '@/hooks/useAuth';
import DrawerLogInUser from './DrawerLogInUser';
import DrawerDataUser from './DrawerDataUser';

export default function DrawerFather() {
    const {authState: {isAuthenticated, loading}} = useAuth();

    console.log('DrawerFather - isAuthenticated:', isAuthenticated, 'loading:', loading);
    
    return (
        <>
            {!loading && (
                isAuthenticated ? <DrawerDataUser /> : <DrawerLogInUser />
            )}
        </>
    );
}