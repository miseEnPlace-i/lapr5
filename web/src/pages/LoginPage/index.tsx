import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../../components/Button";
import AuthContext from "../../context/AuthContext";
import { useEmail } from "../../hooks/useEmail";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { state } = useLocation();

  const { email, setEmail, isEmailValid } = useEmail("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password)
      .then(() => {
        navigate(state?.path || "/");
      })
      .catch((err) => {
        console.log(err);
        swal("Error", "Invalid email or password", "error");
        setPassword("");
        setEmail("");
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <main className="flex h-3/4 w-5/6 flex-col items-center justify-center gap-y-24 rounded-lg bg-slate-100 px-6 md:px-24 lg:w-1/2">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-center text-xl md:text-3xl font-bold">Welcome to</h1>
          <img
            className="mx-auto w-1/2"
            src="/assets/logos/light/svg/logo-no-background.svg"
            alt="Logo dark"
          />
        </div>
        <form className="flex w-full flex-col gap-y-4">
          <input
            className="w-full rounded-lg bg-slate-200 px-4 py-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-lg bg-slate-200 px-4 py-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            disabled={!isEmailValid || !password}
            className="mt-4 w-full"
          >
            Login
          </Button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;