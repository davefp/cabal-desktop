const defaultState = {
  screen: 'addMesh',
  currentMesh: null,
  dialogs: {
    delete: {
      mesh: null
    }
  },
  meshes: {}
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'JOIN_USER':
      var mesh = state.meshes[action.addr]
      mesh.users.push(action.username)
      return state
    case 'LEAVE_USER':
      var mesh = state.meshes[action.addr]
      delete mesh.users[action.username]
      return state
    case 'SHOW_ADD_MESH':
      return {
        ...state,
        screen: 'addMesh'
      }
    case 'HIDE_ADD_MESH':
      return {
        ...state,
        screen: 'main'
      }
    case 'VIEW_MESH':
      return {
        ...state,
        currentMesh: action.addr
      }
    case 'ADD_MESH':
      console.log('adding', action)
      return {
        ...state,
        meshes: {
          ...state.meshes,
          [action.addr]: {
            addr: action.addr,
            username: action.username
          }
        }
      }
    case 'DELETE_MESH':
      const { [action.addr]: del, ...meshes } = state.meshes
      return {...state, meshes}
    case 'DIALOGS_DELETE_CLOSE':
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          delete: {
            mesh: null
          }
        }
      }
    case 'DIALOGS_DELETE_OPEN':
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          delete: {
            mesh: action.addr
          }
        }
      }
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.key]: action.value
        }
      }
    default:
      return defaultState
  }
}

export default reducer