import SearchBar from "./SearchBar";
import UserList from "./UserList";

function Sidebar({
  users,
  search,
  setSearch,
  onSelect,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Chats</h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>

      <UserList
        users={users}
        onSelect={onSelect}
      />
    </div>
  );
}


export default Sidebar;