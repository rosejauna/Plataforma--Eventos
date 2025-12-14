import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import api from "../api/api";

export default function Administradores() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [form] = Form.useForm();

  async function loadAdmins() {
    setLoading(true);
    try {
      const res = await api.get("/usuarios?role=admin"); // Ajuste no backend se necessário
      setAdmins(res.data);
    } catch (err) {
      message.error("Erro ao carregar administradores");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  const columns = [
    { title: "Nome", dataIndex: "nome" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Ações",
      render: (_, r) => (
        <Button onClick={() => onEdit(r)}>Editar</Button>
      )
    }
  ];

  function onAdd() {
    setEditAdmin(null);
    form.resetFields();
    setModalOpen(true);
  }

  function onEdit(admin) {
    setEditAdmin(admin);
    form.setFieldsValue(admin);
    setModalOpen(true);
  }

  async function onSubmit(values) {
    try {
      if (editAdmin) {
        await api.put(`/usuarios/${editAdmin._id}`, { ...values, role: "admin" });
        message.success("Administrador atualizado");
      } else {
        await api.post("/usuarios", { ...values, role: "admin" });
        message.success("Administrador criado");
      }
      setModalOpen(false);
      loadAdmins();
    } catch (err) {
      message.error("Erro ao salvar administrador");
    }
  }

  return (
    <div>
      <h2>Administradores</h2>
      <Button type="primary" onClick={onAdd} style={{ marginBottom: 12 }}>Novo Administrador</Button>
      <Table dataSource={admins} columns={columns} rowKey="_id" loading={loading} />

      <Modal
        title={editAdmin ? "Editar Administrador" : "Novo Administrador"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="senha" label="Senha" rules={[{ required: !editAdmin }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
