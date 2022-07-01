import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { Form, Input, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { ADD_CAR, GET_CARS } from '../../queries'

import { Select } from 'antd';

const { Option } = Select;

const AddPerson = (props) => {
  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const {
      year,
      make,
      model,
      price,
      personId
    } = values

    addCar({
      variables: {
        id,
        year: Number(year),
        make,
        model,
        price: Number(price),
        personId
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS })
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        })
      }
    })
  }

  return (
    <Form
      form={form}
      name='add-car-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input year!' }]}
      >
        <Input placeholder='i.e. 2017' type={"number"} min="1900" max="2099" />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input car make!' }]}
      >
        <Input placeholder='i.e. Honda' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input car model!' }]}
      >
        <Input placeholder='i.e. Civic SI' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input price!' }]}
      >
        <Input placeholder='i.e 30000' type={"number"} min={.00} step={1.00} />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please choose the owner!' }]}
      >
        <Select style={{ width: 150 }}>
          {props.people.map(person => (
            <Option key={person.id} value={person.id}>{person.firstName + ' ' + person.lastName}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddPerson
