import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import App from '../src/App';


test('renders the App component', () => {
  render(<App />);
  const firstQuestion = screen.getByText('WHO ARE YOUR CUSTOMERS?');
  expect(firstQuestion).toBeInTheDocument();
});

test('handles input changes correctly', () => {
  render(<App />);
  
  const inputFields = screen.getAllByRole('textbox');

  inputFields.forEach((input, index) => {
    fireEvent.change(input, { target: { value: `New Value ${index}` } });
  });

  const updatedValues = inputFields.map((input) => input.value);
  const expectedValues = ['New Value 0', 'New Value 1', 'New Value 2', 'New Value 3'];
  expect(updatedValues).toEqual(expectedValues);
});

test('clicking submit button invokes the handleSubmit function', async () => {
  render(<App />);

  const submitButton = screen.getByText('SUBMIT');
  fireEvent.click(submitButton);

  const clickedElement = screen.getByText('Please fill in all questions before submitting.');
  expect(clickedElement).toBeInTheDocument();

});

jest.mock('axios'); // Mock the axios library

test('clicking submit button invokes the handleSubmit function and shows "Data saved successfully"', async () => {
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      message: 'Data saved successfully',
    },
  });

  render(<App />);

  const inputFields = screen.getAllByRole('textbox');

  inputFields.forEach((input, index) => {
    fireEvent.change(input, { target: { value: `New Value ${index}` } });
  });

  const submitButton = screen.getByText('SUBMIT');
  
  act(() => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    const successMessageElement = screen.getByText('Data saved successfully');
    expect(successMessageElement).toBeInTheDocument();
  });
});

test('clicking submit button shows "Response Error" message when a server error response is caught', async () => {
  axios.post.mockRejectedValue({ response: { status: 500 } });

  render(<App />);

  const inputFields = screen.getAllByRole('textbox');

  inputFields.forEach((input, index) => {
    fireEvent.change(input, { target: { value: `New Value ${index}` } });
  });

  const submitButton = screen.getByText('SUBMIT');
  
  act(() => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    const errorMessageElement = screen.getByText(text => text.includes('Response Error:'));
    expect(errorMessageElement).toBeInTheDocument();
  });
});

test('clicking submit button shows "Request Error" message when a request error is caught', async () => {
  axios.post.mockRejectedValue({ request: {} });

  render(<App />);

  const inputFields = screen.getAllByRole('textbox');

  inputFields.forEach((input, index) => {
    fireEvent.change(input, { target: { value: `New Value ${index}` } });
  });

  const submitButton = screen.getByText('SUBMIT');
  
  act(() => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    const errorMessageElement = screen.getByText(text => text.includes('Request Error:'));
    expect(errorMessageElement).toBeInTheDocument();
  });
});

test('clicking submit button shows error message when server returns an error', async () => {
  axios.post.mockRejectedValue(new Error('Server Error'));

  render(<App />);

  const inputFields = screen.getAllByRole('textbox');

  inputFields.forEach((input, index) => {
    fireEvent.change(input, { target: { value: `New Value ${index}` } });
  });

  const submitButton = screen.getByText('SUBMIT');
 
  act(() => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    const errorMessageElement = screen.getByText(text => text.includes('Error:'));
    expect(errorMessageElement).toBeInTheDocument();
  });
});
