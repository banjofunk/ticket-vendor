import React from 'react'
import * as actions from '../actions'
import Chip from 'material-ui/Chip';

class AdminPromotionSort extends React.Component {
  render() {
    const style = this.props.style
    const promotion = this.props.promotion
    return(
      <div
        style={style.sortLi}
        data-id={promotion.id}
        key={`promotionSort-${promotion.id}`}>
        <Chip
          onRequestDelete={function(){alert('delete request')}}
          style={{width:'100%'}}
          labelStyle={style.sortLabel} >
          {`${promotion.title} - ${promotion.discounted}`}
        </Chip>
        <div style={style.sortCover}></div>
      </div>
    )
  }
}

export default AdminPromotionSort
