import React, { useEffect, useState } from "react";
import { Modal, Table, Button, message } from "antd";
import api from "../api/api";

export default function ParticipantsModal({ open, onClose, eventId, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState([]);

  async function load() {
    if (!eventId) return;

    setLoading(true);

    try {
      // 1 — busca todos os participantes
      const people = await api.get("/participantes");

      // 2 — busca o evento para ver quais já estão selecionados
      const event = await api.get(`/eventos/${eventId}`);

      setParticipants(people.data || []);
      setSelected(event.data?.participantes?.map((p) => p._id) || []);
    } catch (err) {
      message.error("Erro ao carregar participantes");
    }

    setLoading(false);
  }

  useEffect(() => {
    if (open) load();
  }, [open]);

  async function save() {
    try {
      await api.put(`/eventos/${eventId}`, {
        participantes: selected,
      });

      message.success("Participantes atualizados!");
      onSaved(); // recarrega lista de eventos
      onClose();
    } catch (err) {
      console.log(err);
      message.error("Erro ao salvar participantes");
    }
  }

  const columns = [
    { title: "Nome", dataIndex: "nome" },
    { title: "E-mail", dataIndex: "email" },
    { title: "Telefone", dataIndex: "telefone" },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Participantes do Evento"
      width={700}
      okText="Salvar"
      onOk={save}
    >
      <Table
        rowKey="_id"
        dataSource={participants}
        columns={columns}
        loading={loading}
        pagination={false}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelected(keys),
        }}
        style={{ marginTop: 12 }}
      />
    </Modal>
  );
}
