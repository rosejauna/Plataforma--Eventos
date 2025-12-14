import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import adminDAO from "../dao/adminDAO";

export default function Administradores() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  async function load() {
    setLoading(true);
    try {
      const data = await adminDAO.listar();
      setAdmins(data);
    } catch (err) {
      message.error("Erro ao carregar administradores");
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function onSubmit(values) {
    try {
      await adminDAO.criar(values);
      message.success("Administrador criado");
      setModalOpen(false);
      form.resetFields();
      load();
    } catch (err) {
      message.error(err.response?.data?.erro || "Erro ao criar administrador");
    }
  }

  async function onDelete(id) {
    Modal.confirm({
      title: "Deseja remover este administrador?",
      okText: "Sim",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        await adminDAO.deletar(id);
        message.success("Administrador removido");
        load();
      },
    });
  }

  const columns = [
    { title: "Nome", dataIndex: "nome" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Ações",
      render: (_, r) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(r._id || r.id)}>Deletar</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Administradores</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)} style={{ marginBottom: 12 }}>
        Novo Administrador
      </Button>

      <Table dataSource={admins} columns={columns} rowKey={r => r._id || r.id} loading={loading} />

      <Modal
        title="Novo Administrador"
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
          <Form.Item name="senha" label="Senha" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
