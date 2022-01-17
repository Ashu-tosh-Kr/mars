import axios from "axios";

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}/api`,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("userInfo")).data.access_token,
      },
    });
    //   this.instance.interceptors.response.use(
    //     (res) => {
    //       return res;
    //     },
    //     async (err) => {
    //       const originalConfig = err.config;

    //       if (originalConfig.url !== "/auth/login" && err.response) {
    //         // Access Token was expired
    //         if (err.response.status === 401 && !originalConfig._retry) {
    //           originalConfig._retry = true;

    //           try {
    //             const { data } = await this.instance.post(
    //               "/auth/refresh_token",
    //               {
    //                 refresh_token: JSON.parse(localStorage.getItem("userInfo"))
    //                   .data.refresh_token,
    //               },
    //               originalConfig
    //             );

    //             localStorage.setItem("userInfo", JSON.stringify(data));

    //             return this.instance(originalConfig);
    //           } catch (_error) {
    //             return Promise.reject(_error);
    //           }
    //         }
    //       }
    //       return Promise.reject(err);
    //     }
    //   );
  }

  //auth
  getAccessToken() {
    return this.instance.post("/auth/refresh_token", {
      refresh_token: JSON.parse(localStorage.getItem("userInfo")).data
        .refresh_token,
    });
  }
  changePass(data) {
    return this.instance.post("/auth/change_pass", data);
  }

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
  getCurrUserInfo() {
    return this.instance.get("/user/info");
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

  //gig apis
  addNewGig(data) {
    return this.instance.post("/gig", data);
  }

  editGig(gigId, data) {
    return this.instance.put(`/gig/${gigId}`, data);
  }

  updateGigStatus(gigId, step, data) {
    return this.instance.post(`/gig/${gigId}/${step}`, data);
  }
  getAllGigs() {
    return this.instance.get(`/gig`);
  }

  // getAllClients() {
  //   return this.instance.get("/client", data, {
  //     headers: {
  //       "x-project-id": projectid,
  //     },
  //   });
}
