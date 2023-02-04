import { useMolecules } from '@bambooapp/bamboo-molecules';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-picker/picker';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { useCategoriesMetaData } from '~/hooks/useCategoriesMetaData';

import { Field, FieldType } from './Field';

const styles = StyleSheet.create({
    view: {
        maxWidth: '48%',
        width: '100%',
    },
    buttonView: {
        flexDirection: 'row',
    },
});

export interface CategoryMetaDataProps {
    id: string;
    name: string;
    fields: string[];
}
export const CategoryMetaDetaForm: React.FC<{ id: string }> = ({ id }) => {
    const [val, setVal] = useState<string>('');
    const [type, setType] = useState<FieldType>(FieldType.TEXT);
    const [category, setCategory] = useState<CategoryMetaDataProps | null>(null);
    const { addNewField, removeCategory } = useCategoriesMetaData();
    const fetchCategory = useCallback(async () => {
        const category_ = await AsyncStorage.getItem(id);
        if (category_) {
            const categoryParsed: CategoryMetaDataProps = JSON.parse(category_);
            setCategory(categoryParsed);
            setVal(categoryParsed.name);
        }
    }, [id]);

    const { Button, View } = useMolecules();
    useEffect(() => {
        fetchCategory();
    }, [id, fetchCategory]);

    useEffect(() => {
        debounce(async () => {
            const updatedCategory = { ...category, name: val };
            await AsyncStorage.setItem(id, JSON.stringify(updatedCategory));
        })();
    }, [val, id, category]);

    return (
        category && (
            <View style={styles.view}>
                <TextInput value={val} onChangeText={setVal} />
                {category.fields.map(fieldId => (
                    <Field id={fieldId} />
                ))}
                <View style={styles.buttonView}>
                    <Picker
                        placeholder="Add new Field"
                        selectedValue={type}
                        onValueChange={async itemValue => {
                            setType(itemValue);
                            addNewField(category.id, FieldType[itemValue] as unknown as FieldType);
                            fetchCategory();
                        }}>
                        <Picker.Item label="TEXT" value={FieldType.TEXT} />
                        <Picker.Item label="CHECKBOX" value={FieldType.CHECKBOX} />
                        <Picker.Item label="NUMBER" value={FieldType.NUMBER} />
                        <Picker.Item label="DATE" value={FieldType.DATE} />
                    </Picker>

                    <Button
                        onPress={() => {
                            removeCategory(category.id);
                            setCategory(null);
                        }}>
                        Remove
                    </Button>
                </View>
            </View>
        )
    );
};
