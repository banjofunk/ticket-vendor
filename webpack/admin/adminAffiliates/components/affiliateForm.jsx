import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Fieldset, Field, createValue} from 'react-forms'
import RaisedButton from 'material-ui/RaisedButton'
import ReactS3Uploader from 'react-s3-uploader'
import LogoImagePicker from './logoImagePicker'

const schema = {
  type: 'object',
  properties: {
    id: {type: 'integer'},
    name: {type: 'string'},
    active: {type: 'boolean'},
    logoImageId: {type: 'integer'},
    logo: {type: 'string'},
    description: {type: 'string'},
    shortDescription: {type: 'string'},
    redemptionPrefix: {type: 'string'}
  }
}
class AffiliateForm extends React.Component {
  constructor(props) {
    super(props)
    let formValue = createValue({
      schema,
      value: this.props.affiliate,
      onChange: this._onFormChange.bind(this)
    })
    this.state = {formValue}
    this.state.showLogoPicker = false
    this._onFormChange = this._onFormChange.bind(this)
    this._toggleLogoPicker = this._toggleLogoPicker.bind(this)
    this._logoImageSelect = this._logoImageSelect.bind(this)
  }

  _onFormChange(formValue) {
    this.setState({formValue})
  }

  _toggleLogoPicker(){
    this.setState({showLogoPicker: !this.state.showLogoPicker})
  }

  _logoImageSelect(logoImage){
    this.state.formValue.value.logoImageId = logoImage.id
    this.state.formValue.value.logo = logoImage.src
  }

  render() {
    const style = {
      container:{
        paddingRight:25
      },
      inputLabels:{
        fontSize:"24px",
        lineHeight:"34px",
        position:"relative",
        top:7,
        left:1
      },
      affiliateContainer:{
        width:'100%'
      }
    }

    let logoImages = []
    for (var i = 0; i < this.props.logoImages.length; i++) {
      const logoImage = this.props.logoImages[i]
      logoImages.push(
        <LogoImagePicker
          key={`logo-${logoImage.id}`}
          logoImage={logoImage}
          logoImageSelect={this._logoImageSelect} />
      )
    }

    let {schema = {}, value, params = {}} = this.state.formValue
    return(
      <div style={style.container}>
        <Fieldset ref='ticketForm' formValue={this.state.formValue}>
          <br />
          <Field select="id" children={
            <input
              value={value}
              type="hidden" />} />
          <Field select="logoImageId" children={
            <input
              value={value}
              type="hidden" />} />
          <img
            style={{display:'block', width:100}}
            src={this.state.formValue.value.logo}
            title={this.state.formValue.value.name} />
          <div style={{clear:'both'}}></div>
          {this.state.showLogoPicker &&
            <div>
              <div
                style={style.affiliateContainer}
                onTouchTap={this._toggleLogoPicker}>
                {logoImages}
              </div>
              <div style={{clear:'both'}}></div>
              <br />
              <ReactS3Uploader
                signingUrl="/api/admin/upload/signature"
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read', 'Access-Control-Allow-Origin': '*' }}
                name="file"
                id="file"
                onFinish={this.props.onLogoUploadFinish} />
            </div>
          }
          {!this.state.showLogoPicker &&
            <span style={{color:'blue', cursor:'pointer'}}
              onTouchTap={this._toggleLogoPicker}>
              {this.state.formValue.value.logoImageId === 0 ? "choose" : "change"}
            </span>}
          <div style={{clear:'both'}}></div>
          <br />
          <span style={style.inputLabels}>name</span>
          <Field select="name" children={
            <input
              class="contactInput"
              value={value}
              type="text"
              onChange={this.onChange}
              placeholder="enter name." />} />
          <span style={style.inputLabels}>short description</span>
          <Field select="shortDescription" children={
            <textarea
              rows={4}
              class="contactInput"
              value={value}
              style={{whiteSpace: 'pre-wrap'}}
              type="text"
              onChange={this.onChange}
              placeholder="enter short description here..." />} />
          <span style={style.inputLabels}>description</span>
          <Field select="description" children={
            <textarea
              rows={15}
              class="contactInput"
              value={value}
              style={{whiteSpace: 'pre-wrap'}}
              type="text"
              onChange={this.onChange}
              placeholder="enter description here..." />} />
          <span style={style.inputLabels}>redemption prefix</span>
          <Field select="redemptionPrefix" children={
            <textarea
              rows={1}
              class="contactInput"
              value={value}
              style={{whiteSpace: 'pre-wrap'}}
              type="text"
              onChange={this.onChange}
              placeholder="prefix" />} />
        </Fieldset>
        <div style={{float:'right', marginTop:10, position:'relative', left:30}}>
          <FlatButton
            label="Cancel"
            style={{width:150}}
            primary={true}
            onTouchTap={this.props.toggleAffiliateForm} />
          <RaisedButton
            label="Submit"
            ref="ticketFormData"
            style={{width:150, marginLeft:5}}
            labelColor="white"
            primary={true}
            onTouchTap={()=>this.props.submitAffiliateForm(this.state.formValue.value)} />
        </div>

      </div>
    )
  }
}

export default AffiliateForm
