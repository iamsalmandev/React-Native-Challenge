import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { CategoryMetaDataProps } from '~/components/CategoryMetaDataForm';
import type { FieldProps } from '~/components/Field';

export const CATEGORIES_METADATA_STORAGE_KEY = 'CATEGORIES_METADATA_STORAGE_KEY';

export const CategoriesMetaDataContext = React.createContext<{
    categoriesMetaData: string[];
    addNewCategory: () => void;
    addNewField: (categoryId: string, type: FieldProps['type']) => void;
    removeCategory: (categoryId: string) => void;
    removeField: (categoryId: string, fieldId: string) => void;
    fetchCategoriesIds: () => void;
}>({
    categoriesMetaData: [],
    addNewCategory: () => undefined,
    addNewField: () => undefined,
    removeCategory: () => undefined,
    removeField: () => undefined,
    fetchCategoriesIds: () => undefined,
});

export const CategoriesMetaDataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [categoriesMetaData, setCategoriesMetaData] = useState<string[]>([]);
    useEffect(() => {
        fetchCategoriesIds();
    }, []);

    const fetchCategoriesIds = async () => {
        const categories = await AsyncStorage.getItem(CATEGORIES_METADATA_STORAGE_KEY);
        if (categories) {
            const categoriesParsed = JSON.parse(categories);
            setCategoriesMetaData(categoriesParsed);
        }
    };
    const addNewCategory = async () => {
        const STORAGE_ID = uuidv4();
        const newCategory: CategoryMetaDataProps = {
            id: STORAGE_ID,
            name: 'New Category',
            fields: [],
        };
        await AsyncStorage.setItem(STORAGE_ID, JSON.stringify(newCategory));
        const oldCategories = await AsyncStorage.getItem(CATEGORIES_METADATA_STORAGE_KEY);
        const updatedCategories: string[] = oldCategories ? JSON.parse(oldCategories) : [];
        updatedCategories.push(STORAGE_ID);
        await AsyncStorage.setItem(
            CATEGORIES_METADATA_STORAGE_KEY,
            JSON.stringify(updatedCategories),
        );
        setCategoriesMetaData(updatedCategories);
    };
    const addNewField = async (categoryId: string, type: FieldProps['type']) => {
        const STORAGE_ID = uuidv4();
        const newField: FieldProps = {
            type,
            id: STORAGE_ID,
            text: 'New Field',
            isTitle: false,
        };
        await AsyncStorage.setItem(STORAGE_ID, JSON.stringify(newField));
        const category = await AsyncStorage.getItem(categoryId);
        if (category) {
            const updatedCategory: CategoryMetaDataProps = JSON.parse(category);
            updatedCategory.fields.push(STORAGE_ID);
            await AsyncStorage.setItem(categoryId, JSON.stringify(updatedCategory));
        }
    };

    const removeCategory = async (categoryId: string) => {
        await AsyncStorage.removeItem(categoryId);
        const oldCategories = await AsyncStorage.getItem(CATEGORIES_METADATA_STORAGE_KEY);
        const updatedCategories: string[] = oldCategories ? JSON.parse(oldCategories) : [];
        await AsyncStorage.setItem(
            CATEGORIES_METADATA_STORAGE_KEY,
            JSON.stringify(updatedCategories.filter(id => id !== categoryId)),
        );
    };
    const removeField = async (categoryId: string, fieldId: string) => {
        await AsyncStorage.removeItem(fieldId);
        const category = await AsyncStorage.getItem(categoryId);
        const updatedCategory: CategoryMetaDataProps = category ? JSON.parse(category) : [];
        await AsyncStorage.setItem(
            categoryId,
            JSON.stringify(updatedCategory.fields.filter(id => id !== fieldId)),
        );
    };

    return (
        <CategoriesMetaDataContext.Provider
            value={{
                categoriesMetaData,
                addNewCategory,
                addNewField,
                removeCategory,
                removeField,
                fetchCategoriesIds,
            }}>
            {children}
        </CategoriesMetaDataContext.Provider>
    );
};
