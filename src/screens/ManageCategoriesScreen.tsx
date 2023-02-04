import { useMolecules } from '@bambooapp/bamboo-molecules';
import { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { CategoryMetaDetaForm } from '~/components/CategoryMetaDataForm';
import { useCategoriesMetaData } from '~/hooks/useCategoriesMetaData';
const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    text: {
        alignSelf: 'center',
        marginBottom: 'spacings.2',
    },
});

export const ManageCategoriesScreen: FC<{}> = () => {
    const { Button, Text, View } = useMolecules();
    const { categoriesMetaData, addNewCategory } = useCategoriesMetaData();

    const handlePress = useCallback(() => {
        addNewCategory();
    }, [addNewCategory]);

    return (
        <View>
            <View style={styles.view}>
                {categoriesMetaData.length ? (
                    categoriesMetaData.map(id => <CategoryMetaDetaForm id={id} />)
                ) : (
                    <>No Category found</>
                )}
            </View>
            <Button variant="contained" onPress={handlePress}>
                <Text>Add a Category </Text>
            </Button>
        </View>
    );
};
