import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import CartButton from './cartButton'
import ClientHeaderLinks from './clientHeaderLinks'
import ClientMenuLinks from './clientMenuLinks'
import ClientFooter from './clientFooter'

import { deepOrange500 } from 'material-ui/styles/colors'

@connect((store) => {
  return {
    navbar: store.layout.navbar,
    viewport: store.layout.viewport

  };
})
class ClientLayout extends React.Component {
  constructor(props) {
    super(props)
    this._resizeMixinCallback = this._resizeMixinCallback.bind(this)
  }
  componentWillMount(){
    this._resizeMixinCallback()
  }
  componentDidMount(){
    this.forceUpdate()
    window.addEventListener('resize', this._resizeMixinCallback)
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
  componentWillUnmount(){
    window.removeEventListener('resize', this._resizeMixinCallback)
  }

  render() {
    let small = (this.props.viewport.width < 820)
    const style = {
      headerbar: {
        backgroundColor: deepOrange500,
        width:'100%',
        height:'30px',
        margin:0,
        padding:0
      },
      cart: {
        height:'20px',
        marginTop:'5px',
        marginRight:'35px',
        float:'right',
        padding:'1px'
      },
      appbar: {
        backgroundColor:'white',
        height:'120px'
      },
      title:{
        height:'120px'
      },
      logoImage: {
        width:'225px',
        maxWidth:'70%',
        margin: small ? `22px ${((this.props.viewport.width-250)/2)}px` : '22px 0 0 40px'
      },
      list:{
        display: 'flex',
        flexDirection: 'row',
        color:"white",
        paddingTop: 40,
      },
      listItem:{
        fontSize:'18px',
        lineHeight:'20px',
        fontFamily: '"Open Sans", sans-serif',
        backgroundColor: '#FFF',
        fontWeight: 600,
        marginLeft: '15px'
      },
      activeListItem:{
        borderBottom: `2px solid ${deepOrange500}`
      }
    }
    return (
      <div>
        <div style={style.headerbar}>
          <CartButton />
        </div>
        <AppBar
          titleStyle={style.title}
          title={<Link to="/"><img
            src='/assets/logo'
            style={style.logoImage} /></Link>}
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
          showMenuIconButton={false}
          style={style.appbar}
          children={
            small ? <ClientMenuLinks /> : <ClientHeaderLinks />
          } />
        {this.props.children}
        <ClientFooter viewport={this.props.viewport} />
      </div>
    )
  }
}

export default ClientLayout
