// Button.stories.ts|tsx
import { expect } from '@storybook/jest';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { Example } from '~/screens/Example';

export default {
    title: 'Button',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = props => <Example {...props} />;
Default.parameters = {
    controls: { exclude: /^on*/ },
    docs: {
        source: {
            code: `
    const App = () => {
        const {Button, Text} = useMolecules();

        return <Button><Text>Hello World</Text></Button>
    }

    export default App;
                `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Interaction: ComponentStory<typeof Example> = props => <Example {...props} />;
Interaction.parameters = {
    controls: { exclude: /^on*/ },
};
Interaction.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText('Clicked 0 times');
    // click interaction test with active prop

    await userEvent.click(button);
    expect(await canvas.getByText('Clicked 1 times')).toBeTruthy();

    await userEvent.click(button);
    expect(await canvas.getByText('Clicked 2 times')).toBeTruthy();
};
