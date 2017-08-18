import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

@connect((store) => {
  return {
    test: store.adminSettings.test
  }
})
class AdminSettings extends React.Component {
  componentWillMount(){
    this.props.dispatch(
      actions.adminSettingsLoaded(true)
    )

  }
  render() {
    return(
      <div>
        <h2>Admin Settings Page</h2>
        <span>{this.props.test}</span>
      </div>
    )
  }
}

export default AdminSettings
