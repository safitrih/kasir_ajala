import React, { useState, useMemo, useContext, useEffect } from 'react'
import is from 'is_js'
import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

// why im create this , maybe it cause
// im think this singlethon call for 401 token timeout so it only call from one instance
const axioInstance = axios.create()
axios.defaults.baseURL = Constants.manifest.extra.api_url

const refreshAccessToken = (refreshToken) => {
  return axios({
    method: 'PUT',
    url: '/authentications',
    data: { refreshToken },
  }).then((res) => res.data)
}

const logoutApi = (refreshToken) => {
  return axios({
    method: 'DELETE',
    url: '/authentications',
    data: { refreshToken },
  }).then((res) => res.data)
}

const userManager = {
  async set(val = {}) {
    await AsyncStorage.setItem('KASIRAJA_USER', val)
  },
  async get() {
    try {
      const user = await AsyncStorage.getItem('KASIRAJA_USER')
      return JSON.parse(user)
    } catch (error) {
      return error
    }
  },
  async remove() {
    await AsyncStorage.removeItem('KASIRAJA_USER')
  },
}

const AppContext = React.createContext()

function AppProvider(props) {
  const [user, setUser] = useState(null)

  const [cart, setCart] = useState({ items: [], customer: null, payAmount: 0, discount: 0 })
  const [temp, setTemp] = useState({})

  const value = useMemo(
    () => ({
      user,
      setUser,
      cart,
      setCart,
      temp,
      setTemp,
    }),
    [user, setUser, cart, setCart, temp, setTemp]
  )

  const getUser = async () => {
    const savedUser = await userManager.get()
    setUser(savedUser)
  }

  const axiosIntercept = async () => {
      await axios.interceptors.response.use(
        (res) => res,
        async (error) => {
          const {
            status,
            data: { message },
          } = error.response
          if (status === 401 && message === 'Unauthenticated.') {
            setUser(null)
            return
          }

          if (status === 401 && message === 'Token maximum age exceeded') {
            const originalRequest = error.config
            originalRequest._retry = true
            const user = await userManager.get()

            const { refreshToken } = user
            const res = await refreshAccessToken(refreshToken)
            const newUser = { ...user, accessToken: res.data.accessToken }

            setUser(newUser)
            userManager.set(JSON.stringify(newUser))
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.accessToken}`
            return axioInstance(originalRequest)
          }

          throw error
        }
      )
      await getUser()
  }

  useEffect(() => {
    axiosIntercept()
  }, [])

  return (
    <AppContext.Provider value={value} {...props} />
  )
}

function useTempStore() {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw Error('useTempStore must be used within AppProvider')
  }

  const { temp, setTemp } = appContext

  const resetTemp = () =>setCart({})

  return {
    temp,
    setTemp,
    resetTemp,
  }
}

function useCart() {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw Error('useCart must be used within AppProvider')
  }

  const { cart, setCart } = appContext

  const resetCart = () => setCart({ ...cart, items: [], payAmount: 0, discount: 0 })

  return {
    cart,
    setCart,
    resetCart,
  }
}

function useAuth() {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw Error('useAuth must be used within AppProvider')
  }
  const { user, setUser, setCart } = appContext

  const isLoggedIn = () => {
    return is.not.empty(user) && is.not.null(user)
  }

  const persistUser = (user) => {
    userManager.set(JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    logoutApi(user.refreshToken)
    userManager.remove()
    setUser(null)
    setCart({items: []})
  }

  return {
    user,
    isLoggedIn,
    persistUser,
    logout,
  }
}

export { AppProvider, useAuth, useCart, useTempStore }
