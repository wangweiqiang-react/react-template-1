/*
Provider 接收两个 props，reducer 和 initialState。把这两个属性作为参数，
调用 useReducer 来获取到 state 和 dispatch。
然后再把 state 和 dispatch 原封不动的交给 StoreContext.Provider
*/
import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import StoreContext from './StoreContext'

export default function Provider({ children, reducer, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = reducer ? [state, dispatch] : initialState
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
  //   reducer: PropTypes.func.isRequired,
  initialState: PropTypes.any.isRequired
}
