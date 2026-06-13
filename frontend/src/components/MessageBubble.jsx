function MessageBubble({
  message,
  currentUserId,
}) {
  const isMine =
    message.senderId ===
    currentUserId;

  return (
    <div
      className={`message ${
        isMine
          ? "me"
          : "other"
      }`}
    >
      {message.text}
    </div>
  );
}

export default MessageBubble;