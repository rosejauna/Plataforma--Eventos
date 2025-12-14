import React from "react";
import { Modal, List, Button, message } from "antd";
import api from "../api/api";

export default function ParticipantsModal({ open, onClose, event, onEmit }) {
  if (!event) return null;

  const eventoJaOcorreu = event.data && new Date(event.data) < new Date();

  async function emitirIngresso(participante) {
    try {
      await api.post("/ingressos", { evento: event._id, participante: participante._id });
      message.success("Ingresso emitido");
      onEmit();
    } catch (err) {
      message.error(err.response?.data?.erro || "Erro ao emitir ingresso");
    }
  }

  return (
    <Modal
      title={`Participantes - ${event.nome}`}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <List
        dataSource={event.participantes || []}
        renderItem={(p) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                disabled={eventoJaOcorreu}
                onClick={() => {
                  if (eventoJaOcorreu) {
                    message.warning("Não é possível emitir ingresso para evento já realizado");
                    return;
                  }
                  emitirIngresso(p);
                }}
              >
                Emitir Ingresso
              </Button>
            ]}
          >
            {p.nome} — {p.email}
          </List.Item>
        )}
      />
    </Modal>
  );
}
