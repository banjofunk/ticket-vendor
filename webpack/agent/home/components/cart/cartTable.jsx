import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

export class CartTable extends React.Component {
  render() {
    const showTxnFee = this.props.grandTotal !== "0.00"
    const disableCheckout = !showTxnFee && this.props.children.length === 0
    return (
      <div>
        <Table style={{width:970, margin:'0 auto'}}>
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

            {showTxnFee &&
              <TableRow selectable={false}>
                <TableRowColumn style={{width:200, verticalAlign:'middle'}}>
                </TableRowColumn>
                <TableRowColumn style={{width:350, verticalAlign:'middle'}}>
                </TableRowColumn>
                <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
                  <span style={{whiteSpace:'pre-wrap'}}>Transaction Fee</span>
                </TableRowColumn>
                <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
                  <span>$1.99</span>
                </TableRowColumn>
                <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
                  <span>$1.99</span>
                </TableRowColumn>
                <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
                </TableRowColumn>
                <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
                </TableRowColumn>
              </TableRow>
            }
            <TableRow selectable={false}>
              <TableRowColumn style={{width:200, verticalAlign:'middle'}}>
              </TableRowColumn>
              <TableRowColumn style={{width:350, verticalAlign:'middle'}}>
              </TableRowColumn>
              <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
              </TableRowColumn>
              <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
                <span>Total:</span>
              </TableRowColumn>
              <TableRowColumn style={{width:80, textAlign:'right', verticalAlign:'middle'}}>
                <span style={{fontSize:'16px', fontWeight:'bold'}}>${this.props.grandTotal}</span>
              </TableRowColumn>
              <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
              </TableRowColumn>
              <TableRowColumn style={{width:80, verticalAlign:'middle'}}>
                <div>
                  <RaisedButton
                    label={'Finish'}
                    primary={true}
                    disabled={disableCheckout}
                    labelStyle={{color:'white'}}
                    onTouchTap={()=>this.props.changeView('checkout')} />
                </div>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default CartTable
