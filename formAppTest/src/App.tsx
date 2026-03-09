import { Navigate, Route, Routes } from 'react-router-dom'
import { Step1 } from './pages/Step1'
import { Step2 } from './pages/Step2'
import { Step3 } from './pages/Step3'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/step-1" replace />} />
      <Route path="/step-1" element={<Step1 />} />
      <Route path="/step-2" element={<Step2 />} />
      <Route path="/step-3" element={<Step3 />} />
      <Route path="*" element={<Navigate to="/step-1" replace />} />
    </Routes>
  )
}

export default App
