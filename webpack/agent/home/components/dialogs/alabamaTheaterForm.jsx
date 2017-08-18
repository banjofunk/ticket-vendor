import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import cookie from 'react-cookie'

/**
 * AlabamaTheaterForm
 */
export class AlabamaTheaterForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cart: [],
      form:{
        company: 'Global Amenities',
        name: '',
        adultTix: '',
        childTix: '',
        date: '',
        preTime: '',
        time: '',
        seat: '',
        confirmation: '',
        requests: '',
        reservationist: ''
      }
    }
    this._changeValue = this._changeValue.bind(this)
    this._submitForm = this._submitForm.bind(this)
  }

  componentWillMount(){
    const cart = this.props.cart
    this.setState({cart})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cart !== this.props.cart){
      const cart = nextProps.cart
      this.setState({cart})
    }
  }

  _submitForm(){
    let cart = this.state.cart
    let unfinished = 0
    let tickets = cart.filter(function( obj ) {
      return [61, 62].includes(obj.id)
    })[0]
    if(tickets['ticketData'] === undefined){
      tickets['ticketData'] = []
    }
    tickets['ticketData'].push({...this.state.form})
    this.setState({cart})
    cookie.save('cartCookie', cart, { path: '/' })
    if(tickets['ticketData'].length == tickets['qty']){
      this.props.submitForm(this.state.cart)
    }
  }

  _changeValue(event, value){
    const field = event.target.id
    let form = {...this.state.form}
    form[field] = value
    this.setState({ form })
  }
  render() {
    let ticketData
    let remainingCount
    let btnLabel = 'Submit'
    let tickets = this.state.cart.filter(function( obj ) {
      return [61, 62].includes(obj.id)
    })[0]
    if(tickets){
      ticketData = tickets['ticketData'] || []
      remainingCount = tickets['qty'] - ticketData.length
      btnLabel = remainingCount > 1 ? 'Next' : 'Submit'
    }
    return (
      <Dialog
        modal={false}
        open={this.props.openDialog}
        autoScrollBodyContent={true}
        title={`Alabama Theater (${remainingCount})`}
        onRequestClose={this.props.closeDialog}>
        <TextField
          id={'company'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Company"
          floatingLabelFixed={true}
          value={this.state.form.company} />
        <TextField
          id={'name'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Name"
          floatingLabelFixed={true}
          value={this.state.form.name} />
        <TextField
          id={'adultTix'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="AdultTix"
          floatingLabelFixed={true}
          value={this.state.form.adultTix} />
        <TextField
          id={'childTix'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="ChildTix"
          floatingLabelFixed={true}
          value={this.state.form.childTix} />
        <TextField
          id={'date'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Date"
          floatingLabelFixed={true}
          value={this.state.form.date} />
        <TextField
          id={'preTime'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="PreTime"
          floatingLabelFixed={true}
          value={this.state.form.preTime} />
        <TextField
          id={'time'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Time"
          floatingLabelFixed={true}
          value={this.state.form.time} />
        <TextField
          id={'seat'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Seat"
          floatingLabelFixed={true}
          value={this.state.form.seat} />
        <TextField
          id={'confirmation'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Confirmation"
          floatingLabelFixed={true}
          value={this.state.form.confirmation} />
        <TextField
          id={'requests'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Requests"
          floatingLabelFixed={true}
          value={this.state.form.requests} />
        <TextField
          id={'reservationist'}
          style={{width:'40%', margin:'0 20px'}}
          onChange={this._changeValue}
          floatingLabelText="Reservationist"
          floatingLabelFixed={true}
          value={this.state.form.reservationist} />
        <RaisedButton
          style={{width:'40%', margin:'0 20px'}}
          primary={true}
          onTouchTap={this._submitForm}
          label={btnLabel} />
      </Dialog>
    )
  }
}

export default AlabamaTheaterForm
