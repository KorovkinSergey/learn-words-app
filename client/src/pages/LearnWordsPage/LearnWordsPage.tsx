import React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useLearnWords } from '../../hooks/useLearnWords'
import { Loading } from '../../components/Loading'

function LearnWordsPage() {
	const { loading, isLoading, word, index } = useLearnWords()

	if (loading || isLoading) return <Loading />

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flex: '1 1 auto', padding: 4 }}>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
				}}
			>
				<Box sx={{ position: 'absolute', top: 2, right: 2 }}>
					<Typography sx={{ fontSize: 18, margin: 2 }} color='primary.contrastText'>
						Слово № {index}
					</Typography>
				</Box>
				<Typography sx={{ fontSize: 40, margin: 2 }} color='primary.contrastText'>
					{word?.russian}
				</Typography>
				<Typography sx={{ fontSize: 40, margin: 2 }} color='primary.contrastText'>
					{word?.transcript}
				</Typography>
				<Typography sx={{ fontSize: 40, margin: 2 }} color='primary.contrastText'>
					{word?.english}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						mt: 4,
						minWidth: '300px',
						justifyContent: 'space-between',
					}}
				></Box>
			</Box>
		</Box>
	)
}

export default LearnWordsPage
