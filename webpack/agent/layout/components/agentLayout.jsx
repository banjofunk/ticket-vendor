import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

@connect((store) => {
  return {
    authorized: store.agentLayout.authorized,
    openDrawer: store.agentLayout.navbar.openDrawer
  };
})
class AgentLayout extends React.Component {
  constructor(props) {
    super(props)
    this._authorizeLayout = this._authorizeLayout.bind(this)
    this._resizeMixinCallback = this._resizeMixinCallback.bind(this)
    this._toggleDrawer = this._toggleDrawer.bind(this)
  }

  componentWillMount(){
    // this._authorizeLayout()
    this._resizeMixinCallback()
  }

  componentDidMount(){
    this.forceUpdate()
  }

  _authorizeLayout() {
    // this.props.dispatch(
    //   actions.authorizeLayout(['agent', 'admin'])
    // )
  }

  _resizeMixinCallback(){
    const viewport = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
    this.props.dispatch(
      actions.updateViewport(viewport)
    )
  }

  _toggleDrawer() {
    this.props.dispatch(
      actions.toggleDrawer(this.props.openDrawer)
    )
  }

  render() {
    return (
      <div>
        {true && <div>
          {this.props.children}
        </div>}
      </div>
    )
  }
}

export default AgentLayout
