import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuPage } from './pages/MenuPage';
import { AdminPage } from './pages/AdminPage';
import { SuccessPage } from './pages/SuccessPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
