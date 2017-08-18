import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Link} from 'react-router'

class TicketActionButtons extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showDelete:false,
      showDeleteWarning:false
    }
    this._handleFileUpload = this._handleFileUpload.bind(this)
    this._showDelete = this._showDelete.bind(this)
    this._showDeleteWarning = this._showDeleteWarning.bind(this)
    this._confirmDelete = this._confirmDelete.bind(this)
    this._cancelDelete = this._cancelDelete.bind(this)
  }

  _handleFileUpload(event){
    const file = event.target.files[0]
    this.props.handleFileUpload(this.props.ticket.id, file)
  }

  _showDelete(){
    window.location = `/api/admin/promotions/${this.props.ticket.id}/admissions.csv`
    this.setState({showDelete:true})
    setTimeout(function(){
      this.setState({showDelete:false})
    }.bind(this), 8000)
  }

  _showDeleteWarning(){
    this.setState({showDeleteWarning:true})
  }

  _cancelDelete(){
    this.setState({showDeleteWarning:false})
  }

  _confirmDelete(){
    this.props.deleteInventory(this.props.ticket.id)
    this.setState({showDeleteWarning:false, showDelete:false})
  }

  render() {
    const style = {
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
    return(
      <div>
        <FlatButton
          label="Show"
          disabled={!this.props.ticket.id}
          primary={true}
          style={{width:90}}
          onTouchTap={()=>this.props.showTicketPreview(this.props.ticket.id)} />
        <FlatButton
          label="Edit"
          disabled={!this.props.ticket.id}
          primary={true}
          style={{width:90}}
          onTouchTap={()=>this.props.showTicketForm(this.props.ticket.id)} />
        <br />
        <label style={style.fileContainer}>
            <FlatButton primary={true} label="Import" />
            <input style={style.fileInput} type="file" onChange={this._handleFileUpload} />
        </label>
        {!this.state.showDelete &&
          <FlatButton
            style={{cursor:'pointer'}}
            primary={true}
            onTouchTap={this._showDelete}
            label="Export" />}
        {this.state.showDelete &&
          <FlatButton
            style={{cursor:'pointer'}}
            secondary={true}
            onTouchTap={this._showDeleteWarning}
            label="Delete" />}

        <Dialog
          title="Reset inventory for this promotion?"
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._cancelDelete}
            />,
            <FlatButton
              label="Delete"
              secondary={true}
              onTouchTap={this._confirmDelete}
            />
          ]}
          modal={false}
          open={this.state.showDeleteWarning}
          onRequestClose={this._cancelDelete}
        >
          Make sure you successfully exported the existing inventory. Admissions can be imported again.
        </Dialog>
      </div>
    )
  }
}

export default TicketActionButtons
