import './App.css'
import { useState } from 'react'
import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Pagination from './components/Pagination'
import Table from './components/Table'

const GlobalWrapper = styled.div`
  width: 100%;
`
const AppWrapper = styled.div`
  align-items: center;
  width: 40%;
  margin: 60px auto 0 auto;
  display: block;
`
const Filters = styled.div`
  width: 50%;
  margin: auto;
  display: block;
  align-items: center;
`

const ScoreFilter = styled.div`
  margin: 20px auto;
  display: inline-block;
`
const Input = styled.input`
  width: 100px;
  height: 20px;
`
const SortByAvgScoreButton = styled(Button)`
  width: 300px;
  margin: 0 10px 500px 0;
`

const App = () => {
  /** the used data */
  const [data, setData] = useState()

  /** a comparator value used for filter */
  const [value, setValue] = useState(null)

  /** the operation used for filter */
  const [operation, setOperation] = useState('Equal')

  const [anchorEl, setAnchorEl] = React.useState(null)

  /** the current page */
  const [currentPage, setCurrentPage] = useState(1)

  /** a boolean use to sort row by average score */
  const [sortedByAvgScore, setSortedByAvgScore] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const sortByAvgScore = (data) => {
    data && data.sort((a, b) => (a.avgScore > b.avgScore ? -1 : 1))
    setData([...data])
  }

  const handleInputChange = (event) => {
    setValue(event.target.value)
    localStorage.setItem('value', event.target.value)
  }

  // Get current rows
  const rowPerPage = 10
  const indexOfLastRow = currentPage * rowPerPage
  const indexOfFirstRow = indexOfLastRow - rowPerPage
  const currentRows = data && data.slice(indexOfFirstRow, indexOfLastRow)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const getParticipants = () => {
    return Promise.resolve([
      { firstName: 'Peter', name: 'Tester', avgScore: 42 },
      { firstName: 'Emilie', name: 'Name1', avgScore: 18 },
      { firstName: 'Gauthier', name: 'Name2', avgScore: 42 },
      { firstName: 'Amilie', name: 'Name3', avgScore: 24 },
      { firstName: 'Romio', name: 'Name4', avgScore: 70 },
      { firstName: 'Julie', name: 'Name5', avgScore: 60 },
      { firstName: 'Benjamin', name: 'Name6', avgScore: 66 },
      { firstName: 'Alex', name: 'Name7', avgScore: 22 },
      { firstName: 'Nidhal', name: 'Name8', avgScore: 11 },
      { firstName: 'Macron', name: 'Name9', avgScore: 4 },
      { firstName: 'Pedro', name: 'Name10', avgScore: 2 },
      { firstName: 'Cristiano', name: 'Name11', avgScore: 100 },
      { firstName: 'messi', name: 'Name12', avgScore: 14 },
      { firstName: 'Frederick', name: 'Name13', avgScore: 8 },
      { firstName: 'kaka', name: 'Name14', avgScore: 16 },
      { firstName: 'Pyol', name: 'Name15', avgScore: 11 },
      { firstName: 'Adel', name: 'Name16', avgScore: 50 },
      { firstName: 'Ali', name: 'Name17', avgScore: 42 },
      { firstName: 'Laetitia', name: 'Name18', avgScore: 100 },
      { firstName: 'Nadege', name: 'Name19', avgScore: 80 },
      { firstName: 'Imen', name: 'Name20', avgScore: 0 },
    ])
  }

  React.useEffect(() => {
    getParticipants().then((initialData) => {
      if (localStorage.getItem('sortedByAvgScore')) {
        setSortedByAvgScore(true)
        sortByAvgScore(initialData)
      } else setData(initialData)
    })
    setValue(parseInt(localStorage.getItem('value')) || null)
    setOperation(localStorage.getItem('operation') || 'Equal')
  }, [])

  React.useEffect(() => {
    getParticipants().then((initialData) => {
      if (sortedByAvgScore) sortByAvgScore(initialData)
      if (value && operation === 'Equal')
        setData(initialData.filter((el) => el.avgScore == value))
      if (value && operation === 'Greater')
        setData(initialData.filter((el) => el.avgScore >= value))
      if (value && operation === 'Less')
        setData(initialData.filter((el) => el.avgScore <= value))
    })
  }, [value, operation, sortedByAvgScore])

  /** all possible operations */
  const operations = ['Equal', 'Greater', 'Less']

  return (
    <GlobalWrapper>
      <AppWrapper>
        <Filters>
          <SortByAvgScoreButton
            onClick={() => {
              sortByAvgScore(data)
              setSortedByAvgScore(true)
              localStorage.setItem('sortedByAvgScore', 'true')
            }}
            variant="contained"
            color="primary"
          >
            Sort By Average Score
          </SortByAvgScoreButton>
          <ScoreFilter>
            <Input
              type="number"
              id="tentacles"
              value={value || ''}
              name="tentacles"
              min="0"
              onChange={handleInputChange}
            />

            <Button onClick={handleClick}>{operation}</Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {operations.map((operation) => {
                return (
                  <MenuItem
                    key={operation}
                    onClick={() => {
                      handleClose()
                      setOperation(operation)
                      localStorage.setItem('operation', operation)
                    }}
                  >
                    {operation}
                  </MenuItem>
                )
              })}
            </Menu>
          </ScoreFilter>
        </Filters>
        {data && <Table data={currentRows} />}
        {data && (
          <Pagination
            rowPerPage={rowPerPage}
            totalRows={data.length}
            paginate={paginate}
          />
        )}
      </AppWrapper>
    </GlobalWrapper>
  )
}

export default App
