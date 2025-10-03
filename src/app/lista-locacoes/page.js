"use client";
import { useState, useEffect } from "react";

export default function ListaLocacoes() {
    const [locacoes, setLocacoes] = useState([]);

    useEffect(() => {
        fetch("/api/locacao")
            .then((res) => res.json())
            .then(setLocacoes)
            .catch((err) => console.error("Erro ao carregar locações:", err));
    }, []);

    function calcularStatus(l) {
        if (l.status === "ativo") {
            return new Date(l.dataDevolucao) < new Date() ? "Atrasada" : "Alugada";
        }
        return "Devolvida";
    }

    function calcularStatus(l) {
        const hoje = new Date();
        const dataDev = new Date(l.dataDevolucao);

        if (dataDev < hoje) {
            return "Atrasada";
        }
        return "Alugada";
    }

    async function atualizarStatus(id, novoStatus) {
        try {
            const res = await fetch("/api/locacao", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: novoStatus }), 
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message || "Status atualizado com sucesso!");

                setLocacoes((prev) =>
                    prev.map((l) =>
                        l.id === id ? { ...l, status: novoStatus } : l
                    )
                );
            } else {
                alert(data.error || "Erro ao atualizar status");
            }
        } catch (err) {
            console.error(err);
            alert("Erro de conexão com servidor");
        }
    }


    return (
        <div className="w-full h-screen flex flex-col items-center mt-5">
            <h1 className="text-center">Lista de Locações</h1>
            <table className="border p-1 mr-2" >
                <thead className="border p-1 mr-2">
                    <tr className="border p-1 mr-2">
                        <th className="border p-1 mr-2">Cliente</th>
                        <th className="border p-1 mr-2">Item</th>
                        <th className="border p-1 mr-2">Data de Locação</th>
                        <th className="border p-1 mr-2">Data de Devolução</th>
                        <th className="border p-1 mr-2">Status</th>
                    </tr>
                </thead>
                <tbody className="border p-1 mr-2">
                    {locacoes.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                Nenhuma locação registrada.
                            </td>
                        </tr>
                    ) : (
                        locacoes.map((l) => (
                            <tr key={l.id} className="border p-1 mr-2">
                                <td className="border p-1 mr-2">{l.cliente?.nome}</td>
                                <td className="border p-1 mr-2">{l.item?.titulo}</td>
                                <td className="border p-1 mr-2">{new Date(l.dataDaLocacao).toLocaleDateString()}</td>
                                <td className="border p-1 mr-2">{new Date(l.dataDevolucao).toLocaleDateString()}</td>
                                <td className="border p-1 mr-2">
                                    <select
                                        value={l.status || calcularStatus(l)}
                                        onChange={(e) => atualizarStatus(l.id, e.target.value)}
                                        className="border rounded px-1"
                                    >
                                        <option value="Alugada">Alugada</option>
                                        <option value="Atrasada">Atrasada</option>
                                        <option value="Devolvida">Devolvida</option>
                                    </select>
                                </td>

                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
