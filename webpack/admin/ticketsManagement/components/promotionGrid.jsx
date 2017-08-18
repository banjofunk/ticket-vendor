import React from 'react'
import ReactDataGrid from 'react-data-grid'
import EllipsisText from 'react-ellipsis-text'
import TicketActionButtons from './ticketActionButtons'
import TicketActionState from './ticketActionState'
import RaisedButton from 'material-ui/RaisedButton'

class PromotionGrid extends React.Component {
  constructor(props){
    super(props)
    this._createRows = this._createRows.bind(this)
    this._rowGetter = this._rowGetter.bind(this)
    this.state = {rows:[]}
  }

  componentWillMount(){
    this._createRows(this.props)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tickets != this.props.tickets){
      this._createRows(nextProps)
    }
  }

  _createRows(props){
    let rows = []
    for (let i = 0; i < props.tickets.length; i++) {
      const ticket = props.tickets[i]
      let taxes = []
      for (let i = 0; i < ticket.taxes.length; i++) {
        const tax = ticket.taxes[i]
        const txStr = tax.kind === 0 ? `${tax.amount/10}%` : `$${tax.amount/100}%`
        taxes.push(<h1 key={`t${ticket.id}-tax${tax.id}`}>
          {`${ticket.taxes[i].description} ${txStr}`}
        </h1>)
      }
      rows.push({
        affiliate: ticket['affiliate'],
        title: ticket['title'],
        shortDescription:
          <EllipsisText
            style={{whiteSpace:'pre-wrap'}}
            text={ticket['shortDescription']}
            length={125} />,
        retail: ticket['retail'],
        discounted: ticket['discounted'],
        taxes: <div>{taxes}</div>,
        count: ticket['inventory'],
        state:
          <TicketActionState
            ticket={ticket}
            toggleActivateCallCenter={this.props.toggleActivateCallCenter}
            toggleActivateRedemption={this.props.toggleActivateRedemption}
            toggleActivatePromotion={this.props.toggleActivatePromotion} />,
        actions:
          <TicketActionButtons
            ticket={ticket}
            handleFileUpload={props.handleFileUpload}
            deleteInventory={props.deleteInventory}
            showTicketPreview={props.showTicketPreview}
            showTicketForm={props.showTicketForm} />
      })
    }
    this.setState({rows:rows})
  }

  _rowGetter(i) {
    return this.state.rows[i]
  }

  render() {
    const columns = [
      {
        key: 'affiliate',
        name: 'Affiliate',
        width:150
      },
      {
        key: 'title',
        name: 'Title',
        width:150
      },
      {
        key: 'shortDescription',
        name: 'Short Description',
        width:300
      },
      {
        key: 'retail',
        name: 'Retail',
        width:60
      },
      {
        key: 'discounted',
        name: 'Sale',
        width:60
      },
      {
        key: 'taxes',
        name: 'Taxes',
        width:300
      },
      {
        key: 'count',
        name: 'QTY',
        width:60
      },
      {
        key: 'state',
        name: 'State',
        width:200
      },
      {
        key: 'actions',
        name: 'Actions',
        width:200
      }
    ]
    const style = {
      gridContainer:{
        width:'90%',
        maxWidth:1480,
        margin:'20px auto',
        overflowX:'scroll'
      }
    }
    return(
      <div style={style.gridContainer}>
        <RaisedButton
          label="New"
          style={{float:'right', marginBottom:10}}
          primary={true}
          onTouchTap={this.props.newTicketForm} />
        <a style={{float:'left', margin:'10px 5px'}} href={'/api/admin/promotions.csv'}>
          {'(CSV)'}
        </a>

        <ReactDataGrid
          columns={columns}
          rowHeight={75}
          rowGetter={this._rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={(this.props.tickets.length * 75) + 45} />
      </div>
    )
  }
}

export default PromotionGrid
