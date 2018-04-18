import React from 'react'
import { withRouter, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as adminAttractionActionCreators from 'actions/admin/attractions';

import { Card } from '@blueprintjs/core'
import { fetchJSON } from 'utils'
import { PageLayout, SectionHeader } from 'components/shared/layout'
import AttractionsTable from './attractionsTable'

import './adminAttractions.scss'

export class Attractions extends React.Component {
  componentWillMount(){
    const { actions, fetched } = this.props
    if(!fetched){ actions.getAttractions() }
  }

  _toggleActive = (attraction) => {
    const { actions } = this.props
    attraction.active = !attraction.active
    actions.updateAttraction(attraction)
  }


  render() {
    const { actions, attractions, fetching } = this.props

    return (
      <div className={'admin-attractions-page'}>
        <SectionHeader sectionTitle={'Attractions'} side='left' />
        <Card className={'attractions-card'} elevation={2}>
          <AttractionsTable
            attractions={attractions}
            deleteAttraction={actions.deleteAttraction}
            toggleActive={this._toggleActive}
            fetching={fetching} />
        </Card>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(adminAttractionActionCreators, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  attractions: state.admin.attractions.attractions,
  fetched: state.admin.attractions.fetched,
  fetching: state.admin.attractions.fetching
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Attractions)
)
