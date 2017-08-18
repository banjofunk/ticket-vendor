import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as bannerActions from '../../shared/actions'
import SectionHeader from '../../../client/home/components/sectionHeader'
import { BannerManagement } from '../../shared'

import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors';
import { RIETextArea } from 'riek'

@connect((store) => {
  return {
    pageID: store.aboutManagement.pageID,
    content: store.aboutManagement.content,
    showSave: store.aboutManagement.showSave,
    banners: store.adminShared.banners
  }
})
class AboutManagement extends React.Component {
  constructor(props) {
    super(props)
    this._loadAboutPage = this._loadAboutPage.bind(this)
    this._updateMainText = this._updateMainText.bind(this)
    this._savePageContent = this._savePageContent.bind(this)
    this._cancelPageContent = this._cancelPageContent.bind(this)
  }

  componentWillMount(){
    this._loadAboutPage()
  }

  _loadAboutPage(){
    this.props.dispatch(actions.getPage('about'))
    this.props.dispatch(bannerActions.getAllBanners())
    this.props.dispatch(bannerActions.hideBanners())
  }

  _updateMainText(value){
    this.props.dispatch(
      actions.updateMainText(value.textarea)
    )
  }

  _savePageContent(){
    this.props.dispatch(
      actions.savePageContent(this.props.pageID, this.props.content, this.props.banners)
    )
  }

  _cancelPageContent(){
    this._loadAboutPage()
  }

  render() {
    const style = {
      container: {
        width:'100%',
        maxWidth:'1100px',
        margin:'0 auto',
        textAlign:'center'
      },
      headerText:{
        color:'#414042',
        fontSize:'16px',
        lineHeight:'20px',
        fontFamily:'Arvo, serif'
      },
      mainContent:{
        textAlign:'center',
        margin:'20px auto',
        width:'80%',
        minHeight:'160px'
      },
      ccsLogo:{
        width:'200px',
        margin:'15px 0'
      },
      tickets:{
        width:'100%'
      },
      uploader: {
      	width: "0.1px",
      	height: "0.1px",
      	opacity: 0,
      	overflow: "hidden",
      	position: "absolute",
      	zIndex: -1,
      },
      buttonsContainer:{
        position:'fixed',
        backgroundColor:'white',
        borderRadius:5,
        padding:5,
        zIndex:20,
        bottom:5,
        right:5
      },
      saveButton:{},
      cancelButton:{
        marginRight:5
      }
    }
    return(
      <div>
        <BannerManagement ref='bannerList' page='about' />
        <div style={style.container}>
          <SectionHeader sectionTitle={this.props.content.titleText} side='left' />
          <div style={style.mainContent}>
            {this.props.content.mainText &&
              <RIETextArea
                value={this.props.content.mainText}
                change={this._updateMainText}
                style={style.headerText}
                classEditing='textEdit'
                rows={10}
                propName="textarea"
                classLoading="loading"
                classInvalid="invalid"/>
            }
          </div>
          <img src='/assets/logo' style={style.ccsLogo} />
          {this.props.showSave && <div style={style.buttonsContainer}>
            <RaisedButton
              label="Cancel"
              style={style.cancelButton}
              onTouchTap={this._cancelPageContent} />
            <RaisedButton
              label="Save"
              backgroundColor={deepOrange500}
              onTouchTap={this._savePageContent}
              style={style.saveButton} />
          </div>}
        </div>
      </div>
    )
  }
}

export default AboutManagement
