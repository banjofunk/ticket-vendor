import React from 'react'
import * as actions from '../actions'
import Chip from 'material-ui/Chip';

class AdminAttractionSort extends React.Component {
  render() {
    const style = this.props.style
    const attraction = this.props.attraction
    return(
      <div style={style.sortLi}>
        <Chip
          onRequestDelete={function(){alert('delete request')}}
          style={{width:'100%'}}
          labelStyle={style.sortLabel} >
          {attraction.name}
        </Chip>
        <div style={style.sortCover}></div>
      </div>
    )
  }
}

export default AdminAttractionSort
