import React from 'react'
import * as actions from '../actions'
import { browserHistory } from 'react-router'

import { SectionDivider } from '../../../shared'
import IconButton from 'material-ui/IconButton'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import ChatIcon from 'material-ui/svg-icons/communication/message'
import { deepOrange500 } from 'material-ui/styles/colors'

class AdminFooter extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const style = {
      container:{
        position:'relative',
        top:25,
        minHeight:'160px',
        width:'100%',
        margin:'10px auto',
        marginBottom:0,
        backgroundColor:deepOrange500
      },
      icons:{
        height:40,
        width:40,
        borderRadius:20,
        marginLeft:5
      },
      sclIcon:{
        display:'inline-block',
        textAlign:'center',
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        margin:0,
        marginLeft:5,
        backgroundColor:'white'
      },
      msgIcon:{
        display:'inline-block',
        position:'relative',
        top:2,
        textAlign:'center',
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        margin:"15px 0 0 5px",
        backgroundColor:'white'
      },
      socialLinks:{
        marginLeft:5
      },
      footerLogo:{
        width:150,
        margin:"10px 5px 0 20px"
      },
      footer1:{
        width:200,
        position:'absolute',
        left:0,
        top:15
      },
      footer2:{
        width:'50%',
        minWidth:250,
        textAlign:'center',
        margin:'25px auto'
      },
      footer3:{
        width:200,
        position:'absolute',
        right:10,
        top:25
      },
      smallFooter:{
        width:'90%',
        textAlign:'center',
        padding:'15px',
        margin:'20px auto'
      }
    }

    let small = (this.props.viewport.width < 857)
    return (
      <div style={style.container}>
        <SectionDivider height='16px' color='#414142' />
        <div style={style.content}>
          <div style={small ? style.smallFooter : style.footer1}>
            <a href='/'>
              <img src='/assets/logo_footer' style={style.footerLogo} />
            </a>
            <div style={style.socialLinks}>
              <a href="http://facebook.com/ticketing4less"
                style={style.sclIcon}
                title="Check out our Facebook page" >
                <img color={deepOrange500} style={{color:'orange', marginTop:8, width:21}} src='/assets/facebook-letter-logo.svg' />
              </a>
              <a href="http://twitter.com/ticketing4less"
                style={style.sclIcon}
                title="Check out our Twitter feed" >
                <img color={deepOrange500} style={{color:'orange', marginTop:8, width:21}} src='/assets/twitter-letter-logo.svg' />
              </a>
              <a href="mailto:info@vacationamenities.com?subject=Website%20Feedback"
                title="Email: info@vacationamenities.com"
                style={style.msgIcon}
                title="Send us a message" >
                <EmailIcon color={deepOrange500} style={{marginTop:8, width:21}} />
              </a>
              <a href='/contact'
                onTouchTap={function(e){
                  e.preventDefault()
                  browserHistory.push('/contact')
                }}
                style={style.msgIcon}
                title="Send us a message" >
                <ChatIcon color={deepOrange500} style={{marginTop:8, width:21}} />
              </a>
            </div>
          </div>
          <div style={small ? style.smallFooter : style.footer2}>
            <span style={{color:'white'}}>
              Myrtle Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Have fun exploring all the great attractions in Myrtle Beach.
            </span>
          </div>
          <div style={small ? style.smallFooter : style.footer3}>
            <div style={{margin:'0 auto', width:190}}>
              <img src='/assets/contact_icon' style={{float:'left'}}/>
              <div style={{float:'left', textAlign:'center', marginTop:8}}>
                <span style={{color:'white'}}>Need Help? Call Us</span>
                <br/>
                <span style={{color:'white'}}>7 AM to 9 PM Daily</span>
                <br/>
                <span style={{color:'white'}}>Central Time</span>
              </div>
            </div>
            <div style={{clear:'both'}} />
            <br />
            <span style={{color:'white', fontSize:30, display:'inline-block', textAlign:'center', marginLeft:4}}>
              (855)493-2582
            </span>
            <br />
            <br />

          </div>

        </div>
        <div style={{clear:'both'}} />
      </div>
    )
  }
}

export default AdminFooter
