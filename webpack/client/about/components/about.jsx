import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import SectionHeader from '../../home/components/sectionHeader'
import { deepOrange500 } from 'material-ui/styles/colors';
import Slider from 'react-slick'
import { DropIn } from 'braintree-react'
import braintree from 'braintree-web'

@connect((store) => {
  return {
    content: store.about.content,
    banners: store.about.banners
  }
})
class About extends React.Component {
  componentWillMount(){
    this.props.dispatch(actions.getPage('about'))
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
        whiteSpace: 'pre-wrap',
        fontSize:'16px',
        lineHeight:'20px',
        fontFamily:'Arvo, serif'
      },
      tickets:{
        width:'100%'
      }
    }

    const sliderSettings = {
      dots: false,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite:true,
      speed:1000,
      arrows:false
    }

    let mainBanners = []
    if(this.props.banners.length > 0){
      const sortBanners = this.props.banners.sort(function(a, b) {
        return parseFloat(a.position) - parseFloat(b.position);
      })
      for (var banner of this.props.banners) {
        const key = `mainBanner-${banner.id}`
        mainBanners.push(
          <img key={key} src={banner.src} />
        )
      }
    }else{
      mainBanners = [<img style={{height:210, width:1}}  key={'keyDefault'}/>]
    }
    return(
      <div>
        <Slider { ...sliderSettings }>
          {mainBanners}
        </Slider>
        <div style={style.container}>
          <SectionHeader sectionTitle={'About'} color={deepOrange500} side='left' />
          <div style={{textAlign:'center', margin:'20px auto', width:'80%'}}>
            <span style={style.headerText}>{this.props.content.text}</span>
          </div>
          <img src='/assets/logo' style={{width:'200px', margin:'52px 0'}} />
        </div>
      </div>
    )
  }
}

export default About
