import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

const Greeting = ({ name }) => (
  <View>
    <Text>Hello {name}!</Text>
  </View>
);

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    render(<Greeting name="Kalle" />);
    screen.debug(); // Logs the React tree
    expect(screen.getByText('Hello Kalle!')).toBeDefined();
  });
});
