import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import Main from './designPart/main';
import Dashboard from './designPart/dashboard';

const router = createBrowserRouter(createRoutesFromElements(
  <>
      <Route path='/' element={<Main />} />
      <Route path='/dashboard' element={<Dashboard />} />
  </>
));

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

