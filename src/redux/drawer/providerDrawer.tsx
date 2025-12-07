import {Provider} from 'react-redux';
import { drawerStore } from './store';

type ProviderDrawerProps = {
    children: React.ReactNode;
}

export const ProviderDrawer = ({children}: ProviderDrawerProps) => {
    return (
        <Provider store={drawerStore}>
            {children}
        </Provider>
    );
}