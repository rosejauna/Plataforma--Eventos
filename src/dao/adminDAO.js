import api from "../api/api";

export default {
  async listar() {
    const res = await api.get("/admins");
    return res.data;
  },

  async criar(payload) {
    const res = await api.post("/admins", payload);
    return res.data;
  },

  async deletar(id) {
    const res = await api.delete(`/admins/${id}`);
    return res.data;
  },
};
