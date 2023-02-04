import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { DashboardScreen } from '~/screens/DashboardScreen';
import { ManageCategoriesScreen } from '~/screens/ManageCategoriesScreen';
const Drawer = createDrawerNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Dashboard" component={DashboardScreen} />
                <Drawer.Screen name="ManageCategories" component={ManageCategoriesScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
