import { RegisterType } from "../forms/Auth/RegisterForm";
import { LoginType } from "../forms/Auth/LoginForm";

const BASE_URL = "http://156.67.82.204:3000/rnm";

//200 ok, 400 not ok
export const AuthService = {
  login: async (userLogin: LoginType): Promise<LoginType> => {
    try {
      const response = await fetch(BASE_URL + "/login", {
        method: "POST",
        body: JSON.stringify(userLogin),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
    // fetch
    // localStorage - authSession - > { access_token, refresh_token, ttl, expires_in }
  },
  //200 or 201 ok,  409 not ok, 422 not correct form
  register: async (newUser: RegisterType): Promise<RegisterType> => {
    try {
      const response = await fetch(BASE_URL + "/register", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
};
