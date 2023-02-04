import { useMolecules } from '@bambooapp/bamboo-molecules';
import type { FC } from 'react';
import { StyleSheet } from 'react-native';

import { CategoryDataForm } from '~/components/CategoryDataForm';
import type { CategoryMetaDataProps } from '~/components/CategoryMetaDataForm';

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        marginBottom: 'spacings.2',
    },
    view: {
        padding: 'spacings.8',
    },
});

export const DashboardScreen: FC<{
    categories: CategoryMetaDataProps[];
}> = ({ categories, ...props }) => {
    const { Button, Text, View } = useMolecules();

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Dashboard!</Text>
            {categories.map(category => (
                <CategoryDataForm {...category} />
            ))}
            <Button variant="contained" {...props}>
                <Text>{`Add new Item`}</Text>
            </Button>
        </View>
    );
};
