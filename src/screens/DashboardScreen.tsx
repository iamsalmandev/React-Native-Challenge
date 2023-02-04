import { ButtonProps, useMolecules } from '@bambooapp/bamboo-molecules';
import { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        marginBottom: 'spacings.2',
    },
    view: {
        padding: 'spacings.8',
    },
});

export const DashboardScreen: FC<Omit<ButtonProps, 'children'>> = ({ onPress, ...props }) => {
    const { Button, Text, View } = useMolecules();
    const [counter, setCounter] = useState(0);

    const handlePress = useCallback(() => {
        onPress?.();
        setCounter(x => x + 1);
    }, [onPress, setCounter]);

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Dashboard!</Text>
            <Button variant="contained" {...props} onPress={handlePress}>
                <Text>{`Clicked ${counter} times`}</Text>
            </Button>
        </View>
    );
};
