import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
export const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://secure-loginportal.onrender.com/api/user/users"
      );
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

  const updateUser = async (id, updatedUser) => {
    setLoading(true);
    try {
      await axios.put(
        `https://secure-loginportal.onrender.com/api/user/users/${id}`,
        updatedUser
      );
      toast.success("User updated successfully!");
      fetchUsers(); 
    } catch (error) {
      toast.error("Failed to update user.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://secure-loginportal.onrender.com/api/user/users/${id}`
      );
      toast.success("User deleted successfully!");
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
    <UserContext.Provider value={{ users, loading, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
