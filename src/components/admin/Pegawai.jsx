import pegawaiServices from "../../services/pegawaiServices";
import { useState, useEffect } from "react";

function Pegawai() {
  const [pegawai, setPegawai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 5,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    user: {
      username: "",
      role: "user",
      isActive: true,
    },
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    noTelp: "",
    email: "",
    jabatan: {
      id: null,
      nama: "",
    },
    unitKerja: {
      id: null,
      nama: "",
    },
    status: "aktif",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchUsers = async (page = 1, searchQuery = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await pegawaiServices.getAll({
        page: page,
        limit: pagination.limit,
        search: searchQuery,
      });
      if (response.success) {
        setPegawai(response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(err.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (newPage) => {
    fetchUsers(newPage, search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, search);
  };

  const handleAdd = () => {
    setModalMode("add");
    setSelectedPegawai(null);
    setFormData({
      nip: "",
      nama: "",
      user: {
        username: "",
        role: "user",
        isActive: true,
      },
      jenisKelamin: "",
      tempatLahir: "",
      tanggalLahir: "",
      alamat: "",
      noTelp: "",
      email: "",
      jabatan: {
        id: null,
        nama: "",
      },
      unitKerja: {
        id: null,
        nama: "",
      },
      status: "aktif",
      password: "",
    });
    setFormError(null);
    setShowModal(true);
  };

  // Handler tutup modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPegawai(null);
  };

  //Handler input Form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setFormLoading(true);
      setFormError(null);

      const payload = {
        nip: formData.nip,
        nama: formData.nama,
        jenisKelamin: formData.jenisKelamin,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formData.tanggalLahir,
        alamat: formData.alamat,
        noTelp: formData.noTelp,
        email: formData.email,
        status: formData.status,
        tanggalMasuk: formData.tanggalMasuk,
        userId: formData.user.id, // untuk edit
        username: formData.user.username,
        role: formData.user.role,
        isActive: formData.user.isActive,
        password: formData.password || undefined, // hanya dikirim jika ada
        jabatanId: formData.jabatan.id,
        unitKerjaId: formData.unitKerja.id,
      };

      if (modalMode === "add") {
        await pegawaiServices.create(payload);
      } else {
        await pegawaiServices.update(selectedPegawai.id, payload);
      }

      handleCloseModal();
      fetchUsers(pagination.page, search);
    } catch (err) {
      setFormError(err.message || "Gagal menyimpan data");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (user) => {
    setModalMode("edit");
    setSelectedPegawai(user);
    setFormData({
      nip: user.nip || "",
      nama: user.nama || "",
      jenisKelamin: user.jenisKelamin || "",
      tempatLahir: user.tempatLahir || "",
      tanggalLahir: user.tanggalLahir || "",
      alamat: user.alamat || "",
      noTelp: user.noTelp || "",
      email: user.email || "",
      tanggalMasuk: user.tanggalMasuk || "",
      user: {
        id: user.user?.id || null,
        username: user.user?.username || "",
        role: user.user?.role || "user",
        isActive: user.user?.isActive ?? true,
      },
      jabatan: {
        id: user.jabatan?.id || null,
        nama: user.jabatan?.nama || "",
      },
      unitKerja: {
        id: user.unitKerja?.id || null,
        nama: user.unitKerja?.nama || "",
      },
      status: user.status || "aktif",
      password: "", // Kosongkan, hanya diisi jika mau diubah
    });
    setShowModal(true);
  };

  // Buka modal konfirmasi hapus
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Tutup modal konfirmasi hapus
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Eksekusi hapus
  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await pegawaiServices.delete(userToDelete.id);

      handleCloseDeleteModal();
      fetchUsers(pagination.page, search);
    } catch (err) {
      alert(err.message || "Gagal menghapus user");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3">Users</h1>
        <p className="text-muted">Daftar semua pengguna</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Search Form */}
      <div className="mb-4">
        <form onSubmit={handleSearch} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Cari username atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-search me-2"></i>
            Cari
          </button>

          <button className="btn btn-primary" onClick={handleAdd}>
            <i className="bi bi-plus-lg me-2"></i>
            Tambah Pegawai
          </button>
        </form>
      </div>

      {/* Loading atau Tabel */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Memuat data...</p>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>NIP</th>
                    <th>Nama</th>
                    <th>Unit Kerja</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pegawai.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        Tidak ada data pegawai
                      </td>
                    </tr>
                  ) : (
                    pegawai.map((user, index) => (
                      <tr key={user.id}>
                        <td>
                          {(pagination.page - 1) * pagination.limit + index + 1}
                        </td>
                        <td>{user.nip}</td>
                        <td>{user.nama}</td>
                        <td>{user.unitKerja.nama}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.status ? "bg-success" : "bg-warning"
                            }`}
                          >
                            {user.status ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Edit"
                            onClick={() => handleEdit(user)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Hapus"
                            onClick={() => handleDeleteClick(user)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${
                    !pagination.hasPrevPage ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.hasPrevPage}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      pagination.page === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    !pagination.hasNextPage ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.hasNextPage}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}

          {/* Info */}
          <p className="text-center text-muted mt-2">
            Menampilkan {pegawai.length} dari {pagination.total} pegawai
          </p>
        </>
      )}

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === "add" ? "Tambah Pegawai" : "Edit Pegawai"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* Error Alert */}
                {formError && (
                  <div className="alert alert-danger py-2">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {formError}
                  </div>
                )}

                <div className="row">
                  {/* NIP */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nip" className="form-label">
                      NIP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nip"
                      name="nip"
                      value={formData.nip}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Nama Lengkap */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nama" className="form-label">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Username */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="user.username"
                      value={formData.user.username}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Password */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                      {modalMode === "add" && (
                        <span className="text-danger">*</span>
                      )}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password || ""}
                      onChange={handleInputChange}
                      placeholder={
                        modalMode === "edit"
                          ? "Kosongkan jika tidak diubah"
                          : "Masukkan password"
                      }
                    />
                  </div>

                  {/* Role */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="user.role"
                      value={formData.user.role}
                      onChange={handleInputChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="col-md-6 mb-3 d-flex align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isActive"
                        name="user.isActive"
                        checked={formData.user.isActive}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="isActive">
                        Aktif
                      </label>
                    </div>
                  </div>

                  {/* Jenis Kelamin */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="jenisKelamin" className="form-label">
                      Jenis Kelamin
                    </label>
                    <select
                      className="form-select"
                      id="jenisKelamin"
                      name="jenisKelamin"
                      value={formData.jenisKelamin}
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>

                  {/* Tempat Lahir */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tempatLahir" className="form-label">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tempatLahir"
                      name="tempatLahir"
                      value={formData.tempatLahir}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Tanggal Lahir */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tanggalLahir" className="form-label">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="tanggalLahir"
                      name="tanggalLahir"
                      value={formData.tanggalLahir}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* No Telp */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="noTelp" className="form-label">
                      No. Telp
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="noTelp"
                      name="noTelp"
                      value={formData.noTelp}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Alamat */}
                  <div className="col-md-12 mb-3">
                    <label htmlFor="alamat" className="form-label">
                      Alamat
                    </label>
                    <textarea
                      className="form-control"
                      id="alamat"
                      name="alamat"
                      rows="2"
                      value={formData.alamat}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Jabatan */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="jabatan" className="form-label">
                      Jabatan
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="jabatan"
                      name="jabatan.nama"
                      value={formData.jabatan.nama}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Unit Kerja */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="unitKerja" className="form-label">
                      Unit Kerja
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="unitKerja"
                      name="unitKerja.nama"
                      value={formData.unitKerja.nama}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Status Pegawai */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="status" className="form-label">
                      Status Pegawai
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Nonaktif</option>
                    </select>
                  </div>

                  {/* Tanggal Masuk */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tanggalMasuk" className="form-label">
                      Tanggal Masuk
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="tanggalMasuk"
                      name="tanggalMasuk"
                      value={formData.tanggalMasuk}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                  disabled={formLoading}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Menyimpan...
                    </>
                  ) : modalMode === "add" ? (
                    "Simpan"
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Hapus</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseDeleteModal}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Apakah Anda yakin ingin menghapus user{" "}
                  <strong>{userToDelete?.username}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDeleteModal}
                  disabled={deleteLoading}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Menghapus...
                    </>
                  ) : (
                    "Hapus"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Pegawai;
