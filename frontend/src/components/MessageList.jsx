import MessageBubble from "./MessageBubble";

function MessageList({
  messages,
  currentUserId,
}) {
  return (
    <div className="messages">
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          currentUserId={
            currentUserId
          }
        />
      ))}
    </div>
  );
}

export default MessageList;