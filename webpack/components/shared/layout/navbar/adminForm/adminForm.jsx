import React from 'react'
import AdminButton from './adminButton'
import LoginForm from './loginForm'
import './adminForm.scss'

export class AdminForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showForm: false
    }
  }

  _toggleForm = () => {
    const showForm = !this.state.showForm
    this.setState({showForm})
  }

  render() {
    const { showForm } = this.state
    const { user, signIn, authError } = this.props

    const loginForm = showForm
      ? <LoginForm
          user={user}
          signIn={signIn}
          toggleForm={this._toggleForm} />
      : <AdminButton toggleForm={this._toggleForm} />
    return (
      <div>{loginForm}</div>
    )
  }
}

export default AdminForm
