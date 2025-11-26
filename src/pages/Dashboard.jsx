import "../styling/Dashboard.css";
// import { pegawaiService } from "../services/pegawaiServices";
import { customerService } from "../services/customerServices";
import { transaksiService } from "../services/transaksiServices";
import { useState, useEffect } from "react";
import { activityService } from "../services/activityServices";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [pegawai, setPegawai] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const [activity, setActivity] = useState([]);

  const [totalPegawai, setTotalPegawai] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const resultPegawai = await pegawaiService.getAllPegawai();
        const dataPegawai = resultPegawai.data.filter((p) => p.user.isActive);
        setPegawai(dataPegawai);
        setTotalPegawai(dataPegawai.length);

        const resultCustomer = await customerService.getAllCustomer();
        setCustomer(resultCustomer.data);
        setTotalCustomer(resultCustomer.data.length);

        const resultTransaksi = await transaksiService.getAllTransaksi();
        setTransaksi(resultTransaksi.data);
        const sumTransaksi = resultTransaksi.data.reduce(
          (acc, item) => acc + item.grandTotal,
          0
        );
        console.log("Total Transaksi (raw):", sumTransaksi);

        setTotalTransaksi(sumTransaksi);
        console.log("sumTransaksi");

        const resultActivity = await activityService.getAllActivity();
        setActivity(resultActivity.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const statsCards = [
    { title: "Total Pegawai Active", value: totalPegawai || 0, icon: "👤" },
    {
      title: "Total Customer",
      value: totalCustomer || 0,
      icon: "👥",
    },
    {
      title: "Total Omset",
      value: (totalTransaksi || 0).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }),
      icon: "💸",
    },
  ];

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="stats-grid">
        {statsCards.map((statis) => (
          <div key={statis.title} className="stat-card">
            <div className="stat-icon">{statis.icon}</div>
            <div className="stat-details">
              <h3>{statis.title}</h3>
              <p className="stat-value">{statis.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h3>Recent Section</h3>
        {activity.map((aksi) => (
          <div key={aksi.id} className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">{aksi.icon}</div>
              <div className="activity-details">{aksi?.user?.email ?? "-"}</div>

              <p className="activity-action">{aksi.user_agent}</p>
              <span className="activity-time">{aksi.createdAt}</span>
              <div className="activity-action">{aksi.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
