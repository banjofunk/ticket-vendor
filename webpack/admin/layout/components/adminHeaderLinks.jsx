import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link, IndexLink } from 'react-router'
import { List, ListItem } from 'material-ui/List'

class AdminHeaderLinks extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const style = {
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
      }
    }
    return (
      <div>
        <List style={style.list}>
          <ListItem
            className="underlined"
            activeClassName="active-underlined"
            containerElement={<IndexLink to='/admin' />}
            ref='home'
            style={style.listItem}
            primaryText="HOME" />
          <ListItem
            className="underlined"
            activeClassName="active-underlined"
            containerElement={<Link to="/admin/tickets" />}
            ref='tickets'
            style={style.listItem}
            primaryText="TICKETS" />
          <ListItem
            className="underlined"
            activeClassName="active-underlined"
            containerElement={<Link to="/admin/about" />}
            ref='about'
            style={style.listItem}
            primaryText="ABOUT" />
          <ListItem
            className="underlined"
            activeClassName="active-underlined"
            containerElement={<Link to="/admin/contact" />}
            ref='contact'
            style={style.listItem}
            primaryText="CONTACT US" />
          <ListItem
            className="underlined"
            activeClassName="active-underlined"
            containerElement={<Link to="/admin/sales" />}
            ref='sales'
            style={style.listItem}
            primaryText="SALES" />
          <ListItem
            className="underlined"
            activeClassName="active-underlined"
            containerElement={<Link to="/admin/affiliates" />}
            ref='affiliates'
            style={style.listItem}
            primaryText="AFFILIATES" />
        </List>
      </div>
    )
  }
}

export default AdminHeaderLinks
