import React, { useState } from 'react';
import './App.css';
import Question from './Question.js';
import axios from 'axios';

function App() {
  const [audience, setAudience] = useState('');
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
        "WHO ARE YOUR CUSTOMERS?": questions[0],
        "ARE THERE ANY SPECIAL REQUIREMENTS LIKE TECHNOLOGY, LOCATION, ETC?": questions[1],
        "WHAT TYPES OF CUSTOMERS SHOULD BE EXCLUDED?": questions[2],
        "WHAT ARE THE POSITIONS OF YOUR PROSPECTS?": questions[3],
      };

      const response = await axios.post(`${submitURL}`, formData);

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className='main-header'>
        <h1>WHAT IS YOUR</h1>
        <h1>AUDIENCE?</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Question label="WHO ARE YOUR CUSTOMERS?" value={questions[0]} onChange={(value) => handleQuestionChange(0, value)} />
        <Question label="ARE THERE ANY SPECIAL REQUIREMENTS LIKE TECHNOLOGY, LOCATION, ETC?" value={questions[1]} onChange={(value) => handleQuestionChange(1, value)} />
        <Question label="WHAT TYPES OF CUSTOMERS SHOULD BE EXCLUDED?" value={questions[2]} onChange={(value) => handleQuestionChange(2, value)} />
        <Question label="WHAT ARE THE POSITIONS OF YOUR PROSPECTS?" value={questions[3]} onChange={(value) => handleQuestionChange(3, value)} />
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;