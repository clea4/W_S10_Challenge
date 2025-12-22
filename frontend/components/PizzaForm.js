import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postOrder } from '../state/store'

export default function PizzaForm() {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(state => state.orders)

  const [fullName, setFullName] = useState('')
  const [size, setSize] = useState('')
  const [toppings, setToppings] = useState([])

  const toggle = id =>
    setToppings(t =>
      t.includes(id) ? t.filter(x => x !== id) : [...t, id]
    )

  const submit = e => {
    e.preventDefault()
    dispatch(postOrder({ fullName, size, toppings }))
    setFullName('')
    setSize('')
    setToppings([])
  }

  return (
    <form onSubmit={submit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed: {error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Type full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
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
            value={size}
            onChange={e => setSize(e.target.value)}
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
            checked={toppings.includes('1')}
            onChange={() => toggle('1')}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={toppings.includes('2')}
            onChange={() => toggle('2')}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={toppings.includes('3')}
            onChange={() => toggle('3')}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={toppings.includes('4')}
            onChange={() => toggle('4')}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={toppings.includes('5')}
            onChange={() => toggle('5')}
          />
          Ham<br />
        </label>
      </div>

      <button data-testid="submit" type="submit">Submit</button>
    </form>
  )
}

