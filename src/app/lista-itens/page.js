"use client"

import { useEffect, useState } from "react";

export default function ListaItens() {
  const [itens, setItens] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({});
  useEffect(() => {
    async function fetchItens() {
      try {
        const res = await fetch("/api/item");
        const data = await res.json();
        setItens(data);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItens();
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch("/api/item", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const atualizado = await res.json();
      setItens(itens.map(i => (i.id === atualizado.id ? atualizado : i)));
      setEditando(null);
    }
  }

  async function handleDelete(id) {
    const confirmar = confirm("Você tem certeza ? está certo disso ?");
    if (!confirmar) return;

    const res = await fetch("/api/item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setItens(itens.filter((i) => i.id !== id));
    }
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-xl font-bold mb-4">Itens cadastrados</h1>
      {itens.map(item => (
        <div key={item.id} className="border p-4 mb-2 rounded w-96">
          {editando === item.id ? (
            <div className="flex flex-col gap-1">
              <input
                type="hidden"
                value={form.id}
                onChange={e => setForm({ ...form, id: item.id })}
              />
              <input
                type="text"
                defaultValue={item.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })}
                className="border p-1"
              />
              <input
                type="text"
                defaultValue={item.categoria}
                onChange={e => setForm({ ...form, categoria: e.target.value })}
                className="border p-1"
              />
              <input
                type="number"
                defaultValue={item.anoDeLancamento}
                onChange={e => setForm({ ...form, anoDeLancamento: e.target.value })}
                className="border p-1"
              />
              <input
                type="number"
                defaultValue={item.classificacaoEtaria}
                onChange={e => setForm({ ...form, classificacaoEtaria: e.target.value })}
                className="border p-1"
              />
              <input
                type="number"
                defaultValue={item.quantidadeCopias}
                onChange={e => setForm({ ...form, quantidadeCopias: e.target.value })}
                className="border p-1"
              />
              <button onClick={handleUpdate}
              className="bg-green-500 text-white p-1 rounded cursor-pointer">
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditando(null)}
                className="bg-gray-400 text-white p-1 rounded cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <p><b>Título:</b> {item.titulo}</p>
              <p><b>Categoria:</b> {item.categoria}</p>
              <p><b>Ano de Lançamento:</b> {item.anoDeLancamento}</p>
              <p><b>Classificação:</b> {item.classificacaoEtaria}</p>
              <p><b>Quantidade de Cópias:</b> {item.quantidadeCopias}</p>
              <div className="flex gap-1 ">
                <button
                  onClick={() => {
                    setEditando(item.id);
                    setForm(item);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 mt-2 rounded cursor-pointer"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 mt-2 rounded cursor-pointer"
                >
                  Excluir
                </button>
              </div>

            </>
          )}
        </div>
      ))}
    </div>
  );

}
