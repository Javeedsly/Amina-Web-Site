import React, { createContext, useState } from 'react'

export const userContext = createContext();

function UserProvider({ children }) {
    // Səhifə yeniləndikdə session-dan istifadəçi məlumatlarını avtomatik bərpa edirik
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const data = {
        user,
        setUser
    }
    
    return (
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider