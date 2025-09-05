import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Log_in'
import LandingPage from './pages/Landing'
import Home from './pages/Home'
import Contact from './pages/Contact'
import UnderDevelopment from './pages/Unser_dev'
import MultiCameraTrafficLight from './pages/Traffic_light'
import Dashboard from './components/ui/Dashboard'
import Accident from './pages/Accident'
import SmartChallan from './pages/SmartChallan'
import TrafficUpdate from './pages/Traffic_update'
import MapwithRoutes from './pages/MapwithRoutes'
import Dash_1 from './pages/Dash_1'
import Dash_2 from './pages/Dash_2'
import Upload from './pages/Upload'

function App() {
  return (
    <Router>
      <div className='bg-[#0A0D14] min-h-screen'>
        <Routes>
          {/* Pages without layout (full screen) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Pages with layout (with navigation sidebar) */}
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/upload" element={<Layout><Upload /></Layout>} />
          <Route path="/accident" element={<Layout><Accident /></Layout>} />
          <Route path="/smart-challan" element={<Layout><SmartChallan /></Layout>} />
          <Route path="/traffic-update" element={<Layout><TrafficUpdate /></Layout>} />
          <Route path="/traffic-light" element={<Layout><MultiCameraTrafficLight /></Layout>} />
          <Route path="/map" element={<Layout><MapwithRoutes /></Layout>} />
          <Route path="/dash-1" element={<Layout><Dash_1 /></Layout>} />
          <Route path="/dash-2" element={<Layout><Dash_2 /></Layout>} />
          <Route path="/under-development" element={<Layout><UnderDevelopment /></Layout>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
