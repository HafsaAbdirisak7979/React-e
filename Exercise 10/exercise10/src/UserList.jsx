const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> :{user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
