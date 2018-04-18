import React from 'react'
import { Spinner, Intent } from "@blueprintjs/core"
import AttractionRow from './attractionRow'
import NewAttractionRow from './newAttractionRow'


const AttractionsTable = ({attractions, deleteAttraction, fetching, toggleActive}) => {
  if(fetching){
    return(<Spinner className={'spinner'} intent={Intent.PRIMARY} />)
  }
  const attractionRows = attractions.map( (attraction, idx) =>
    <AttractionRow
      key={idx}
      deleteAttraction={deleteAttraction}
      toggleActive={toggleActive}
      attraction={attraction} />
  )

  return (
    <table className={'pt-table pt-striped pt-condensed'}>
      <thead>
        <tr>
          <th>id</th>
          <th>logo</th>
          <th>name</th>
          <th>promotions</th>
          <th>active</th>
          <th>edit</th>
        </tr>
      </thead>
      <tbody>
        {attractionRows}
        <NewAttractionRow />
      </tbody>
    </table>
  )
}

export default AttractionsTable
