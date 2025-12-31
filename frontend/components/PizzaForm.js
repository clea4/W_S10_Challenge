import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postOrder, fetchOrders } from '../state/orderSlice'

const initialState = {
  fullName: '',
  size: '',
  toppings: []
}

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'TOGGLE_TOPPING':
      return {
        ...state,
        toppings: state.toppings.includes(action.topping)
          ? state.toppings.filter(t => t !== action.topping)
          : [...state.toppings, action.topping]
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function PizzaForm() {
  const [formState, formDispatch] = useReducer(formReducer, initialState)
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(state => state.orders)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const orderData = {
      fullName: formState.fullName,
      size: formState.size,
    }
    if (formState.toppings.length > 0) {
      orderData.toppings = formState.toppings.map(t => parseInt(t))
    }
    const result = await dispatch(postOrder(orderData))
    if (postOrder.fulfilled.match(result)) {
      formDispatch({ type: 'RESET' })
      await dispatch(fetchOrders())
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress</div>}
      {error && <div className="failure">{error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={(e) => formDispatch({ type: 'SET_FIELD', field: 'fullName', value: e.target.value })}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formState.size}
            onChange={(e) => formDispatch({ type: 'SET_FIELD', field: 'size', value: e.target.value })}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={formState.toppings.includes('1')}
            onChange={() => formDispatch({ type: 'TOGGLE_TOPPING', topping: '1' })}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={formState.toppings.includes('2')}
            onChange={() => formDispatch({ type: 'TOGGLE_TOPPING', topping: '2' })}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={formState.toppings.includes('3')}
            onChange={() => formDispatch({ type: 'TOGGLE_TOPPING', topping: '3' })}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={formState.toppings.includes('4')}
            onChange={() => formDispatch({ type: 'TOGGLE_TOPPING', topping: '4' })}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={formState.toppings.includes('5')}
            onChange={() => formDispatch({ type: 'TOGGLE_TOPPING', topping: '5' })}
          />
          Ham<br />
        </label>
      </div>

      <button data-testid="submit" type="submit">Submit</button>
    </form>
  )
}