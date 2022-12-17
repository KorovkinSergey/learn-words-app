import React from 'react'
import Box from '@mui/material/Box'
import { Button, Chip, Typography } from '@mui/material'
import { useAuthContext } from '../../context/AuthContext'
import UserAvatar from '../../components/UserAvatar/UserAvatar'
import { UserAchievements } from '../../components/UserAchievements'
import { Wrapper } from '../../components/Wrapper'

const HomePage = () => {
	const { data, logout } = useAuthContext()

	const { user } = data || {}
	const { name = '', achievements } = user || {}
	return (
		<Wrapper top>
			<Button
				onClick={logout}
				variant='contained'
				color='primary'
				sx={{
					position: 'absolute',
					backgroundColor: 'secondary.main',
					top: 10,
					right: 10,
				}}
			>
				Выход
			</Button>

			<Box
				sx={{
					marginTop: 5,
					marginLeft: 'auto',
					marginRight: 'auto',
					backgroundColor: 'primary.light',
					width: '80%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '20px',
					borderRadius: '24px',
				}}
			>
				<Chip
					avatar={<UserAvatar name={name} />}
					label={name}
					variant='filled'
					sx={{
						height: 50,
						color: 'primary.contrastText',
						fontSize: '2rem',
						bgcolor: 'transparent',
					}}
				/>
				<Typography sx={{ fontSize: 18, marginTop: 2 }} color='primary.contrastText'>
					E-mail: user@email.example
				</Typography>
			</Box>

			<UserAchievements countColor='common.white' label='Слов выучено' count={achievements?.wordsLearned || 0} />

			<UserAchievements countColor='common.black' label='Слов на повторении' count={achievements?.wordsOnRepeat || 0} />

			<UserAchievements countColor='common.black' label='Слов в словаре' count={achievements?.wordsOnRepeat || 0} />
		</Wrapper>
	)
}

export default HomePage
