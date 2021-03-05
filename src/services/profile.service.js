import http from "../http-common";

// class profileDataService {
  const getAll=()=> {
    return http.get("/profiles");
  };

  const get=(id)=> {
    return http.get(`/profiles/${id}`);
  };
  const getByUserId=(userId)=> {
    return http.get(`/profiles/user/${userId}`);
  };
  const create=(data)=> {
    return http.post("/profiles", data);
  };

  const update=(id, data)=> {
    return http.put(`/profiles/${id}`, data);
  };

  const remove=(id)=> {
    return http.delete(`/profiles/${id}`);
  };

  const removeAll=()=> {
    return http.delete(`/profiles`);
  };

  
// }

export default {
  getAll,
  get,
  getByUserId,
  create,
  update,
  remove,
  removeAll,
};