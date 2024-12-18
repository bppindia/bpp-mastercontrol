import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './router/Routes'

function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
