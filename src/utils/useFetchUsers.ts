import { useEffect, useState } from 'react';
import { UserInterface } from '../types/interfaces';
import UserData from './UserData';

const useFetchUsers = () => {
    /*   const apiAddress = process.env.MAIN_API; */
    const apiAddress = "https://642a6aa000dfa3b547453ae9.mockapi.io/api/users";
    console.log(apiAddress);

    const [data, setData] = useState<UserInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    const getAllUsers = async () => {
        setIsLoading(true);
        if (apiAddress)
            fetch(apiAddress).then((usersArray) => usersArray.json()).catch(() => setIsFailed(true)).then((usersIntefaces) => {
                setData(usersIntefaces/* .map((u: UserInterface) => new UserData(u)) */);
                setIsLoading(false)
            })

    };
    useEffect(() => {
        getAllUsers();
    }, []);

    return { data, isLoading, isFailed }
}

export default useFetchUsers;