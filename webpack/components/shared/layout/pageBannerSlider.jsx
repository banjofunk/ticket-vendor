import React from 'react'
import Slider from 'react-slick'

const sliderSettings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite:true,
  speed:1000,
  arrows:false
}

const pageBanners = (banners) => banners.map( bnr =>
  <img key={`bnr-${bnr.src}`} src={bnr.src} />
)

const PageBannerSlider = ({banners=[]}) => {
  let bannerSlider
  switch (banners.length) {
    case 0:
      bannerSlider = <div></div>
      break;
    case 1:
      bannerSlider =
        <div className={'one-bnr'}>
          <img key={`bnr-${banners[0].src}`} src={banners[0].src} />
        </div>
      break;
    default:
      bannerSlider =
        <Slider { ...sliderSettings }>
          {pageBanners(banners)}
        </Slider>
  }
  return(
    <div className={'slider-container'}>
      {bannerSlider}
    </div>
)}

export default PageBannerSlider
