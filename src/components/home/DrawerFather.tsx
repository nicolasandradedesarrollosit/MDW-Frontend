import {useAuth} from '@/hooks/useAuth';
import DrawerLogInUser from './DrawerLogInUser';
import DrawerDataUser from './DrawerDataUser';

export default function DrawerFather() {
    const {authState: {isAuthenticated, loading}} = useAuth();

    console.log('DrawerFather - isAuthenticated:', isAuthenticated, 'loading:', loading);

    // Renderizar ambos pero solo uno estará visible según isAuthenticated
    // No podemos retornar null porque los Drawers necesitan estar montados
    return (
        <>
            {!loading && (
                isAuthenticated ? <DrawerDataUser /> : <DrawerLogInUser />
            )}
        </>
    );
}