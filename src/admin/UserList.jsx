import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserDetails from './UserDetails'; // Import UserDetails component

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 25;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://json-server-main-yeqa.onrender.com/user'); // Adjust the URL based on your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=''>
      <h2 className='text-2xl font-semibold p-2'>User List</h2>
      <div className='mb-4 mx-auto w-7/12'>
        <label htmlFor='searchInput' className='block mb-1'>Search by ID, Email or Phone:</label>
        <input
          type='text'
          id='searchInput'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border p-2 w-full outline-none rounded-md '
          placeholder='Enter ID, Email or Phone'
        />
      </div>
      <table className='border  w-full'>
        <thead className='bg-white'>
          <tr>
            <th className='border p-2'>User</th>
            <th className='border p-2'>User ID</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Last Name</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Phone</th>
            <th className='border p-2'>Address</th>
            <th className='border p-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className='text-center'>
              <td className='border p-2'>
                <Link to={`/UserDetails/${user.id}`}> {/* Use Link with the user ID as the URL */}
                  <div className="w-10 m-auto">
                    <img src="https://xsgames.co/randomusers/avatar.php?g=male" className='rounded-full'/>
                  </div>
                </Link>
              </td>
              <td className='border p-2'>{user.id}</td>
              <td className='border p-2'>{user.name}</td> 
              <td className='border p-2'>{user.lastname}</td>
              <td className='border p-2'>{user.email}</td>
              <td className='border p-2'>{user.phone}</td>
              <td className='border p-2'>{user.address1?.street}</td>
              <td className='border p-2'>View</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination w-7/12 m-auto mt-3">
        <ul className="pagination-list flex justify-around">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <li key={i} className="pagination-item  bg-white">
              <button
                onClick={() => paginate(i + 1)}
                className={`pagination-link  p-2 px-4 ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
