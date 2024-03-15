import { Routes, Route } from 'react-router-dom';
import './global.css';
import AuthLayout from './_auth/AuthLayout';
import SinginForm from './_auth/forms/SinginForm';
import SingupForm from './_auth/forms/SingupForm';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import { Toaster } from "./components/ui/toaster";

export const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element= {<SinginForm />} />
          <Route path="/sign-up" element= {<SingupForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout/>}>
          <Route path="/" element= {<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}
