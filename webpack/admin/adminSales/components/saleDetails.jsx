import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { browserHistory } from 'react-router'
import ReactDataGrid from 'react-data-grid'
import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class SaleDetails extends React.Component {
  constructor(props){
    super(props)
    this._createRows = this._createRows.bind(this)
    this._rowGetter = this._rowGetter.bind(this)
    this.state = {
      rows:[]
    }
  }
  componentWillMount(){
    this._createRows(this.props.admissions)
  }
  componentWillReceiveProps(nextProps){
    this._createRows(nextProps.admissions)
  }
  _createRows(admissions){
    let rows = []
    for (let i = 0; i < admissions.length; i++) {
      const admission = admissions[i]
      rows.push({
        affiliate: <span style={{whiteSpace:'wrap'}}>{admission.affiliate}</span>,
        description: <span style={{whiteSpace:'wrap'}}>{admission.description}</span>,
        count: admission.count,
        price: `$${admission.price}`,
        tax: `$${admission.tax}`,
        total: `$${admission.total}`
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
        name: 'Attraction',
        width:200
      },
      {
        key: 'description',
        name: 'Description',
        width:300
      },
      {
        key: 'count',
        name: 'QTY',
        width:80
      },
      {
        key: 'price',
        name: 'Each Price',
        width:100
      },
      {
        key: 'tax',
        name: 'Total Tax',
        width:100
      },
      {
        key: 'total',
        name: 'Total',
        width:100
      }
    ]
    const style = {
      gridContainer:{
        width:'100%',
        maxWidth:880,
        minHeight:400,
        margin:'20px auto',
        overflowX:'scroll'
      }
    }
    return(
      <div>
        <div style={style.gridContainer}>
          {this.props.admissions.length > 0 &&
            <div style={{width:880}}>
              <ReactDataGrid
                columns={columns}
                rowHeight={75}
                enableCellSelect={false}
                rowGetter={this._rowGetter}
                rowsCount={this.props.admissions.length}
                minHeight={(this.props.admissions.length * 75) + 75} />
              <div style={{clear:'both'}}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default SaleDetails
