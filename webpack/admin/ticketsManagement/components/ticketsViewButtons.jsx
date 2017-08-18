import React from 'react'
import FlatButton from 'material-ui/FlatButton'

class TicketsViewButtons extends React.Component {
  render() {
    return(
        <div>
          <FlatButton
            label="Preview"
            primary={this.props.showTable}
            disabled={!this.props.showTable}
            style={{width:90}}
            onTouchTap={this.props.toggleTable} />
          <FlatButton
            label="Table"
            primary={!this.props.showTable}
            disabled={this.props.showTable}
            style={{width:90}}
            onTouchTap={this.props.toggleTable} />
        </div>
    )
  }
}

export default TicketsViewButtons
