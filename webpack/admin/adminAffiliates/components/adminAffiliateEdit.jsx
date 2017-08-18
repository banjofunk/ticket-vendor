import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors';
import SectionHeader from '../../../client/home/components/sectionHeader'
import PromotionGrid from '../../ticketsManagement/components/promotionGrid'
import Promotion from '../../../client/home/components/promotion'
import AllTickets from '../../ticketsManagement/components/allTickets'
import TicketsViewButtons from '../../ticketsManagement/components/ticketsViewButtons'
import TicketDialogs from '../../ticketsManagement/components/ticketDialogs'

class AdminAffiliateEdit extends React.Component {
  constructor(props) {
    super(props)
    this._toggleTable = this._toggleTable.bind(this)
    this._toggleTicketPreview = this._toggleTicketPreview.bind(this)
    this._toggleTicketForm = this._toggleTicketForm.bind(this)
    this._submitTicketForm = this._submitTicketForm.bind(this)
    this._showTicketPreview = this._showTicketPreview.bind(this)
    this._showTicketForm = this._showTicketForm.bind(this)
    this._newTicketForm = this._newTicketForm.bind(this)
    this.state = {
      showTable: false,
      promotion:{},
      showTicketPreview: false,
      showMorePromotion: false,
      showTicketForm: false
    }
  }

  _toggleTable(){
    this.setState({showTable: !this.state.showTable})
  }

  _showTicketPreview(id){
    let promotion = this.props.promotions.find(
      function(promotion){
        return promotion.id === parseInt(id)
      }
    )
    this.setState({promotion: promotion, showTicketPreview: true})
  }

  _toggleTicketPreview(){
    this.setState({showTicketPreview: !this.state.showTicketPreview})
  }

  _toggleTicketForm(){
    this.setState({showTicketForm: !this.state.showTicketForm})
  }

  _submitTicketForm(){
    const value = this.refs.ticketDialogs.refs.ticketsForm.state.formValue.value
    this.props.submitTicketForm(value)
    this.setState({showTicketForm: false})
  }

  _showTicketForm(id){
    let promotion = this.props.promotions.find(
      function(promotion){
        return promotion.id === parseInt(id)
      }
    )
    this.setState({promotion: promotion, showTicketForm: true})
  }

  _newTicketForm(){
    const newPromotion = {
      id:0,
      position:0,
      affiliate_id:this.props.affiliate.id,
      affiliate:this.props.affiliate.name,
      logoImg:this.props.affiliate.logoImg,
      promoImg:'',
      title:'',
      subtitle:'',
      shortDescription:'',
      description:'',
      retail:'',
      discounted:''
    }
    this.setState({promotion: newPromotion, showTicketForm: true})
  }

  render() {
    let small = (this.props.viewport.width < 480)
    let medium = (this.props.viewport.width >= 480 && this.props.viewport.width < 780)

    const style = {
      backBtn:{
        width:90,
        float:'right',
        position:'relative',
        bottom:60,
        right:20
      },
      descriptionContainer:{
        width:'90%',
        maxWidth:1100,
        textAlign:'center',
        margin:'10px auto'
      },
      description:{
        whiteSpace:'pre-wrap'
      },
      logoContainer:{
        textAlign:'center',
        width:'100%'
      },
      logo:{
        width:200,
        margin:'10px auto'
      }
    }

    let ticketView = null
    if(this.state.showTable && this.props.promotions.length > 0){
      ticketView =
        <PromotionGrid
          showTicketPreview={this._showTicketPreview}
          newTicketForm={this._newTicketForm}
          showTicketForm={this._showTicketForm}
          toggleActivatePromotion={this.props.toggleActivatePromotion}
          tickets={this.props.promotions}
          affiliates={this.props.affiliates}
          promoImages={this.props.promoImages}
          viewport={{small:small, medium:medium}} />
    }else{
      ticketView =
        <AllTickets
          tickets={this.props.promotions}
          toggleMorePromotion={this._toggleMorePromotion}
          showMorePromotion={this.state.showMorePromotion}
          small={small} />
    }

    return(
      <div>
        <RaisedButton
          label="<-Back"
          backgroundColor={deepOrange500}
          labelColor='white'
          onTouchTap={this.props.hideEdit}
          style={style.backBtn} />
        <div style={{clear:'both'}} />
        <div style={style.logoContainer}>
          <img style={style.logo} src={this.props.affiliate.logo} />
        </div>
        <div style={style.descriptionContainer}>
          <span style={style.description}>
            {this.props.affiliate.description}
          </span>
        </div>
        {this.props.promotions.length > 0 &&
          <div style={{textAlign:'center'}}>
            <SectionHeader
              sectionTitle="Current Promotions"
              side='right' />
            <TicketsViewButtons
              showTable={this.state.showTable}
              toggleTable={this._toggleTable} />
            <div children={ticketView} />
            <TicketDialogs
              ref='ticketDialogs'
              ticket={this.state.promotion}
              affiliate={this.props.affiliate}
              affiliates={this.props.affiliates}
              forAffiliate={true}
              promoImages={this.props.promoImages}
              showTicketPreview={this.state.showTicketPreview}
              viewport={this.props.viewport}
              showTicketForm={this.state.showTicketForm}
              toggleMorePromotion={this._toggleMorePromotion}
              showMorePromotion={this.state.showMorePromotion}
              toggleTicketPreview={this._toggleTicketPreview}
              onUploadFinish={this.props.onUploadFinish}
              submitTicketForm={this._submitTicketForm}
              toggleTicketForm={this._toggleTicketForm} />
          </div>}
      </div>
    )
  }
}

export default AdminAffiliateEdit
