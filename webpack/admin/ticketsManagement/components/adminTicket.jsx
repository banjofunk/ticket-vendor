import React from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import EllipsisText from 'react-ellipsis-text'
import { deepOrange500 } from 'material-ui/styles/colors'


@connect((store) => {
  return {
    viewport: store.clientLayout.viewport || store.adminLayout.viewport
  }
})
class AdminTicket extends React.Component {
  render() {
    let small = (this.props.viewport.width < 500)
    let medium = (this.props.viewport.width >= 500 && this.props.viewport.width < 780)

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
        float:medium ? 'right' : 'left',
        width:medium ? 'calc(100% - 220px)' : 'calc(100% - 420px)'
      },
      priceInfo:{
        width:200,
        margin:'20px 5px',
        float:medium ? 'left' : 'right',
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
        fontSize:'25px',
        lineHeight:'29px',
        color:'#231f20',
        fontWeight:'600'
      },
      subtitle:{
        display:'block',
        whiteSpace:'pre-wrap',
        fontSize:'14px',
        lineHeight:'19px',
        color:'#231f20'
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
      },
    }


    let priceInfo
    if(this.props.ticket.callCenter){
      priceInfo =
        <div style={style.priceInfo}>
          <h2 style={{fontWeight:'lighter', fontStyle:'italic'}}>OUR RETAIL PRICE</h2>
          <div style={{margin:'5px auto'}}>
            <span style={{color:deepOrange500, fontSize:22}}>${this.props.ticket.discounted}</span>
            <span>&nbsp;|&nbsp;</span>
            <strike style={{color:'black', lineDecoration:'line-through'}}>
              <span style={{color:'#AAA', fontSize:20}}>${this.props.ticket.retail}</span>
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
            <span style={{color:deepOrange500, fontSize:22}}>${this.props.ticket.discounted}</span>
            <span>&nbsp;|&nbsp;</span>
            <strike style={{color:'black', lineDecoration:'line-through'}}>
              <span style={{color:'#AAA', fontSize:20}}>${this.props.ticket.retail}</span>
            </strike>
          </div>
          <RaisedButton
            label='Buy Now'
            labelColor='white'
            buttonStyle={style.buyButton}
            backgroundColor={deepOrange500} />
        </div>
    }


    return(
      <div>
        {this.props.ticket && <Paper style={style.container} zDepth={3} key={this.props.ticket.id}>
          <div style={style.ticketTop}>
            {!medium && <img style={style.logo} src={this.props.ticket.logoImg} />}
            <div style={style.attrInfo}>
              <span style={style.title}>{this.props.ticket.title}</span>
              <br />
              <span style={style.subtitle}>{this.props.ticket.subtitle}</span>
            </div>
            {priceInfo}
            <div style={{clear:'both'}} />
          </div>
          <div style={style.ticketBottom}>
            <img style={style.attrImage} src={this.props.ticket.promoImg} />
            <div style={style.attrDesc}>
              <EllipsisText
                text={this.props.ticket.description}
                length={
                  this.props.preview ?
                  (this.props.viewport.width/2.5)+(this.props.viewport.width/6) :
                  (this.props.viewport.width/1.5)} />
            </div>
          </div>
        </Paper>}
      </div>
    )
  }
}

export default AdminTicket
