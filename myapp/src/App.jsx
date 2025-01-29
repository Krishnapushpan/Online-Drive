import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route,} from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ViewFolder from './pages/ViewFolder';
import ViewImage from './pages/ViewImage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       <Route path="/" element={<LoginPage/>}/>
       <Route path="/SignupPage" element={<SignupPage/>}/>
       <Route path="/HomePage" element={<HomePage/>}/>
       <Route path="/view-folder" element={<ViewFolder />} />
       <Route path="/view-image" element={<ViewImage />} />

      </>
    )
  )
  return (
<RouterProvider router={router}/>

  )
}

export default App