// src/components/HeaderBar.jsx
import React from "react";
import { Layout, Button, Avatar, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function HeaderBar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items = [
    {
      key: "profile",
      label: "Configurações",
      icon: <SettingOutlined />,
      onClick: () => navigate("/configuracoes"),
    },
    {
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined style={{ color: "red" }} />,
      onClick: logout,
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Button
        type="text"
        onClick={() => setCollapsed(!collapsed)}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />

      <div style={{ marginLeft: 8, fontWeight: 600, flex: 1 }}>
        Plataforma de Eventos
      </div>

      <BellOutlined style={{ fontSize: 18 }} />

      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            padding: "4px 10px",
            borderRadius: 8,
          }}
        >
          <Avatar src={user?.avatar} icon={<UserOutlined />} />


          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontWeight: 600 }}>
              {user?.nome || user?.email || "Usuário"}
            </span>
            <small style={{ color: "rgba(0,0,0,0.45)" }}>
              {user?.role || "user"}
            </small>
          </div>
        </div>
      </Dropdown>
    </Header>
  );
}
