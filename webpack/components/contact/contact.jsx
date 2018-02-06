import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors';

import { fetchJSON } from 'utils'
import { pagePath } from 'utils/apiPaths'
import { PageLayout, SectionHeader, SectionDivider } from 'components/shared/layout'
import { FirstName, LastName, Phone, Email, Message } from 'components/shared/formFields'
require('./contact.scss')

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      banners:[],
      content:{},
      totalErrCount: 0,
      errCount:{},
      fields:{}
    }
  }


  componentWillMount(){
    fetchJSON(pagePath('contact'))
    .then(({banners, content}) => {
      this.setState({ banners, content })
    })
  }

  _update = (name, value, ecount) => {
    const fields = {...this.state.fields, [name]: value}
    const errCount = {...this.state.errCount, [name]: ecount}
    const totalErrCount = Object.values(errCount).reduce((acc,val)=>(acc+val))
    this.setState({fields, errCount, totalErrCount})
  }

  _sendPayment = () => sendPayment(this.state.fields).then((resp) => {debugger})

  render() {
    const hasErrors = this.state.totalErrCount > 0
    const { fields, content, banners } = this.state

    return(
      <PageLayout banners={banners}>
        <SectionHeader sectionTitle={content.titleText} side='left' />
        <SectionDivider height={'25px'} color={'white'}/>

        <div className={'contact-content row'}>
          <div className={'row'}>
            <span className={'header-text'}>{content.mainText}</span>
          </div>
          <div className={'row'}>
            <div className={'column'}>
              <FirstName
                value={fields.firstName || ''}
                update={this._update} />
              <LastName
                value={fields.lastName || ''}
                update={this._update} />
              <Email
                value={fields.email || ''}
                update={this._update} />
              <Phone
                value={fields.phone || ''}
                update={this._update} />
              <Message
                value={fields.message || ''}
                update={this._update} />
              <RaisedButton
                label="Send"
                className={'submit'}
                labelColor="white"
                backgroundColor={deepOrange500}
                onTouchTap={this._validateContactForm} />
            </div>
          </div>
          <div className={'logo row'}>
            <img src='/assets/logo' />
          </div>
        </div>

      </PageLayout>
    )
  }
}

export default Contact
