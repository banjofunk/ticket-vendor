import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as bannerActions from '../../shared/actions'
import FlatButton from 'material-ui/FlatButton'
import SectionHeader from '../../../client/home/components/sectionHeader'
import { BannerManagement } from '../../shared'
import PromotionGrid from './promotionGrid'
import Promotion from '../../../client/home/components/promotion'
import PageDescription from './pageDescription'
import PageActionButtons from './pageActionButtons'
import AllTickets from './allTickets'
import TicketsViewButtons from './ticketsViewButtons'
import TicketDialogs from './ticketDialogs'

@connect((store) => {
  return {
    content: store.ticketsManagement.content,
    showSave: store.ticketsManagement.showSave,
    pageID: store.ticketsManagement.pageID,
    tickets: store.ticketsManagement.tickets,
    taxes: store.ticketsManagement.taxes,
    affiliates: store.ticketsManagement.affiliates,
    promoImages: store.ticketsManagement.promoImages,
    banners: store.adminShared.banners,
    viewport: store.adminLayout.viewport
  }
})
class TicketsManagement extends React.Component {
  constructor(props) {
    super(props)
    this._loadTicketsPage()
    this.state = {
      showTable: true,
      showTicketPreview: false,
      showTicketForm: false,
      showMorePromotion: false,
      promoTicket:{},
      ticket:{id:0}
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.tickets !== nextProps.tickets &&
      this.state.ticket){
      const ticketId = this.state.ticket.id
      let ticket = nextProps.tickets.find(
        function(ticket){
          return ticket.id === parseInt(ticketId)
        }
      )
      this.setState({ticket: ticket})
    }
  }

  _createTax = (taxData) => {
    this.props.dispatch(
      actions.createTax(taxData)
    )
  }

  _deleteInventory = (id) => {
    this.props.dispatch(
      actions.deleteInventory(id)
    )
  }

  _loadTicketsPage = () => {
    this.props.dispatch(actions.getPage('tickets'))
    this.props.dispatch(bannerActions.getAllBanners())
    this.props.dispatch(actions.getTickets())
    this.props.dispatch(actions.getAffiliates())
    this.props.dispatch(actions.getPromoImages())
    this.props.dispatch(bannerActions.hideBanners(true))
  }

  _updateMainText = (value) => {
    this.props.dispatch(
      actions.updateMainText(value.textarea)
    )
  }

  _toggleTable = () => {
    this.setState({showTable: !this.state.showTable})
  }

  _toggleTax = (ticketId, taxId, value) => {
    this.props.dispatch(
      actions.toggleTax(ticketId, taxId, value)
    )
  }

  _updateLayout = (id, layout) => {
    this.props.dispatch(
      actions.updateLayout(id, layout)
    )
  }

  _updateSymbology = (id, symbology) => {
    this.props.dispatch(
      actions.updateSymbology(id, symbology)
    )
  }

  _savePageContent = () => {
    this.props.dispatch(
      actions.savePageContent(this.props.pageID, this.props.content, this.props.banners)
    )
  }

  _cancelPageContent = () => {
    this._loadTicketsPage()
  }

  _showTicketPreview = (id) => {
    let ticket = this.props.tickets.find(
      function(ticket){
        return ticket.id === parseInt(id)
      }
    )
    this.setState({ticket: ticket, showTicketPreview: true})
  }

  _showTicketForm = (id) => {
    let ticket = this.props.tickets.find(
      function(ticket){
        return ticket.id === parseInt(id)
      }
    )
    this.setState({ticket: ticket, showTicketForm: true})
  }

  _newTicketForm = () => {
    const newTicket = {
      id:0,
      position:0,
      affiliate_id:0,
      affiliate:'',
      promoImg:'',
      title:'',
      subtitle:'',
      shortDescription:'',
      description:'',
      retail:'',
      discounted:''
    }
    this.setState({ticket: newTicket, showTicketForm: true})
  }

  _toggleTicketPreview = () => {
    this.setState({showTicketPreview: !this.state.showTicketPreview})
  }

  _toggleTicketForm = () => {
    this.setState({showTicketForm: !this.state.showTicketForm})
  }

  _submitTicketForm = (value) => {
    if(value.id === 0){
      this.props.dispatch(actions.createTicket(value))
    }else{
      this.props.dispatch(actions.updateTicket(value))
    }
    this.setState({showTicketForm: false})
  }

  _toggleMorePromotion = (id) => {
    let ticket = {}
    if(id){
      ticket = this.props.tickets.find(
        function(ticket){return ticket.id === parseInt(id)}
      )
    }
    this.setState({
      promoTicket:ticket,
      showMorePromotion: !this.state.showMorePromotion
    })
  }

