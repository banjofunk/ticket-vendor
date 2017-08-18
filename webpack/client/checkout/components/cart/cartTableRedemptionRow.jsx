import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * CartTableRedemptionRow
 */
export class CartTableRedemptionRow extends React.Component {
  render() {
    return (
      <TableRow selectable={false}>
        <TableRowColumn style={{width:200, verticalAlign:'middle'}}>
          <span>{this.props.affiliate}</span>
        </TableRowColumn>
        <TableRowColumn style={{width:350, verticalAlign:'middle'}}>
          <span style={{whiteSpace:'pre-wrap'}}>
            {this.props.description}
          </span>
        </TableRowColumn>
        <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          {`Code:`}
        </TableRowColumn>
        <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          {`${this.props.code}`}
        </TableRowColumn>
        <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          {'$0.00'}
        </TableRowColumn>
        <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
          {`(was: ${this.props.price})`}
        </TableRowColumn>
        <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default CartTableRedemptionRow
