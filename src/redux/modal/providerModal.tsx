import { Provider } from 'react-redux';
import { modalStore } from './storeModal';

type ProviderModalProps = {
    children: React.ReactNode;
}

export const ProviderModal = ({ children }: ProviderModalProps) => {
    return (
        <Provider store={modalStore}>
            {children}
        </Provider>
    );
}
