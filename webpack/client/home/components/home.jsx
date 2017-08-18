import React from 'react'
import { Banners } from '../../shared/banners'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { deepOrange500 } from 'material-ui/styles/colors'
import { Ticket } from '../../shared/ticket'
import * as actions from '../actions'
import Attractions from './attractions'
import Promotions from './promotions'
import Redemptions from './redemptions'
import SectionDivider from './sectionDivider'
import SectionHeader from './sectionHeader'
import Sponsors from './sponsors'

@connect((store) => {
  return {
    attractions: store.home.attractions,
    banners: store.home.banners,
    redemptionCodes: store.home.redemptionCodes,
    redemptionSelection: store.home.redemptionSelection,
    redemptionValue: '',
    sponsors: store.home.sponsors
  }
})
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRedemptionSelection: false,
      redemptionValue: '',
      taxSummary:[],
      promotion:{}
    }
    this._submitRedemption = this._submitRedemption.bind(this)
    this._updateRedemption = this._updateRedemption.bind(this)
    this._closeRedemptionDialog = this._closeRedemptionDialog.bind(this)
    this._selectRedemption = this._selectRedemption.bind(this)
  }

  componentWillMount(){
    this.props.dispatch(actions.getPage('home'))
    this.props.dispatch(actions.getAttractions())
    this.props.dispatch(actions.getSponsors())
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.redemptionCodes != this.props.redemptionCodes){
      let redemptionValue = ''
      if(nextProps.redemptionCodes.length === this.props.redemptionCodes.length &&
        nextProps.redemptionSelection.length === 0){
        redemptionValue = 'INVALID'
      }else{
        if(nextProps.redemptionSelection.length === 0){
          browserHistory.push('/checkout')
        }
      }
      this.setState({redemptionValue})
    }
    if(nextProps.redemptionSelection.length > 0){
      this.setState({showRedemptionSelection:true})
    }
  }

  _closeRedemptionDialog(){
    this.setState({showRedemptionSelection:false})
  }

  _selectRedemption(redemption){
    this.props.dispatch(
      actions.selectRedemption(redemption)
    )
    this._closeRedemptionDialog()
  }

  _submitRedemption() {
    const rCodes = this.props.redemptionCodes.map(function(r){return r.code})
    if(rCodes.indexOf(this.state.redemptionValue) < 0){
      this.props.dispatch(
        actions.submitRedemption(this.state.redemptionValue)
      )
    }else{
      this.setState({redemptionValue:''})
    }
  }

  _updateRedemption(event) {
    this.setState({redemptionValue:event.target.value})
  }

  render() {
    return(
      <div>
        <Banners banners={this.props.banners} />
        <div class={'home-container'}>
          <SectionDivider
            height="25px"
            color={'white'} />
          {/* <SectionDivider
            height="25px"
            color={deepOrange500} /> */}
          <Redemptions
            changeRedemption={this._updateRedemption}
            closeDialog={this._closeRedemptionDialog}
            redemptions={this.props.redemptionSelection}
            redemptionValue={this.state.redemptionValue}
            selectRedemption={this._selectRedemption}
            showRedemptionSelection={this.state.showRedemptionSelection}
            submitRedemption={this._submitRedemption}
            updateRedemption={this._updateRedemption} />
          <SectionDivider
            height="25px"
            color={deepOrange500} />
          <SectionHeader
            sectionTitle="Current Promotions"
            color={deepOrange500} side='left' />
          <Promotions
            attractions={this.props.attractions} />
          <SectionHeader
            sectionTitle="Our Sponsors"
            color={deepOrange500} side='right' />
          <Sponsors
            sponsors={this.props.sponsors} />
          <SectionHeader
            sectionTitle="Our Attractions"
            color={deepOrange500} side='left' />
          <Attractions
            attractions={this.props.attractions} />
        </div>
      </div>
    )
  }
}

export default Home
