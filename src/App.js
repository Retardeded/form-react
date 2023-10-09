import React, { useState } from 'react';
import './App.css';
import Question from './Question';
import axios from 'axios';

function App() {
  const questionLabels = [
    'WHO ARE YOUR CUSTOMERS?',
    'ARE THERE ANY SPECIAL REQUIREMENTS LIKE TECHNOLOGY, LOCATION, ETC?',
    'WHAT TYPES OF CUSTOMERS SHOULD BE EXCLUDED?',
    'WHAT ARE THE POSITIONS OF YOUR PROSPECTS?',
  ];

  const [questions, setQuestions] = useState(['', '', '', '']);

  const backendURL = 'http://localhost:3001';
  const submitURL = `${backendURL}/api/submit`;

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        [questionLabels[0]]: questions[0],
        [questionLabels[1]]: questions[1],
        [questionLabels[2]]: questions[2],
        [questionLabels[3]]: questions[3],
      };

      const response = await axios.post(submitURL, formData);

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="main-header">
        <h1>WHAT IS YOUR</h1>
        <h1>AUDIENCE ?</h1>
      </div>
      <form className="questions-form" onSubmit={handleSubmit}>
        {questionLabels.map((label, index) => (
          <Question
            key={index}
            label={label}
            value={questions[index]}
            onChange={(value) => handleQuestionChange(index, value)}
          />
        ))}
        <div className="form-group">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default App;