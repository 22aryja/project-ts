import "./auth.scss";
import { useState } from "react";
import { AuthService } from "../../services/AuthService";
import Input from "../../components/Input/Input";

export type RegisterType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type RegisterFormProps = {
  onClose: () => void;
};

const emptyUser = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const [userData, setUserData] = useState<RegisterType>(emptyUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await AuthService.register(userData);
      setUserData(emptyUser);
      onClose(); //не сработает если статус не 200
    } catch (e) {
      throw e;
    }
  };
  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <Input
            value={userData.name}
            label="Your name"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                name: value,
              }))
            }
            type="text"
          />
          {/* <label>Your name: </label>
        <input
          type="text"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData((prevData: RegisterType) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
        ></input> */}
        </div>

        <div>
          <Input
            value={userData.surname}
            label="Your surname"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                surname: value,
              }))
            }
            type="text"
          />
        </div>

        <div>
          <Input
            value={userData.email}
            label="Your email"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                email: value,
              }))
            }
            type="email"
          />
        </div>

        <div>
          <Input
            value={userData.password}
            label="Enter a password"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                password: value,
              }))
            }
            type="password"
          />
        </div>

        <div>
          <Input
            value={userData.confirmPassword!}
            label="Confirm password"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                confirmPassword: value,
              }))
            }
            type="password"
          />
        </div>

        {userData.password === userData.confirmPassword ? (
          <button className="register-form-button" type="submit">
            Sign Up
          </button>
        ) : (
          <span>Passwords do not match</span>
        )}
      </form>
    </div>
  );
}
