import React from 'react'
import Footer from './footer'
import PageBannerSlider from './pageBannerSlider'
import { SectionDivider } from 'components/shared/layout'
import Navbar from './navbar'

require('./pageLayout.scss')

const PageLayout = ({banners=[], children}) => {
  let slider, divider

  if(banners.length > 0){
    slider = <PageBannerSlider banners={banners} />
    divider = <SectionDivider height={'20px'}/>
  }else{
    slider = <SectionDivider height={'20px'} color={'#ff5722'}/>
    divider = <SectionDivider height={'20px'} color={'white'}/>
  }

  return(
    <div className={'page-layout'}>
      <Navbar />
      {slider}
      {divider}
      {children}
      <Footer />
    </div>
  )
}
export default PageLayout
