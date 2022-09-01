import React, { useEffect, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import { useDictionaryWords } from '../../hooks/api/useDictionaryWords'
import { useWindowSizeContext } from '../../context/WindowSizeContext'
import { Loading } from '../Loading'

const WordsTable = () => {
  const { getDictionaryWords, loading } = useDictionaryWords()
  const { height } = useWindowSizeContext()
  const params = useParams()
  const navigate = useNavigate()
  const { dictionary } = params

  const [rows, setRows] = useState([])

  useEffect(() => {
    if (!dictionary) return navigate('/dictionary')
    console.log('dictionary', dictionary)
    getDictionaryWords(dictionary).then((res: any) => setRows(res.words))
  }, [dictionary, navigate, getDictionaryWords])

  if (loading) return <Loading/>

  return (
    <Box sx={{
      width: '100%',
    }}>
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ height: height - 56 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/*{['Перевод', 'Слово', 'Транскрипция'].map(word => {*/}
                {/*  <TableCell sx={{color: 'secondary.contrastText'}} align="center">{word}</TableCell>*/}
                {/*})}*/}
                <TableCell align="center">Перевод</TableCell>
                <TableCell align="center">Слово</TableCell>
                <TableCell align="center">Транскрипция</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow key={row._id}>
                  <TableCell align="center">{row.russian}</TableCell>
                  <TableCell align="center">{row.english}</TableCell>
                  <TableCell align="center">{row.transcript}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default WordsTable
