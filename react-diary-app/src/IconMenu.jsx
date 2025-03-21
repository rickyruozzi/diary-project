import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link for navigation

export default function IconMenu() {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleApiInfoClick = () => {
    navigate('/api-docs'); // Navigate to API documentation
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%', backgroundColor: 'gray', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MenuList>
        <MenuItem sx={{ justifyContent: 'center' }}>
          <ListItemText>delete review</ListItemText>
        </MenuItem>
        <MenuItem sx={{ justifyContent: 'center' }}>
          <ListItemText>Check Reviews</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleApiInfoClick} sx={{ justifyContent: 'center' }}>
          <ListItemText>Api info</ListItemText>
        </MenuItem>
      </MenuList>
      <MenuItem sx={{ justifyContent: 'center', marginTop: 'auto' }} onClick={() => console.log('Menu opened')}>
        <Typography variant="h6">•••</Typography>
      </MenuItem>
    </Paper>
  );
}
