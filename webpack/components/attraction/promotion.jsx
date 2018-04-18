import React from 'react'
import classNames from 'classnames'
import { toCurrencyStr } from 'utils/currency'

export class Promotion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      added:false
    }
  }

  _addToCart = () => {
    const { addToCart, promotion } = this.props
    addToCart(promotion.id)
    this.setState({added:true})
    setTimeout(()=>this.setState({added:false}), 600)
  }

  render() {
    const { promotion } = this.props
    const addToCartButton =
      this.state.added
        ? <button
            type="button"
            className={classNames(
              'pt-button',
              'pt-icon-tick-circle',
              'pt-intent-success',
              'pt-small'
            )}>
            added
          </button>
        : <button
            type="button"
            onClick={this._addToCart}
            className={classNames(
              'pt-button',
              'pt-icon-add',
              'pt-small'
            )}>
            add to cart
          </button>

    return (
      <tr>
        <td>{promotion.title}</td>
        <td>{toCurrencyStr(promotion.msrp)}</td>
        <td>{toCurrencyStr(promotion.net_price)}</td>
        <td className={'promotion-actions'}>{addToCartButton}</td>
      </tr>
    )
  }
}

export default Promotion
