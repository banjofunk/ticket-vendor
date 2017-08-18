import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link, IndexLink } from 'react-router'
import { List, ListItem } from 'material-ui/List'
import { deepOrange500 } from 'material-ui/styles/colors'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

class AdminMenuLinks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleToggle(){
    this.setState({open: !this.state.open})
  }
  render() {
    const style = {
      menu:{
        position: 'absolute',
        left:10,
        top:35
      },
      listItem:{
        fontSize:'18px',
        textAlign:'center',
        borderBottom:`solid 4px ${deepOrange500}`,
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600
      },
      headerbar: {
        backgroundColor: deepOrange500,
        width:'100%',
        height:47,
        margin:0,
        padding:0
      },
      logobar:{
        height:121,
        textAlign:'center'
      }
    }
    return (
      <div>
        <IconButton
          label="Toggle Drawer"
          style={style.menu}
          onTouchTap={this.handleToggle}>
          <MenuIcon viewBox='0 0 20 20' />
        </IconButton>
        <Drawer open={this.state.open}>
          <div style={style.headerbar} />
          <div
            style={style.logobar}
            onTouchTap={this.handleToggle}>
            <img src='/assets/logo' style={{marginTop:'25px'}}/>
          </div>
          <div style={style.headerbar} />
          <MenuItem
            containerElement={<IndexLink to='/admin' />}
            ref='home'
            style={style.listItem}
            onTouchTap={this.handleToggle}
            primaryText="HOME" />
          <MenuItem
            containerElement={<Link to="/admin/tickets" />}
            ref='tickets'
            style={style.listItem}
            onTouchTap={this.handleToggle}
            primaryText="TICKETS" />
          <MenuItem
            containerElement={<Link to="/admin/about" />}
            ref='about'
            style={style.listItem}
            onTouchTap={this.handleToggle}
            primaryText="ABOUT" />
          <MenuItem
            containerElement={<Link to="/admin/contact" />}
            ref='contact'
            style={style.listItem}
            onTouchTap={this.handleToggle}
            primaryText="CONTACT US" />
          <MenuItem
            containerElement={<Link to="/admin/sales" />}
            ref='sales'
            style={style.listItem}
            onTouchTap={this.handleToggle}
            primaryText="SALES" />
          <MenuItem
            containerElement={<Link to="/admin/affiliates" />}
            ref='affiliates'
            style={style.listItem}
            onTouchTap={this.handleToggle}
            primaryText="AFFILIATES" />
        </Drawer>
      </div>
    )
  }
}

export default AdminMenuLinks
