import api from "../api/api";

export default {
  async findAll() {
    const res = await api.get("/ingressos");
    return res.data;
  },

  async findByEvent(eventId) {
    const res = await api.get(`/ingressos/evento/${eventId}`);
    return res.data;
  },

  async create(data) {
    const res = await api.post("/ingressos", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/ingressos/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/ingressos/${id}`);
    return res.data;
  }
};
