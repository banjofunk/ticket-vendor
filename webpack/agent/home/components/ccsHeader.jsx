import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * CcsHeader
 */
export class CcsHeader extends React.Component {
  render() {
    const style = {
      sectionHeader: {
        fontSize: '37px',
        fontFamily:'Lato, Helvetica Neue, Arial, Helvetica, sans-serif',
        lineHeight: '43px',
        fontWeight: 500,
        textAlign:'center',
        margin: '30px'
      }
    }
    return (
      <div style={{width:1000, margin:'0 auto'}}>
        <div style={{float:'left'}}>
          <TextField
            id={'promotionFilter'}
            style={{width:200, marginLeft:20}}
            hintText="Filter Promotions"
            onChange={this.props.changeFilter}
            value={this.props.filterValue} />
        </div>
        <div style={{float:'right'}}>
          <TextField
            id={'redemptionCode'}
            style={{width:200, margin:'0 20px'}}
            hintText="Redemption Code"
            onChange={this.props.changeRedemption}
            value={this.props.redemptionValue} />
          <RaisedButton
            primary={true}
            onTouchTap={this.props.submitRedemption}
            label={'Submit'} />
        </div>
        <h1 style={style.sectionHeader}>CCS Agent Portal</h1>
      </div>
    )
  }
}

export default CcsHeader
