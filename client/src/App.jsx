import {Routes, Route, Link} from 'react-router-dom'
import './index.css'
import Title from './components/title'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Homepage from './routes/Homepage'

function App() {

  return (
    <div className='w-[100vw] h-[100vh] bg-[rgb(0,0,0)] '>
      <Title/>

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/Homepage' element={<Homepage/>}/>
    </Routes>
    </div>
  )
}

export default App
