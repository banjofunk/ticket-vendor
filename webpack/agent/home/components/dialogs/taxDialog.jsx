import React from 'react'
import Dialog from 'material-ui/Dialog'

/**
 * TaxDialog
 */
export class TaxDialog extends React.Component {
  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.showDialog}
        autoScrollBodyContent={true}
        title='Tax Summary'
        onRequestClose={this.props.closeDialog}>
        <br />
        {this.props.children}
      </Dialog>
    )
  }
}

export default TaxDialog
