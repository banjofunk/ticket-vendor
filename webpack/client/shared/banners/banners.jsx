import React from 'react'
import Slider from 'react-slick'

export class Banners extends React.Component {
  render() {
    const style = {}
    
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
      for (var banner of sortBanners) {
        const key = `mainBanner-${banner.position}`
        mainBanners.push(
          <img key={key} src={banner.src} />
        )
      }
    }else{
      mainBanners = [<img style={{height:210, width:1}}  key={'keyDefault'}/>]
    }

    return (
      <Slider { ...sliderSettings }>
        {mainBanners}
      </Slider>
    )
  }
}

export default Banners
