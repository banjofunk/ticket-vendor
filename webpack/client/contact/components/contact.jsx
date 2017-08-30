import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import SectionHeader from '../../home/components/sectionHeader'
import Slider from 'react-slick'
// import {Fieldset, Field, createValue} from 'react-forms'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { deepOrange500 } from 'material-ui/styles/colors';

let schema = {
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
    content: store.contact.content,
    formValue: store.contact.formValue,
    banners: store.contact.banners
  }
})
class Contact extends React.Component {
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
    this.state.errorsTitle = ""
    this._validateContactForm = this._validateContactForm.bind(this)
  }

  componentWillMount(){
    this.props.dispatch(
      actions.getPage('contact')
    )

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.formValue != this.state.formValue.value){
      let newState = {...this.state}
      newState.formValue.value = nextProps.formValue
      this.setState({newState})
    }
  }

  handleOpen = () => {
    this.setState({openError: true})
  }

  handleClose = () => {
    this.setState({openError: false})
  }

  _onFormChange(formValue) {
    this.setState({formValue:formValue})
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

  render() {
    const style = {
      container: {
        width:'100%',
        maxWidth:'1100px',
        margin:'0 auto',
        textAlign:'center'
      },
      mainContent:{
        textAlign:'center',
        margin:'20px auto',
        width:'80%',
        minHeight:'200px'
      },
      headerText:{
        color:'#414042',
        fontSize:'16px',
        whiteSpace: 'pre-wrap',
        lineHeight:'20px',
        fontFamily:'Arvo, serif'
      },
      inputLabels:{
        fontSize:"24px",
        lineHeight:"34px",
        position:"relative",
        top:7,
        left:1
      }
    }

    const sliderSettings = {
      dots: false,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite:true,
      slide: 'img',
      speed:1000,
      arrows:false
    }

    let mainBanners = []
    if(this.props.banners.length > 0){
      const sortBanners = this.props.banners.sort(function(a, b) {
        return parseFloat(a.position) - parseFloat(b.position);
      })
      for (var banner of sortBanners) {
        const key = `contactMainBanner-${banner.id}`
        mainBanners.push(
          <img src={banner.src} key={key} />
        )
      }
    }else{
      mainBanners = [<img style={{height:210, width:1}}  key={'keyDefault'}/>]
    }

    let {schema = {}, value, params = {}} = this.state.formValue
    return(
      <div>
        <Slider { ...sliderSettings }>
          {mainBanners}
        </Slider>
        <div style={style.container}>
          <SectionHeader sectionTitle={this.props.content.titleText} color={deepOrange500} side='left' />
          <div style={style.mainContent}>
            <div style={{textAlign:'center', margin:'20px auto', width:'80%'}}>
              <span style={style.headerText}>{this.props.content.mainText}</span>
            </div>
            <div style={{clear:'both', marginTop:25}} />
            <div style={{textAlign:'left'}}>
              {/* <Fieldset formValue={this.state.formValue}>
                <span style={style.inputLabels}>First Name:</span>
                <Field select="firstName" children={
                  <input class="contactInput" value={value} type="text" onChange={this.onChange} placeholder="enter your First Name." />} />
                <span style={style.inputLabels}>Last Name:</span>
                <Field select="lastName" children={
                  <input class="contactInput" value={value} type="text" onChange={this.onChange} placeholder="enter your Last Name." />} />
                <span style={style.inputLabels}>Email:</span>
                <Field select="email" children={
                  <input class="contactInput" value={value} type="text" onChange={this.onChange} placeholder="enter your Email Address." />} />
                <span style={style.inputLabels}>Message:</span>
                <Field select="message" children={
                    <textarea rows="4" class="contactInput" value={value} type="text" onChange={this.onChange} placeholder="leave us a message here..." />} />
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
          <Dialog
            actions={
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose} />
            }
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

export default Contact
