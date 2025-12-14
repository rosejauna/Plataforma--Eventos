import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, List, Button } from "antd";
import api from "../api/api";
import dayjs from "dayjs";

export default function Relatorios() {
  const [data, setData] = useState([]);
  const [participantsModal, setParticipantsModal] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  async function load() {
    const res = await api.get("/relatorios/eventos");
    setData(res.data.eventos || []);
  }

  useEffect(() => { load(); }, []);

  const columns = [
    { title: "Evento", dataIndex: "nome" },
    { title: "Local", dataIndex: "local" },
    { title: "Data", dataIndex: "data", render: d => dayjs(d).format("DD/MM/YYYY") },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, r) => {
        const futuro = new Date(r.data) > new Date();
        return futuro ? <Tag color="green">Futuro</Tag> : <Tag color="red">Realizado</Tag>;
      }
    },
    {
      title: "Participantes",
      render: (_, r) => (
        <Button
          onClick={() => {
            setSelectedParticipants(r.participantes || []);
            setParticipantsModal(true);
          }}
        >
          Ver Participantes
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Relatórios</h2>
      <Table columns={columns} dataSource={data} rowKey="_id" />

      <Modal
        title="Participantes"
        open={participantsModal}
        onCancel={() => setParticipantsModal(false)}
        footer={null}
      >
        <List
          dataSource={selectedParticipants}
          renderItem={p => (
            <List.Item>
              {p.nome} — {p.email}
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}
