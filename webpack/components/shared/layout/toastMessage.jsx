import React from 'react'
import {Toaster, Position, Intent} from '@blueprintjs/core'

export class ToastMessage extends React.Component {
  componentDidMount(){
		this.state = {
      toast: Toaster.create({
  			position: Position.TOP,
  		})
    }

  }
  componentDidUpdate(prevProps, prevState){
    const { text, kind, timeout } = this.props.message
    const intent = (kind => {
      switch (kind) {
        case 'danger':
        case 'error':
          return Intent.DANGER
          break
        case 'success':
          return Intent.SUCCESS
          break
        case 'warning':
          return Intent.WARNING
          break
        default:
          return Intent.PRIMARY
      }
    })(kind)
    if(text && text !== prevProps.message.text){
      this.state.toast.show({ intent, timeout, message:text })
    }
  }

  render() {
    return (
      <div className='toast-message'></div>
    )
  }
}

export default ToastMessage
