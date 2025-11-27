import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader.jsx";
import Pegawai from "./components/admin/Pegawai.jsx";

// public pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Admin pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./components/admin/Users"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <div>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="pegawai" element={<Pegawai />} />
            {/* <Route index element={<Dashboard />} /> */}
            {/* <Route path="users" element={<Users />} />
            <Route path="product" element={<DashboardProduct />} /> */}
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
