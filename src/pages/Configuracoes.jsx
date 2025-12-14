import React, { useState } from "react";
import { Form, Input, Button, Avatar, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Configuracoes() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState(user?.avatar || null);

  const [form] = Form.useForm();

  // Converte arquivo em Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const uploadProps = {
    beforeUpload: async (file) => {
      const base64 = await toBase64(file);
      setAvatarBase64(base64);
      return false; 
    },
  };

  async function onSubmit(values) {
    try {
      setLoading(true);

      const payload = {
        ...values,
        avatar: avatarBase64, // foto base64
      };

      const userId = user?._id || user?.id;

      if (!userId) {
        message.error("Erro: ID do usuário não encontrado.");
        return;
      }

      const { data } = await api.put(`/usuarios/${userId}`, payload);

      // Atualiza auth context e localStorage
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      message.success("Dados atualizados com sucesso!");
    } catch (err) {
      console.error(err);
      message.error("Erro ao atualizar dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 450, margin: "0 auto" }}>
      <h2>Configurações da Conta</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar
          size={120}
          src={avatarBase64}
          icon={<UserOutlined />}
          style={{ border: "2px solid #ddd" }}
        />
      </div>

      <Upload {...uploadProps} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Alterar Foto</Button>
      </Upload>

      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        onFinish={onSubmit}
        style={{ marginTop: 20 }}
      >
        <Form.Item name="nome" label="Nome">
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>

        <Form.Item name="telefone" label="Telefone">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Salvar Alterações
        </Button>
      </Form>
    </div>
  );
}
