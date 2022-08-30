import React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'


function TrainingRepeatWordsPage () {

 return (
  <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems: 'center',
      height: '100%'
  }}>
    <Typography sx={{ fontSize: 18 }} color="primary.contrastText">
      Настройки для изучения новых слов
    </Typography>
  </Box>
 )
}

export default TrainingRepeatWordsPage
