export const sortUsers = (users, sortConfig) => {
  const sorted = [...users];

  if (!sortConfig.key) return sorted;

  return sorted.sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    const aStr = aVal.toString().toLowerCase();
    const bStr = bVal.toString().toLowerCase();

    if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
    if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const filterUsers = (users, searchTerm) =>
  users.filter(
    (user) =>
      user.id.toString().includes(searchTerm) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

export const getSortIndicator = (sortConfig, key) => {
  if (sortConfig.key === key) {
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  }
  return "";
};
