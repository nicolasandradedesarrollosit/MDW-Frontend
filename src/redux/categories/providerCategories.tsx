import {storeCategories} from "./storeCategories";
import { Provider } from "react-redux";

type ProviderCategoriesProps = {
    children: React.ReactNode;
}

const ProviderCategories = ({children}: ProviderCategoriesProps) => {
    return (
        <Provider store={storeCategories}>
            {children}
        </Provider>
    );
}

export default ProviderCategories;