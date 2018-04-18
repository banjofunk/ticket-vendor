import React from 'react'
import { ButtonGroup, Card } from '@blueprintjs/core'
import ReactS3Uploader from 'react-s3-uploader'
import { SectionHeader } from 'components/shared/layout'
import { CancelButton, SubmitButton } from 'components/shared/form'
import './tickets.scss'


export class Tickets extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    const { cancel, edited, submit, update, promotion } = this.props
    return (
      <Card elevation={1} className={'tickets-container'}>
        <SectionHeader
          sectionTitle={'Tickets'}
          side='left' />
        <div className={'background-image'}>
          <img src={promotion.background} />
        </div>
          <div className={'uploader-container'}>
            <label className={'img-uploader'}>
              change
              <ReactS3Uploader
                signingUrl="/api/v1/admin/upload/signature"
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read', 'Access-Control-Allow-Origin': '*' }}
                name="file"
                id="file"
                onFinish={(response) => update('background', response.signedUrl.split("?")[0])} />
            </label>
          </div>
          <br />
          <ButtonGroup className={'tickets-actions pt-fill'}>
            <CancelButton
              enabled={edited}
              cancel={cancel} />
            <SubmitButton
              submitText={'Save'}
              enabled={edited}
              submit={submit} />
          </ButtonGroup>
      </Card>
    )
  }
}

export default Tickets
