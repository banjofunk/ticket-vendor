import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

/**
 * PromotionsTable
 */
export class PromotionsTable extends React.Component {
  render() {
    return (
      <Table style={{width:950, margin:'0 auto'}}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow selectable={false}>
            <TableHeaderColumn style={{width:200, verticalAlign:'middle'}}>Attraction</TableHeaderColumn>
            <TableHeaderColumn style={{width:350, verticalAlign:'middle'}}>Ticket</TableHeaderColumn>
            <TableHeaderColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>Price</TableHeaderColumn>
            <TableHeaderColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>Tax</TableHeaderColumn>
            <TableHeaderColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>Total</TableHeaderColumn>
            <TableHeaderColumn style={{width:80, textAlign:'center', verticalAlign:'middle'}}>QTY</TableHeaderColumn>
            <TableHeaderColumn style={{width:80, verticalAlign:'middle'}}></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody  displayRowCheckbox={false}>
          {this.props.children}
        </TableBody>
      </Table>
    )
  }
}

export default PromotionsTable
