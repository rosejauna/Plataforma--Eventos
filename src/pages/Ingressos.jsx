import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  message
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";

import ingressoDAO from "../dao/ingressoDAO";
import eventDAO from "../dao/eventDAO";
import participantDAO from "../dao/participantDAO";

export default function Ingressos() {
  const [ingressos, setIngressos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [participantes, setParticipantes] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form] = Form.useForm();

  async function load() {
    const ing = await ingressoDAO.findAll();
    const ev = await eventDAO.findAll();
    const pa = await participantDAO.findAll();

    setIngressos(ing);
    setEventos(ev);
    setParticipantes(pa);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  }

  function openEdit(record) {
    setEditing(record);
    form.setFieldsValue({
      evento: record.evento?._id,
      participante: record.participante?._id,
      status: record.status
    });
    setModalOpen(true);
  }

  async function onSubmit(values) {
    try {
      if (editing) {
        await ingressoDAO.update(editing._id, values);
        message.success("Ingresso atualizado!");
      } else {
        await ingressoDAO.create(values);
        message.success("Ingresso criado!");
      }

      setModalOpen(false);
      load();
    } catch {
      message.error("Erro ao salvar ingresso");
    }
  }

  async function onDelete(record) {
    await ingressoDAO.delete(record._id);
    message.success("Excluído!");
    load();
  }

  const columns = [
    {
      title: "Evento",
      dataIndex: ["evento", "nome"],
    },
    {
      title: "Participante",
      dataIndex: ["participante", "nome"],
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) =>
        s === "emitido"
          ? <span style={{ color: "green" }}>Emitido</span>
          : <span style={{ color: "red" }}>Cancelado</span>
    },
    {
      title: "Ações",
      width: 120,
      render: (_, r) => (
        <div style={{ display: "flex", gap: 12, fontSize: 18 }}>
          <EditOutlined
            style={{ color: "#1677ff", cursor: "pointer" }}
            onClick={() => openEdit(r)}
          />

          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(r)}
          />
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Novo Ingresso
        </Button>
      </div>

      <Table
        dataSource={ingressos}
        columns={columns}
        rowKey="_id"
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        title={editing ? "Editar Ingresso" : "Novo Ingresso"}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="evento" label="Evento" rules={[{ required: true }]}>
            <Select>
              {eventos.map(e => (
                <Select.Option key={e._id} value={e._id}>
                  {e.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="participante" label="Participante" rules={[{ required: true }]}>
            <Select>
              {participantes.map(p => (
                <Select.Option key={p._id} value={p._id}>
                  {p.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="emitido">
            <Select>
              <Select.Option value="emitido">Emitido</Select.Option>
              <Select.Option value="cancelado">Cancelado</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
