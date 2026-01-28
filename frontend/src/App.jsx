import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

// your imports
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import Admin from "./Admin/Admin";

import GlobalBackground from "./Layouts/GlobalBackground";

import { ProjectProvider } from "./context/ProjectContext";
import { AboutProvider } from "./context/AboutContext";
import { FooterProvider } from "./context/FooterContext";

import { AuthProvider } from "./Loginout/AuthContext";
import ProtectedRoute from "./Loginout/ProtectedRoute";
import AdminLogin from "./Loginout/AdminLogin";
import ForgotPassword from "./Loginout/ForgotPassword";
import ResetPassword from "./Loginout/ResetPassword";

/* ================= HOME ================= */
function Home() {
  return (
    <GlobalBackground>
      <Hero />
      <About />
      <Projects />
      <Footer />
    </GlobalBackground>
  );
}

/* ================= APP ================= */
function App() {
  return (
    <>
      {/* ✅ TOASTER (ADD ONCE) */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Router>
        <AuthProvider>
          <FooterProvider>
            <ProjectProvider>
              <AboutProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<AdminLogin />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />

                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </AboutProvider>
            </ProjectProvider>
          </FooterProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
