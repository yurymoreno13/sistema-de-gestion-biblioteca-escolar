import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 LOGIN
  const login = async () => {
    const res = await axios.post("http://localhost:3001/login", {
      email,
      password,
    });

    if (res.data.success) {
      navigate("/books");
    } else {
      alert("Login incorrecto");
    }
  };

  // 📝 REGISTRO
  const register = async () => {
    const res = await axios.post("http://localhost:3001/register", {
      email,
      password,
    });

    if (res.data.success) {
      alert("Usuario creado ✔ ahora inicia sesión");
    } else {
      alert("Error en registro");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Sistema Biblioteca</h1>

      <h2>Login / Registro</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={login}>Login</button>
      <button onClick={register}>Registro</button>
    </div>
  );
}