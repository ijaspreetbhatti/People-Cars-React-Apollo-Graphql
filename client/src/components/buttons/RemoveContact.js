import { useMutation } from '@apollo/client'
import { filter } from 'lodash'

import { DeleteOutlined } from '@ant-design/icons'

import { GET_CONTACTS, REMOVE_CONTACT } from '../../queries'

const RemoveContact = props => {
  const { id } = props
  const [removeContact] = useMutation(REMOVE_CONTACT, {
    update(cache, { data: { removeContact } }) {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS })
      cache.writeQuery({
        query: GET_CONTACTS,
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