  _toggleActivateRedemption = (event, checked, id) => {
    this.props.dispatch(
      actions.toggleActivateRedemption(id, checked)
    )
  }

  _toggleActivatePromotion = (event, checked, id) => {
    this.props.dispatch(
      actions.toggleActivatePromotion(id, checked)
    )
  }

  _toggleActivateCallCenter = (event, checked, id) => {
    this.props.dispatch(
      actions.toggleActivateCallCenter(id, checked)
    )
  }

  _handleFileUpload = (id, file) => {
    this.props.dispatch(
      actions.handleFileUpload(id, file)
    )
  }

  _handleBackgroundUpload = (id, file) => {
    this.props.dispatch(
      actions.handleBackgroundUpload(id, file)
    )
  }

  _onUploadFinish = (response) => {
    let url = response.signedUrl.split("?")[0]
    this.props.dispatch(
      actions.promoUploadFinished(url)
    )
  }

  render() {
    let small = (this.props.viewport.width < 480)
    let medium = (this.props.viewport.width >= 480 && this.props.viewport.width < 780)

    const style = {
      container: {
        width:'100%',
        maxWidth:'1100px',
        margin:'0 auto',
        textAlign:'center'
      },
      ccsLogo:{
        width:'200px',
        margin:'15px 0'
      },
      tickets:{
        width:'100%'
      },
      uploader: {
      	width: "0.1px",
      	height: "0.1px",
      	opacity: 0,
      	overflow: "hidden",
      	position: "absolute",
      	zIndex: -1,
      }
    }

    let ticketView = null
    if(this.state.showTable && this.props.tickets.length > 0){
      ticketView =
        <PromotionGrid
          handleFileUpload={this._handleFileUpload}
          showTicketPreview={this._showTicketPreview}
          newTicketForm={this._newTicketForm}
          showTicketForm={this._showTicketForm}
          toggleActivateCallCenter={this._toggleActivateCallCenter}
          toggleActivatePromotion={this._toggleActivatePromotion}
          toggleActivateRedemption={this._toggleActivateRedemption}
          deleteInventory={this._deleteInventory}
          taxes={this.props.taxes}
          tickets={this.props.tickets}
          affiliates={this.props.affiliates}
          promoImages={this.props.promoImages}
          viewport={{small:small, medium:medium}} />
    }else if(this.state.showMorePromotion){
      ticketView =
        <div style={style.container}>
          <Promotion
            key={`promotion-${this.state.promoTicket.id}`}
            toggleMorePromotion={this._toggleMorePromotion}
            showMorePromotion={true}
            promotion={this.state.promoTicket} />
        </div>
    }else{
      ticketView =
        <div style={style.container}>
          <AllTickets
            tickets={this.props.tickets}
            ticket={this.state.promoTicket}
            toggleMorePromotion={this._toggleMorePromotion}
            showMorePromotion={this.state.showMorePromotion}
            small={small} />
        </div>
    }

    return(
      <div>
        <BannerManagement page='tickets' />
        <div style={style.container}>
          <SectionHeader sectionTitle={this.props.content.titleText} side='left' />
          <PageDescription
            updateMainText={this._updateMainText}
            mainText={this.props.content.mainText} />
          <TicketsViewButtons
            showTable={this.state.showTable}
            toggleTable={this._toggleTable} />
        </div>
        <div children={ticketView} />
        <div style={style.container}>
          <TicketDialogs
            ref='ticketDialogs'
            allTaxes={this.props.taxes}
            createTax={this._createTax}
            toggleTax={this._toggleTax}
            ticket={this.state.ticket}
            affiliates={this.props.affiliates}
            promoImages={this.props.promoImages}
            showTicketPreview={this.state.showTicketPreview}
            viewport={this.props.viewport}
            showTicketForm={this.state.showTicketForm}
            toggleMorePromotion={this._toggleMorePromotion}
            showMorePromotion={this.state.showMorePromotion}
            toggleTicketPreview={this._toggleTicketPreview}
            onUploadFinish={this._onUploadFinish}
            updateLayout={this._updateLayout}
            updateSymbology={this._updateSymbology}
            handleBackgroundUpload={this._handleBackgroundUpload}
            submitTicketForm={this._submitTicketForm}
            toggleTicketForm={this._toggleTicketForm} />
          <PageActionButtons
            showSave={this.props.showSave}
            cancelPageContent={this._cancelPageContent}
            savePageContent={this._savePageContent} />
          <img src='/assets/logo' style={{width:'200px', margin:'15px 0'}} />
        </div>
      </div>
    )
  }
}

export default TicketsManagement
