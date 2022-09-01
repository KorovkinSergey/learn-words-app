import React from 'react'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import CircularProgress from '@mui/material/CircularProgress'
import { useTrainingNewWords } from '../../hooks/useTrainingNewWords'
import { useNavigate } from 'react-router-dom'


const TrainingNewWordsPage = () => {
  const {
    loading,
    repeat,
    knowWords,
    handleIsKnow,
    handleIsNotKnow, saveLoading,
    word,
    index,
    clear,
    save
  } = useTrainingNewWords()
  const navigate = useNavigate()

  if (loading || saveLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <CircularProgress color="secondary"/>
      </Box>
    )
  }

  if (!loading && !word && !!index) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <Typography sx={{ fontSize: 18, margin: 2 }} color="primary.contrastText">
          Слова пройдены. {repeat.length} слов для изучения. {knowWords.length} слов знаешь.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            save().then(() => {
              navigate('/training')
            })
          }}
          sx={{ margin: 2, maxWidth: '250px', backgroundColor: 'secondary.main' }}>
          Перейти к тренировкам
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={clear}
          sx={{ margin: 2, maxWidth: '250px', backgroundColor: 'secondary.main' }}>
          Повторить
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 2,
        right: 2
      }}>
        <Typography sx={{ fontSize: 18, margin: 2 }} color="primary.contrastText">
          Слово № {index}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 40, margin: 2 }} color="primary.contrastText">
        {word?.english}
      </Typography>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 4,
        minWidth: '300px',
        justifyContent: 'space-between'
      }}>
        <Button
          size="large"
          variant="contained"
          startIcon={<DoneIcon/>}
          onClick={handleIsKnow}
          color="success">
          Знаю
        </Button>
        <Button
          size="large"
          variant="contained"
          startIcon={<ClearIcon/>}
          onClick={handleIsNotKnow}
          color="error">
          Не знаю
        </Button>
      </Box>
    </Box>
  )
}

export default TrainingNewWordsPage
