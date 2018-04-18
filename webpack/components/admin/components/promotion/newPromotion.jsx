import React from 'react'
import { withRouter, Redirect, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as adminAttractionActionCreators from 'actions/admin/attractions';
import * as adminPromotionActionCreators from 'actions/admin/promotions';
import * as adminTaxActionCreators from 'actions/admin/taxes';

import { Button, NonIdealState } from '@blueprintjs/core'
import { SectionHeader } from 'components/shared/layout'
import PromotionForm from './promotionForm'
import {
  attractionPath,
  promotionPath
} from 'paths/admin'
import './promotion.scss'

export class AdminNewPromotion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirectTo: null
    }
  }

  componentDidMount() {
    this.props.actions.clearPromotion()
  }

  componentDidUpdate(prevProps, prevState) {
    const { promotion } = this.props
    if(promotion.id && promotion.id !== prevProps.promotion.id){
      const redirectTo = promotionPath(promotion.id)
      this.setState({redirectTo})
    }
  }

  _cancel = () => {
    const { attractionId } = this.props.match.params
    const redirectTo = attractionPath(attractionId)
    this.setState({ redirectTo })
  }

  _submit = () => {
    const { actions, match, promotion } = this.props
    const { attractionId } = match.params
    actions.createPromotion({ ...promotion,
      attraction_id: attractionId
    })
  }

  render() {
    const { actions, match, promotion, edited } = this.props
    const { attractionId } = match.params
    const backPath = attractionPath(attractionId)

    if(this.state.redirectTo){
      return <Redirect to={this.state.redirectTo} />
    }

    return(
      <div className={'admin-promotion-page'}>
        <SectionHeader
          backButton={backPath}
          sectionTitle={'Promotion Information'}
          side='left' />
        <PromotionForm
          cancel={this._cancel}
          promotion={promotion}
          update={actions.updatePromotionForm}
          submit={this._submit}
          edited={edited} />
        <SectionHeader
          sectionTitle={'Taxes'}
          side='right' />
        <NonIdealState
          visual="document"
          title="Create promotion first" />
      </div>
    )

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators( adminPromotionActionCreators, dispatch )
})

const mapStateToProps = (state, ownProps) => ({
  promotion: state.admin.promotion.promotion,
  edited: state.admin.promotion.edited
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminNewPromotion)
)
