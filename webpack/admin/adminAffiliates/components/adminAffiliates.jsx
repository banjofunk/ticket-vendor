import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import SectionHeader from '../../../client/home/components/sectionHeader'
import ReactDataGrid from 'react-data-grid'
import EllipsisText from 'react-ellipsis-text'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import AdminAffiliateEdit from './adminAffiliateEdit'
import AffiliateForm from './affiliateForm'
import Dialog from 'material-ui/Dialog'
import RedemptionActions from './redemptionActions'

@connect((store) => {
  return {
    affiliates: store.adminAffiliates.affiliates,
    affiliate: store.adminAffiliates.affiliate,
    promotions: store.adminAffiliates.promotions,
    promoImages: store.adminAffiliates.promoImages,
    logoImages: store.adminAffiliates.logoImages,
    showEdit: store.adminAffiliates.showEdit,
    viewport: store.adminLayout.viewport
  }
})
class AdminAffiliates extends React.Component {
  constructor(props) {
    super(props)
    this._loadAffiliatesPage()
    this._loadAffiliatesPage = this._loadAffiliatesPage.bind(this)
    this._createRows = this._createRows.bind(this)
    this._rowGetter = this._rowGetter.bind(this)
    this._onCheck = this._onCheck.bind(this)
    this._showAffiliate = this._showAffiliate.bind(this)
    this._showAffiliateForm = this._showAffiliateForm.bind(this)
    this._toggleActivateAffiliate = this._toggleActivateAffiliate.bind(this)
    this._hideEdit = this._hideEdit.bind(this)
    this._submitTicketForm = this._submitTicketForm.bind(this)
    this._toggleActivatePromotion = this._toggleActivatePromotion.bind(this)
    this._onUploadFinish = this._onUploadFinish.bind(this)
    this._onLogoUploadFinish = this._onLogoUploadFinish.bind(this)
    this._newAffiliateForm = this._newAffiliateForm.bind(this)
    this._submitAffiliateForm = this._submitAffiliateForm.bind(this)
    this._toggleAffiliateForm = this._toggleAffiliateForm.bind(this)
    this._handleFileUpload = this._handleFileUpload.bind(this)
    this._deleteRedemptions = this._deleteRedemptions.bind(this)
    this.state = {
      rows:[],
      affiliate:{},
      showAffiliateForm: false
    }
  }

