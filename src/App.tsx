import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import RootLayout from './components/layout/RootLayout';
import CustomLoader from './components/ui/loader/Loader';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <RootLayout>
          <Suspense fallback={<CustomLoader fullScreen={ true} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RootLayout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
