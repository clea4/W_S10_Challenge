import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await fetch('http://localhost:9009/api/pizza/history')
    const data = await response.json()
    return data
  }
)

export const postOrder = createAsyncThunk(
  'orders/postOrder',
  async (order, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:9009/api/pizza/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      const result = await response.json()
      
      if (!response.ok) {
        return rejectWithValue(result.message)
      }
      
      return result.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    filter: 'All',
    isLoading: false,
    error: null
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { setFilter } = orderSlice.actions
export default orderSlice.reducer
