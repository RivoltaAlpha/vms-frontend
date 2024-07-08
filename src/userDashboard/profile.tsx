import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


export default function Profile() {
    const {user } = useSelector((state: RootState) => state.userAuth)

    return (
        <div>
            <ul>
                <li>Name: {user?.first_name}</li>
                <li>Surname: {user?.last_name}</li>
                <li>Email: {user?.email}</li>
                <li>Phone: {user?.contact_phone}</li>
                <li>Address: {user?.address}</li>
            </ul>
        </div>
    );
}

