import UserList from './UserList';

const App = () => {
  const users = [
    { id: 1, name: 'Ahmed', email: 'Ahmed@example.com' },
    { id: 2, name: 'Mohamed', email: 'Mohamed@example.com' },
    { id: 3, name: 'Maryam', email: 'Maryam@example.com' },
  ];

  return (
    <div>
      <h1> List of Users</h1>
      <UserList users={users} />
    </div>
  );
};

export default App;
