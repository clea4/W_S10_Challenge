import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders, setFilter } from '../state/orderSlice'

export default function OrderList() {
  const dispatch = useDispatch()
  const { orders, filter } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.size === filter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map(order => {
          const toppingCount = order.toppings ? order.toppings.length : 0
          const toppingText = toppingCount === 0 
            ? 'no toppings'
            : `${toppingCount} topping${toppingCount > 1 ? 's' : ''}`
          
          return (
            <li key={order.id}>
              <div>{order.customer} ordered a size {order.size} with {toppingText}</div>
            </li>
          )
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            key={size}
            data-testid={`filterBtn${size}`}
            className={filter === size ? 'active' : ''}
            onClick={() => dispatch(setFilter(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}