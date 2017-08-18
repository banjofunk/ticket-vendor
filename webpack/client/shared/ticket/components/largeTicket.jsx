import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import EllipsisText from 'react-ellipsis-text'
import { deepOrange500 } from 'material-ui/styles/colors'
import withSizes from 'react-sizes'

@withSizes(({ width }) => ({
  small: width < 480,
  medium: (width >= 480 && width < 780)
}))
export class LargeTicket extends React.Component {
  render() {
    const style = {
      container: {
        position:'relative',
        width:'95%',
        minHeight:'270px',
        margin:"20px auto",
      },
      ticketTop:{
        minHeight:110,
      },
      ticketBottom:{
        minHeight:200
      },
      logo:{
        width:200,
        margin:5,
        float:'left',
      },
      attrInfo:{
        display:'inline-block',
        marginTop:10,
        textAlign:'left',
        float:this.props.medium ? 'right' : 'left',
        width:this.props.medium ? 'calc(100% - 220px)' : 'calc(100% - 420px)'
      },
      priceInfo:{
        width:200,
        margin:'20px 5px',
        float:this.props.medium ? 'left' : 'right',
      },
      attrImage:{
        width:200,
        position:'absolute',
        left:0,
        bottom:0
      },
      attrDesc:{
        display:'inline-block',
        whiteSpace:'pre-wrap',
        width:'calc(100% - 220px)',
        float:'right',
        padding:5,
        margin:'0 10px',
        color: '#414042',
        fontSize: '16px',
        textAlign:'left',
        lineHeight: '20px',
        fontFamily: 'Arvo, serif'
      },
      buyButton:{
        width:'150px'
      },
      title:{
        display:'block',
        fontSize:'25px',
        textAlign:'center',
        lineHeight:'29px',
        color:'#231f20',
        fontWeight:'600'
      },
      subtitle:{
        display:'block',
        textAlign:'center',
        whiteSpace:'pre-wrap',
        fontSize:'14px',
        lineHeight:'15px',
        color:'#231f20'
      },
      shortDescription:{
        display:'block',
        textAlign:'center',
        whiteSpace:'pre-wrap',
        marginTop:10,
        fontSize:'18px',
        lineHeight:'18px'
      },
      hours:{
        lineHeight: '1.33',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '13px'
      },
      subHead:{
        fontSize:'18px',
        lineHeight:'20px',
        color:'#231f20',
        marginTop:8,
        fontWeight:'lighter',
        fontStyle:'italic'
      }
    }

    let priceInfo
    if(this.props.promotion.callCenter){
      priceInfo =
        <div style={style.priceInfo}>
          <h2 style={{fontWeight:'lighter', fontStyle:'italic'}}>OUR RETAIL PRICE</h2>
          <div style={{margin:'5px auto'}}>
            <span style={{color:deepOrange500, fontSize:22}}>${this.props.promotion.discounted.toFixed(2)}</span>
            <span>&nbsp;|&nbsp;</span>
            <strike style={{color:'black', lineDecoration:'line-through'}}>
              <span style={{color:'#AAA', fontSize:20}}>${this.props.promotion.retail.toFixed(2)}</span>
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
        </div>
    }else{
      priceInfo =
        <div style={style.priceInfo}>
          <h2 style={{fontWeight:'lighter', fontStyle:'italic'}}>OUR RETAIL PRICE</h2>
          <div style={{margin:'5px auto'}}>
            <span style={{color:deepOrange500, fontSize:22}}>${this.props.promotion.discounted.toFixed(2)}</span>
            <span>&nbsp;|&nbsp;</span>
            <strike style={{color:'black', lineDecoration:'line-through'}}>
              <span style={{color:'#AAA', fontSize:20}}>${this.props.promotion.retail.toFixed(2)}</span>
            </strike>
          </div>
          <RaisedButton
            label='Buy Now'
            labelColor='white'
            buttonStyle={style.buyButton}
            onTouchTap={()=>this.props.addToCart(this.props.promotion)}
            backgroundColor={deepOrange500} />
        </div>
    }
    return (
      <Paper style={style.container} zDepth={3} key={this.props.promotion.id}>
        <div style={style.ticketTop}>
          {!this.props.medium && <img style={style.logo} src={this.props.promotion.logoImg} />}
          <div style={style.attrInfo}>
            <span style={style.title}>{this.props.promotion.title}</span>
            <span style={style.subtitle}>{this.props.promotion.subtitle}</span>
            <span style={style.shortDescription}>{this.props.promotion.shortDescription}</span>
          </div>
          {priceInfo}
          <div style={{clear:'both'}} />
        </div>
        <div style={style.ticketBottom}>
          <img style={style.attrImage} src={this.props.promotion.promoImg} />
          <div style={style.attrDesc}>
            <EllipsisText
              text={this.props.promotion.description}
              length={600} />
          </div>
        </div>
      </Paper>
    )
  }
}

export default LargeTicket
