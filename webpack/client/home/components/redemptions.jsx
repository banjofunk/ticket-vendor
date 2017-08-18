import React from 'react'
import RedemptionCodeForm from './redemptionCodeForm'
import RedemptionSelection from '../../../agent/home/components/dialogs/redemptionSelection'


export class Redemptions extends React.Component {
  render() {
    return (
      <div>
        <h2>*If you have a promotion code, call us at:</h2>
        <a href='tel:8554932582'>(855)493-2582</a>
        <h2>for additional savings on selected Hotels & Resorts</h2>
        <br />
        {/* <RedemptionCodeForm
          changeRedemption={this.props.updateRedemption}
          redemptionValue={this.props.redemptionValue}
          submitRedemption={this.props.submitRedemption} />
        <RedemptionSelection
          showRedemptionSelection={this.props.showRedemptionSelection}
          selectRedemption={this.props.selectRedemption}
          redemptions={this.props.redemptions}
          closeDialog={this.props.closeRedemptionDialog} /> */}
      </div>
    )
  }
}

export default Redemptions
