import React from 'react'
import Box from '@mui/material/Box'
import { Button, Slider, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSettingsSortNewWordsContext } from '../../context/SettingsSortNewWordsContext'

function SortNewWordsSettingsPage() {
	const navigate = useNavigate()
	const { timeToRemember, countWords, setCountWords, setTimeToRemember } = useSettingsSortNewWordsContext()

	const handleTimeToRemember = (event: Event, newValue: number | number[]) => setTimeToRemember(newValue as number)
	const handleCountWords = (event: Event, newValue: number | number[]) => setCountWords(newValue as number)
	const handleStartTraining = () => navigate('/training/new')

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'start',
			flex: '1 1 auto',
			paddingTop: 4,
			paddingLeft: 2,
			paddingRight: 2,
		}}>
			<Typography sx={{ fontSize: 18 }} color='primary.contrastText'>
				Настройки для изучения новых слов
			</Typography>

			<Box
				minWidth={300}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					marginTop: 2,
					'& > span': {
						display: 'flex',
						alignItems: 'center',
					},
				}}>
          <span>
            <Typography sx={{ fontSize: 14 }} color='primary.contrastText'>
              Время на вспоминание слова:
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: 2 }} color='primary.contrastText'>
              {timeToRemember}
            </Typography>
          </span>
				<Slider
					color='secondary'
					step={1}
					marks
					min={1}
					max={10}
					aria-label='Volume'
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
						alignItems: 'center',
					},
				}}>
          <span>
            <Typography sx={{ fontSize: 14 }} color='primary.contrastText'>
              Количество слов:
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: 2 }} color='primary.contrastText'>
              {countWords}
            </Typography>
          </span>
				<Slider
					color='secondary'
					step={5}
					marks
					min={5}
					max={1000}
					aria-label='Volume'
					value={countWords}
					onChange={handleCountWords}
				/>
			</Box>


			<Box sx={{ flex: '1 1 auto', width: '100%', display: 'flex', alignItems: 'end', paddingBottom: 4 }}>
				<Button
					fullWidth
					variant='contained'
					onClick={handleStartTraining}
					sx={{
						backgroundColor: 'secondary.main',
					}}>
					Старт
				</Button>
			</Box>
		</Box>
	)
}

export default SortNewWordsSettingsPage
