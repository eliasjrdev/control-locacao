"use client"
import { useState } from "react"
export default function Cliente() {

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {
      nome: formData.get("nome"),
      cpf: formData.get("cpf"),
      telefone: formData.get("telefone"),
      email: formData.get("email"),
    }


    const res = await fetch("/api/cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      alert("Cliente cadastrado com sucesso!")
      e.target.reset()

      const clientesAtualizados = await fetch("/api/cliente").then(r => r.json())
      setClientes(clientesAtualizados)
    } else {
      alert("Erro de conexão com servidor")
    }

  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="border-2 border-black flex w-sm p-10 flex-col">
          <legend className="text-">Cadastrar cliente</legend>
          <br />
          <div className="flex flex-col gap-1">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" name="nome" required className="border-2 border-black pl-1"></input>
            <br />
            <label htmlFor="cpf">Cpf</label>
            <input type="text" name="cpf" maxLength={11} required className="border-2 border-black pl-1"></input>
            <br />
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" name="telefone" maxLength={11} required className="border-2 border-black pl-1"></input>
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required className="border-2 border-black pl-1"></input>
            <br />
            <button className="bg-blue-500 text-white cursor-pointer rounded-md p-1 w-full hover:bg-blue-600">Salvar</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}