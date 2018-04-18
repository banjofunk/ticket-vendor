import * as t from 'actions/actionTypes'

const initialState = {
  text: null,
  kind: null,
  timeout: 1000
}

export default function auth(
  state=initialState, action) {

    switch (action.type) {
      case t.CLEAR_MESSAGES:
        return initialState
        break
      case t.CREATED_ADMIN_TAX:
        return { ...initialState,
          text: 'tax has been created',
          kind: 'success'
        }
        break
      case t.DELETED_ADMIN_ADMISSIONS:
        return { ...initialState,
          text: 'promotion admissions have been deleted',
          kind: 'danger',
          timeout: 2000
        }
        break
      case t.DELETED_ADMIN_PROMOTION:
        return { ...initialState,
          text: 'promotion has been deleted',
          kind: 'warning'
        }
        break
      case t.DELETED_ADMIN_ATTRACTION:
        return { ...initialState,
          text: 'attraction has been deleted',
          kind: 'warning'
        }
        break
      case t.DELETED_ADMIN_TAX:
        return { ...initialState,
          text: 'tax has been deleted',
          kind: 'warning'
        }
        break
      case t.ERROR_MESSAGE:
        return { ...initialState,
          text: action.payload,
          kind: 'error',
          timeout: 3000
        }
        break
      case t.UPDATED_ADMIN_TAX:
        return { ...initialState,
          text: 'updated tax information',
          kind: 'success'
        }
        break
      case t.UPLOADED_ADMIN_ADMISSIONS:
        return { ...initialState,
          text: 'promotion admissions uploaded',
          kind: 'success'
        }
        break
      case t.USER_LOGIN:
        const { email } = action.payload
        return { ...initialState,
          text: `${email} is logged in.`,
          kind: 'success'
        }
        break
      case t.USER_LOGOUT:
        return { ...initialState,
          text: 'user is logged out.',
          kind: 'success'
        }
        break
    }
    return state
}
