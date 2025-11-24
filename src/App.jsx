import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Route>
          {/*         
        <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard /
            
          >} /> */}

          {/* <Route path="/dashboard" element={
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
            } >
            
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="product" element={<DashboardProduct />} />
        </Route> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
