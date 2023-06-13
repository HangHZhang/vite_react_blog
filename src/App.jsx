import {Routes,Route} from 'react-router-dom'
// import router from './routes'
import './App.css'
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

export default function App() {
  return (
    <Routes>
      <Route path='/*' element={<Admin/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  );
}