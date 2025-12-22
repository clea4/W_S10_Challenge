import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PizzaForm from './PizzaForm'
import OrderList from './OrderList'
import { fetchOrders } from '../state/store'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <div>
      <PizzaForm />
      <OrderList />
    </div>
  )
}

