import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TicketPreview from './ticketPreview'
import TicketForm from './ticketForm'

class TicketDialogs extends React.Component {
  render() {
    return(
      <div>
        <Dialog
          title="Ticket Preview"
          actions={
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={this.props.toggleTicketPreview} />
          }
          modal={false}
          open={this.props.showTicketPreview}
          onRequestClose={this.props.toggleTicketPreview}
          contentStyle={{width:'90%', maxWidth:'none'}}
          autoScrollBodyContent={true} >
          <TicketPreview
            viewport={this.props.viewport}
            toggleMorePromotion={this.props.toggleMorePromotion}
            showMorePromotion={this.props.showMorePromotion}
            ticket={this.props.ticket} />
        </Dialog>
        <Dialog
          title="Ticket Form"
          modal={false}
          open={this.props.showTicketForm}
          onRequestClose={this.props.toggleTicketForm}
          contentStyle={{width:'90%', maxWidth:'none'}}
          autoScrollBodyContent={true} >
          <TicketForm
            ref='ticketsForm'
            allTaxes={this.props.allTaxes}
            createTax={this.props.createTax}
            toggleTax={this.props.toggleTax}
            ticket={this.props.ticket}
            affiliates={this.props.affiliates}
            affiliate={this.props.affiliate}
            forAffiliate={this.props.forAffiliate}
            promoImages={this.props.promoImages}
            onUploadFinish={this.props.onUploadFinish}
            updateLayout={this.props.updateLayout}
            updateSymbology={this.props.updateSymbology}
            handleBackgroundUpload={this.props.handleBackgroundUpload}
            submitTicketForm={this.props.submitTicketForm}
            toggleTicketForm={this.props.toggleTicketForm} />
        </Dialog>
      </div>
    )
  }
}

export default TicketDialogs
