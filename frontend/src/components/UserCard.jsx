function UserCard({
  user,
  onSelect,
}) {
  const contactLabel =
    user.email || user.mobile || "";

  return (
    <div
      className="chat-item"
      onClick={() =>
        onSelect(user)
      }
    >
      <div className="avatar">
        {user.firstName?.[0]}
      </div>


      <div className="chat-info">
        <h4>
          {user.firstName}{" "}
          {user.lastName}
        </h4>

        <p>
          {user.lastMessage || contactLabel || "Start chatting..."}
        </p>
      </div>
    </div>
  );
}

export default UserCard;