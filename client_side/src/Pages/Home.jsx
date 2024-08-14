import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { users, loading, updateUser, deleteUser } = useContext(UserContext);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({});

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

  const handleUpdate = (id) => {
    const updatedUser = formData[id];
    updateUser(id, updatedUser);
    setEditUserId(null);
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
                            onClick={() => deleteUser(user._id)}
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
