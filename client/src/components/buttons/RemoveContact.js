import { useMutation } from '@apollo/client'
import { filter } from 'lodash'

import { DeleteOutlined } from '@ant-design/icons'

import { GET_PEOPLE, REMOVE_PERSON } from '../../queries'

const RemoveContact = props => {
  const { id } = props
  const [removeContact] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removeContact } }) {
      const { contacts } = cache.readQuery({ query: GET_PEOPLE })
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          contacts: filter(contacts, c => c.id !== removeContact.id)
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to remove this contact?')

    if (result) {
      removeContact({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveContact
