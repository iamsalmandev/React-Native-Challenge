import 'react-native';

import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';

import { Example } from './';

afterEach(cleanup);

describe('Example Component tests', () => {
    it('Renders correctly', async () => {
        render(<Example />);
        expect(screen.getByText('Hello, we made it!')).toBeTruthy();
        expect(screen.getByText('Clicked 0 times')).toBeTruthy();
    });

    it('Button is triggered', async () => {
        const onPressMock = jest.fn();

        render(<Example onPress={onPressMock} />);

        const button = screen.getByText('Clicked 0 times', { exact: false });
        expect(button).toBeTruthy();

        fireEvent.press(button);
        expect(screen.getByText('Clicked 1 times', { exact: false })).toBeTruthy();

        fireEvent.press(button);
        expect(screen.getByText('Clicked 2 times', { exact: false })).toBeTruthy();

        expect(onPressMock).toHaveBeenCalledTimes(2);
    });
});
