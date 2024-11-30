import './App.css'
import {Header,Footer } from "./component/index"
import { Provider } from 'react-redux'
import { store } from './reduxStore/store/store'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='h-screen flex flex-col' style={{backgroundImage: 'url(./src/assets/images/bgforblog.png)'}}>
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
    </div>
  )
}

export default App
