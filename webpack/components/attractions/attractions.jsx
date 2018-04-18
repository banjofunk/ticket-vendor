import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as attractionActions from 'actions/attractions';
import { PageLayout, SectionHeader } from 'components/shared/layout'
import Attraction from './attraction'
import { Spinner, Intent } from "@blueprintjs/core"

require('./attractions.scss')

const Attractions = ({ actions, attractions, fetching, fetched, banners}) => {

  if(!fetched){ actions.getAttractions() }

  const attractionLinks = attractions.map(
    (attraction, index) =>
      <Attraction
        key={`attraction-${index}`}
        attraction={attraction}/>
  )

  return(
    <PageLayout>
      <div className={'home-row'}>
        <SectionHeader sectionTitle="Our Attractions" side='left' />
        <div className={'home-content'} height={440}>
          {fetching && <Spinner intent={Intent.PRIMARY} />}
          {attractionLinks}
        </div>
      </div>
    </PageLayout>
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(attractionActions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  attractions: state.attractions.attractions,
  fetching: state.attractions.fetching,
  fetched: state.attractions.fetched
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Attractions)
)
