import React, { useEffect, useState } from 'react';

export const CategoriesContext = React.createContext<{ categories: any[] }>({ categories: [] });

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories([]);
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>
    );
};
