import http from "../http-common";

// class PlanADataService {
  const getAll=()=> {
    return http.get("/planas");
  };

  const get=(id)=> {
    return http.get(`/planas/${id}`);
  };

  const create=(data)=> {
    return http.post("/planas", data);
  };

  const update=(id, data)=> {
    return http.put(`/planas/${id}`, data);
  };

  const remove=(id)=> {
    return http.delete(`/planas/${id}`);
  };

  const removeAll=()=> {
    return http.delete(`/planas`);
  };

  const getByUplineId=(uplineId)=> {
    return http.get(`/planas/upline/${uplineId}`);
  };
  const getByUserId=(userId)=> {
    return http.get(`/planas/${userId}`);
    
  };
// }

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getByUplineId,
  getByUserId
};