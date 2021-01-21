import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { 
  createNew as createBlog,
} from '../reducers/blogsReducer'

const extendedField = (field, name, id) => ({
  ...field,
  name: name,
  id: `${id}__${name}`
})

const BlogAddForm = ({ createBlog, id, toogleRef}) => {
  const author = extendedField(useField('text'), 'author', id)
  const title = extendedField(useField('text'), 'title', id)
  const url = extendedField(useField('text'), 'url', id)

  const handleAddBlog = (event) => {
    event.preventDefault()
    console.log('Creating new blog with:')
    console.log('Author:', author.value)
    console.log('Title:', title.value)
    console.log('Url:', url.value)

    try {
      createBlog(
        title.value,
        author.value,
        url.value
      )
    } catch (exception) {
      console.log(exception.response)
    }
    

    // notify(`New blog '${title}' by '${author}' added successfully!`)
    toogleRef.current.toggleVisibility()
  }

  return (
    <form id={id} onSubmit={handleAddBlog}>
      <h2>Create new</h2>
      <div>
        title:
        <input {...title}/>
      </div>
      <div>
        author:
        <input {...author} />
      </div>
      <div>
        url:
        <input  {...url}/>
      </div>
      <button id="blog-add-form__submit" type="submit">create</button>
    </form>)
}


const mapDispatchToProps = dispatch => ({
  createBlog: (title, author, url) => {
    dispatch(createBlog({
      title,
      author,
      url
    }))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(BlogAddForm)