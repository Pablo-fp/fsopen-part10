import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn'; // Import the new testable container

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // 1. Create a mock function for the onSubmit handler
      const onSubmit = jest.fn();

      // 2. Render the component, passing the mock function as a prop
      render(<SignInContainer onSubmit={onSubmit} />);

      // You can use screen.debug() to see the rendered component tree
      // screen.debug();

      // 3. Simulate user input
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');

      // 4. Simulate a button press
      fireEvent.press(screen.getByTestId('submitButton'));

      // 5. Use waitFor to handle the asynchronous nature of Formik's submission
      await waitFor(() => {
        // Assert that onSubmit has been called once
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Assert that the first argument of the first call to onSubmit is the correct form values
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password'
        });
      });
    });
  });
});
