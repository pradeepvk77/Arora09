import { useState } from 'react'
import './App.css'
import {Header,Footer } from "./component/index"
import Splash from './pages/SplashTest'
import { Provider } from 'react-redux'
import { store } from './reduxstore/store/store'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='h-full'>
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
    </div>
  )
}

export default App
