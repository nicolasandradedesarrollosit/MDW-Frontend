import {Provider} from "react-redux";
import {storeAuth} from "./storeAuth";

export const ProviderAuth = ({children}: {children: React.ReactNode}) => {
    return (
        <Provider store={storeAuth}>
            {children}
        </Provider>
    );
};