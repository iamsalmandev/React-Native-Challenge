import { ProvideMolecules } from '@bambooapp/bamboo-molecules';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CategoriesMetaDataProvider } from '~/components/CategoriesMetaDataProvider';
import { CategoriesProvider } from '~/components/CategoriesProvider';
import { NavigationContainer } from '~/Navigation';

export default function () {
    return (
        <CategoriesMetaDataProvider>
            <CategoriesProvider>
                <SafeAreaProvider>
                    <ProvideMolecules>
                        <NavigationContainer />
                    </ProvideMolecules>
                </SafeAreaProvider>
            </CategoriesProvider>
        </CategoriesMetaDataProvider>
    );
}
