import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <fieldset className="border-2 border-black flex w-sm p-10 flex-col text-white">
        <legend className="text-black text-center">Locadora fictícia</legend>

        <Link href="/cliente">
          <button className="bg-blue-500 cursor-pointer rounded-md p-1 w-full mb-2 hover:bg-blue-600">
            Cadastrar Cliente
          </button>
        </Link>
        <br/>
        <Link href="/lista-clientes">
          <button className="bg-blue-500 cursor-pointer rounded-md p-1 w-full mb-2 hover:bg-blue-600">
            Ver clientes cadastrados
          </button>
        </Link>
        <br/>
        <Link href="/item">
          <button className="bg-blue-500 cursor-pointer rounded-md p-1 w-full mb-2 hover:bg-blue-600">
            Cadastrar Item
          </button>
        </Link>
        <br/>
        <Link href="/lista-itens">
          <button className="bg-blue-500 cursor-pointer rounded-md p-1 w-full mb-2 hover:bg-blue-600">
            Ver itens cadastrados
          </button>
        </Link>
        <br/>
        <Link href="/locacao">
          <button className="bg-blue-500 cursor-pointer rounded-md p-1 w-full hover:bg-blue-600">
            Fazer locação
          </button>
        </Link>
        <br/>
        <Link href="/lista-locacoes">
          <button className="bg-blue-500 cursor-pointer rounded-md p-1 w-full hover:bg-blue-600">
            Ver lista de locações
          </button>
        </Link>
      </fieldset>
    </div>
  )
}
