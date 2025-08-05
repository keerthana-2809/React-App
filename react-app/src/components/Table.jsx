import React, { useEffect, useState } from "react";
import { sortUsers, filterUsers, getSortIndicator } from "../utils";
import "./Table.css";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredUsers = filterUsers(sortUsers(users, sortConfig), searchTerm);

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
            <th onClick={() => handleSort("id")}>
              ID{getSortIndicator(sortConfig, "id")}
            </th>
            <th onClick={() => handleSort("name")}>
              Name{getSortIndicator(sortConfig, "name")}
            </th>
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
