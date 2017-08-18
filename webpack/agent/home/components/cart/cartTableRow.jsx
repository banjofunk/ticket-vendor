import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * CartTableRow
 */
export class CartTableRow extends React.Component {
  render() {
    const promotionQty = this.props.cartPromotion ? this.props.cartPromotion.qty : 1
    const promotionTax =
      (this.props.promotion.tax_total * promotionQty).
        toFixed(2).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    const promotionTotal =
      ((this.props.promotion.discounted + this.props.promotion.tax_total) * promotionQty).
        toFixed(2).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

    return (
      <TableRow selectable={false}>
        <TableRowColumn style={{width:200, verticalAlign:'middle'}}>
          <span>{this.props.promotion.affiliate}</span>
        </TableRowColumn>
        <TableRowColumn style={{width:350, verticalAlign:'middle'}}>
          <span style={{whiteSpace:'pre-wrap'}}>
            {this.props.promotion.shortDescription}
          </span>
        </TableRowColumn>
        <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          {`$${this.props.promotion.discounted.toFixed(2)}`}
        </TableRowColumn>
        <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          <span
            style={{color:'blue', cursor:'pointer'}}
            onTouchTap={()=>this.props.showTax(this.props.promotion.tax_summary)}
            title={this.props.promotion.tax_summary.join('\n')}>
            {`$${promotionTax}`}
          </span>
        </TableRowColumn>
        <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          {`$${promotionTotal}`}
        </TableRowColumn>
        <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
          <TextField
            id={`qty-${this.props.promotion.id}`}
            inputStyle={{textAlign:'center'}}
            style={{width:'100%'}}
            onBlur={(event)=>this.props.updateQty(event, this.props.promotion.id)}
            onChange={this.props.changeTmpQty}
            value={promotionQty.toString()} />
        </TableRowColumn>
        <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
          <div>
            <RaisedButton
              label={'Remove'}
              secondary={true}
              onTouchTap={()=>this.props.removeFromCart(this.props.promotion.id)} />
          </div>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default CartTableRow
