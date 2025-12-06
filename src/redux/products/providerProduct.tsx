import { storeProducts } from "./storeProducts";
import {Provider} from "react-redux";

type ProviderProductProps = {
    children: React.ReactNode;
}

const ProviderProduct = ({children}: ProviderProductProps) => {
    return (
        <Provider store={storeProducts}>
            {children}
        </Provider>
    );
}

export default ProviderProduct;