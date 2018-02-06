import React from 'react'
import * as t from 'actionTypes'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { fetchJSON } from 'utils'
import { pagePath } from 'utils/apiPaths'

import { PageLayout, SectionHeader, SectionDivider } from 'components/shared/layout'
import { Ticket } from 'components/shared'
require('./tickets.scss')

class Tickets extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ticket:{},
      banners:[]
    }
  }
  // componentWillMount(){
  //   fetchJSON(pagePath('tickets'))
  //   .then(({ banners }) => {
  //     this.setState({ banners })
  //   })
  //
  //   fetchJSON('/api/promotions')
  //   .then(payload => {
  //     this.props.dispatch({
  //       type: t.TICKETS_LOADED,
  //       payload: payload.promotions
  //     })
  //   })
  // }

  _addToCart = (ticket) => {
    fetchJSON(`/api/promotions/get_promos?ids=${ticket.id}`)
    .then(payload => {
      this.props.dispatch({
        type: t.ADD_TO_CART,
        payload: payload.promotions[0]
      })
    })
    fetchJSON(`/api/attractions/${ticket.attraction_id}/promotions`)
    .then(payload => {
      this.props.dispatch({
        type: t.Attraction_PROMOTIONS_LOADED,
        payload: payload.promotions
      })
    })

    this.props.history.push('/checkout')
    window.scrollTo(0, 0)
  }
  render() {
    const tickets = this.props.tickets.map(ticket =>
      <Ticket
        key={`ticket-${ticket.id}`}
        addToCart={this._addToCart}
        promotion={ticket} />)
    return(
      <PageLayout banners={this.state.banners}>
        <SectionHeader sectionTitle={'Promotions'} side='left' />
        <div className={'row'}>
          <div className={'tickets-content'}>
            {tickets}
          </div>
        </div>
        <SectionDivider height={'10px'} color={'white'}/>
      </PageLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ tickets: state.ticketReducer.tickets })


export default withRouter(connect(mapStateToProps)(Tickets))
