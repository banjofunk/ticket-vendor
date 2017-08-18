import React from 'react'
import { connect } from 'react-redux'
import * as bannerActions from '../../shared/actions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import HighlighOff from 'material-ui/svg-icons/action/highlight-off';
import ReactS3Uploader from 'react-s3-uploader'
import Slider from 'react-slick'
import Reorder from 'react-reorder'

@connect((store) => {
  return {
    banners: store.adminShared.banners,
    allBanners: store.adminShared.allBanners,
    showBannerEdit: store.adminShared.showBannerEdit,
    showBannerAdd: store.adminShared.showBannerAdd
  }
})

class BannerManagement extends React.Component {
  constructor(props) {
    super(props)
    this._toggleBannerEdit = this._toggleBannerEdit.bind(this)
    this._toggleBannerAdd = this._toggleBannerAdd.bind(this)
    this._deleteBanner = this._deleteBanner.bind(this)
    this._removeBanner = this._removeBanner.bind(this)
    this._onPushBanner = this._onPushBanner.bind(this)
    this._reorderBanners = this._reorderBanners.bind(this)
    this._onUploadFinish = this._onUploadFinish.bind(this)
  }

  _toggleBannerEdit(){
    this.props.dispatch(
      bannerActions.toggleBannerEdit(this.props.showBannerEdit)
    )
  }

  _toggleBannerAdd(){
    this.props.dispatch(
      bannerActions.toggleBannerAdd(this.props.showBannerAdd)
    )
  }

  _deleteBanner(event){
    this.props.dispatch(
      bannerActions.deleteBanner(event.currentTarget.dataset.bannerId)
    )
  }

  _removeBanner(event){
    this.props.dispatch(
      bannerActions.removeBanner(this.props.page, event.currentTarget.dataset.bannerId)
    )
  }

  _onPushBanner(event){
    this.props.dispatch(
      bannerActions.onPushBanner(this.props.page, event.target.dataset.bannerId)
    )
  }

  _reorderBanners(event, item, index, newIndex, list){
    let newBanners = []
    for (var i = 0; i < list.length; i++) {
      const bannerId = list[i].props['data-banner-id']
      const bannerSrc = list[i].props['data-banner-src']
      newBanners.push(
        {id:bannerId, position:i, src:bannerSrc}
      )
    }
    this.props.dispatch(
      bannerActions.reorderBanners(newBanners)
    )
  }

  _onUploadFinish=(response)=>{
    let url = response.signedUrl.split("?")[0]
    this.props.dispatch(
      bannerActions.bannerUploadFinished(url)
    )
  }

  _onUploadProgress=(percent, message)=>{
    console.log(percent, message)
  }

  render() {
    const sliderSettings = {
      dots: false,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite:true,
      speed:1000,
      arrows:false
    }

    const style = {
      iconBanner:{
        width:'60%',
        marginLeft:'20%',
        position:'relative'
      },
      actionButton:{
        position:'absolute',
        top:'5px',
        left:'-5px'
      }
    }

    let mainBanners = []
    const sortBanners = this.props.banners.sort(function(a, b) {
      return parseFloat(a.position) - parseFloat(b.position);
    })

    if(this.props.banners.length > 0){
      for (var banner of sortBanners) {
        const key = `mainBanner-${banner.id}`
        mainBanners.push(
          <img key={key} src={banner.src} onTouchTap={this._toggleBannerEdit} />
        )
      }
    }else{
      mainBanners = [<img style={{height:210, width:1}}  key={'keyDefault'}/>]
    }

    let iconBanners = []
    for (var banner of sortBanners) {
      const key = `iconBanner-${banner.id}`
      iconBanners.push(
        <div key={key}
             data-banner-id={banner.id}
             data-banner-position={banner.position}
             data-banner-src={banner.src}
             style={style.iconBanner}>
          <FloatingActionButton
            style={style.actionButton}
            mini={true}
            secondary={true}
            data-banner-id={banner.id}
            onTouchTap={this._removeBanner}
          >
            <HighlighOff />
          </FloatingActionButton>
          <img
            src={banner.src}
            style={{width:'100%', marginTop:10}} />
        </div>
      )
    }

    let allBanners = []
    for (var banner of this.props.allBanners) {
      const key = `allBanner-${banner.id}`
      allBanners.push(
        <div key={key} style={{position:'relative'}}>
          <FloatingActionButton
           style={style.actionButton}
           mini={true}
           secondary={true}
           data-banner-id={banner.id}
           onTouchTap={this._deleteBanner}
          >
           <HighlighOff />
          </FloatingActionButton>
          <img data-banner-id={banner.id}
               style={{width:'100%'}}
               src={banner.src}
               onTouchTap={this._onPushBanner} />
        </div>
      )
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this._toggleBannerAdd}
      />
    ]
    return(
      <div>
      	<Slider { ...sliderSettings }>
        	{mainBanners}
        </Slider>
        {this.props.showBannerEdit &&
          <div style={{textAlign:'center'}}>
            {this.props.banners.length > 0 &&
              <Reorder
                itemKey='key'
                lock='horizontal'
                holdTime='100'
                callback={this._reorderBanners}
                list={iconBanners} />}
            {!this.props.showBannerAdd &&
              <RaisedButton label="Add Banner"
                            primary={true}
                            onTouchTap={this._toggleBannerAdd} />
            }
            <Dialog
              title="Add a Banner"
              actions={actions}
              modal={false}
              open={this.props.showBannerAdd}
              onRequestClose={this._toggleBannerAdd}
              autoScrollBodyContent={true} >
              {allBanners}
              <ReactS3Uploader
                signingUrl="/api/admin/upload/signature"
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read', 'Access-Control-Allow-Origin': '*' }}
                name="file"
                id="file"
                onProgress={this._onUploadProgress}
                onFinish={this._onUploadFinish} />
            </Dialog>
          </div>
        }
      </div>
    )
  }
}

export default BannerManagement
