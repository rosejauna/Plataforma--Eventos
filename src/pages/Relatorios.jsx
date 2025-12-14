import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, List, Button } from "antd";
import api from "../api/api";

export default function Relatorios() {
  const [data, setData] = useState([]);
  const [participantsModal, setParticipantsModal] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  async function load() {
    const res = await api.get("/relatorios/eventos");
    setData(res.data);
  }

  useEffect(() => { load(); }, []);

  const columns = [
    { title: "Evento", dataIndex: "nome" },
    { title: "Local", dataIndex: "local" },
    {
      title: "Data",
      dataIndex: "data",
      render: d => new Date(d).toLocaleDateString("pt-BR")
    },
    {
      title: "Status",
      dataIndex: "status",
      render: s =>
        s === "futuro"
          ? <Tag color="green">Ainda vai acontecer</Tag>
          : <Tag color="red">Já aconteceu</Tag>
    },
    { title: "Total Ingressos", dataIndex: "totalIngressos" },
    { title: "Total Participantes", dataIndex: "totalParticipantes" },
    {
      title: "Participantes",
      render: (_, r) => (
        <Button
          onClick={() => {
            setSelectedParticipants(r.participantes);
            setParticipantsModal(true);
          }}
        >
          Ver Participantes
        </Button>
      )
    }
  ];

  return (
    <div>
      <h2>Relatórios de Eventos</h2>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Participantes"
        open={participantsModal}
        onCancel={() => setParticipantsModal(false)}
        footer={null}
      >
        <List
          dataSource={selectedParticipants}
          renderItem={item => (
            <List.Item>
              <b>{item.nome}</b> — {item.email}
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}
