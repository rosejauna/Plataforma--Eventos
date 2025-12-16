import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, List, Button, message } from "antd";
import api from "../api/api";

export default function EventoDetalhe() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadEvento() {
    try {
      setLoading(true);
      const res = await api.get(`/eventos/${id}`);
      setEvento(res.data);
    } catch (err) {
      message.error("Erro ao carregar evento");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvento();
  }, [id]);

  if (!evento) return null;

  return (
    <div>
      <h2>{evento.nome}</h2>

      <Card title="Informações do Evento" loading={loading}>
        <p><b>Local:</b> {evento.local}</p>
        <p><b>Data:</b> {evento.data}</p>
        <p><b>Total de Ingressos:</b> {evento.totalIngressos}</p>
      </Card>

      <Card title="Participantes" style={{ marginTop: 20 }}>
        <List
          dataSource={evento.participantes || []}
          locale={{ emptyText: "Nenhum participante" }}
          renderItem={p => (
            <List.Item>
              {p.nome} — {p.email}
            </List.Item>
          )}
        />
      </Card>

      <Button
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => message.info("Aqui você pode editar o evento")}
      >
        Editar Evento
      </Button>
    </div>
  );
}
