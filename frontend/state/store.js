
import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './orderSlice'

export const resetStore = () => {
  return configureStore({
    reducer: {
      orders: orderReducer
    }
  })
}

export const store = resetStore()

export * from './orderSlice'