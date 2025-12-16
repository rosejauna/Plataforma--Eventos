import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Tag,
  Modal,
  List,
  Button,
  message,
  DatePicker,
  Select,
  Space
} from "antd";
import api from "../api/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

export default function Relatorios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [participantsModal, setParticipantsModal] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const [periodo, setPeriodo] = useState(null);
  const [status, setStatus] = useState("todos");

  const navigate = useNavigate();

  // 🔹 Carregar relatórios
  async function load() {
    try {
      setLoading(true);
      const res = await api.get("/relatorios/eventos");

      // GARANTIA: sempre array
      setData(Array.isArray(res.data.eventos) ? res.data.eventos : []);
    } catch (err) {
      message.error("Erro ao carregar relatórios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // 🔹 FILTROS (BLINDADO)
  const filteredData = useMemo(() => {
    return data.filter(evento => {
      const dataEvento = evento.data ? dayjs(evento.data) : null;
      const hoje = dayjs();

      // 📅 Filtro por período
      if (periodo && periodo.length === 2 && dataEvento) {
        if (
          dataEvento.isBefore(periodo[0], "day") ||
          dataEvento.isAfter(periodo[1], "day")
        ) {
          return false;
        }
      }

      // ⏳ Filtro por status
      if (status === "futuros" && dataEvento && !dataEvento.isAfter(hoje)) {
        return false;
      }

      if (status === "encerrados" && dataEvento && !dataEvento.isBefore(hoje)) {
        return false;
      }

      return true;
    });
  }, [data, periodo, status]);

  // 🔹 TABELA
  const columns = [
    { title: "Evento", dataIndex: "nome" },
    { title: "Local", dataIndex: "local" },
    {
      title: "Data",
      dataIndex: "data",
      render: d => (d ? dayjs(d).format("DD/MM/YYYY") : "-")
    },
    {
      title: "Status",
      dataIndex: "data",
      render: d =>
        d && dayjs(d).isAfter(dayjs()) ? (
          <Tag color="green">Futuro</Tag>
        ) : (
          <Tag color="red">Encerrado</Tag>
        )
    },
    { title: "Ingressos", dataIndex: "totalIngressos" },
    { title: "Participantes", dataIndex: "totalParticipantes" },
    {
      title: "Ações",
      render: (_, evento) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedParticipants(
                Array.isArray(evento.participantes)
                  ? evento.participantes
                  : []
              );
              setParticipantsModal(true);
            }}
          >
            Ver Participantes
          </Button>

          <Button
            type="primary"
            onClick={() => navigate(`/eventos/${evento._id || evento.id}`)}
          >
            Abrir Evento
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <h2>Relatórios de Eventos</h2>

      {/* 🔹 FILTROS */}
      <Space style={{ marginBottom: 16 }} wrap>
        <RangePicker
          onChange={v => setPeriodo(v)}
          format="DD/MM/YYYY"
        />

        <Select
          value={status}
          onChange={setStatus}
          style={{ width: 200 }}
        >
          <Select.Option value="todos">Todos</Select.Option>
          <Select.Option value="futuros">Eventos Futuros</Select.Option>
          <Select.Option value="encerrados">Eventos Encerrados</Select.Option>
        </Select>
      </Space>

      {/* 🔹 TABELA */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={r => r._id || r.id}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* 🔹 MODAL PARTICIPANTES */}
      <Modal
        title="Participantes"
        open={participantsModal}
        onCancel={() => setParticipantsModal(false)}
        footer={null}
      >
        <List
          dataSource={selectedParticipants}
          locale={{ emptyText: "Nenhum participante" }}
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
