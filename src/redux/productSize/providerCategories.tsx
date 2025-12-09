import { storeProductSize } from "./storeProductSize";
import { Provider } from "react-redux";

type ProviderCategoriesProps = {
    children: React.ReactNode;
}

const ProviderProductSize = ({children}: ProviderCategoriesProps) => {
    return (
        <Provider store={storeProductSize}>
            {children}
        </Provider>
    );
}

export default ProviderProductSize;