  componentWillMount(){
    this._createRows(this.props)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.affiliates != this.props.affiliates){
      this._createRows(nextProps)
    }
  }

  _loadAffiliatesPage(){
    this.props.dispatch(actions.getAffiliates())
    this.props.dispatch(actions.getLogos())
    this.props.dispatch(actions.getPromoImages())
  }

  _deleteRedemptions(id){
    this.props.dispatch(
      actions.deleteRedemptions(id)
    )
  }

  _onCheck(event, checked){
    const id = event.target.dataset.affiliateId
    const category = event.target.dataset.category
    this.props.dispatch(
      actions.affiliateChecked(id, checked, category)
    )
  }

  _showAffiliate(id){
    this.props.dispatch(actions.getPromotions(id))
    this.props.dispatch(actions.showAffiliate(id))
  }

  _showAffiliateForm(id){
    let affiliate = this.props.affiliates.find(
      function(affiliate){
        return affiliate.id === parseInt(id)
      }
    )
    this.setState({affiliate: affiliate, showAffiliateForm: true})
  }


  _toggleActivateAffiliate(affiliate){
    this.props.dispatch(actions.toggleActivateAffiliate(affiliate.id, !affiliate.active))
  }

  _hideEdit(event){
    this.props.dispatch(actions.hideEdit())
  }

  _submitAffiliateForm(value){
    if(value.id === 0){
      this.props.dispatch(actions.createAffiliate(value))
    }else{
      this.props.dispatch(actions.updateAffiliate(value))
    }
    this.setState({showAffiliateForm: false})
  }

  _toggleAffiliateForm(){
    this.setState({showAffiliateForm: !this.state.showAffiliateForm})
  }

  _newAffiliateForm(){
    const newAffiliate = {
      id:0,
      position:0,
      logoImageId:0,
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
    this.setState({affiliate: newAffiliate, showAffiliateForm: true})
  }


  _createRows(props){
    let rows = []
    for (let i = 0; i < props.affiliates.length; i++) {
      const affiliate = props.affiliates[i]
      rows.push({
        name: affiliate['name'],
        logo: <img style={{width:'100%'}} src={affiliate['logo']} />,
        description:
          <EllipsisText
            style={{whiteSpace:'pre-wrap'}}
            text={affiliate['description']}
            length={220}
          />,
        category:
          <div>
            <Checkbox
              label="sponsor"
              data-affiliate-id={affiliate['id']}
              data-category="sponsor"
              onCheck={this._onCheck}
              checked={affiliate['sponsor']} />
            <Checkbox
              label="attraction"
              data-affiliate-id={affiliate['id']}
              data-category="attraction"
              onCheck={this._onCheck}
              checked={affiliate['attraction']} />
          </div>,
        promotionCount: affiliate['promotionCount'],
        redemptionCount: affiliate['redemption_count'],
        redemptionPrefix: affiliate['redemptionPrefix'],
        actions:
          <div>
            <FlatButton
              label="Show"
              primary={true}
              onTouchTap={()=>this._showAffiliate(affiliate['id'])}
              style={{width:90}} />
            <FlatButton
              label="Edit"
              primary={true}
              onTouchTap={()=>this._showAffiliateForm(affiliate['id'])}
              style={{width:90}} />
            <br />
            <FlatButton
              label={
                affiliate['active'] ?
                <span style={{fontSize:12, position:'relative', right:9}}>Deactivate</span> :
                <span style={{fontSize:12, position:'relative', right:9}}>Activate</span>
              }
              primary={!affiliate['active']}
              secondary={affiliate['active']}
              onTouchTap={()=>this._toggleActivateAffiliate(affiliate)}
              style={{width:90}} />
          </div>,
        redemptions:
          <RedemptionActions
            affiliate={affiliate}
            handleFileUpload={this._handleFileUpload}
            deleteRedemptions={this._deleteRedemptions} />

      })
    }
    this.setState({rows:rows})
  }

  _rowGetter(i) {
    return this.state.rows[i]
  }

  _submitTicketForm(value){
    if(value.id === 0){
      this.props.dispatch(actions.createTicket(value))
    }else{
      this.props.dispatch(actions.updateTicket(value))
    }
    this.setState({showTicketForm: false})
  }


  _toggleActivatePromotion(id, active){
    this.props.dispatch(
      actions.toggleActivatePromotion(id, active)
    )
  }

  _handleFileUpload(id, file){
    this.props.dispatch(
      actions.handleFileUpload(id, file)
    )
  }

  _confirmDelete(){
    this.props.deleteInventory(this.props.ticket.id)
    this.setState({showDeleteWarning:false, showDelete:false})
  }

  _onUploadFinish=(response)=>{
    let url = response.signedUrl.split("?")[0]
    this.props.dispatch(
      actions.promoUploadFinished(url)
    )
  }

  _onLogoUploadFinish=(response)=>{
    let url = response.signedUrl.split("?")[0]
    this.props.dispatch(
      actions.logoUploadFinished(url)
    )
  }

  render() {
    const columns = [
      {
        key:'name',
        name:'Name',
        width:150
      },
      {
        key:'logo',
        name:'Image',
        width:100
      },
      {
        key:'description',
        name:'Description',
        width:335
      },
      {
        key:'category',
        name:'Category',
        width:140
      },
      {
        key:'promotionCount',
        name:'Promos',
        width:65
      },
      {
        key:'redemptionCount',
        name:'redem count',
        width:100
      },
      {
        key:'redemptionPrefix',
        name:'prefix',
        width:65
      },
      {
        key:'actions',
        name:'Actions',
        width:190
      },
      {
        key:'redemptions',
        name:'Redemption Codes',
        width:190
      }
    ]

    const style = {
      gridContainer:{
        width:'90%',
        maxWidth:1350,
        margin:'20px auto',
        overflowX:'scroll'
      }
    }

    let affiliates = null
    if(this.props.showEdit){
      affiliates =
        <AdminAffiliateEdit
          submitTicketForm={this._submitTicketForm}
          toggleActivatePromotion={this._toggleActivatePromotion}
          onUploadFinish={this._onUploadFinish}
          viewport={this.props.viewport}
          affiliate={this.props.affiliate}
          promotions={this.props.promotions}
          affiliates={this.props.affiliates}
          promoImages={this.props.promoImages}
          hideEdit={this._hideEdit} />
    }else{
      affiliates =
        <div style={style.gridContainer}>
          <RaisedButton
            label="New"
            style={{float:'right', marginBottom:10}}
            primary={true}
            onTouchTap={this._newAffiliateForm} />
          <div style={{clear:'both'}}></div>
          <ReactDataGrid
            columns={columns}
            rowHeight={110}
            rowGetter={this._rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={(this.props.affiliates.length * 110) + 45} />
        </div>
    }

    return(
      <div>
        <SectionHeader
          sectionTitle={
            <span style={{marginLeft:5}}>
              {this.props.showEdit && this.props.affiliate ?
                this.props.affiliate['name'] : 'Affiliates'}
            </span>}
          side='left' />
        <div children={affiliates} />
        <Dialog
          title="Affiliate Form"
          modal={false}
          open={this.state.showAffiliateForm}
          onRequestClose={this._toggleAffiliateForm}
          contentStyle={{width:'90%', maxWidth:'none'}}
          autoScrollBodyContent={true} >
          <AffiliateForm
            ref='ticketsForm'
            affiliate={this.state.affiliate}
            promoImages={this.props.promoImages}
            logoImages={this.props.logoImages}
            onUploadFinish={this._onUploadFinish}
            onLogoUploadFinish={this._onLogoUploadFinish}
            submitAffiliateForm={this._submitAffiliateForm}
            toggleAffiliateForm={this._toggleAffiliateForm} />
        </Dialog>

      </div>
    )
  }
}

export default AdminAffiliates
