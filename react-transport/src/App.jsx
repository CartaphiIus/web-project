import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Champions from './pages/Champions.jsx'
import Updates from './pages/Updates.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/champions" element={<Champions />} />
      <Route path="/updates" element={<Updates />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
