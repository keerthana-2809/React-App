import React, { useEffect, useState } from "react";
import "./Table.css";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);
   const filteredUsers = users.filter(
     (user) =>
       user.id.toString().includes(searchTerm) ||
       user.name.toLowerCase().includes(searchTerm.toLowerCase())
   );
  return (
    <div className="table-container">
      <div className="header-container">
        <h2>User Table</h2>
        <input
          type="text"
          placeholder="Search by ID or Name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address (City, Zip)</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No data found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  {user.address.city}, {user.address.zipcode}
                </td>
                <td>{user.company.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
