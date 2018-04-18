import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { ButtonGroup } from '@blueprintjs/core'
import AmountField from './amountField'
import KindField from './kindField'
import { CancelButton, SubmitButton, TextField } from 'components/shared/form'
import { promotionPath } from 'paths/admin'

export class TaxForm extends React.Component {
  componentDidMount() {
    const { actions, match } = this.props
    const { taxId } = match.params
    taxId ? actions.getTax(taxId) : actions.clearTax()
  }

  _updateForm = (field, value) => {
    const { actions } = this.props
    actions.updateTaxForm(field, value)
  }

  _submit = () => {
    const { actions, match, tax } = this.props
    const { taxId } = match.params
    taxId ? actions.updateTax(tax) : actions.createTax(tax)
  }

  render() {
    const { edited, match, submit, tax, update } = this.props
    const { promotionId, taxId } = match.params
    const submitText = taxId ? 'Save' : 'Create'
    return (
      <form className={'tax-form'}>
        <TextField
          field={'description'}
          value={tax.description}
          update={this._updateForm} />
        <KindField
          value={tax.kind}
          update={this._updateForm} />
        <AmountField
          kind={tax.kind}
          value={tax.amount}
          update={this._updateForm} />
        <ButtonGroup className={'form-actions pt-fill'}>
          <Link to={promotionPath(promotionId)}>
            <CancelButton />
          </Link>
          <Link to={promotionPath(promotionId)}>
            <SubmitButton
              submitText={submitText}
              enabled={edited}
              submit={this._submit} />
          </Link>
        </ButtonGroup>
      </form>
    )
  }
}

export default withRouter(TaxForm)
