import React from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

const TrainingPage = () => {
  const navigate = useNavigate()

  const handleRepeatTraining = () => {
    navigate('/training/learn/setting')
  }
  const handleNewTraining = () => {
    navigate('/training/new/setting')
  }

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRepeatTraining}
        sx={{
          width: '250px',
          margin: 2,
          backgroundColor: 'secondary.main'
        }}>
        Тренировка слов
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewTraining}
        sx={{
          width: '250px',
          margin: 2,
          backgroundColor: 'secondary.main'
        }}>
        Тренировка новых слов
      </Button>
    </Box>
  )
}

export default TrainingPage
