import React, { useEffect, useState } from "react";

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div >
      <h2>User Table</h2>
      <input
        type="text"
        placeholder="Search by ID or Name..."
      />
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
          {users.map((user, index) => (
            <tr
              key={user.id}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                {user.address.city}, {user.address.zipcode}
              </td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
