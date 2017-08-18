import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Link} from 'react-router'
import TextField from 'material-ui/TextField'

class RedemptionActions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showDelete:false,
      showDeleteWarning:false,
      rCount: props.affiliate.redemptionPrefix == "" ? 'no prefix' : '0'
    }
    this._generateRCodes = this._generateRCodes.bind(this)
    this._handleFileUpload = this._handleFileUpload.bind(this)
    this._showDelete = this._showDelete.bind(this)
    this._showDeleteWarning = this._showDeleteWarning.bind(this)
    this._confirmDelete = this._confirmDelete.bind(this)
    this._cancelDelete = this._cancelDelete.bind(this)
    this._updateRCount = this._updateRCount.bind(this)
  }

  _generateRCodes(){
    if(parseInt(this.state.rCount) > 0){
      const csvLink = `http://redemption-go.herokuapp.com/${this.props.affiliate.id}/${this.props.affiliate.redemptionPrefix}/${this.state.rCount}`
      this.setState({rCount: "please wait"})
      setTimeout(function(){this.setState({rCount: "0"})}.bind(this), 800)
      window.location = csvLink
    }

  }

  _handleFileUpload(event){
    const file = event.target.files[0]
    this.props.handleFileUpload(this.props.affiliate.id, file)
  }

  _showDelete(){
    window.location = `/api/admin/affiliates/${this.props.affiliate.id}/redemptions.csv`
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
    this.props.deleteRedemptions(this.props.affiliate.id)
    this.setState({showDeleteWarning:false, showDelete:false})
  }

  _updateRCount(event, count){
    const nums = count.match(/\d/g)
    const rCount = nums ? nums.join('') : "0"
    this.setState({rCount})
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
    const showRedemptionGenerate = this.props.affiliate.redemptionPrefix === ""
    return(
      <div>
        <TextField
          style={{width:80}}
          inputStyle={{textAlign:'right'}}
          disabled={showRedemptionGenerate}
          value={this.state.rCount}
          onChange={this._updateRCount}
          hintText={'count'} />
        <FlatButton
          style={{cursor:'pointer'}}
          disabled={showRedemptionGenerate}
          primary={true}
          onTouchTap={this._generateRCodes}
          label="Generate" />
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
          title="Reset redemption inventory for this attraction?"
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
          Make sure you successfully exported the existing redemption codes. Redemption Codes can be imported again.
        </Dialog>
      </div>
    )
  }
}

export default RedemptionActions
