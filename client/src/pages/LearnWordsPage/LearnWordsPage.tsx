import React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'


function LearnWordsPage() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flex: '1 1 auto', padding: 4 }}>
      <Typography sx={{ fontSize: 18 }} color="primary.contrastText">
        Настройки для изучения слов
      </Typography>
    </Box>
  )
}

export default LearnWordsPage
