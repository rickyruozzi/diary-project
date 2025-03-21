import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for navigation


import TestPage from './TestPage'; // Correct path to TestPage component


import diaryLogo from './assets/diary.png';
import './App.css';
import IconMenu from './IconMenu'; // Import IconMenu
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const Navigate=useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  // function handleIconClick(){
  //   Navigate('http://localhost:8000/test'); // Navigate to the test endpoint on port 8000

  // }

  const [diaryEntry, setDiaryEntry] = useState(''); // State for diary entry
  const [date, setDate] = useState(''); // State for date

  const handleFetch = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetch('http://localhost:8000/submit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry: diaryEntry, date: date }), // Send the diary entry and date to the backend
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <>
      <div>
        <img src={diaryLogo} alt="Logo" className='logo'/>
      </div>
      <div>
        <h2>Personal Diary</h2>
      </div>
      <div className="card">
        <form onSubmit={handleFetch}>
          <label>Scrivi qui il tuo resoconto:</label>
          <textarea 
            className='TextArea' 
            placeholder='Scrivi qui il resoconto della giornata' 
            value={diaryEntry} // Bind the textarea to the state
            onChange={(e) => setDiaryEntry(e.target.value)} // Update state on change
          ></textarea>

          <br></br>
          <input 
            type='date' 
            placeholder='dd/mm/yy' 
            className='date' 
            value={date} // Bind the date input to the state
            onChange={(e) => setDate(e.target.value)} // Update state on change
          ></input>
          <br></br>
          <input type='submit' color='white' value='Invia'></input>
        </form>
      </div>
      <button onClick={handleMenuToggle} className="dropdown-button">•••</button> {/* Button with three dots */}
      {isMenuOpen && <IconMenu />} {/* Render the IconMenu when the button is clicked */}
    </>
  );
}

export default App;
