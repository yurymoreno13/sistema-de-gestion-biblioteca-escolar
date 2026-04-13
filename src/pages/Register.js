import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    await axios.post("http://localhost:3001/register", {
      email,
      password,
    });

    alert("Usuario creado ✔");
    navigate("/");
  };

  return (
    <div>
      <h1>📝 Registro</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={register}>Registrar</button>

      <p>
        ¿Ya tienes cuenta? <Link to="/">Login</Link>
      </p>
    </div>
  );
}