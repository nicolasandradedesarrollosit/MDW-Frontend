import {storeUsers} from './storeUsers.ts';
import { Provider } from 'react-redux';

type ProviderUsersProps = {
    children: React.ReactNode;
}

const ProviderUsers = ({ children }: ProviderUsersProps) => {
    return (
        <Provider store={storeUsers}>{children}</Provider>
    );
}

export default ProviderUsers;