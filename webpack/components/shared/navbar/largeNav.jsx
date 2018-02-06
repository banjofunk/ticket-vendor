import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem } from 'material-ui/List'

class LargeNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      list:{
        display: 'flex',
        flexDirection: 'row',
        color:"white",
        padding: 40,
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

    const listItems = [
      {name: 'home', to: '/'},
      {name: 'tickets', to: '/tickets'},
      {name: 'about', to: '/about'},
      {name: 'contact', to: '/contact'}
    ].map((route) => {
      const activeClass =
        route.to === this.props.page ?
          'active-underlined' : 'underlined'
      return (
        <ListItem
          key={`menu-${route.name}`}
          className={activeClass}
          containerElement={<Link to={route.to}>{route.name}</Link>}
          style={style.listItem}
          primaryText={route.name.toUpperCase()} />
        )
      })

    return (
      <List style={style.list}>
        {listItems}
      </List>
    )
  }
}

export default LargeNav
