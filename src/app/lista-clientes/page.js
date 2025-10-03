"use client"

import { useEffect, useState } from "react"

export default function ListaClientes() {
  const [clientes, setClientes] = useState([])
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ nome: "", telefone: "", email: "", cpf: "" });

  useEffect(() => {
    async function fetchClientes() {
      const res = await fetch("/api/cliente")
      const data = await res.json()
      setClientes(data)
    }
    fetchClientes()
  }, [])

  function handleEdit(cliente) {
    setEditando(cliente.id);
    setFormData(cliente);
  }

  async function salvarEdicao() {
    await fetch("/api/cliente", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const res = await fetch("/api/cliente");
    const data = await res.json();
    setClientes(data);
    setEditando(null);
  }

  function handleDelete(id){
    if(confirm("Quer mesmo apagar este cliente ?")){
      excluirCliente(id)
    }
  }

  async function excluirCliente(id) {
    await fetch("/api/cliente", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const res = await fetch("/api/cliente");
    const data = await res.json();
    setClientes(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Clientes</h1>

      <ul className="space-y-4">
        {clientes.map(cliente => (
          <li key={cliente.id} className="p-4 border rounded ">
            {editando === cliente.id ? (
              <div>
                <input
                  value={formData.nome}
                  onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  className="border p-1 mr-2"
                />
                <input
                  value={formData.cpf}
                  onChange={e => setFormData({ ...formData, cpf: e.target.value })}
                  className="border p-1 mr-2"
                />
                <input
                  value={formData.telefone}
                  onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                  className="border p-1 mr-2"
                />
                <input
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="border p-1 mr-2"
                />
                <button onClick={salvarEdicao} className="bg-green-500 px-3 py-1 rounded text-white cursor-pointer">
                  Salvar
                </button>
              </div>
            ) : (
              <div>
                <p><b>Nome:</b> {cliente.nome}</p>
                <p><b>CPF:</b> {cliente.cpf}</p>
                <p><b>Telefone:</b> {cliente.telefone}</p>
                <p><b>Email:</b> {cliente.email}</p>
                <button
                  onClick={() => handleEdit(cliente)}
                  className="bg-blue-500 px-3 py-1 rounded text-white mt-2 cursor-pointer"
                >
                  Editar
                </button>
                 <button onClick={() => handleDelete(cliente.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2 cursor-pointer">
                  Excluir
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
