import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export class AgentDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      agentEmail: ''
    }
    this._updateAgentEmail = this._updateAgentEmail.bind(this)
    this._submitEmail = this._submitEmail.bind(this)
  }

  _updateAgentEmail(event, agentEmail){
    this.setState({agentEmail})
  }

  _submitEmail(){
    window.location = `${window.location.origin}/agent/${this.state.agentEmail}`
  }

  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        autoScrollBodyContent={true}
        title='Enter CCS agent email address:'>
        <br />
        <TextField
          floatingLabelText={'email address'}
          onChange={this._updateAgentEmail}
          value={this.state.agentEmail} />
        <FlatButton
          label={'submit'}
          primary={true}
          onTouchTap={this._submitEmail} />
      </Dialog>
    )
  }
}

export default AgentDialog
