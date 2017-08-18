import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import RaisedButton from 'material-ui/RaisedButton';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart'
import { deepOrange500 } from 'material-ui/styles/colors'
import { Link } from 'react-router'

class CartButton extends React.Component {
  render() {
    const style = {
      button:{
        width:130,
        height:"30px",
        marginTop:"5px",
        marginRight:"10px",
        float:'right'
      },
      label:{
        color:deepOrange500,
        marginTop:5
      }
    }
    return(
      <Link to='/checkout'>
        <RaisedButton style={style.button} color={'white'}>
          <h2 style={style.label}>Shopping Cart</h2>
        </RaisedButton>
      </Link>
    )
  }
}

export default CartButton
