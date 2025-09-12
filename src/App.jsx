import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NewHome from './pages/NewHome';
import MaterialsPage from './pages/MaterialsPage';
import Layout from './pages/OverviewPage';
import PageNoteFound from './pages/404page';
import PDFViewer from './components/PDFViewer';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route path="/legacy" element={<LandingPage />} />
          <Route path="/materials/:category" element={<MaterialsPage />} />
          <Route path="/details" element={<Layout />}></Route>
          <Route path="/pdfviewer/:id" element={<PDFViewer />}></Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<PageNoteFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
