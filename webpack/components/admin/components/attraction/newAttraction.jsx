import React from 'react'
import { withRouter, Redirect, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as adminAttractionActionCreators from 'actions/admin/attractions';

import { Button, Card, NonIdealState } from '@blueprintjs/core'
import { SectionHeader } from 'components/shared/layout'
import AttractionForm from './attractionForm'
import {
  attractionsPath,
  attractionPath
} from 'paths/admin'
import './attraction.scss'

export class NewAttraction extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirectTo: null
    }
  }

  componentDidMount() {
    this.props.actions.clearAttraction()
  }

  componentDidUpdate(prevProps, prevState) {
    const { attraction } = this.props
    if(attraction.id && attraction.id !== prevProps.attraction.id){
      const redirectTo = attractionPath(attraction.id)
      this.setState({redirectTo})
    }
  }

  _cancel = () => {
    this.props.actions.clearAttraction()
  }

  _submit = () => {
    const { actions, attraction } = this.props
    actions.createAttraction(attraction)
  }

  render() {
    const { actions, attraction, edited } = this.props

    if(this.state.redirectTo){
      return <Redirect to={this.state.redirectTo} />
    }

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
            cancel={this._cancel}
            attraction={attraction}
            update={actions.updateAttractionForm}
            submit={this._submit}
            edited={edited} />
        </Card>
        <Card elevation={1} className={'attraction-card'}>
          <SectionHeader
            sectionTitle={'Promotions'}
            side='left' />
          <NonIdealState
            visual="document"
            title="Create attraction first" />
        </Card>
      </div>
    )

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators( adminAttractionActionCreators, dispatch )
})

const mapStateToProps = (state, ownProps) => ({
  attraction: state.admin.attraction.attraction,
  edited: state.admin.attraction.edited
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewAttraction)
)
