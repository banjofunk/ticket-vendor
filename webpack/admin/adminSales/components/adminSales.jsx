import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { deepOrange500 } from 'material-ui/styles/colors'
import * as actions from '../actions'
import DatePicker from 'material-ui/DatePicker'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import SaleDetails from './saleDetails'
import TextField from 'material-ui/TextField'

@connect((store) => {
  return {
    currentPage: store.adminSales.currentPage,
    totalPages: store.adminSales.totalPages,
    transactions: store.adminSales.transactions
  }
})
class AdminSales extends React.Component {
  constructor(props){
    super(props)
    this._changeMaxDate = this._changeMaxDate.bind(this)
    this._changeMinDate = this._changeMinDate.bind(this)
    this._changeResendPhone = this._changeResendPhone.bind(this)
    this._changeResendEmail = this._changeResendEmail.bind(this)
    this._closeDialog = this._closeDialog.bind(this)
    this._closeResendDialog = this._closeResendDialog.bind(this)
    this._createRows = this._createRows.bind(this)
    this._getDates = this._getDates.bind(this)
    this._handleGridSort = this._handleGridSort.bind(this)
    this._onFilterChange = this._onFilterChange.bind(this)
    this._resendTickets = this._resendTickets.bind(this)
    this._rowGetter = this._rowGetter.bind(this)
    this._runReport = this._runReport.bind(this)
    this._viewTxnDetails = this._viewTxnDetails.bind(this)

    const minDate = new Date()
    const maxDate = new Date()
    minDate.setDate(minDate.getDate() - 1)
    minDate.setHours(0, 0, 0, 0)
    maxDate.setHours(11, 59, 59, 59)
    this.state = {
      admissions:[],
      filteredRows:[],
      filterValue:'',
      maxDate: maxDate,
      minDate: minDate,
      transaction: {},
      resendEmail: '',
      resendPhone: '',
      rows:[],
      showDialog:false,
      showResendDialog:false,
      sortedRows:[]
    }
  }
  componentWillMount(){
    const minDate = this.state.minDate.getTime()/1000
    const maxDate = this.state.maxDate.getTime()/1000
    const txnData = {
      minDate:minDate,
      maxDate:maxDate,
      page:1,
      count:25
    }
    this.props.dispatch(actions.getTransactions(txnData))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.currentPage < nextProps.totalPages){
      const minDate = this.state.minDate.getTime()/1000
      const maxDate = this.state.maxDate.getTime()/1000
      const txnData = {
        minDate:minDate,
        maxDate:maxDate,
        page:nextProps.currentPage + 1,
        count:25
      }
      this.props.dispatch(actions.getTransactions(txnData))
    }
    let rows = this.state.rows
    if(nextProps.currentPage == 1){
      rows = []
      this.setState({rows:rows})
    }
    this._createRows(nextProps.transactions, rows)
  }
  _closeDialog(){
    this.setState({showDialog:false})
  }

  _closeResendDialog(){
    this.setState({showResendDialog:false})
  }

  _showResendDialog(transaction){
    this.setState({
      showResendDialog:true,
      transaction,
      resendPhone: transaction.phone,
      resendEmail: transaction.email
    })
  }

  _viewTxnDetails(admissions){
    this.setState({admissions:admissions, showDialog:true})
  }
  _createRows(transactions, rows=[]){
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i]
      rows.push({
        bt_id: transaction.bt_id || "N/A",
        date: transaction.date,
        time: transaction.time,
        total: `$${transaction.total}`,
        name: transaction.name,
        email: transaction.email || "N/A",
        phone: transaction.phone || "N/A",
        actions:
          <div>
            <span
              style={{
                color:'blue',
                cursor:'pointer',
                textDecoration:'underline'
              }}
              onTouchTap={()=>this._viewTxnDetails(transaction.admissions)}
              title="details">
              details
            </span>
            <span style={{margin:5}}>|</span>
            <a
              target="_blank"
              href={transaction.link} title="tickets">
              tickets
            </a>
            <span style={{margin:5}}>|</span>
            <span
              style={{
                color:'blue',
                cursor:'pointer',
                textDecoration:'underline'
              }}
              onTouchTap={()=>this._showResendDialog(transaction)}
              title="resend tickets">
              resend
            </span>

          </div>
      })
    }
    this.setState({rows:rows, filteredRows:rows, sortedRows:rows})
  }
  _rowGetter(i) {
    return this.state.sortedRows[i]
  }
  _changeMinDate(event, date){
    date.setHours(0, 0, 0, 0)
    this.setState({
      minDate: date,
    })
  }
  _changeMaxDate(event, date){
    date.setHours(11, 59, 59, 59)
    this.setState({
      maxDate: date,
    })
  }

  _changeResendEmail(event, resendEmail){
    this.setState({resendEmail})
  }

  _changeResendPhone(event, resendPhone){
    this.setState({resendPhone})
  }

  _getDates(){
    const minDate = this.state.minDate.getTime()/1000
    const maxDate = this.state.maxDate.getTime()/1000
    const txnData = {
      minDate:minDate,
      maxDate:maxDate,
      page:1,
      count:25
    }
    this.props.dispatch(actions.getTransactions(txnData))
  }

  _runReport(){
    const minDate = this.state.minDate.getTime()/1000
    const maxDate = this.state.maxDate.getTime()/1000
    const link = `api/admin/transactions/admissions_report.csv?min_date=${minDate}&max_date=${maxDate}`
    window.location = `${window.location.origin}/${link}`
    alert('running reports may take a few moments, but your download will begin momentarily.')
  }

  _onFilterChange(event){
    const newValue = event.target.value
    var reg = new RegExp(newValue,"gi")
    var numReg = new RegExp(
      (newValue.match(/\d/gi) && !newValue.match(/[a-zA-Z]/gi)) ?
      newValue.match(/\d/gi).join('') :
      null, "gi"
    )
    let filtered = this.state.rows.filter((el) => (
      el.name.match(reg) ||
      el.email.match(reg) ||
      (
        String(el.phone).match(/\d/gi) ?
        String(el.phone).match(/\d/gi).join('') :
        ""
      ).match(numReg) ||
        String(el.bt_id).match(reg) ||
        String(el.id).match(reg) ||
      (
        String(el.total).match(/\d/gi) ?
        String(el.total).match(/\d/gi).join('') :
        ""
      ).match(numReg)
    ))
    this.setState({filterValue:newValue, filteredRows:filtered, sortedRows:filtered})
  }

  _resendTickets(){
    const txn = this.state.transaction
    const phone = this.state.resendPhone
    const email = this.state.resendEmail
    this.props.dispatch(
      actions.resendTickets(txn, phone, email)
    )
    this.setState({showResendDialog:false})
  }

  _handleGridSort(sortColumn, sortDirection){
      let allRows = this.state.filteredRows
      let sortedRows = null

      if(sortColumn == 'total' && sortDirection != 'NONE'){
        sortedRows = allRows.sort(function (a, b) {
          const totalA = parseInt(parseFloat(a.total.match(/\d|\./g).join('')))
          const totalB = parseInt(parseFloat(b.total.match(/\d|\./g).join('')))
          const sorted = sortDirection == 'ASC' ? totalB - totalA : totalA - totalB
          return sorted
        })
      }
      if(sortColumn == 'phone' && sortDirection != 'NONE'){
        sortedRows = allRows.sort(function (a, b) {
          const phoneA = parseInt(parseFloat(a.phone.match(/\d/g).join('')))
          const phoneB = parseInt(parseFloat(b.phone.match(/\d/g).join('')))
          const sorted = sortDirection == 'ASC' ? phoneB - phoneA : phoneA - phoneB
          return sorted
        })
      }
      if(sortColumn == 'email' && sortDirection != 'NONE'){
        sortedRows = allRows.sort(function(a, b) {
          const stringA = a.email.toUpperCase()
          const stringB = b.email.toUpperCase()
          if(sortDirection == 'ASC'){
            if (stringA < stringB) { return -1 }
            if (stringA > stringB) { return 1 }
          }else{
            if (stringA < stringB) { return 1 }
            if (stringA > stringB) { return -1 }
          }
          return 0
        })
      }
      if(sortColumn == 'name' && sortDirection != 'NONE'){
        sortedRows = allRows.sort(function(a, b) {
          const stringA = a.name.toUpperCase()
          const stringB = b.name.toUpperCase()
          if(sortDirection == 'ASC'){
            if (stringA < stringB) { return -1 }
            if (stringA > stringB) { return 1 }
          }else{
            if (stringA < stringB) { return 1 }
            if (stringA > stringB) { return -1 }
          }
          return 0
        })
      }
      if(sortColumn == 'date' || sortColumn == 'time' || sortDirection == 'NONE'){
        sortedRows = allRows.sort(function(a,b) {
          const splitA = a.date.split('/')
          const dateA = [splitA[2], splitA[0], splitA[1]].join('')
          const timeA = a.time.match(/\d/gi).join('')
          const splitB = b.date.split('/')
          const dateB = [splitB[2], splitB[0], splitB[1]].join('')
          const timeB = b.time.match(/\d/gi).join('')
          a = parseInt(dateA + timeA)
          b = parseInt(dateB + timeB)
          return sortDirection == 'ASC' ? a - b : b - a
        })
      }
      if(sortedRows){
        this.setState({sortedRows:sortedRows})
      }
  }

  render() {
    const columns = [
      {
        key: 'bt_id',
        name: 'Braintree ID',
        width:110
      },
      {
        key: 'date',
        name: 'Date',
        sortable:true,
        width:110
      },
      {
        key: 'time',
        name: 'Time',
        sortable:true,
        width:110
      },
      {
        key: 'total',
        name: 'Total',
        sortable:true,
        width:80
      },
      {
        key: 'name',
        name: 'Name',
        sortable:true,
        width:150
      },
      {
        key: 'email',
        name: 'Email',
        sortable:true,
        width:200
      },
      {
        key: 'phone',
        name: 'Phone',
        sortable:true,
        width:150
      },
      {
        key: 'actions',
        name: 'Actions',
        width:180
      }
    ]
    const style = {
      gridContainer:{
        width:'90%',
        maxWidth:1200,
        margin:'20px auto',
        overflowX:'scroll'
      }
    }
    let loadingMessage = null
    if(this.props.currentPage != this.props.totalPages){
      loadingMessage =
        <div style={{width:'100%', margin:'10px auto', textAlign:'center'}}>
          <span
            style={{margin:20}}>
            {`${Math.round((this.props.currentPage/this.props.totalPages)*100)}% Loaded`}
          </span>

        </div>
    }else{
      if(this.state.filteredRows.length){
        const minDate = this.state.minDate.getTime()/1000
        const maxDate = this.state.maxDate.getTime()/1000
        const link = `/api/admin/transactions.csv?min_date=${minDate}&max_date=${maxDate}`

        loadingMessage =
          <div style={{width:'100%', margin:'10px auto', textAlign:'center'}}>
            <span style={{margin:20}}>
              {`${this.state.filteredRows.length || 'No'} Transactions Found`}
            </span>
            <a href={link}>
              {'(CSV)'}
            </a>
          </div>
      }else{
        loadingMessage =
          <div style={{width:'100%', margin:'10px auto', textAlign:'center'}}>
            <span style={{margin:20}}>
              {'No Transactions Found'}
            </span>
          </div>
      }
    }

    return(
      <div>
        {!this.props.totalPages > 0 &&
          <div style={{textAlign:'center', height:400}}>
            <br />
            <h1>Loading...</h1>
          </div>
        }
        {this.props.totalPages > 0 &&
          <div>
            {loadingMessage}
            <div style={{...style.gridContainer, position:'relative', overflow:'hidden'}}>
              <DatePicker
                style={{float:'left'}}
                textFieldStyle={{width:100}}
                onChange={this._changeMinDate}
                autoOk={true}
                floatingLabelText="Min Date"
                formatDate={
                  (date) => {
                    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                  }
                }
                defaultDate={this.state.minDate} />
              <DatePicker
                style={{float:'left', marginLeft:10}}
                textFieldStyle={{width:100}}
                onChange={this._changeMaxDate}
                autoOk={true}
                floatingLabelText="Max Date"
                formatDate={
                  (date) => {
                    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                  }
                }
                defaultDate={this.state.maxDate} />
              <FlatButton
                label="Get Dates"
                style={{float:'left', marginLeft:10, marginTop: 30}}
                onTouchTap={this._getDates}
                primary={true} />
              <FlatButton
                label="Run Full Report"
                style={{float:'left', marginLeft:10, marginTop: 30}}
                onTouchTap={this._runReport}
                primary={true} />

              <TextField
                style={{position:'absolute', right:0, bottom:5}}
                value={this.state.filterValue}
                onChange={this._onFilterChange}
                hintText="Search" />
              <br />
            </div>
            <div style={style.gridContainer}>
              <div style={{width:1120}}>
                <ReactDataGrid
                  columns={columns}
                  onGridSort={this._handleGridSort}
                  rowHeight={75}
                  enableCellSelect={false}
                  rowGetter={this._rowGetter}
                  rowsCount={this.state.sortedRows.length}
                  minHeight={(this.state.sortedRows.length * 75) + 45} />
              </div>
            </div>
            {loadingMessage}
            <Dialog
              modal={false}
              open={this.state.showDialog}
              contentStyle={{width:'95%', maxWidth:950}}
              autoScrollBodyContent={true}
              title='Transaction Summary'
              onRequestClose={this._closeDialog}>
              <br />
              {this.state.admissions.length > 0 &&
                <SaleDetails admissions={this.state.admissions} />
              }
            </Dialog>
            <Dialog
              modal={false}
              open={this.state.showResendDialog}
              contentStyle={{width:'95%', maxWidth:950}}
              autoScrollBodyContent={true}
              title='Resend Tickets'
              onRequestClose={this._closeResendDialog}>
              <br />
              <h1>Where should the tickets be resent?</h1>
              <br />
              <h1>Phone</h1>
              <TextField
                value={this.state.resendPhone}
                onChange={this._changeResendPhone}
                hintText="Phone Number" />
              <h1>Email</h1>
              <TextField
                value={this.state.resendEmail}
                onChange={this._changeResendEmail}
                hintText="Email Address" />
              <br />
              <FlatButton
                primary={true}
                onTouchTap={()=>this._resendTickets()}
                label="resend tickets" />
            </Dialog>
          </div>
        }
      </div>
    )
  }
}

export default AdminSales
