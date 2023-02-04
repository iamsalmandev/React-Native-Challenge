import { useMolecules } from '@bambooapp/bamboo-molecules';
import AsyncStorage from '@react-native-community/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { ComplexField } from './ComplexField';
import type { FieldType } from './Field';
// @TODO wip this would be a CategoryDataForm, will be responsible for showing/receving data from user
const styles = StyleSheet.create({
    view: {
        maxWidth: '48%',
        width: '100%',
    },
    buttonView: {
        flexDirection: 'row',
    },
});

export interface CategoryDataProps {
    id: string;
    name: string;
    fields: string[];
}
export const CategoryDataForm: React.FC<CategoryDataProps> = ({ id }) => {
    const [category, setCategory] = useState<CategoryDataProps | null>(null);
    const { Button, View } = useMolecules();

    const fetchCategory = useCallback(async () => {
        if (id) {
            const category_ = await AsyncStorage.getItem(id);
            if (category_) {
                const categoryParsed: CategoryDataProps = JSON.parse(category_);
                setCategory(categoryParsed);
            }
        }
    }, [id]);

    useEffect(() => {
        fetchCategory();
    }, [id, fetchCategory]);

    return (
        category && (
            <View style={styles.view}>
                <Text>{category.name}</Text>
                {category.fields.map(fieldId => (
                    <ComplexField id={fieldId} />
                ))}
                <View style={styles.buttonView}>
                    <Button onPress={() => {}}>Remove</Button>
                </View>
            </View>
        )
    );
};
