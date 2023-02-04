import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

import type { CategoryMetaDataProps } from '~/components/CategoryMetaDataForm';
import { useCategoriesMetaData } from '~/hooks/useCategoriesMetaData';
import { DashboardScreen } from '~/screens/DashboardScreen';
import { ManageCategoriesScreen } from '~/screens/ManageCategoriesScreen';
const Drawer = createDrawerNavigator();

export default function Navigator() {
    const { categoriesMetaData } = useCategoriesMetaData();
    const [categoriesMetaData_, setCategoriesMetaData_] = useState<CategoryMetaDataProps[]>([]);

    const fetchCategories = useCallback(async () => {
        const categoriesStrigified = await Promise.all(
            categoriesMetaData.map(categoryId => AsyncStorage.getItem(categoryId)),
        );
        if (categoriesStrigified) {
            const categoriesyParsed: CategoryMetaDataProps[] = categoriesStrigified.map(category =>
                category ? JSON.parse(category) : category,
            );
            setCategoriesMetaData_(categoriesyParsed);
        }
    }, [categoriesMetaData]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen
                    name={'dashboard'}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component={() => <DashboardScreen categories={categoriesMetaData_} />}
                />
                {categoriesMetaData_.map((category, idx) => (
                    <Drawer.Screen
                        name={category.name + ' ' + idx}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        component={() => <DashboardScreen categories={[category]} />}
                    />
                ))}
                <Drawer.Screen name="ManageCategories" component={ManageCategoriesScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
