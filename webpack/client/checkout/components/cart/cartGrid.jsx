import React from 'react'
import { browserHistory } from 'react-router'
import ReactDataGrid from 'react-data-grid'
import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'

class CartGrid extends React.Component {
  constructor(props){
    super(props)
    this._showTax = this._showTax.bind(this)
    this._closeDialog = this._closeDialog.bind(this)
    this._changeTmpQty = this._changeTmpQty.bind(this)
    this.state={
      rows:[],
      promotions:[],
      cart:[],
      taxSummary:'',
      totalPurchase:500,
      showDialog:false
    }
  }
  componentWillMount(){
    this.setState({
      promotions:this.props.promotions,
      cart:this.props.cart
    })

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.promotions !== this.props.promotions){
      this.setState({promotions:nextProps.promotions})
    }
    if(nextProps.cart !== this.props.cart){
      this.setState({cart:nextProps.cart})
    }
  }

  _showTax(summary){
    this.setState({taxSummary:summary, showDialog:true})
  }

  _closeDialog(){
    this.setState({showDialog:false})
  }

  _changeTmpQty(event, value){
    let cart = [...this.state.cart]
    const promotionId = parseInt(event.target.id.replace(/\D/g, ''))
    const cartPromotion = cart.find(
      function(promotion){return promotion.id === promotionId}
    )
    cartPromotion.qty = value ? parseInt(value.replace(/\D/g, '')) : 0
    this.setState({cart})
  }

  render() {

    const style = {
      gridContainer:{
        width:'90%',
        maxWidth:860,
        minHeight:110,
        margin:'20px auto',
        overflowX:'scroll'
      },
      lineItem:{
        height:'auto',
        padding:3,
        verticalAlign:'middle',
        textAlign:'center'
      }
    }


    let lineItems = []
    for (var i = 0; i < this.state.promotions.length; i++) {
      const promotion = this.state.promotions[i]
      const cartPromotion = this.state.cart.find(
        function(prm){return prm.id === parseInt(promotion.id)}
      )
      let promotionQty = cartPromotion ? cartPromotion.qty : 1
      let promotionTotal =
        ((promotion.discounted * promotionQty) +
        promotion.tax_total).
        toString().
        match(/^-?\d+(?:\.\d{0,2})?/)[0]
      let promotionTax =
        (promotion.tax_total * promotionQty).
        toString().
        match(/^-?\d+(?:\.\d{0,2})?/)[0]
      lineItems.push(
        <TableRow key={`promotion-${promotion.id}`} selectable={false}>
          <TableRowColumn style={{...style.lineItem, width:150}}>
            <img src={promotion.logoImg}  style={{height:75, maxWidth:'100%'}} />
          </TableRowColumn>
          <TableRowColumn style={{...style.lineItem}}>
            <span style={{whiteSpace:'pre-wrap'}}>
              {promotion.shortDescription}
            </span>
          </TableRowColumn>
          <TableRowColumn style={{...style.lineItem, width:60}}>
            {`$${promotion.discounted}`}
          </TableRowColumn>
          <TableRowColumn style={{...style.lineItem, width:60}}>
            <TextField
              id={`qty-${promotion.id}`}
              inputStyle={{textAlign:'center'}}
              style={{width:'100%'}}
              onBlur={(event)=>this.props.updateQty(event, promotion.id)}
              onChange={this._changeTmpQty}
              value={promotionQty.toString()} />
          </TableRowColumn>
          <TableRowColumn style={{...style.lineItem, width:60}}>
            <span
              style={{color:'blue', cursor:'pointer'}}
              onTouchTap={()=>this._showTax(promotion.tax_summary)}
              title={promotion.tax_summary.join('\n')}>
              {`$${promotionTax}`}
            </span>
          </TableRowColumn>
          <TableRowColumn style={{...style.lineItem, width:60}}>
            {`$${promotionTotal}`}
          </TableRowColumn>
          <TableRowColumn style={{...style.lineItem, width:70}}>
            <span
              style={{cursor:'pointer'}}
              onTouchTap={()=>this.props.removeFromCart(promotion.id)}>X</span>
          </TableRowColumn>
        </TableRow>
      )
    }

    let summary = []
    for (var i = 0; i < this.state.taxSummary.length; i++) {
      const summaryItem = this.state.taxSummary[i]
      summary.push(<h1 key={`summary-${i}`}>{summaryItem}</h1>)
    }

    let grandTotal = 0.0
    for (var i = 0; i < this.state.promotions.length; i++) {
      const newPromotion = this.state.promotions[i]
      const cartPromotion = this.state.cart.find(
        function(promotion){return promotion.id === parseInt(newPromotion.id)}
      )
      let promotionQty = cartPromotion ? cartPromotion.qty : 1
      grandTotal += ((newPromotion.discounted * promotionQty) + newPromotion.tax_total + 1.99)
    }
    grandTotal = grandTotal.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

    let shoppingCart = null
    if(this.props.promotionsLoaded && this.state.promotions.length === 0){
      shoppingCart = <h1>Your Cart is empty...</h1>
    }else{
      shoppingCart =
        <div>
          <div style={style.gridContainer}>
            <div style={{minWidth:680, maxWidth:1000}}>
              <Table style={{margin:'0 auto'}}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow selectable={false}>
                    <TableHeaderColumn style={{...style.lineItem, width:150}}>Attraction</TableHeaderColumn>
                    <TableHeaderColumn style={style.lineItem}>Ticket Description</TableHeaderColumn>
                    <TableHeaderColumn style={{...style.lineItem, width:60}}>Price</TableHeaderColumn>
                    <TableHeaderColumn style={{...style.lineItem, width:60}}>Qty</TableHeaderColumn>
                    <TableHeaderColumn style={{...style.lineItem, width:60}}>Tax</TableHeaderColumn>
                    <TableHeaderColumn style={{...style.lineItem, width:60}}>Total</TableHeaderColumn>
                    <TableHeaderColumn style={{...style.lineItem, width:70}}>Actions</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody  displayRowCheckbox={false}>
                  {lineItems}
                </TableBody>
              </Table>
            </div>
          </div>
          <div style={{...style.gridContainer, textAlign:'right'}}>
            <span>{"Transaction Fee: + $1.99"}</span>
            <br />
            <span style={{color:deepOrange500, fontSize:22, letterSpacing:1}}>{`TOTAL: $${grandTotal}`}</span>
          </div>
          <div style={{width:'100%', margin:'10px auto'}}>
            <RaisedButton
              label='Continue Shopping'
              labelColor={deepOrange500}
              backgroundColor='white'
              style={{width:250, margin:2, display:'inline-block'}}
              onTouchTap={()=>browserHistory.push('/tickets')} />
            <RaisedButton
              label='proceed to checkout'
              labelColor='white'
              backgroundColor={deepOrange500}
              onTouchTap={()=>this.props.changeView('checkout')}
              style={{width:250, margin:2, display:'inline-block'}} />
          </div>

          <Dialog
            modal={false}
            open={this.state.showDialog}
            autoScrollBodyContent={true}
            title='Tax Summary'
            onRequestClose={this._closeDialog}>
            <br />
            {summary}
          </Dialog>
        </div>
    }

    return(
      <div>
        {shoppingCart}
      </div>
    )
  }
}

export default CartGrid
