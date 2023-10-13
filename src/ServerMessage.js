import React, { useState } from 'react';
import './ServerMessage.css';

function ServerMessage({ message }) {
  return ( 
  <div className="server-message">
    {message}
  </div>
  );
}

export default ServerMessage;