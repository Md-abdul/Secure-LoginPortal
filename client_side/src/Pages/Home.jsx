import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); 
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); 
    try {
      const response = await axios.get("http://localhost:3000/api/user/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false); 
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [id]: {
        ...formData[id],
        [name]: value,
      },
    });
  };

  const handleUpdate = async (id) => {
    setLoading(true); 
    try {
      const updatedUser = formData[id];
      await axios.put(
        `http://localhost:3000/api/user/users/${id}`,
        updatedUser
      );
      toast.success("User updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchUsers(); 
      setEditUserId(null); 
    } catch (error) {
      toast.error("Failed to update user.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    setLoading(true); 
    try {
      await axios.delete(`http://localhost:3000/api/user/users/${id}`);
      toast.success("User deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchUsers(); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="col-md-12">
          <h1 className="mb-4">User List</h1>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Profession</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={formData[user._id]?.name || user.name}
                          onChange={(e) => handleChange(e, user._id)}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData[user._id]?.email || user.email}
                          onChange={(e) => handleChange(e, user._id)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          name="phoneNo"
                          className="form-control"
                          value={formData[user._id]?.phoneNo || user.phoneno}
                          onChange={(e) => handleChange(e, user._id)}
                        />
                      ) : (
                        user.phoneno
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          name="profession"
                          className="form-control"
                          value={
                            formData[user._id]?.profession || user.profession
                          }
                          onChange={(e) => handleChange(e, user._id)}
                        />
                      ) : (
                        user.profession
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(user._id)}
                            className="btn btn-success mx-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditUserId(null)}
                            className="btn btn-secondary"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditUserId(user._id);
                              setFormData({
                                ...formData,
                                [user._id]: {
                                  name: user.name,
                                  email: user.email,
                                  phoneNo: user.phoneno,
                                  profession: user.profession,
                                },
                              });
                            }}
                            className="btn btn-warning mx-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
