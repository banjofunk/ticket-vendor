import React from 'react'
import * as actions from '../actions'

import FlatButton from 'material-ui/FlatButton'
import { deepOrange500, deepOrange100 } from 'material-ui/styles/colors'
import EllipsisText from 'react-ellipsis-text'

class AdminPromotion extends React.Component {
  render() {
    const style = {
      container:{
        display:'inline-block',
        position:'relative',
        width:'240px',
        height:'423px',
        border:'solid thin black',
        margin:'5px'
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
        width:'calc(50% - 10px)',
        height:'90px',
        textAlign:'left'
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
      priceInfo:{
        width:200,
        margin:'20px 5px 8px 5px',
        textAlign:'center'
      },
      promoButton:{
        width:'100%',
        height:40
      },
      promoButtonLabel:{
        color:deepOrange500,
        fontSize:'13px',
        position:'relative',
        right:10
      }
    }
    return(
      <div style={style.container} onTouchTap={this.props.touch}>
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
          labelStyle={style.promoButtonLabel}
          style={style.promoButton}
          hoverColor={deepOrange100}
          onTouchTap={this.props.toggleMorePromotion} />
        {this.props.showMorePromotion && <h1 onTouchTap={this.props.toggleMorePromotion}>test</h1>}
      </div>
    )
  }
}

export default AdminPromotion
