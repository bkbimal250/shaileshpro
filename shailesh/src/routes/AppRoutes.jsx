import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Loader from '@/components/ui/Loader';

// Lazy Loaded Public Pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Projects = lazy(() => import('@/pages/Projects'));
const CaseStudy = lazy(() => import('@/pages/CaseStudy'));
const SocialPortfolio = lazy(() => import('@/pages/SocialPortfolio'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Login = lazy(() => import('@/features/auth/Login'));

// Lazy Loaded Dashboard
const DashboardLayout = lazy(() => import('@/dashboard/DashboardLayout'));
const Overview = lazy(() => import('@/dashboard/Overview'));
const AdminProjects = lazy(() => import('@/dashboard/Projects'));
const AdminExperience = lazy(() => import('@/dashboard/Experience'));
const AdminSocials = lazy(() => import('@/dashboard/Socials'));
const Messages = lazy(() => import('@/dashboard/Messages'));
const Analytics = lazy(() => import('@/dashboard/Analytics'));
const AdminAbout = lazy(() => import('@/dashboard/About'));
const Settings = lazy(() => import('@/dashboard/Settings'));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          {/* 🌐 Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/social-portfolio" element={<SocialPortfolio />} />
          <Route path="/login" element={<Login />} />

          {/* 🔐 Private Dashboard */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/dashboard/projects" element={<AdminProjects />} />
              <Route path="/dashboard/experience" element={<AdminExperience />} />
              <Route path="/dashboard/socials" element={<AdminSocials />} />
              <Route path="/dashboard/messages" element={<Messages />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/about" element={<AdminAbout />} />
              <Route path="/dashboard/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* ❌ 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;