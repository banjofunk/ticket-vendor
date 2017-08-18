import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import RaisedButton from 'material-ui/RaisedButton';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { Link } from 'react-router'

class CartButton extends React.Component {
  render() {
    const style = {
      width:"20px",
      height:"24px",
      marginTop:"3px",
      marginRight:"40px",
      float:'right'
    }
    return(
      <Link to='/checkout'>
        <RaisedButton style={style} children={
            <div>
              <AddShoppingCart />
              <h2 style={{display:'inline', position:'relative', bottom:'4px'}}>Cart</h2>
            </div>
        }  />
        </Link>
    )
  }
}

export default CartButton
