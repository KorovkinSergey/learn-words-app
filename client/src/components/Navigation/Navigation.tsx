import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom'

export default function Navigation() {

  const navigate = useNavigate()
  return (
    <Box sx={{ width: "100%"}}>
      <BottomNavigation
        sx={{backgroundColor: 'secondary.light'}}
        showLabels
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
      >
        <BottomNavigationAction sx={{color: 'white'}} value='/' label="Профиль" icon={<AccountCircleIcon />} />
        <BottomNavigationAction sx={{color: 'white'}} value="/training" label="Тренировки" icon={<LanguageIcon />} />
        <BottomNavigationAction sx={{color: 'white'}} value="/dictionary" label="Словарь" icon={<MenuBookIcon />} />
      </BottomNavigation>
    </Box>
  );
}
