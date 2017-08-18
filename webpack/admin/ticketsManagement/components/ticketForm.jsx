import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Fieldset, Field, createValue} from 'react-forms'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import { deepOrange500 } from 'material-ui/styles/colors'
import AffiliatePicker from './affiliatePicker'
import PromoImagePicker from './promoImagePicker'
import ReactS3Uploader from 'react-s3-uploader'

const schema = {
  type: 'object',
  properties: {
    id: {type: 'integer'},
    position: {type: 'integer'},
    affiliate_id: {type: 'integer'},
    affiliate: {type: 'string'},
    promoImg: {type: 'string'},
    title: {type: 'string'},
    subtitle: {type: 'string'},
    shortDescription: {type: 'string'},
    description: {type: 'string'},
    retail: {type: 'string'},
    discounted: {type: 'string'},
    layout: {type: 'string'}
  }
}
class TicketForm extends React.Component {
  constructor(props) {
    super(props)
    let formValue = createValue({
      schema,
      value: this.props.ticket,
      onChange: this._onFormChange.bind(this)
    })
    this.state = {
      formValue,
      layout:props.ticket.layout,
      symbology:props.ticket.symbology || "none",
      newTaxValue:'',
      newTaxKind: 0,
      newTaxAmount: ''
    }
    this.state.showAffiliatePicker = false
    this.state.showPromoImagePicker = false
    this._createTax = this._createTax.bind(this)
    this._onFormChange = this._onFormChange.bind(this)
    this._toggleAffiliatePicker = this._toggleAffiliatePicker.bind(this)
    this._togglePromoImagePicker = this._togglePromoImagePicker.bind(this)
    this._updateNewTaxKind = this._updateNewTaxKind.bind(this)
    this._updateNewTaxValue = this._updateNewTaxValue.bind(this)
    this._updateNewTaxAmount = this._updateNewTaxAmount.bind(this)
    this._handleBackgroundUpload = this._handleBackgroundUpload.bind(this)
    this._handleSymbologyChange = this._handleSymbologyChange.bind(this)
    this._layoutChange = this._layoutChange.bind(this)
    this._updateLayout = this._updateLayout.bind(this)
    this._updateSymbology = this._updateSymbology.bind(this)
    this._affiliateSelect = this._affiliateSelect.bind(this)
    this._promoImageSelect = this._promoImageSelect.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.ticket !== this.props.ticket){
      document.querySelector('iframe').contentWindow.location.reload(true)
    }
  }

  _createTax(){
    const description = this.state.newTaxValue
    const kind = this.state.newTaxKind
    const formAmount = parseFloat(this.state.newTaxAmount)
    const amount = kind === 0 ? (formAmount * 10) : (formAmount * 100)
    this.props.createTax({ description, kind, amount })
    this.setState({
      newTaxValue:'',
      newTaxKind:0,
      newTaxAmount:''
    })
  }

  _handleBackgroundUpload(event){
    const file = event.target.files[0]
    this.props.handleBackgroundUpload(this.props.ticket.id, file)
  }

  _handleSymbologyChange(event, index, symbology){
    this.setState({symbology})
  }

  _onFormChange(formValue) {
    this.setState({formValue})
  }

  _layoutChange(event, layout) {
    this.setState({layout})
  }

  _updateLayout(){
    this.props.updateLayout(this.props.ticket.id, this.state.layout)
  }

  _updateSymbology(){
    this.props.updateSymbology(this.props.ticket.id, this.state.symbology)
  }

  _toggleAffiliatePicker(){
    this.setState({showAffiliatePicker: !this.state.showAffiliatePicker})
  }

  _togglePromoImagePicker(){
    this.setState({showPromoImagePicker: !this.state.showPromoImagePicker})
  }

  _updateNewTaxValue(event, newTaxValue){
    this.setState({newTaxValue})
  }

  _updateNewTaxAmount(event, newTaxAmount){
    this.setState({newTaxAmount})
  }

  _updateNewTaxKind(event, newTaxKind){
    this.setState({newTaxKind})
  }

  _affiliateSelect(affiliate){
    this.state.formValue.value.affiliate_id = affiliate.id
    this.state.formValue.value.affiliate = affiliate.name
    this.state.formValue.value.logoImg = affiliate.logo
  }

  _promoImageSelect(promoImage){
    this.state.formValue.value.image_id = promoImage.id
    this.state.formValue.value.promoImg = promoImage.src
  }

  render() {
    const style = {
      container:{
        paddingRight:25
      },
      inputLabels:{
        fontSize:"18px",
        lineHeight:"34px",
        position:"relative",
        top:7,
        left:1
      },
      affiliateContainer:{
        width:'100%'
      },
      fileContainer: {
          overflow: 'hidden',
          position: 'relative',
          cursor:'pointer'
      },
      fileInput: {
          cursor: 'inherit',
          display: 'block',
          fontSize: '999px',
          filter: 'alpha(opacity=0)',
          minHeight: '100%',
          minWidth: '100%',
          opacity: 0,
          position: 'absolute',
          right: 0,
          textAlign: 'right',
          top: 0
      }
    }

    let affiliates = []
    for (var i = 0; i < this.props.affiliates.length; i++) {
      const affiliate = this.props.affiliates[i]
      affiliates.push(
        <AffiliatePicker
          key={`affiliate-${affiliate.id}`}
          affiliate={affiliate}
          affiliateSelect={this._affiliateSelect} />
      )
    }

    let promoImages = []
    for (var i = 0; i < this.props.promoImages.length; i++) {
      const promoImage = this.props.promoImages[i]
      promoImages.push(
        <PromoImagePicker
          key={`promo-${promoImage.id}`}
          promoImage={promoImage}
          promoImageSelect={this._promoImageSelect} />
      )
    }

    let promoImageToggle = null
    if(this.state.formValue.value.promoImg != ""){
      promoImageToggle =
        <div style={{float:'left', display:'inline'}}>
          <span style={style.inputLabels}>Promo Image: </span>
          <img  style={{display:'block', width:100}} src={this.state.formValue.value.promoImg} />
          <div style={{clear:'both'}} />
          <span style={{color:'blue', cursor:'pointer'}}
            onTouchTap={this._togglePromoImagePicker}>change</span>
        </div>
    }else{
      promoImageToggle =
        <div style={{float:'left', display:'inline'}}>
          <span style={style.inputLabels}>Promo Image: </span>
          <div style={{clear:'both'}} />
          <span style={{color:'blue', cursor:'pointer'}}
            onTouchTap={this._togglePromoImagePicker}>choose</span>
        </div>
    }

    let allTaxes = []
    for (let i = 0; i < this.props.allTaxes.length; i++) {
      const tax = this.props.allTaxes[i]
      const hasTax = this.props.ticket.taxes.map(
        function(t){return t.id}
      ).includes(tax.id)
      const txStr = tax.kind === 0 ? `${tax.amount/10}%` : `$${(tax.amount/100).toFixed(2)}`
      const taxStr = ("........ " + txStr).slice(-8)
      allTaxes.push(
        <div key={`tx-${tax.id}`}>
          <Toggle
            style={{textAlign:'right', width:350}}
            onToggle={(event, value)=>this.props.toggleTax(this.props.ticket.id, tax.id, value)}
            label={`${tax.description} ${taxStr}`}
            toggled={hasTax} />
        </div>
      )
    }

    let {schema = {}, value, params = {}} = this.state.formValue
    return(
      <div style={style.container}>
        <h1 style={{fontSize:'24px', marginTop:20}}>General Ticket Information</h1>
        <Fieldset ref='ticketForm' formValue={this.state.formValue}>
          <br />
          <Field select="id" children={
            <input
              value={value}
              type="hidden" />} />
          <Field select="position" children={
            <input
              value={value}
              type="hidden" />} />
          {this.props.forAffiliate &&
            <Field select="affiliate_id" children={
              <input
                value={this.props.affiliate.id}
                type="hidden" />} />}
          {!this.props.forAffiliate &&
            <div style={{float:'left', display:'inline'}}>
              <span style={style.inputLabels}>Affiliate: </span>
              <img
                style={{display:'block', width:100}}
                src={this.state.formValue.value.logoImg}
                title={this.state.formValue.value.name} />
              {this.state.showAffiliatePicker &&
                <div
                  style={style.affiliateContainer}
                  onTouchTap={this._toggleAffiliatePicker}>
                  {affiliates}
                </div>
              }
              {!this.state.showAffiliatePicker &&
                <span style={{color:'blue', cursor:'pointer'}}
                  onTouchTap={this._toggleAffiliatePicker}>
                  {this.state.formValue.value.affiliate_id === 0 ? "choose" : "change"}
                </span>}
            </div>}
          {promoImageToggle}
          {this.state.showPromoImagePicker &&
            <div>
              <div
                style={style.affiliateContainer}
                onTouchTap={this._togglePromoImagePicker}>
                {promoImages}
              </div>
              <br />
              <div style={{clear:'both'}}></div>
              <ReactS3Uploader
                signingUrl="/api/admin/upload/signature"
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read', 'Access-Control-Allow-Origin': '*' }}
                name="file"
                id="file"
                onFinish={this.props.onUploadFinish} />
            </div>
          }
          <div style={{clear:'both'}} />
          <Field select="title" children={
            <TextField
              fullWidth={true}
              floatingLabelText="title"
              onChange={this.onChange}
              value={value} />} />
          <Field select="subtitle" children={
            <TextField
              fullWidth={true}
              floatingLabelText="subtitle"
              onChange={this.onChange}
              value={value} />} />
          <Field select="shortDescription" children={
            <TextField
              fullWidth={true}
              floatingLabelText="short description"
              onChange={this.onChange}
              value={value} />} />
          <Field select="description" children={
            <TextField
              fullWidth={true}
              floatingLabelText="description"
              multiLine={true}
              rows={4}
              onChange={this.onChange}
              value={value} />} />
          <Field select="retail" children={
            <TextField
              fullWidth={true}
              floatingLabelText="msrp / retail price"
              onChange={this.onChange}
              value={value} />} />
          <Field select="discounted" children={
            <TextField
              fullWidth={true}
              floatingLabelText="discounted price"
              onChange={this.onChange}
              value={value} />} />
        </Fieldset>
        <br />
        <RaisedButton
          label="Update General Ticket Information"
          ref="ticketFormData"
          style={{width:350, marginLeft:5}}
          labelColor="white"
          primary={true}
          onTouchTap={()=>this.props.submitTicketForm(this.state.formValue.value)} />
        <br />
        <h1 style={{fontSize:'24px', marginTop:50}}>Taxes</h1>
        <br />
        {allTaxes}
        <br />
        <TextField
          hintText="new tax"
          style={{float:'left', marginLeft:20, width:150}}
          onChange={this._updateNewTaxValue}
          value={this.state.newTaxValue} />
        <TextField
          hintText="amount"
          style={{float:'left', marginLeft:20, width:80}}
          onChange={this._updateNewTaxAmount}
          value={this.state.newTaxAmount} />
        <RadioButtonGroup
          name="taxKind"
          style={{float:'left', display:'inline', marginLeft:20}}
          onChange={this._updateNewTaxKind}
          valueSelected={this.state.newTaxKind}>
          <RadioButton
            value={0}
            label="Percent" />
          <RadioButton
            value={1}
            label="Dollars" />
        </RadioButtonGroup>
        <RaisedButton
          onTouchTap={this._createTax}
          primary={true}
          style={{float:'left', display:'inline', marginLeft:15, marginTop:10}}
          label={'create tax'} />
        <br />
        <h1 style={{fontSize:'24px', marginTop:80}}>Rendered Tickets</h1>
        <div style={{float:'left', width:'50%', minWidth:600, marginTop:30}}>
          <h1 style={{fontSize:'12px', marginTop:5, fontColor:'#555'}}>
            background image
          </h1>
          <label style={style.fileContainer}>
              <FlatButton primary={true} label="Change Background Image" />
              <input style={style.fileInput} type="file" onChange={this._handleBackgroundUpload} />
          </label>
          <br />


          <SelectField
            floatingLabelText="Barcode Encoding"
            value={this.state.symbology}
            onChange={this._handleSymbologyChange}>
            <MenuItem value={"none"} primaryText="none" />
            <MenuItem value={"Code128"} primaryText="Code128" />
            <MenuItem value={"Code128B"} primaryText="Code128B" />
            <MenuItem value={"Code39"} primaryText="Code39" />
          </SelectField>
          <br />
          <FlatButton
            primary={true}
            onTouchTap={this._updateSymbology}
            label="Update Barcode Encoding" />
          <TextField
            multiLine={true}
            rows={4}
            style={{width:600}}
            floatingLabelText="layout"
            onChange={this._layoutChange}
            value={this.state.layout} />
          <FlatButton
            primary={true}
            onTouchTap={this._updateLayout}
            label="Update Layout" />
          <br />
        </div>
        <iframe
          style={{width:550, height:900, float:'left'}}
          src={`/tst/${this.props.ticket.id}`} />
        <br />
      </div>
    )
  }
}

export default TicketForm
