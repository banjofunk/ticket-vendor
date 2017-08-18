import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import EllipsisText from 'react-ellipsis-text'
import { deepOrange500, deepOrange100 } from 'material-ui/styles/colors'
import { browserHistory } from 'react-router'

export class AffiliateTicket extends React.Component {
  constructor(props){
    super(props)
    this._attractionLink = this._attractionLink.bind(this)
  }

  _attractionLink(){
    browserHistory.push(`/affiliates/${this.props.attraction.id}`)
  }

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
        backgroundColor: deepOrange500
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
      descText:{
        fontSize:'15px',
        lineHeight:'17px',
        whiteSpace:'pre-wrap',
        textAlign:'center',
        position:'relative',
        top:35,
        left:10
      },
      promoButton:{
        position:'absolute',
        bottom:'10px',
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

    return (
      <div style={style.smallContainer}>
        <img src={this.props.attraction.promoImg} style={style.headerImg} />
        <div style={style.title}>
          <span style={style.titleText}>{this.props.attraction.name}</span>
        </div>
        {this.props.attraction.description &&
          <div style={style.description}>
            <span style={style.descText}>
              <EllipsisText
                text={this.props.attraction.description}
                length={137} />
            </span>
          </div>}
        {!this.props.attraction.description &&
          <div style={{width:'100%', textAlign:'center'}}>
            <img src={this.props.attraction.logoImg} style={{height:90, position:'relative', top:35, marginTop:-9}} />
          </div>}
        <FlatButton
          label='View Promotions'
          data-promo-id={this.props.attraction.id}
          labelStyle={style.promoButtonLabel}
          style={style.promoButton}
          hoverColor={deepOrange100}
          disabled={this.props.attraction.id ? false : true}
          onTouchTap={this._attractionLink} />
      </div>
    )
  }
}

export default AffiliateTicket
