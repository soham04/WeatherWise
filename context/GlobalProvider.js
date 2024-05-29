import React, { createContext, useContext, useState } from 'react';

// Create a context
const GlobalContext = createContext();

// Define the provider component
const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <GlobalContext.Provider value={{ isLogged, setIsLogged, loading, setLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for accessing the context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export default GlobalProvider;
