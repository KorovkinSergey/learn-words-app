import React, { FC, memo } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

interface IProps {
	label: string
	count: string | number
	countColor: string
}

const UserAchievements: FC<IProps> = ({ label, count = 0, countColor = 'common.white' }) => {
	return (
		<Box sx={{ marginTop: 1 }}>
			<Typography sx={{ fontSize: 24 }} color='primary.contrastText'>
				{label}:{' '}
				<Typography
					sx={{
						fontSize: 32,
						display: 'inline',
					}}
					color={countColor}
					component='span'
				>
					{count}
				</Typography>
			</Typography>
		</Box>
	)
}

export default memo(UserAchievements)
