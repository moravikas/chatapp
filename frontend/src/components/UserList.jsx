import UserCard from "./UserCard";

function UserList({
  users,
  onSelect,
}) {
  return (
    <div className="chat-list">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default UserList;