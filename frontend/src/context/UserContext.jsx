import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({name: ''});
    const [diet, setDiet] = useState({});

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, diet, setDiet}}>
            {children}
        </UserContext.Provider>
    );
};