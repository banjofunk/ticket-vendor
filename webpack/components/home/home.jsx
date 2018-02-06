import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as attractionActions from 'actions/attractionActions';
import { PageLayout } from 'components/shared/layout'
import AttractionsRow from './attractionsRow'
import SponsorsRow from './sponsorsRow'
require('./home.scss')

const Home = ({attractions, fetching, fetched, banners}) => {
  const sponsors = attractions.filter( attraction => attraction.sponsor )
  return(
    <PageLayout banners={banners}>
      <AttractionsRow
        attractions={attractions}
        fetching={fetching}
        fetched={fetched} />
      <SponsorsRow sponsors={sponsors} />
    </PageLayout>
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(attractionActions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  attractions: state.attractionReducer.attractions,
  fetching: state.attractionReducer.fetching,
  fetched: state.attractionReducer.fetched
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home)
)
