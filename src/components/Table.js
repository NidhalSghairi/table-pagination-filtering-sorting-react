import React from 'react'
import PropTypes from 'prop-types'
const Table = ({ data }) => {
  /** a function used to creates rows filled with the given data */
  const getRowsData = () => {
    var keys = ['firstName', 'name', 'avgScore']
    return data.map((row, index) => {
      return (
        <tr key={index}>
          {keys.map((key) => {
            return <td key={row[key]}>{row[key]}</td>
          })}
        </tr>
      )
    })
  }
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Average Score</th>
        </tr>
      </thead>
      <tbody>{getRowsData()}</tbody>
    </table>
  )
}

Table.propTypes = {
  /**
   * the used data
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      firstName : PropTypes.string,
      name : PropTypes.string,
      avgScore : PropTypes.number
    })
  )
}
export default Table
