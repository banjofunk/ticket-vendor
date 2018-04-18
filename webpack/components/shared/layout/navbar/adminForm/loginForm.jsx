import React from 'react'
import { Button, InputGroup } from '@blueprintjs/core'

export class loginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: 'test@test.com',
      password: 'test'
    }
  }

  _changeEmail = e => this.setState({email: e.target.value})
  _changePassword = e => this.setState({password: e.target.value})
  _signIn = () => {
    this.props.signIn(this.state)
    if(this.props.user){ this.props.toggleForm() }
  }

  render() {
    const { email, password } = this.state
    const { toggleForm } = this.props
    return (
      <div className={'login-container'}>
        <form className={'login-form'}>
          <InputGroup
            className={'login-input'}
            autoComplete={'email'}
            autoFocus={true}
            leftIconName={'envelope'}
            type={'text'}
            onChange={this._changeEmail}
            value={email} />
          <InputGroup
            className={'login-input'}
            autoComplete={'password'}
            leftIconName={'lock'}
            type={'password'}
            onChange={this._changePassword}
            value={password} />
          <Button
            className={'pt-minimal'}
            onClick={this._signIn}>
            <span>Login</span>
          </Button>
          <Button
            className={'pt-minimal'}
            onClick={toggleForm}>
            <span>Cancel</span>
          </Button>
        </form>
      </div>
    )
  }
}

export default loginForm
