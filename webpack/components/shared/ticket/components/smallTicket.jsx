import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import EllipsisText from 'react-ellipsis-text'
import { deepOrange500, deepOrange100 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'

export class SmallTicket extends React.Component {
  render() {
    const style = {
      buyButton:{
        width:'150px'
      },
      promoButton:{
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        textAlign:'center'
      },
      promoButtonLabel:{
        color:deepOrange500,
        fontSize:'13px',
        position:'relative',
        right:10
      }
    }


    let priceInfo
    if(this.props.promotion.callCenter){
      priceInfo =
        <div class={'price-info'} style={{marginTop:-10}}>
          <div class={'price-info-container'}>
            <span
              class={'price-text'}
              style={{color:deepOrange500}}>
              ${this.props.promotion.discounted.toFixed(2)}
            </span>
            <span>&nbsp;|&nbsp;</span>
            <strike class={'retail-container'}>
              <span class={'retail-text'}>${this.props.promotion.retail.toFixed(2)}</span>
            </strike>
          </div>
          <h2 style={{fontWeight:'lighter', fontStyle:'italic'}}>To reserve a ticket</h2>
          <h2 style={{fontWeight:'lighter', fontStyle:'italic'}}>call us at:</h2>
          <RaisedButton
            label='(855)493-2582'
            style={{marginTop:5}}
            labelColor='white'
            href='tel:8554932582'
            buttonStyle={style.buyButton}
            backgroundColor={deepOrange500} />
        </div>
    }else{
      priceInfo =
        <div class={'price-info'}>
          <div class={'price-info-container'}>
            <span
              class={'price-text'}
              style={{color:deepOrange500}}>
              ${this.props.promotion.discounted.toFixed(2)}
            </span>
            <span>&nbsp;|&nbsp;</span>
            <strike class={'retail-container'}>
              <span class={'retail-text'}>${this.props.promotion.retail.toFixed(2)}</span>
            </strike>
          </div>

          <FlatButton
            label='Click here to purchase'
            data-promo-id={this.props.promotion.id}
            labelStyle={style.promoButtonLabel}
            style={style.promoButton}
            hoverColor={deepOrange100}
            onTouchTap={()=>this.props.addToCart(this.props.promotion)} />
        </div>
    }
    return (
      <div class={'small-container'}>
        <img src={this.props.promotion.promoImg} class={'header-img'} />
        <div class={'title'}
          style={{backgroundColor:deepOrange500}}>
          <span class={'title-text'}>{this.props.promotion.title}</span>
        </div>
        <div class={'description'}>
          <span class={'desc-text'}>
            <EllipsisText
              text={this.props.promotion.shortDescription}
              length={137} />
          </span>
        </div>

        {priceInfo}

      </div>
    )
  }
}

export default SmallTicket
