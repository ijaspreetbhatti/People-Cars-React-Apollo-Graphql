import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries'

import { List } from 'antd'
import Car from '../listItems/Car'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Cars = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log('people', data.people)

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Car key={id} id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  )
}

export default Cars
