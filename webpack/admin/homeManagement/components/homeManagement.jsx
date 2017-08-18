import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as bannerActions from '../../shared/actions'
import { BannerManagement } from '../../shared'
import RedemptionCodeForm from '../../../client/home/components/redemptionCodeForm'
import { Ticket } from '../../../client/shared/ticket'
import AdminPromotionSort from './adminPromotionSort'
import AdminSponsor from './adminSponsor'
import AdminSponsorSort from './adminSponsorSort'
import AdminAttraction from './adminAttraction'
import AdminAttractionSort from './adminAttractionSort'
import SectionHeader from '../../../client/home/components/sectionHeader'
import SectionDivider from '../../../client/home/components/sectionDivider'
import SectionContent from '../../../client/home/components/sectionContent'
import { deepOrange500 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import Reorder from 'react-reorder'
import Chip from 'material-ui/Chip'

@connect((store) => {
  return {
    showSave: store.homeManagement.showSave,
    pageID: store.homeManagement.pageID,
    redemptionCode: store.homeManagement.redemptionCode,
    promotions: store.homeManagement.promotions,
    showSortPromotions: store.homeManagement.showSortPromotions,
    sponsors: store.homeManagement.sponsors,
    showSortSponsors: store.homeManagement.showSortSponsors,
    attractions: store.homeManagement.attractions,
    showSortAttractions: store.homeManagement.showSortAttractions,
    banners: store.adminShared.banners
  }
})
class HomeManagement extends React.Component {
  constructor(props) {
    super(props)
    this._loadHomePage = this._loadHomePage.bind(this)
    this._submitRedemption = this._submitRedemption.bind(this)
    this._updateRedemption = this._updateRedemption.bind(this)
    this._savePageContent = this._savePageContent.bind(this)
    this._cancelPageContent = this._cancelPageContent.bind(this)
    this._reorderAttractions = this._reorderAttractions.bind(this)
    this._toggleSortAttractions = this._toggleSortAttractions.bind(this)
    this._reorderSponsors = this._reorderSponsors.bind(this)
    this._toggleSortSponsors = this._toggleSortSponsors.bind(this)
    this._reorderPromotions = this._reorderPromotions.bind(this)
  }

  componentWillMount(){
    this._loadHomePage()
  }

  _loadHomePage(){
    this.props.dispatch(actions.getPage('home'))
    this.props.dispatch(bannerActions.getAllBanners())
    this.props.dispatch(actions.getSponsors())
    this.props.dispatch(actions.getAttractions())
    this.props.dispatch(actions.toggleSortPromotions(true))
    this.props.dispatch(actions.toggleSortSponsors(true))
    this.props.dispatch(actions.toggleSortAttractions(true))
    this.props.dispatch(bannerActions.hideBanners(true))
  }

  _submitRedemption() {
    this.props.dispatch(
      actions.submitRedemption(this.props.redemptionCode)
    )
  }

  _updateRedemption(event) {
    this.props.dispatch(
      actions.updateRedemption(event.target.value)
    )
  }

  _savePageContent(){
    const sponsorSort = this.props.sponsors.map(
      function(sponsor){
        return {
          id: sponsor['id'],
          sponsor_sort: sponsor['sponsor_sort']
        }
      }
    )
    const attractionSort = this.props.attractions.map(
      function(attraction){
        return {
          id: attraction['id'],
          attraction_sort: attraction['attraction_sort']
        }
      }
    )
    this.props.dispatch(
      actions.savePageContent(
        this.props.pageID,
        this.props.content,
        attractionSort,
        sponsorSort,
        this.props.banners)
    )
  }

  _cancelPageContent(){
    this._loadHomePage()
  }

  _reorderPromotions(event, item, index, newIndex, list){
    let newPromotions = []
    for (var i = 0; i < list.length; i++) {
      const promotionId = list[i].props['data-id']
      newPromotions.push(
        {id:promotionId, position:i}
      )
    }
    this.props.dispatch(
      actions.reorderPromotions(newPromotions)
    )
  }

  _reorderSponsors(event, item, index, newIndex, list){
    let newSponsors = []
    for (var i = 0; i < list.length; i++) {
      const sponsorId = list[i].props['data-id']
      newSponsors.push(
        {id:sponsorId, position:i}
      )
    }
    this.props.dispatch(
      actions.reorderSponsors(newSponsors)
    )
  }

  _reorderAttractions(event, item, index, newIndex, list){
    let newAttractions = []
    for (var i = 0; i < list.length; i++) {
      const attractionId = list[i].props['data-id']
      newAttractions.push(
        {id:attractionId, position:i}
      )
    }
    this.props.dispatch(
      actions.reorderAttractions(newAttractions)
    )
  }

  _toggleSortSponsors(){
    this.props.dispatch(
      actions.toggleSortSponsors(this.props.showSortSponsors)
    )
  }

  _toggleSortAttractions(){
    this.props.dispatch(
      actions.toggleSortAttractions(this.props.showSortAttractions)
    )
  }

  render() {
    const style = {
      container: {
        width:'100%',
        maxWidth:'1200px',
        margin:'0 auto',
        textAlign:'center'
      },
      mainContent:{
        textAlign:'center',
        margin:'20px auto',
        width:'80%',
        minHeight:'160px'
      },
      ccsLogo:{
        width:'200px',
        margin:'15px 0'
      },
      buttonsContainer:{
        position:'fixed',
        backgroundColor:'white',
        borderRadius:5,
        padding:5,
        zIndex:20,
        bottom:5,
        right:5
      },
      cancelButton:{
        marginRight:5
      },
      sortContainer:{
        margin:'10px auto',
        width:'100%'
      }
    }

    const sortStyle = {
      sortLi:{
        position:'relative',
        margin:'2px auto',
        width:'100%',
        maxWidth:300
      },
      sortCover:{
        width:'90%',
        height:'34px',
        position:'absolute',
        top:0,
        left:0
      },
      sortLabel:{
        textAlign:'right',
        width:'100%'
      }
    }

    const redemptionCallbacks = {
      submitRedemption:this._submitRedemption,
      updateRedemption:this._updateRedemption
    }

    let promotions = []
    let promotionSort = []
    for (var attraction of this.props.attractions) {
      const key = this.props.attractions.indexOf(attraction)
      promotions.push(
        <Ticket
          key={`promotion-${key}`}
          attraction={attraction} />
      )
    }

    let sponsors = []
    let sponsorSort = []
    for (var sponsor of this.props.sponsors) {
      const key = this.props.sponsors.indexOf(sponsor)
      sponsorSort.push(
        <AdminSponsorSort
          key={`sponsorSort-${key}`}
          data-id={sponsor.id}
          style={sortStyle}
          sponsor={sponsor} />
      )
      sponsors.push(
        <AdminSponsor
          key={`sponsor${key}`}
          sponsor={sponsor}
          touch={this._toggleSortSponsors} />
      )
    }

    let attractions = []
    let attractionSort = []
    for (var attraction of this.props.attractions) {
      const key = this.props.attractions.indexOf(attraction)
      attractionSort.push(
        <AdminAttractionSort
          key={`attractionSort-${key}`}
          data-id={attraction.id}
          style={sortStyle}
          attraction={attraction} />
      )
      attractions.push(
        <AdminAttraction
          key={`attraction-${key}`}
          attraction={attraction}
          touch={this._toggleSortAttractions} />
      )
    }
    return(
      <div>
        <BannerManagement ref='bannerList' page='home' />
        <div style={style.container}>
          <SectionDivider height="25px" color="white" />
          <SectionDivider height="60px" color={deepOrange500} />
          <RedemptionCodeForm
            redemptionCode={this.props.redemptionCode}
            redemptionCallbacks={redemptionCallbacks} />
          <SectionHeader sectionTitle="Current Promotions" color={deepOrange500} side='left' />
          <SectionContent height='440px' content={promotions} />
          {this.props.showSortPromotions &&
            <div style={style.sortContainer}>
              <Reorder
                itemKey='key'
                holdTime='100'
                itemClass= 'reorder-div'
                callback={this._reorderPromotions}
                list={promotionSort} />
            </div>}
          <div style={{clear:'both'}} />
          <SectionHeader sectionTitle="Our Sponsors" color={deepOrange500} side='right' />
          <SectionContent height='145px' content={sponsors} />
          {this.props.showSortSponsors &&
            <div style={style.sortContainer}>
              <Reorder
                itemKey='key'
                holdTime='100'
                itemClass= 'reorder-div'
                callback={this._reorderSponsors}
                list={sponsorSort} />
            </div>}
          <div style={{clear:'both'}} />
          <SectionHeader sectionTitle="Our Attractions" color={deepOrange500} side='left' />
          <SectionContent height='145px' content={attractions} />
          {this.props.showSortAttractions &&
            <div style={style.sortContainer}>
              <Reorder
                itemKey='key'
                holdTime='100'
                itemClass= 'reorder-div'
                callback={this._reorderAttractions}
                list={attractionSort} />
            </div>}
          <div style={{clear:'both'}} />
          {this.props.showSave && <div style={style.buttonsContainer}>
            <RaisedButton
              label="Cancel"
              style={style.cancelButton}
              onTouchTap={this._cancelPageContent} />
            <RaisedButton
              label="Save"
              backgroundColor={deepOrange500}
              onTouchTap={this._savePageContent}
              style={style.saveButton} />
          </div>}

        </div>
      </div>
    )
  }
}

export default HomeManagement
