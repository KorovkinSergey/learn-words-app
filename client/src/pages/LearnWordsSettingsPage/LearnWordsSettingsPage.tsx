import React, { ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import { Button, Input, Slider, Typography } from '@mui/material'
import { useSettingsLearnWords } from '../../hooks/useSettingsLearnWords'
import { useNavigate } from 'react-router-dom'


const LearnWordsSettingsPage = () => {
  const navigate = useNavigate()
  const {
    countWords,
    setCountWords,
    timeToRemember,
    setTimeToRemember,
    titleTable,
    setTitleTable
  } = useSettingsLearnWords()

  const handleTimeToRemember = (event: Event, newValue: number | number[]) => setTimeToRemember(newValue as number)
  const handleCountWords = (event: Event, newValue: number | number[]) => setCountWords(newValue as number)
  const handleTitleTable = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTable(event.target.value)
  }

  const handleStartTraining = () => {
    navigate('/training/learn')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flex: '1 1 auto', padding: 4 }}>
      <Box
        minWidth={300}
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 2
        }}>
        <Typography sx={{ fontSize: 16 }} color="primary.contrastText">
          Название словаря:
        </Typography>
        <Input
          color="primary"
          sx={{ color: 'primary.contrastText', ml: 2 }}
          size="medium"
          value={titleTable}
          onChange={handleTitleTable}
        />
      </Box>
      <Box
        minWidth={300}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginTop: 2,
          '& > span': {
            display: 'flex',
            alignItems: 'center'
          }
        }}>
          <span>
            <Typography sx={{ fontSize: 14, }} color="primary.contrastText">
              Время на запоминание слова:
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: 2 }} color="primary.contrastText">
              {timeToRemember}
            </Typography>
          </span>
        <Slider
          color="secondary"
          step={1}
          marks
          min={1}
          max={10}
          aria-label="Volume"
          value={timeToRemember}
          onChange={handleTimeToRemember}
        />
      </Box>

      <Box
        minWidth={300}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginTop: 2,
          '& > span': {
            display: 'flex',
            alignItems: 'center'
          }
        }}>
          <span>
            <Typography sx={{ fontSize: 14, }} color="primary.contrastText">
              Количество слов:
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: 2 }} color="primary.contrastText">
              {countWords}
            </Typography>
          </span>
        <Slider
          color="secondary"
          step={5}
          marks
          min={5}
          max={100}
          aria-label="Volume"
          value={countWords}
          onChange={handleCountWords}
        />
      </Box>


      <Box sx={{ flex: '1 1 auto', width: '100%', display: 'flex', alignItems: 'end' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleStartTraining}
          disabled={!titleTable}
          sx={{
            backgroundColor: 'secondary.main'
          }}>
          Старт
        </Button>
      </Box>
    </Box>
  )
}

export default LearnWordsSettingsPage
