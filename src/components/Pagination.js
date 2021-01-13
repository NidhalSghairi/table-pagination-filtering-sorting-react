import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 20px auto;
  text-align: center;
`
const Pagination = ({ rowPerPage, totalRows, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalRows / rowPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Wrapper>
      {pageNumbers.map((number) => (
        <button onClick={() => paginate(number)}>{number}</button>
      ))}
    </Wrapper>
  )
}

export default Pagination
