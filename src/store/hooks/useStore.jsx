/*
引入之前声明的 StoreContext，并调用 useContext 方法，
以获取 useContext.Provider 中保存的 state 和 dispatch。
通过把 state 和 dispatch 以一个对象的形式返回出去
 */
import { useContext } from 'react'
import StoreContext from './StoreContext'

export default function useStore() {
  const [state, dispatch] = useContext(StoreContext)
  return { state, dispatch }
}
