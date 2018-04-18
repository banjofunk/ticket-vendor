import React from 'react'
import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Card } from '@blueprintjs/core'
import * as adminTaxActionCreators from 'actions/admin/taxes';
import { SectionHeader } from 'components/shared/layout'
import TaxTable from './taxTable'
import TaxForm from './taxForm'
import {
  promotionPath,
  newPromotionTaxPath,
  promotionTaxPath
} from 'paths/admin'

import './taxes.scss'

export class Taxes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      backPath: null
    }
  }

  componentDidMount(){
    const { actions, match, taxesFetched } = this.props
    if(!taxesFetched){ actions.getTaxes() }
    const backPath = promotionPath(match.params.promotionId)
    this.setState({ backPath })
  }

  _taxTable = () => {
    const { actions, promotion, taxes } = this.props
    return(
      <TaxTable
        actions={actions}
        backPath={this.state.backPath}
        promotion={promotion}
        taxes={taxes} />
    )
  }

  _editTaxForm = () => {
    const { actions, tax, taxEdited } = this.props
    return(
      <TaxForm
        actions={actions}
        backPath={this.state.backPath}
        edited={taxEdited}
        tax={tax} />
    )
  }

  _newTaxForm = () => {
    const { actions, tax, taxEdited } = this.props
    return(
      <TaxForm
        actions={actions}
        backPath={this.state.backPath}
        edited={taxEdited}
        tax={tax} />
    )
  }

  render() {
    const { location } = this.props
    return (
      <Card elevation={1} className={'tax-container'}>
        <SectionHeader
          sectionTitle={'Taxes'}
          side='left' />

        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade">
            <Switch location={location}>
              <Route exact
                path={promotionPath(':promotionId')}
                component={this._taxTable} />
              <Route exact
                path={newPromotionTaxPath(':promotionId')}
                component={this._newTaxForm} />
              <Route exact
                path={promotionTaxPath(':promotionId', ':taxId')}
                component={this._editTaxForm} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(adminTaxActionCreators, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  taxes: state.admin.taxes.taxes,
  taxesFetched: state.admin.taxes.fetched,
  tax: state.admin.tax.tax,
  taxEdited: state.admin.tax.edited
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Taxes)
)
