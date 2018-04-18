import React from 'react'
import { withRouter, Redirect, Route } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as authActionCreators from 'actions/auth';

import { SectionDivider } from 'components/shared/layout'
import Navbar from './navbar'
import Footer from './footer'

import ToastMessage from './toastMessage'

import './pageLayout.scss'

const PageLayout = ({
  actions,
  admin,
  authFetched,
  children,
  message,
  user
}) => {
  if(!authFetched){ actions.getAuth() }

  if(admin && !user && authFetched){
    return(<Redirect to={'/'} />)
  }

  return(
    <div className={'page-layout'}>
      <div className={'page-content'}>
        <ToastMessage message={message} />
        <Navbar
          user={user}
          signIn={actions.signIn}
          signOut={actions.signOut} />
        <SectionDivider height={'20px'} color={'$md-blue-500'}/>
        {children}
      </div>
      <Footer />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(authActionCreators, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  authFetched: state.auth.fetched,
  user: state.auth.user,
  message: state.message
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageLayout)
)
