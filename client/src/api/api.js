import axios from "axios";

export default class API {
  instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}/api`,
    headers: {
      Authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("userInfo")).data.access_token,
    },
  });

  //user apis
  getAllUsers() {
    return this.instance.get("/user");
  }
  addNewUser(data) {
    return this.instance.post("/auth/register", data);
  }
  updateUser(data) {
    return this.instance.put("/user", data);
  }

  //client apis
  getAllClients() {
    return this.instance.get("/client");
  }
  addNewClient(data) {
    return this.instance.post("/client", data);
  }
  updateClient(data) {
    return this.instance.put("/client", data);
  }

  //company apis
  getAllCompanies() {
    return this.instance.get("/company");
  }
  addNewCompany(data) {
    return this.instance.post("/company", data);
  }
  updateCompany(data) {
    return this.instance.put("/company", data);
  }

  // getAllClients() {
  //   return this.instance.get("/client", data, {
  //     headers: {
  //       "x-project-id": projectid,
  //     },
  //   });
}
