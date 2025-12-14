import { Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

export default function UserMenu() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const items = [
    {
      key: "1",
      label: <span>Perfil</span>,
    },
    {
      key: "2",
      label: (
        <span style={{ color: "red" }}>
          <LogoutOutlined /> Sair
        </span>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          padding: "6px 12px",
          borderRadius: 8,
          transition: "0.2s",
        }}
      >
        <Avatar icon={<UserOutlined />} size={36} />
        <div>
          <div style={{ fontWeight: 600 }}>User ADMIN</div>
          <div style={{ fontSize: 12, marginTop: -3 }}>admin</div>
        </div>
      </div>
    </Dropdown>
  );
}
