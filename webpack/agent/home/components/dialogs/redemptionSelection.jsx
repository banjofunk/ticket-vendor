import React from 'react'
import Dialog from 'material-ui/Dialog'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * RedemptionSelection
 */
export class RedemptionSelection extends React.Component {
  render() {

    let tableRows = []
    for (var i = 0; i < this.props.redemptions.length; i++) {
      const redemption = this.props.redemptions[i]
      tableRows.push(
        <TableRow key={`rsel-${redemption.id}`} selectable={false}>
          <TableRowColumn style={{width:180, verticalAlign:'middle'}}>
            <span>{redemption.affiliate}</span>
          </TableRowColumn>
          <TableRowColumn style={{width:300, verticalAlign:'middle'}}>
            <span style={{whiteSpace:'pre-wrap'}}>
              {redemption.description}
            </span>
          </TableRowColumn>
          <TableRowColumn style={{verticalAlign:'middle'}}>
            <RaisedButton
              label={'Select'}
              primary={true}
              labelStyle={{color:'white'}}
              onTouchTap={()=>this.props.selectRedemption(redemption)} />
          </TableRowColumn>
        </TableRow>
      )
    }
    return (
      <Dialog
        modal={false}
        open={this.props.showRedemptionSelection}
        autoScrollBodyContent={true}
        title='Select Redemption'
        onRequestClose={this.props.closeDialog}>
        <Table style={{margin:'0 auto'}}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn style={{width:180, verticalAlign:'middle'}}>Attraction</TableHeaderColumn>
              <TableHeaderColumn style={{width:300, verticalAlign:'middle'}}>Ticket</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody  displayRowCheckbox={false}>
            {tableRows}
          </TableBody>
        </Table>
      </Dialog>
    )
  }
}

export default RedemptionSelection
