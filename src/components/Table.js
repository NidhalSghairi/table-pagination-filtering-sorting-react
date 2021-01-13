import React from 'react'

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

export default Table
