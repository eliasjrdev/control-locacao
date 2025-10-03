"use client";
import { useState } from "react";
export default function PageItem() {
    const [mensagem, setMensagem] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            titulo: formData.get("titulo"),
            categoria: formData.get("categoria"),
            anoDeLancamento: formData.get("anoDeLancamento"),
            classificacaoEtaria: formData.get("classificacaoEtaria"),
            quantidadeCopias: formData.get("quantidadeCopias"),
        };

        const res = await fetch("/api/item", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setMensagem("Item cadastrado com sucesso!");
            e.target.reset();
        } else {
            setMensagem("Erro ao cadastrar item");
        }
    }
    return (
        <div className="flex h-screen w-full justify-center items-center">
            <form onSubmit={handleSubmit}>
                <fieldset className="border-2 border-black flex w-sm p-10 flex-col">
                    <legend>Cadastrar Itens</legend>
                    <br />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" name="titulo" required className="border-2 border-black pl-1"></input>
                        <br />
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" name="categoria" className="border-2 border-black">
                            <option value="">--Selecione--</option>
                            <option value="acao">Ação</option>
                            <option value="aventura">Aventura</option>
                            <option value="terror">Terror</option>
                            <option value="comedia">Comédia</option>
                            <option value="FixaoCientifica">Fixão Cientifica</option>
                        </select>
                        <br />
                        <label htmlFor="anoDeLancamento">Ano de lançamento</label>
                        <input type="text" name="anoDeLancamento" required className="border-2 border-black pl-1"></input>
                        <br />
                        <label htmlFor="classificacaoEtaria">Classificação Indicativa</label>
                        <input type="number" name="classificacaoEtaria" required className="border-2 border-black pl-1"></input>
                        <br />
                        <label htmlFor="quantidadeCopias">Quantidade de cópias</label>
                        <input type="text" name="quantidadeCopias" required className="border-2 border-black pl-1"></input>
                        <br />
                        <button className="bg-blue-500 text-white cursor-pointer rounded-md p-1 w-full hover:bg-blue-600">Salvar</button>
                        {mensagem && <p className="mt-2 text-green-400">{mensagem}</p>}
                    </div>
                </fieldset>
            </form>

        </div>
    )
}

/*titulo              
  categoria           
  anoDeLancamento     
  classificacaoEtaria 
  quantidadeCopias*/