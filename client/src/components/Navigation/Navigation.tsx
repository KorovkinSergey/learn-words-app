import React, { memo, SyntheticEvent, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountCircle, Language, MenuBook } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'

const Navigation = () => {

	const navigate = useNavigate()

	const handleChange = useCallback((_: SyntheticEvent, newValue: string) => {
		navigate(newValue)
	}, [navigate])
	
	const navigation = useMemo(() => [
		{
			value: '/',
			label: 'Профиль',
			icon: <AccountCircle />,
		},
		{
			value: '/training',
			label: 'Тренировки',
			icon: <Language />,
		},
		{
			value: '/dictionary',
			label: 'Словарь',
			icon: <MenuBook />,
		},
	], [])

	return (
		<Box sx={{ width: '100%' }}>
			<BottomNavigation
				sx={{ backgroundColor: 'secondary.light' }}
				showLabels
				onChange={handleChange}
			>
				{navigation.map(({ value, label, icon }) =>
					<BottomNavigationAction
						sx={{ color: 'white' }}
						key={value}
						value={value}
						label={label}
						icon={icon}
					/>,
				)}
			</BottomNavigation>
		</Box>
	)
}

export default memo(Navigation)
