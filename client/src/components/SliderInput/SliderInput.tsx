import React, { FC } from 'react'
import { Box, Slider, Typography } from '@mui/material'

interface IProps {
	title: string,
	value: number,
	onChange: (event: Event, newValue: number | number[]) => void,
	step: number,
	min: number,
	max: number,
}


const SliderInput: FC<IProps> = ({ title, value, onChange, step, min, max }) => {

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'start',
				marginTop: 2,
				width: '100%',
				'& > span': {
					display: 'flex',
					alignItems: 'center',
				},
			}}>
          <span>
            <Typography sx={{ fontSize: 14 }} color='primary.contrastText'>
              {title}:
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: 2 }} color='primary.contrastText'>
              {value}
            </Typography>
          </span>
			<Slider
				color='secondary'
				step={step}
				marks
				min={min}
				max={max}
				aria-label='Volume'
				value={value}
				onChange={onChange}
			/>
		</Box>
	)
}

export default SliderInput
