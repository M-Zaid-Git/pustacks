import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import MaterialsPage from './pages/MaterialsPage';
import Login from './pages/login';
import Signup from './pages/signup';
import Layout from './pages/OverviewPage';
import PageNoteFound from './pages/404page';
import PDFViewer from './components/PDFViewer';
import Reset from './pages/forgotpassword';
import Dashboard from './components/Dashboard';
import Uploads from './components/Dashboard/uploads';
import Downloads from './components/Dashboard/downloads';
import Bookmarks from './components/Dashboard/bookmarks';
import Upload from './components/Dashboard/uploadform';
import AdminPanel from './components/Admin';
import BrowseResources from './pages/BrowseResources';
import SimpleLandingPage from './pages/SimpleLandingPage';

// Error boundary component (kept as is)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 m-4 border border-red-500 bg-red-100 text-red-700 rounded">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    // Only keeping necessary logs for clarity
    console.log('App component mounted');

    // First phase of loading - showing initial animation
    setLoadingPhase(1);

    // Add listener for when the window fully loads (all resources)
    const handleLoad = () => {
      setLoadingPhase(2); // Prepare to hide loading screen

      // Short delay to allow for smooth transition
      setTimeout(() => {
        setAppLoaded(true);
      }, 500);
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <ErrorBoundary>
        {/* Initial loading state (kept as is) */}
        {!appLoaded && (
          <div
            className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-900 z-50"
            style={{
              opacity: loadingPhase === 2 ? 0 : 1,
              transition: 'opacity 0.5s ease-out',
              pointerEvents: loadingPhase === 2 ? 'none' : 'auto',
            }}
          >
            <style>{`
              @keyframes slide-in {
                0% { transform: scaleX(0); }
                100% { transform: scaleX(1); }
              }
              @keyframes fade-in-out {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
              }
              @keyframes progress-animation {
                0% { width: 0%; }
                20% { width: 20%; }
                40% { width: 40%; }
                60% { width: 65%; }
                80% { width: 80%; }
                95% { width: 95%; }
                100% { width: 100%; }
              }
              .line-animation {
                transform-origin: left;
                animation: slide-in 1.2s ease-out forwards;
              }
              .fade-animation {
                animation: fade-in-out 2s ease-in-out infinite;
              }
              .progress-animation {
                animation: progress-animation 3s ease-in-out forwards;
              }
            `}</style>
            <div className="flex flex-col items-center justify-center">
              <h1
                className="text-4xl font-bold"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  background: 'var(--gradient-mixed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ZESHO
              </h1>

              {/* Animated line under the logo */}
              <div
                className="h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mt-2 mb-4 line-animation"
                style={{ width: '100px' }}
              ></div>

              {/* Loading bar */}
              <div className="w-48 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-4 relative">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full progress-animation"
                  style={{ width: loadingPhase === 2 ? '100%' : '0%' }}
                ></div>
                <div
                  className="absolute top-0 right-0 bottom-0 w-[5%] bg-gradient-to-r from-transparent to-purple-500/30 rounded-full fade-animation"
                  style={{ transform: 'translateX(100%)' }}
                ></div>
              </div>

              <p
                className="text-sm text-slate-600 dark:text-slate-400 mt-3"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {loadingPhase === 0
                  ? 'Starting up...'
                  : loadingPhase === 1
                  ? 'Loading application...'
                  : 'Launching ZESHO...'}
              </p>
            </div>
          </div>
        )}
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/materials/:category" element={<MaterialsPage />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/details" element={<Layout />}></Route>
              <Route path="/pdfviewer/:id" element={<PDFViewer />}></Route>
              <Route path="/resetpassword" element={<Reset />}></Route>

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/uploads"
                element={
                  <ProtectedRoute>
                    <Uploads />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/downloads"
                element={
                  <ProtectedRoute>
                    <Downloads />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <Bookmarks />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              ></Route>

              <Route path="/resources" element={<BrowseResources />}></Route>
              <Route path="*" element={<PageNoteFound />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default App;
