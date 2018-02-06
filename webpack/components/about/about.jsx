import React from 'react'
import { fetchJSON } from 'utils'
import { pagePath } from 'utils/apiPaths'
import { PageLayout, SectionHeader, SectionDivider } from 'components/shared/layout'
require('./about.scss')

class About extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      banners:[],
      content:{}
    }
  }

  componentWillMount(){
    fetchJSON(pagePath('about'))
    .then(({banners, content}) => {
      this.setState({ banners, content })
    })
  }

  render() {
    const { banners, content } = this.state
    return(
      <PageLayout banners={banners}>
        <SectionHeader sectionTitle={content.titleText} side='left' />
        <SectionDivider height={'25px'} color={'white'}/>
        <div className={'about-content'}>
          <span className={'header-text'}>{content.mainText}</span>
        </div>
        <div className={'about-logo row'}>
          <img src='/assets/logo' />
        </div>
      </PageLayout>
    )
  }
}

export default About
