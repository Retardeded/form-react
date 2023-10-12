import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import App from '../src/App';


test('renders the App component', () => {
  render(<App />);
  // You can add assertions here to check for specific elements or text in the rendered component.
  // For example, to check if the main header exists:
  const firstQuestion = screen.getByText('WHO ARE YOUR CUSTOMERS?');
  expect(firstQuestion).toBeInTheDocument();
});

test('handles input changes correctly', () => {
  render(<App />);
  
  // Assuming your "Question" component renders input fields
  const inputFields = screen.getAllByRole('textbox');

  // Simulate user input by changing the values of the input fields
  inputFields.forEach((input, index) => {
    fireEvent.change(input, { target: { value: `New Value ${index}` } });
  });

  // Now, you can assert that the state has been updated correctly
  const updatedValues = inputFields.map((input) => input.value);
  const expectedValues = ['New Value 0', 'New Value 1', 'New Value 2', 'New Value 3'];
  expect(updatedValues).toEqual(expectedValues);
});

test('clicking submit button invokes the handleSubmit function', async () => {
  // Render your component without passing handleSubmitMock
  render(<App />);

  const submitButton = screen.getByText('SUBMIT');
  fireEvent.click(submitButton);

  const clickedElement = screen.getByText('Clicked');
  expect(clickedElement).toBeInTheDocument();

});

jest.mock('axios'); // Mock the axios library

test('clicking submit button invokes the handleSubmit function and shows "Data saved successfully"', async () => {
  // Mock the Axios response
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      message: 'Data saved successfully',
    },
  });

  render(<App />);

  const submitButton = screen.getByText('SUBMIT');
  
  // Wrap the state update within act
  act(() => {
    fireEvent.click(submitButton);
  });

  // Use waitFor to wait for the element
  await waitFor(() => {
    const successMessageElement = screen.getByText('Data saved successfully');
    expect(successMessageElement).toBeInTheDocument();
  });
});