import React from 'react'
import { withRouter, Route } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as adminPromotionActionCreators from 'actions/admin/promotions';

import { Button } from '@blueprintjs/core'
import { SectionHeader } from 'components/shared/layout'
import Inventory from './inventory'
import PromotionForm from './promotionForm'
import Taxes from './taxes'
import Tickets from './tickets'
import {
  attractionPath,
  promotionPath
} from 'paths/admin'
import './promotion.scss'

export class Promotion extends React.Component {
  componentDidMount() {
    this._loadPromotion()
  }

  _loadPromotion = () => {
    const { actions, match, promotion } = this.props
    const { promotionId } = match.params
    actions.getPromotion(promotionId)
  }

  _submit = () => {
    const { actions, promotion } = this.props
    actions.updatePromotion(promotion)
  }

  render() {
    const { actions, edited, exported, promotion } = this.props

    return(
      <div className={'admin-promotion-page'}>
        <SectionHeader
          backButton={attractionPath(promotion.attraction_id)}
          sectionTitle={'Promotion Information'}
          side='left' />
        <PromotionForm
          cancel={this._loadPromotion}
          promotion={promotion}
          update={actions.updatePromotionForm}
          submit={this._submit}
          edited={edited} />
        <Taxes promotion={promotion} />
        <Inventory
          actions={actions}
          exported={exported}
          promotion={promotion} />
        <Tickets
          cancel={this._loadPromotion}
          edited={edited}
          promotion={promotion}
          submit={this._submit}
          update={actions.updatePromotionForm} />
      </div>
    )

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators( adminPromotionActionCreators, dispatch )
})

const mapStateToProps = (state, ownProps) => ({
  promotion: state.admin.promotion.promotion,
  exported: state.admin.promotion.exported,
  edited: state.admin.promotion.edited
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Promotion)
)
