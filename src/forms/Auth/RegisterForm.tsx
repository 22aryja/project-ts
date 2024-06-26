import "./auth.scss";
import { useState } from "react";
import { AuthService } from "../../services/AuthService";
import Input from "../../components/Input/Input";

export type RegisterType = {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type RegisterFormProps = {
  onClose: () => void;
};

const emptyUser = {
  first_name: "",
  last_name: "",
  gender: "",
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
            value={userData.first_name}
            label="First name"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                first_name: value,
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
            value={userData.last_name}
            label="Last name"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                last_name: value,
              }))
            }
            type="text"
          />
        </div>

        <div>
          <Input
            value={userData.gender}
            label="Your gender"
            onChange={(value) =>
              setUserData((prevData: RegisterType) => ({
                ...prevData,
                gender: value,
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
        {userData.password.length > 6 ? (
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
        ) : (
          <span style={{"color":"black"}}>Your password should contain 6 symbols at least</span>
        )}
        
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
