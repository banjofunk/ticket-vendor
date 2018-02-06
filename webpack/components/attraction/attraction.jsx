import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as promotionActions from 'actions/promotionActions';

import SectionHeader from 'components/shared/layout/sectionHeader'
import { Ticket } from 'components/shared'

const Attraction = ({
  match,
  attractions,
  attractionsFetching,
  attractionsFetched,
  promotions,
  promotionsFetching,
  promotionsFetched
}) => {
  const attraction = attractions.filter( attraction =>
    attraction.id === parseInt(match.params.id))
  const promos = promotions.
    filter( attraction =>
      attraction.id === parseInt(match.params.id)).
    map( promotion =>
      <Ticket
        key={`ticket-${promotion['id']}`}
        addToCart={()=>{debugger}}
        promotion={promotion} /> )

  return(
    <div>
      <SectionHeader
        sectionTitle={
          <span style={{marginLeft:5}}>
            {attraction.name}
          </span>}
        side='left' />
      <div style={{clear:'both'}} />
      <div>
        <img src={attraction.logo} />
      </div>
      <div>
        <span>
          {attraction.description}
        </span>
      </div>
      {promotions.length > 0 &&
        <div style={{textAlign:'center'}}>
          <SectionHeader
            sectionTitle="Current Promotions"
            side='right' />
          {promos}
        </div>}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(promotionActions, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  attractions: state.attractionReducer.attractions,
  attractionsFetching: state.attractionReducer.isFetching,
  attractionsFetched: state.attractionReducer.isFetched,
  promotions: state.promotionReducer.promotions,
  promotionsFetching: state.promotionReducer.isFetching,
  promotionsFetched: state.promotionReducer.isFetched
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Attraction)
)
