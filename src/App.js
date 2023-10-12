import React, { useState } from 'react';
import './App.css';
import Question from './Question';
import axios from 'axios';
import ServerMessage from './ServerMessage';

function App() {
  const questionLabels = [
    'WHO ARE YOUR CUSTOMERS?',
    'ARE THERE ANY SPECIAL REQUIREMENTS LIKE TECHNOLOGY, LOCATION, ETC?',
    'WHAT TYPES OF CUSTOMERS SHOULD BE EXCLUDED?',
    'WHAT ARE THE POSITIONS OF YOUR PROSPECTS?',
  ];

  const [questions, setQuestions] = useState(['', '', '', '']);

  const [serverMessage, setServerMessage] = useState('');
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const submitPath = process.env.REACT_APP_API_SUBMIT_PATH;
  const submitURL = `${backendURL}${submitPath}`;

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Clicked')
    setServerMessage('Clicked');

    try {
      const formData = {
        [questionLabels[0]]: questions[0],
        [questionLabels[1]]: questions[1],
        [questionLabels[2]]: questions[2],
        [questionLabels[3]]: questions[3],
      };
      
      const response = await axios.post(submitURL, formData);

      if (response.status === 200) {
        // The data was saved successfully
        console.log('handleSubmit is called with 200'); // Add this log
        console.log('Response from server:', response.data.message);
        setServerMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setServerMessage(error);
    }
  };

  return (
    <div className="container">
      <div className="main-header">
        <h1>WHAT IS YOUR</h1>
        <h1>AUDIENCE ?</h1>
      </div>
      <form className="questions-form">
        {questionLabels.map((label, index) => (
          <Question
            key={index}
            label={label}
            value={questions[index]}
            onChange={(value) => handleQuestionChange(index, value)}
          />
        ))}
        <div className="form-group">
          <button type="submit" onClick={handleSubmit}>SUBMIT</button>
        </div>
      </form>
      <ServerMessage message={serverMessage} />
    </div>
  );
}

export default App;