import React from 'react'
import * as actions from '../actions'
import Chip from 'material-ui/Chip';

class AdminSponsorSort extends React.Component {
  render() {
    const style = this.props.style
    const sponsor = this.props.sponsor
    return(
      <div style={style.sortLi}>
        <Chip
          onRequestDelete={function(){alert('delete request')}}
          style={{width:'100%'}}
          labelStyle={style.sortLabel} >
          {sponsor.name}
        </Chip>
        <div style={style.sortCover}></div>
      </div>
    )
  }
}

export default AdminSponsorSort
