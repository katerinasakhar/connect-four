import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Bot from './components/Bot.tsx'
import Human from './components/Human.tsx';
import MainPage from './components/MainPage.tsx';

const route = createBrowserRouter([
  { path: "/", element:<MainPage/>},
  { path: "/bot-and-human", element:<Bot/>},
  { path: "/human-and-human", element: <Human/> },
]);

function App() {
 
  return (
    <div className='App'>
      <RouterProvider router={route}/>
    </div>
  )
}

export default App
