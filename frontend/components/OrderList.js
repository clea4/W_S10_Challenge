import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit'

// Async thunk to fetch order history
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const res = await fetch('http://localhost:9009/api/pizza/history')
  return res.json()
})

// Async thunk to post a new order
export const postOrder = createAsyncThunk('orders/postOrder', async (order) => {
  const res = await fetch('http://localhost:9009/api/pizza/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message)
  }
  return res.json()
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    filter: 'All',
    isLoading: false,
    error: null
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => { state.isLoading = true })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(postOrder.pending, state => { state.isLoading = true; state.error = null })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders.push(action.payload)
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { setFilter } = ordersSlice.actions

export const store = configureStore({
  reducer: { orders: ordersSlice.reducer }
})
