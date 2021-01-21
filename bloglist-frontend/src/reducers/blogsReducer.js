import blogsService from '../services/blogs'


export const initialState = []

export const like = (blog) => (
  async dispatch => (
    dispatch({
      type: 'REPLACE',
      data: await blogsService.update({
        ...blog,
        likes: blog.likes + 1
      })
    })
  )
)


export const comment = (id, comment) => (
  async dispatch => (
    dispatch({
      type: 'REPLACE',
      data: await blogsService.comment(id, comment)
    })
  )
)


export const createNew = (content) => (
  async dispatch => {
    dispatch({
      type: 'CREATE',
      data: await blogsService.create(content)
    })
  }
)

export const deleteOne = (data) => (
  async dispatch => {
    await blogsService.delete(data)
    dispatch({
      type: 'DELETE',
      data
    })
  }
)

export const initialise = () => (
  async dispatch => (
    dispatch({
      type: 'INIT',
      data: await blogsService.getAll()
    })
  )
)


const blogsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REPLACE': 
    return state.map(el => (
      el.id === action.data?.id ? action.data
      : el
    ))
    case 'CREATE':
      return [...state, action.data]
    case 'DELETE':
      return state.filter(el => el.id !== action.data.id)
    case 'INIT':
      return action.data
    default:
      return state
  }
}


export default blogsReducer