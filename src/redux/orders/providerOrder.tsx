import { storeOrders } from './storeOrders'
import {Provider} from 'react-redux'

type ProviderOrderProps = {
    children: React.ReactNode;
}

const ProviderOrder = ({children}: ProviderOrderProps) => {
    return (
        <Provider store={storeOrders}>
            {children}
        </Provider>
    );
}

export default ProviderOrder;