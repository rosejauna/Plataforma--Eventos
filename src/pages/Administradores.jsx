import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../api/api"; // Certifique-se de que o baseURL aponta para /api
import BasePage from "../components/BasePage"; // Layout padrão, opcional

export default function Administradores() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Carregar administradores
  async function loadAdmins() {
    try {
      setLoading(true);
      const res = await api.get("/admins");
      setAdmins(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      message.error("Erro ao carregar administradores");
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  // Criar administrador
  async function onCreate(values) {
    try {
      await api.post("/admins", values);
      message.success("Administrador criado com sucesso");
      setModalOpen(false);
      form.resetFields();
      loadAdmins();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.erro || "Erro ao criar administrador");
    }
  }

  // Deletar administrador
  async function onDelete(id) {
    try {
      await api.delete(`/admins/${id}`);
      message.success("Administrador removido");
      loadAdmins();
    } catch (err) {
      console.error(err);
      message.error("Erro ao remover administrador");
    }
  }

  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Popconfirm
          title="Tem certeza que deseja remover este administrador?"
          onConfirm={() => onDelete(record._id || record.id)}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      )
    }
  ];

  return (
    <BasePage title="Administradores">
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          Novo Administrador
        </Button>
      </div>

      <Table
        dataSource={admins}
        columns={columns}
        rowKey={(r) => r._id || r.id}
        loading={loading}
      />

      <Modal
        title="Novo Administrador"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={onCreate}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Informe o nome" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Informe o email" },
              { type: "email", message: "Email inválido" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Informe a senha" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </BasePage>
  );
}
