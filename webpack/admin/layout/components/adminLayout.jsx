import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { deepOrange500 } from 'material-ui/styles/colors'
import CartButton from './cartButton'
import AdminHeaderLinks from './adminHeaderLinks'
import AdminMenuLinks from './adminMenuLinks'
import AdminFooter from './adminFooter'

@connect((store) => {
  return {
    authorized: store.adminLayout.authorized,
    openDrawer: store.adminLayout.navbar.openDrawer,
    navbar: store.adminLayout.navbar,
    name: store.adminLayout.name,
    viewport: store.adminLayout.viewport
  };
})
class AdminLayout extends React.Component {
  constructor(props) {
    super(props)
    this._resizeMixinCallback = this._resizeMixinCallback.bind(this)
    this._authorizeLayout = this._authorizeLayout.bind(this)
    this._toggleDrawer = this._toggleDrawer.bind(this)
  }

  componentWillMount(){
    this._authorizeLayout()
    this._resizeMixinCallback()
  }

  componentDidMount(){
    this.forceUpdate()
    window.addEventListener('resize', this._resizeMixinCallback)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this._resizeMixinCallback)
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

  _authorizeLayout() {
    this.props.dispatch(
      actions.authorizeLayout(['admin'])
    )
  }

  _toggleDrawer() {
    this.props.dispatch(
      actions.toggleDrawer(this.props.openDrawer)
    )
  }

  render() {
    let small = (this.props.viewport.width < 1000)
    const style = {
      headerbar: {
        backgroundColor: deepOrange500,
        width:'100%',
        height:'47px',
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
    let handleChange = (event, index, value) => {debugger};
    return (
      <div>
        {this.props.authorized && <div>
          <div style={style.headerbar}>
            <div style={{display:'inline-block', marginTop:10}}>
              <span style={{color:'white', fontSize:26}}>ADMIN</span>
            </div>
            <DropDownMenu
              style={{float:'right'}}
              labelStyle={{color:'white'}}
              value={1}
              onChange={this.handleChange}>
              <MenuItem
                value={1}
                label={this.props.name}
                primaryText={
                  <Link to="/admin/settings" style={{textDecoration:'none'}}>
                    <div style={{width:'100%', height:30, color:'black'}}>Settings</div>
                  </Link>
                } />
              <MenuItem value={2} primaryText={
                <div
                  style={{width:'100%', height:30, color:'black'}}
                  onTouchTap={
                    function(){
                      window.location = `${window.location.origin}/users/sign_out`
                    }
                  }>Sign Out</div>
              } />
            </DropDownMenu>
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
              small ? <AdminMenuLinks /> : <AdminHeaderLinks />
            } />
          {this.props.children}
          <AdminFooter viewport={this.props.viewport} />
        </div>}
      </div>
    )
  }
}

export default AdminLayout
