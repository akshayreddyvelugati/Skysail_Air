import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FlightSearchForm from './pages/FlightSearchForm';
import SearchResults from './pages/SearchResults';
import SelectFlight from './pages/SelectFlight';
import SeatMap from './pages/SeatMap';
import ConfirmationPage from './pages/ConfirmationPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AboutUs from './pages/footer/AboutUs';
import BaggageAllowance from './pages/footer/BaggageAllowance';
import TermsAndConditions from './pages/footer/TermsAndConditions';
import PrivacyPolicy from './pages/footer/PrivacyPolicy';
import { GlobalStyles, theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<FlightSearchForm />} />
                      <Route path="/search-results" element={<SearchResults />} />
                      <Route path="/select-flight/:departureId/:returnId" element={<SelectFlight />} />
                      <Route path="/select-flight/:flightId" element={<SelectFlight />} />
                      <Route path="/seat-selection/:departureId/:returnId" element={<SeatMap />} />
                      <Route path="/seat-selection/:flightId" element={<SeatMap />} />
                      <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about-us" element={<AboutUs />} />
                      <Route path="/baggage-allowance" element={<BaggageAllowance />} />
                      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;