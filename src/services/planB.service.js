import http from "../http-common";

// class PlanBDataService {
  const getAll=()=> {
    return http.get("/planbs");
  };

  const get=(id)=> {
    return http.get(`/planbs/${id}`);
  };

  const create=(data)=> {
    return http.post("/planbs", data);
  };

  const update=(id, data)=> {
    return http.put(`/planbs/${id}`, data);
  };

  const remove=(id)=> {
    return http.delete(`/planbs/${id}`);
  };

  const removeAll=()=> {
    return http.delete(`/planbs`);
  };

  const getByUplineId=(uplineId)=> {
    return http.get(`/planbs/upline/${uplineId}`);
  };
  const getByUserId=(userId)=> {
    return http.get(`/planbs/user/${userId}`);
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