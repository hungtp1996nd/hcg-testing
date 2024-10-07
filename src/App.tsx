import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Layout } from './components/Layout'
import Spinner from './components/Spinner'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const Content = React.lazy(() => import('./pages/Content'))
const Tasks = React.lazy(() => import('./pages/Task'))

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <Content />
              </Suspense>
            }
          />
          <Route
            path="/tasks"
            element={
              <Suspense fallback={<Spinner />}>
                <Tasks />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  )
}

export default App
