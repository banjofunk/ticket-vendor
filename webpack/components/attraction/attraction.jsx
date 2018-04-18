import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as attractionActionCreators from 'actions/attractions';
import * as cartActionCreators from 'actions/cart';
import { Button, Card, NonIdealState } from '@blueprintjs/core'

import { PageLayout, SectionHeader } from 'components/shared/layout'
import Promotion from './promotion'

import './attraction.scss'

export class Attraction extends React.Component {
  componentDidMount() {
    const { attractionActions, match } = this.props
    const attractionId = match.params.attractionId
    attractionActions.getAttraction( attractionId )
  }

  _addToCart = (id) => {
    this.props.cartActions.addToCart(id)
  }

  render() {
    const { attraction, match, history } = this.props
    const activePromotions = attraction.promotions.filter(p => p.active)
    const promotions = activePromotions.map(
      promotion =>
        <Promotion
          key={`ticket-${promotion['id']}`}
          addToCart={this._addToCart}
          promotion={promotion} /> )
    const promotionsSection =
      promotions.length > 0
        ? <table class="pt-table promotions-table">
            <thead>
              <tr>
                <th>Promotion</th>
                <th>MSRP</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {promotions}
            </tbody>
          </table>
        : <NonIdealState
            visual="tag"
            title="No Promotions Available" />

    return(
      <PageLayout>
        <SectionHeader
          backButton={'/'}
          sectionTitle={attraction.name}
          side='left' />
        <div className={'attraction-page-container'}>
          <Card className={'attraction-card'} elevation={2}>
            {attraction.description &&
              <span className={'description'}>
                {attraction.description}
              </span>
            }
            <div className={'logo-container'}>
              <img src={attraction.logo} />
            </div>
            <SectionHeader
              sectionTitle="Current Promotions"
              side='right' />
            {promotionsSection}
          </Card>
        </div>
      </PageLayout>
    )

  }
}

const mapDispatchToProps = (dispatch) => ({
  attractionActions: bindActionCreators(attractionActionCreators, dispatch),
  cartActions: bindActionCreators(cartActionCreators, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  attraction: state.attraction.attraction,
  fetching: state.attraction.fetching,
  fetched: state.attraction.fetched
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Attraction)
)
