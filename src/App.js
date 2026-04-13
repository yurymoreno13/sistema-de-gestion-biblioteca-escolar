import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);

  // 🔐 REGISTER
  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.message);
    } catch {
      setMessage("Error en registro");
    }
  };

  // 🔐 LOGIN
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      setMessage(res.data.message);
      loadBooks();
    } catch {
      setMessage("Error en login");
    }
  };

  // 📚 CREAR LIBRO (ANEXAR PRODUCTO)
  const createBook = async () => {
    try {
      await axios.post("http://localhost:3001/books", {
        title,
        author,
      });
      setMessage("Libro creado ✔");
      loadBooks();
    } catch {
      setMessage("Error creando libro");
    }
  };

  // 📚 LISTAR LIBROS
  const loadBooks = async () => {
    const res = await axios.get("http://localhost:3001/books");
    setBooks(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Sistema Biblioteca</h1>

      <h2>Registro / Login</h2>

      <input placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
      <br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={register}>Registrar</button>
      <button onClick={login}>Login</button>

      <hr />

      <h2>📖 Libros</h2>

      <input placeholder="Título" onChange={(e) => setTitle(e.target.value)} />
      <br />
      <input placeholder="Autor" onChange={(e) => setAuthor(e.target.value)} />
      <br />

      <button onClick={createBook}>Crear libro</button>

      <p>{message}</p>

      <h3>📋 Lista de libros</h3>

      {books.map((b) => (
        <div key={b.id}>
          📖 {b.title} - {b.author}
        </div>
      ))}
    </div>
  );
}

export default App;