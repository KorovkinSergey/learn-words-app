import React from 'react'
import Box from '@mui/material/Box'
import { Avatar, Button, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuthContext } from '../../context/AuthContext'

const HomePage = () => {
  const { data, logout } = useAuthContext()

  console.log('data', data)
  console.log('data', data)
  const { user } = data || {}
  const { name, achievements } = user || {}
  return (
    <Box sx={{
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
    }}>
      <Button
        onClick={logout}
        variant="contained"
        color="primary"
        sx={{
        position: 'absolute',
        backgroundColor: 'secondary.main',
        top: 10,
        right: 10,
      }}>Выход</Button>
      <Avatar>
        <AccountCircleIcon/>
      </Avatar>
      <Typography sx={{ fontSize: 18, margin: 2 }} color="primary.contrastText">
        {name || ''}
      </Typography>

      <Box sx={{ margin: 2 }}>
        <Typography sx={{ fontSize: 18 }} color="primary.contrastText">
          Слов выучено {achievements?.wordsLearned || 0}
        </Typography>
      </Box>

      <Box sx={{ margin: 2 }}>
        <Typography sx={{ fontSize: 18 }} color="primary.contrastText">
          Слов на повторении {achievements?.wordsOnRepeat || 0}
        </Typography>
      </Box>

    </Box>
  )
}

export default HomePage
