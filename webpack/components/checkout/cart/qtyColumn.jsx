import React from 'react'
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core"
import * as actions from 'actions/cart';


export class QtyColumn extends React.Component {
  render() {
    const { actions, id, qty } = this.props
    const removeButton = qty == 0
      ? <Button
          iconName={"delete"}
          className={'qty-input pt-intent-danger'}
          onTouchTap={ ()=>actions.deleteFromCart(id) } />
      : <Button
          iconName={"remove"}
          className={'qty-input'}
          onTouchTap={ ()=>actions.removeFromCart(id) } />

    return (
      <ControlGroup>
          {removeButton}
          <InputGroup
            className={'qty-input'}
            value={qty}
            onChange={
              (e)=>actions.updateCartQty(id, e.target.value)
            } />
          <Button
            iconName={"add"}
            onTouchTap={ ()=>actions.addToCart(id) } />
      </ControlGroup>
    )
  }
}

export default QtyColumn
