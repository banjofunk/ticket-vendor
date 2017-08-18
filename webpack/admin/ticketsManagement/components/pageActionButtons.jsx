import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors';

class PageActionButtons extends React.Component {
  render() {
    const style = {
      buttonsContainer:{
        position:'fixed',
        backgroundColor:'white',
        borderRadius:5,
        padding:5,
        zIndex:20,
        bottom:5,
        right:5
      },
      saveButton:{},
      cancelButton:{
        marginRight:5
      }
    }
    return(
      <div>
        {this.props.showSave && <div style={style.buttonsContainer}>
          <RaisedButton
            label="Cancel"
            style={style.cancelButton}
            onTouchTap={this.props.cancelPageContent} />
          <RaisedButton
            label="Save"
            backgroundColor={deepOrange500}
            onTouchTap={this.props.savePageContent}
            style={style.saveButton} />
        </div>}
      </div>
    )
  }
}

export default PageActionButtons
