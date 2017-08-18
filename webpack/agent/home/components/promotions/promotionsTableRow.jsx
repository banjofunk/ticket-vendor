import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
/**
 * PromotionsTableRow
 */
export class PromotionsTableRow extends React.Component {
  render() {
    const { promotion, promotionQty } = this.props
    return (
      <TableRow selectable={false}>
        <TableRowColumn style={{width:200, verticalAlign:'middle'}}>
          <span>{promotion.affiliate}</span>
        </TableRowColumn>
        <TableRowColumn style={{width:350, verticalAlign:'middle'}}>
          <span>{promotion.shortDescription}</span>
        </TableRowColumn>
        <TableRowColumn  style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          <span>${promotion.discounted.toFixed(2)}</span>
        </TableRowColumn>
        <TableRowColumn  style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          <span
            style={{color:'blue', cursor:'pointer'}}
            onTouchTap={()=>this.props.showTax(promotion.tax_summary)}
            title={promotion.tax_summary.join('\n')}>
            ${promotion.tax_total.toFixed(2)}
          </span>
        </TableRowColumn>
        <TableRowColumn  style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
          <span>${(promotion.tax_total + promotion.discounted).toFixed(2)}</span>
        </TableRowColumn>
        <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
          <TextField
            id={`qty-${promotion.id}`}
            inputStyle={{textAlign:'center'}}
            style={{width:'100%'}}
            onChange={this.props.changePromotionQty}
            value={promotionQty.toString()} />
        </TableRowColumn>
        <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
          <div>
            <RaisedButton
              label={'Add'}
              primary={true}
              onTouchTap={()=>this.props.addToCart(promotion, promotionQty)} />
          </div>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default PromotionsTableRow
