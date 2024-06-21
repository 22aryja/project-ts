import "./auth.scss";
import { useState } from "react";
import { AuthService } from "../../services/AuthService";
import Input from "../../components/Input/Input";

export type LoginType = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onClose: () => void;
};

const emptyLogin = {
  email: "",
  password: "",
};

export default function LoginForm({ onClose }: LoginFormProps) {
  const [login, setLogin] = useState<LoginType>(emptyLogin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await AuthService.login(login);
      setLogin(emptyLogin);
      onClose(); //не сработает если статус не 200
    } catch (e) {
      throw e;
    }
  };
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <Input
            value={login.email}
            label="Email"
            onChange={(value) =>
              setLogin((prevData: LoginType) => ({
                ...prevData,
                email: value,
              }))
            }
            type="email"
          />
        </div>

        <div>
          <Input
            value={login.password}
            label="Password"
            onChange={(value) =>
              setLogin((prevData: LoginType) => ({
                ...prevData,
                password: value,
              }))
            }
            type="password"
          />
        </div>
        <button className="login-form-button" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
