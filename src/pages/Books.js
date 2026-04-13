import { useEffect, useState } from "react";
import axios from "axios";

export default function Books() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  const load = async () => {
    const res = await axios.get("http://localhost:3001/books");
    setBooks(res.data);
  };

  const create = async () => {
    await axios.post("http://localhost:3001/books", {
      title,
      author,
    });

    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Libros</h1>

      <input
        placeholder="Título"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Autor"
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button onClick={create}>Crear libro</button>

      <h3>Lista de libros</h3>

      {books.map((b) => (
        <p key={b.id}>
          📖 {b.title} - {b.author}
        </p>
      ))}
    </div>
  );
}