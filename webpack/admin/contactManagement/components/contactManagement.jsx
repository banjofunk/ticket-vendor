import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as bannerActions from '../../shared/actions'
import SectionHeader from '../../../client/home/components/sectionHeader'
import RaisedButton from 'material-ui/RaisedButton'
import { BannerManagement } from '../../shared'
import { deepOrange500 } from 'material-ui/styles/colors'
import { RIETextArea } from 'riek'
// import {Fieldset, Field, createValue} from 'react-forms'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const schema = {
  type: 'object',
  properties: {
    firstName: {type: 'string', minLength:1},
    lastName: {type: 'string', minLength:1},
    email: {type: 'string', format: 'email'},
    message: {type: 'string', minLength:1}
  }
}

@connect((store) => {
  return {
    pageID: store.contactManagement.pageID,
    content: store.contactManagement.content,
    showSave: store.contactManagement.showSave,
    formValue: store.contactManagement.formValue,
    banners: store.adminShared.banners
  }
})
class ContactManagement extends React.Component {
  constructor(props) {
    super(props)
    let formValue = createValue({
      schema,
      value: props.formValue,
      onChange: this._onFormChange.bind(this)
    })
    this.state = {formValue}
    this.state.openError = false
    this.state.errors = []
    this.state.errorsTitle = ''
    this._loadContactPage = this._loadContactPage.bind(this)
    this._updateMainText = this._updateMainText.bind(this)
    this._savePageContent = this._savePageContent.bind(this)
    this._cancelPageContent = this._cancelPageContent.bind(this)
    this._validateContactForm = this._validateContactForm.bind(this)
  }

  componentWillMount(){
    this._loadContactPage()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.formValue != this.state.formValue.value){
      let newState = {...this.state}
      newState.formValue.value = nextProps.formValue
      this.setState({newState})
    }
  }

  _loadContactPage(){
    this.props.dispatch(actions.getPage('contact'))
    this.props.dispatch(bannerActions.getAllBanners())
    this.props.dispatch(bannerActions.hideBanners())
  }

  _updateMainText(value){
    this.props.dispatch(
      actions.updateMainText(value.textarea)
    )
  }

  _savePageContent(){
    this.props.dispatch(
      actions.savePageContent(this.props.pageID, this.props.content, this.props.banners)
    )
  }

  _cancelPageContent(){
    this._loadContactPage()
  }

  _onFormChange(formValue) {
    this.setState({formValue})
  }

  _sendContactForm(){
    let errors = []
    errors.push(
      <div key='commentConfirmation' style={{width:'100%', textAlign:'center'}}>
        <h1 style={{color:'black', fontSize:20}}>We'll get back to you soon.</h1>
        <br />
        <img src='/assets/logo' style={{width:'200px', margin:'15px 0'}} />
      </div>
    )
    this.props.dispatch(
      actions.sendContactForm(this.state.formValue.value)
    )
    this.setState({
      openError: true,
      errors:errors,
      errorsTitle:"Thanks for reaching out!"
    })
  }

  _createValidationErrors(validationErrors){
    let errors = []
    for (var error of validationErrors) {
      const key = validationErrors.indexOf(error)
      errors.push(
        <h1 key={key} style={{color:'red', fontSize:20}}>{`${key}.) ${error.field.match(/data.(.*)/)[1]} - ${error.message}`}</h1>
      )
    }
    this.setState({
      openError: true,
      errors:errors,
      errorsTitle:"Errors"
    })
  }

  _validateContactForm(){
    let validationErrors = this.state.formValue.validate(this.state.formValue.schema, this.state.formValue.value)
    if(validationErrors.length === 0){
      this._sendContactForm()
    }else{
      this._createValidationErrors(validationErrors)
    }
  }

  handleOpen = () => {
    this.setState({openError: true})
  };

  handleClose = () => {
    this.setState({openError: false})
  };

  render() {
    const style = {
      container: {
        width:'100%',
        maxWidth:'1100px',
        margin:'0 auto',
        textAlign:'center'
      },
      headerText:{
        color:'#414042',
        fontSize:'16px',
        lineHeight:'20px',
        fontFamily:'Arvo, serif'
      },
      mainContent:{
        textAlign:'center',
        margin:'20px auto',
        width:'80%',
        minHeight:'200px'
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
      },
      buttonsContainer:{
        position:'fixed',
        backgroundColor:'white',
        borderRadius:5,
        padding:5,
        zIndex:20,
        bottom:5,
        right:5
      },
      saveButton:{},
      cancelButton:{
        marginRight:5
      },
      inputLabels:{
        fontSize:"24px",
        lineHeight:"34px",
        position:"relative",
        top:7,
        left:1
      }
    }

    const alertActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]
    let {schema = {}, value, params = {}} = this.state.formValue
    return(
      <div>
        <BannerManagement ref='bannerList' page='contact' />
        <div style={style.container}>
          <SectionHeader sectionTitle={this.props.content.titleText} color={deepOrange500} side='left' />
          <div style={style.mainContent}>
            {this.props.content.mainText &&
              <RIETextArea
                value={this.props.content.mainText}
                change={this._updateMainText}
                style={style.headerText}
                classEditing='textEdit'
                rows={10}
                propName="textarea"
                classLoading="loading"
                classInvalid="invalid"/>
            }
            <div style={{clear:'both', marginTop:25}} />
            <div style={{textAlign:'left'}}>
              {/* <Fieldset formValue={this.state.formValue}>
                <span style={style.inputLabels}>First Name:</span>
                <Field select="firstName" children={
                  <input
                    class="contactInput"
                    value={value}
                    type="text"
                    onChange={this.onChange}
                    placeholder="enter your First Name." />} />
                <span style={style.inputLabels}>Last Name:</span>
                <Field select="lastName" children={
                  <input
                    class="contactInput"
                    value={value}
                    type="text"
                    onChange={this.onChange}
                    placeholder="enter your Last Name." />} />
                <span style={style.inputLabels}>Email:</span>
                <Field select="email" children={
                  <input
                    class="contactInput"
                    value={value}
                    type="text"
                    onChange={this.onChange}
                    placeholder="enter your Email Address." />} />
                <span style={style.inputLabels}>Message:</span>
                <Field select="message" children={
                    <textarea
                      rows="4"
                      class="contactInput"
                      value={value}
                      type="text"
                      onChange={this.onChange}
                      placeholder="leave us a message here..." />} />
              </Fieldset> */}
            </div>
            <br />
            <RaisedButton
              label="Send"
              style={{width:200}}
              labelColor="white"
              backgroundColor={deepOrange500}
              onTouchTap={this._validateContactForm} />
            <div style={{clear:'both', marginTop:25}} />
          </div>
          <img src='/assets/logo' style={style.ccsLogo} />
          {this.props.showSave && <div style={style.buttonsContainer}>
            <RaisedButton
              label="Cancel"
              style={style.cancelButton}
              onTouchTap={this._cancelPageContent} />
            <RaisedButton
              label="Save"
              backgroundColor={deepOrange500}
              onTouchTap={this._savePageContent}
              style={style.saveButton} />
          </div>}
          <Dialog
            actions={alertActions}
            modal={false}
            open={this.state.openError}
            onRequestClose={this.handleClose}>
            <h1 style={{textAlign:'center', fontSize:30}}><b>{this.state.errorsTitle}</b></h1>
            <br />
            {this.state.errors}
          </Dialog>
        </div>
      </div>
    )
  }
}

export default ContactManagement
