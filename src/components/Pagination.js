import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
        <button key={number} onClick={() => paginate(number)}>{number}</button>
      ))}
    </Wrapper>
  )
}

Pagination.propTypes = {
  /**
   * the number of row per page
   */
  rowPerPage: PropTypes.number.isRequired,
  /**
   * the total number of rows
   */
  totalRows: PropTypes.number.isRequired,
  /**
   * a function triggered to change the page
   */
  paginate: PropTypes.func.isRequired

}
export default Pagination
