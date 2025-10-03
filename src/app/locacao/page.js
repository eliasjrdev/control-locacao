"use client";
import { useState, useEffect, useMemo} from "react";
import {getToday} from "../../functions/functions"
export default function PageLocacao() {
    const [clientes, setClientes] = useState([]);
    const [itens, setItens] = useState([]);
    const [clienteId, setClienteId] = useState("");
    const [itemId, setItemId] = useState("");
    const minDate = useMemo(() => getToday(), []);
    useEffect(() => {
        fetch("/api/cliente")
            .then((res) => res.json())
            .then(setClientes)
            .catch((err) => console.error("Erro ao buscar clientes:", err));

        fetch("/api/item")
            .then((res) => res.json())
            .then(setItens)
            .catch((err) => console.error("Erro ao buscar itens:", err));
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            clienteId,
            itemId,
            dataDaLocacao: formData.get("dataDaLocacao"),
            dataDevolucao: formData.get("dataDevolucao"),
        };

        try {
            const res = await fetch("/api/locacao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (res.ok) {
                alert(response.message || "Locação registrada com sucesso!");
                setClienteId("");
                setItemId("");
                e.target.reset();
            } else {
                alert(response.error || "Erro ao registrar locação.");
            }
        } catch (err) {
            alert("Erro inesperado ao tentar salvar.");
            console.error(err);
        }
    }


    return (
        <div className="flex w-full h-screen justify-center items-center">
            <form onSubmit={handleSubmit}>
                <fieldset className="border-2 border-black flex w-sm p-10 flex-col">
                    <legend>Cadastrar Locação</legend>
                    <label>Cliente</label>
                    <select
                        name="clienteId"
                        value={clienteId}
                        onChange={(e) => setClienteId(e.target.value)}
                        required
                        className="border-2 border-black pl-1"
                    >
                        <option value="">--Selecione--</option>
                        {clientes.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.nome}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Item</label>
                    <select
                        name="itemId"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        required
                        className="border-2 border-black pl-1"
                    >
                        <option value="">--Selecione--</option>
                        {itens.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.titulo}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Data de Locação</label>
                    <input type="date" name="dataDaLocacao" min={minDate} required className="border-2 border-black pl-1" />
                    <br />
                    <label>Data de Devolução</label>
                    <input type="date" name="dataDevolucao" min={minDate} required className="border-2 border-black pl-1" />
                    <br />
                    <br />
                    <button type="submit" className="bg-blue-500 text-white cursor-pointer rounded-md p-1 w-full hover:bg-blue-600">Salvar</button>

                </fieldset>
            </form>
        </div>
    );
}
