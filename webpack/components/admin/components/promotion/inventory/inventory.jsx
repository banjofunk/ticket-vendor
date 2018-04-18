import React from 'react'
import { Link } from 'react-router-dom'
import {
  AnchorButton,
  Button,
  ButtonGroup,
  Card,
  Intent,
  Tooltip
} from '@blueprintjs/core'
import { SectionHeader } from 'components/shared/layout'


import { adminPromotionAdmissionsPath } from 'paths/api'
import './inventory.scss'

export class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
  }

  _deleteInventory = () => {
    const { actions, promotion } = this.props
    actions.deleteAdmissions(promotion)
  }

  _exportInventory = () => {
    this.refs["inventoryDownload"].click()
    this.props.actions.exportedInventory()
  }

  _importInventory = () => {
    this.refs["inventoryUpload"].click()
  }

  _fileSelected = (e) => {
    const { actions, promotion } = this.props
    const file = e.target.files[0]
    actions.importAdmissions(promotion, file)
  }

  render() {
    const { actions, exported, promotion } = this.props
    const deleteTip = exported ? 'Delete' : 'Export inventory to enable DELETE'
    return (
      <div className={'inventory-container'}>
        <Card elevation={2}>
          <SectionHeader
            sectionTitle={'Inventory'}
            side='right' />
          <h1>{promotion.admissions_count}</h1>
          <h3>{'admissions'}</h3>
          <ButtonGroup className={'inventory-actions'}>
            <Tooltip content={'Upload Inventory'}>
              <Button
                iconName={'export'}
                intent={Intent.DEFAULT}
                onClick={this._importInventory}
                text={'import'} />
            </Tooltip>
            <input
              accept=".csv"
              className={'file-uploader'}
              onChange={this._fileSelected}
              ref={'inventoryUpload'}
              type='file' />
            <Tooltip content={'Download Inventory'}>
              <Button
                iconName={'import'}
                intent={Intent.DEFAULT}
                onClick={this._exportInventory}
                text={'export'} />
            </Tooltip>
            <a ref={'inventoryDownload'}
              className={'file-downloader'}
              href={adminPromotionAdmissionsPath(promotion.id, '.csv')}></a>
            <Tooltip content={deleteTip}>
              <AnchorButton
                disabled={!exported}
                iconName={'trash'}
                intent={Intent.DANGER}
                onClick={this._deleteInventory}
                text={'delete'} />
            </Tooltip>
          </ButtonGroup>
        </Card>
      </div>
    )
  }
}

export default Inventory
