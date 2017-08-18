import React from 'react'
import * as actions from '../actions'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { deepOrange500, deepOrange100 } from 'material-ui/styles/colors'
import EllipsisText from 'react-ellipsis-text'

class Promotion extends React.Component {
  render() {
    const style = {
      smallContainer:{
        display:'inline-block',
        position:'relative',
        width:'240px',
        height:'423px',
        border:'solid thin black',
        margin:'5px'
      },
      largeContainer:{
        display:'inline-block',
        position:'relative',
        width:'240px',
        border:'solid thin black',
        margin:'5px'
      },
      largeSubtitle:{
        display:'block',
        whiteSpace:'pre-wrap',
        marginTop:30,
        marginBottom:10,
        fontSize:'14px',
        lineHeight:'19px',
        color:'#231f20'
      },
      largeHeaderImg:{
        width:'100%',
        height:'240px',
        backgroundColor:'white'
      },
      headerImg:{
        width:'100%',
        height:'240px',
        backgroundColor:'white'
      },
      title:{
        position:'absolute',
        top:'214px',
        borderTopRightRadius:'25px',
        borderBottomRightRadius:'25px',
        paddingRight:'5px',
        width:'173px',
        height:'52px',
        textAlign:'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:deepOrange500
      },
      titleText:{
        fontSize:'18px',
        lineHeight:'20px',
        fontWeight:'600',
        position:'relative',
        verticalAlign:'middle',
        whiteSpace:'normal',
        left:'5px',
        color:'white'
      },
      description:{
        height:'90px',
        width:'calc(100% - 20px)',
        textAlign:'left'
      },
      largeDescription:{
        width:'90%',
        margin:'0 auto'
      },
      descText:{
        fontSize:'15px',
        lineHeight:'17px',
        whiteSpace:'pre-wrap',
        textAlign:'left',
        position:'relative',
        top:35,
        left:10
      },
      largeDescText:{
        fontSize:'15px',
        lineHeight:'17px',
        textAlign:'left',
        whiteSpace:'pre-wrap',
        textAlign:'left'
      },
      priceInfo:{
        width:200,
        margin:'20px 5px 8px 5px',
        textAlign:'center'
      },
      promoButton:{
        position:'absolute',
        bottom:'10px',
        left:'39px',
        width:'150px'
      },
      promoButtonLabel:{
        color:deepOrange500,
        fontSize:'13px',
        position:'relative',
        right:10
      },
      promoButton:{
        width:'100%',
        height:40
      }

    }

    let priceInfo
    if(this.props.promotion.callCenter){
      priceInfo =
        <div style={style.priceInfo}>
          <div style={{margin:'5px auto'}}>
            <span style={{color:deepOrange500, fontSize:22}}>${this.props.promotion.discounted}</span>
            <span>&nbsp;|&nbsp;</span>
            <strike style={{color:'black', lineDecoration:'line-through'}}>
              <span style={{color:'#AAA', fontSize:20}}>${this.props.promotion.retail}</span>
            </strike>
          </div>
          <h2 style={{fontWeight:'lighter', fontStyle:'italic'}}>To reserve a ticket</h2>
          <h2 style={{fontWeight:'lighter', fontStyle:'italic'}}>call us at:</h2>
          <RaisedButton
            label='(855)493-2582'
            labelColor='white'
            href='tel:8554932582'
            buttonStyle={style.buyButton}
            backgroundColor={deepOrange500} />
          <RaisedButton
            label='Cancel'
            style={{display:'inline-block', width:'90%', margin:'10px auto'}}
            onTouchTap={this.props.toggleMorePromotion}
            default={true} />
        </div>
    }else{
      priceInfo =
        <div style={style.priceInfo}>
          <div style={{margin:'5px auto'}}>
            <span style={{color:deepOrange500, fontSize:22}}>${this.props.promotion.discounted}</span>
            <span>&nbsp;|&nbsp;</span>
            <strike style={{color:'black', lineDecoration:'line-through'}}>
              <span style={{color:'#AAA', fontSize:20}}>${this.props.promotion.retail}</span>
            </strike>
          </div>
          <RaisedButton
            label='Buy Now'
            data-promo-id={this.props.promotion.id}
            labelColor='white'
            style={{display:'inline-block', width:'90%', margin:'10px auto'}}
            onTouchTap={()=>this.props.addToCart(this.props.promotion)}
            backgroundColor={deepOrange500} />
          <RaisedButton
            label='Cancel'
            style={{display:'inline-block', width:'90%', margin:'10px auto'}}
            onTouchTap={this.props.toggleMorePromotion}
            default={true} />
          <img src={this.props.promotion.logoImg} style={{height:80, display:'inline-block', verticalAlign:'middle', margin:'10px auto'}} />
        </div>
    }



    let sizedTicket = null
    if(this.props.showMorePromotion){
      sizedTicket =
        <div>
          <img src={this.props.promotion.promoImg} style={style.largeHeaderImg} />
          <div style={style.title}>
            <span style={style.titleText}>{this.props.promotion.title}</span>
          </div>
          <span style={style.largeSubtitle}>{this.props.promotion.subtitle}</span>
          <div style={style.largeDescription}>
            <span style={style.largeDescText}>
              {this.props.promotion.description}
            </span>
          </div>
          <div style={{clear:'both'}}></div>
            {priceInfo}

          <div style={{clear:'both'}}></div>
        </div>

    }else{
        if(this.props.promotion){
          sizedTicket =
            <div>
              <img src={this.props.promotion.promoImg} style={style.headerImg} />
              <div style={style.title}>
                <span style={style.titleText}>{this.props.promotion.title}</span>
              </div>
              <div style={style.description}>
                <span style={style.descText}>
                  <EllipsisText
                    text={this.props.promotion.shortDescription}
                    length={137} />
                </span>
              </div>
              <div style={style.priceInfo}>
                <div style={{margin:'5px auto'}}>
                  <span style={{color:deepOrange500, fontSize:22}}>${this.props.promotion.discounted}</span>
                  <span>&nbsp;|&nbsp;</span>
                  <strike style={{color:'black', lineDecoration:'line-through'}}>
                    <span style={{color:'#AAA', fontSize:20}}>${this.props.promotion.retail}</span>
                  </strike>
                </div>
              </div>
              <FlatButton
                label='Click here to purchase'
                data-promo-id={this.props.promotion.id}
                labelStyle={style.promoButtonLabel}
                style={style.promoButton}
                hoverColor={deepOrange100}
                disabled={this.props.promotion.id ? false : true}
                onTouchTap={()=>this.props.attractionLink(this.props.attraction.id)} />
            </div>
          }else{
            sizedTicket = <div></div>
          }
    }
    return(
      <div style={this.props.showMorePromotion ? style.largeContainer : style.smallContainer}>
        {sizedTicket}
      </div>
    )
  }
}

export default Promotion
