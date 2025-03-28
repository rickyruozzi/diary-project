import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useNavigate } from 'react-router-dom';

export default function IconMenu() {
  const navigate = useNavigate(); // Initialize navigate for navigation

const handleCheckReviews= ()=>{
  navigate('/CheckReviews');
}

const handleDeleteReview= ()=>{
  navigate('/DeleteReview');
}

  const handleApiInfoClick = () => {
    window.open('http://localhost:8000/docs', '_blank'); // Open API documentation in a new tab
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%', backgroundColor: 'gray', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MenuList>
        <MenuItem onClick={handleDeleteReview} sx={{ justifyContent: 'center' }}>
          <ListItemText>Delete review</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCheckReviews} sx={{ justifyContent: 'center' }}>
          <ListItemText>Check Reviews</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleApiInfoClick} sx={{ justifyContent: 'center' }}>
          <ListItemText>Api info</ListItemText>
        </MenuItem>
      </MenuList>

    </Paper>
  );
}
