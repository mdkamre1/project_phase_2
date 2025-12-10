import React, { useCallback, useEffect, useState } from "react";
import api, { setAuthToken } from "../api/api";

const AdminPage = () => {
  const [enquiries, setEnquiries] = useState([]);

  // 🔹 Fetch enquiries from backend
  const fetchEnquiries = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      const res = await api.get("/enquiries");
      setEnquiries(res.data);
    } catch (err) {
      alert("Failed to load enquiries");
    }
  }, []);

  // 🔸 Delete enquiry by ID
  const deleteEnquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await api.delete(`/enquiries/${id}`);
      fetchEnquiries(); // refresh list after delete
    } catch (err) {
      alert("Failed to delete enquiry");
    }
  };

  // 🔹 Load enquiries on first render
  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>📩 Admin Messages</h1>
      <p>View & delete enquiries submitted by users.</p>

      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
        >
          <thead style={{ background: "#efefef" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.message}</td>
                <td>
                  <button
                    onClick={() => deleteEnquiry(e.id)}
                    style={{
                      color: "white",
                      background: "red",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
