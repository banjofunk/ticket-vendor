import React from 'react'
import { Alert, AnchorButton, Button, ButtonGroup, Intent, Tooltip } from '@blueprintjs/core'
import { Redirect, Link } from 'react-router-dom'

export class TableActionButtons extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showConfirm: false
    }
  }

  _cancelDelete = () => {
    this.setState({showConfirm: false})
  }

  _confirmDelete = () => {
    this.props.deleteItem()
    this.setState({showConfirm: false})
  }

  _delete = () => {
    this.setState({showConfirm: true})
  }

  render() {
    const { confirmText, deleteMessage, editPath } = this.props

    return (
      <div>
        <ButtonGroup>
          <Tooltip content={'Edit'}>
            <Link to={editPath}>
              <Button
                iconName={'edit'}
                intent={Intent.PRIMARY}  />
            </Link>
          </Tooltip>
          <Tooltip content={'Delete'}>
            <AnchorButton
              onClick={this._delete}
              iconName={'delete'}
              intent={Intent.DANGER} />
          </Tooltip>
        </ButtonGroup>
        <Alert
          intent={Intent.DANGER}
          isOpen={this.state.showConfirm}
          confirmButtonText={confirmText}
          cancelButtonText={'Cancel'}
          onConfirm={this._confirmDelete}
          onCancel={this._cancelDelete}>
         {deleteMessage}
       </Alert>
     </div>
    )
  }
}

export default TableActionButtons
