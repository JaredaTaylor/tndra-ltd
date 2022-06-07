import { createContext, useState, useEffect } from "react";
//import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocs } from "../utils/firebase/firebase.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocs();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();

    }, []);

    /*
    useEffect(() => {
        addCollectionAndDocs('categories', SHOP_DATA);
    }, [])
    */
    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    );
};