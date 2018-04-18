import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as attractionActionCreators from 'actions/admin/attractions';
import * as adminPromotionActionCreators from 'actions/admin/promotions';

import { Button, Card, Intent, NonIdealState } from '@blueprintjs/core'

import { SectionHeader } from 'components/shared/layout'
import Promotion from './promotion'
import AttractionForm from './attractionForm'
import NewPromotionRow from './newPromotionRow'
import { attractionsPath, newAttractionPromotionPath } from 'paths/admin'

import './attraction.scss'

export class Attraction extends React.Component {
  componentDidMount() {
    const { actions, attraction, match } = this.props
    const paramsID = parseInt(match.params.attractionId)
    if(attraction.id !== paramsID){
      actions.getAttraction( paramsID )
    }
  }

  _toggleActive = (promotion) => {
    const { promoActions } = this.props
    promotion.active = !promotion.active
    promoActions.updatePromotion(promotion)
  }

  _cancel = () => {
    const { actions, attraction } = this.props
    actions.getAttraction(attraction.id)
  }

  _submit = () => {
    const { actions, attraction } = this.props
    actions.updateAttraction(attraction)
  }

  _update = (field, value) => {
    this.props.actions.updateAttractionForm(field, value)
  }

  render() {
    const { attraction, edited, promoActions } = this.props
    const promotions = attraction.promotions.map(
      (promotion, idx) =>
        <Promotion key={idx}
          deletePromotion={promoActions.deletePromotion}
          toggleActive={this._toggleActive}
          promotion={promotion} /> )
    const promotionsSection =
      promotions.length > 0
        ? <table class="pt-table pt-striped pt-condensed promotions-table">
            <thead>
              <tr>
                <th>Promotion</th>
                <th>MSRP</th>
                <th>Price</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {promotions}
              <NewPromotionRow attraction={attraction} />
            </tbody>
          </table>
        : <NonIdealState
            action={
              <Link to={newAttractionPromotionPath(attraction.id)}>
                <Button
                  className={'new-promotion'}
                  iconName={'add'}
                  intent={Intent.SUCCESS}
                  text={'Create Promotion'} />
              </Link>
            }
            visual="tag"
            title="No Promotions Available" />

    return(
      <div className={'admin-attraction-page'}>
        <SectionHeader
          backButton={attractionsPath()}
          sectionTitle={'Attraction Information'}
          side='left' />
        <Card elevation={1} className={'attraction-card'}>
          <SectionHeader
            sectionTitle={'General'}
            side='right' />
          <AttractionForm
            attraction={attraction}
            cancel={this._cancel}
            edited={edited}
            update={this._update}
            submit={this._submit} />
        </Card>
        <Card elevation={1} className={'attraction-card'}>
          <SectionHeader
            sectionTitle="Promotions"
            side='left' />
          <div className={'attraction-page-container'}>
            {promotionsSection}
          </div>
        </Card>
      </div>
    )

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(attractionActionCreators, dispatch),
  promoActions: bindActionCreators(adminPromotionActionCreators, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  attraction: state.admin.attraction.attraction,
  edited: state.admin.attraction.edited
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Attraction)
)
