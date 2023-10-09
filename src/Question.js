import React from 'react';
import './Question.css';

function Question({ label, value, onChange }) {
  return (
    <div className="question">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Question;