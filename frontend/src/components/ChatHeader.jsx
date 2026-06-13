function ChatHeader({
  selectedUser,
}) {
  if (!selectedUser) {
    return (
      <div className="chat-header">
        Select a chat
      </div>
    );
  }

  return (
    <div className="chat-header">
      <div className="header-avatar">
        {selectedUser.firstName?.[0]}
      </div>

      <div>
        <h3>
          {selectedUser.firstName}{" "}
          {selectedUser.lastName}
        </h3>
      </div>
    </div>
  );
}

export default ChatHeader;