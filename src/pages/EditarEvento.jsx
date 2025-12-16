import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, DatePicker, Button, message, Card } from "antd";
import dayjs from "dayjs";
import api from "../api/api";

export default function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  async function loadEvento() {
    try {
      const { data } = await api.get(`/eventos/${id}`);
      form.setFieldsValue({
        ...data,
        data: data.data ? dayjs(data.data) : null
      });
    } catch {
      message.error("Erro ao carregar evento");
    }
  }

  async function onSubmit(values) {
    try {
      setLoading(true);
      await api.put(`/eventos/${id}`, {
        ...values,
        data: values.data.toISOString()
      });
      message.success("Evento atualizado com sucesso");
      navigate(`/eventos/${id}`);
    } catch {
      message.error("Erro ao atualizar evento");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvento();
  }, [id]);

  return (
    <Card title="Editar Evento">
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="local" label="Local" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="capacidade" label="Capacidade" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="data" label="Data" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar Alterações
        </Button>
      </Form>
    </Card>
  );
}
