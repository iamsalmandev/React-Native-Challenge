import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import type { FieldProps } from './Field';
// @TODO wip this would be a complexfield, will be responsible for gerating multiple type of fields depending on metadata
const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
    },
});

export const ComplexField: React.FC<{ id: FieldProps['id'] }> = ({ id }) => {
    const [val, setVal] = useState<string>('');
    const [field, setField] = useState<FieldProps | null>(null);

    useEffect(() => {
        (async () => {
            const field_ = await AsyncStorage.getItem(id);
            if (field_) {
                const fieldParsed: FieldProps = JSON.parse(field_);
                setField(fieldParsed);
                setVal(fieldParsed.text);
            }
        })();
    }, [id]);

    useEffect(() => {
        debounce(async () => {
            const updatedField = { ...field, text: val };
            await AsyncStorage.setItem(id, JSON.stringify(updatedField));
        }, 500)();
    }, [val, field, id]);

    return (
        field && (
            <View style={styles.view}>
                <TextInput value={val} onChangeText={setVal} />
                <Text>{field.type}</Text>
            </View>
        )
    );
};
