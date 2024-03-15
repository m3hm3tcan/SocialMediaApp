import { Routes, Route } from 'react-router-dom';
import './global.css';

export const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        {/* <Route path="/sing-in" element= {<SignInForm/>} /> */}

        {/* private routes */}
        {/* <Route path="/" element= {<Home />} /> */}

      </Routes>
    </main>
  )
}
