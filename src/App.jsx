import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import PostProvider from './store/Post-store'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <PostProvider>
    <div className='media_layout'>
      <Sidebar />
      <div className='content'>
        <Header />
        <Outlet/>
        <Footer />
      </div>
    </div>
    </PostProvider>
  )
}

export default App
