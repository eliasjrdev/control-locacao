import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        telefone: true
      }

    })
    return Response.json(clientes);
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return Response.json({ error: "Erro ao cadastrar cliente" });
  }
}


export async function POST(request) {
  try {
    const { nome, telefone, email, cpf } = await request.json();
    await prisma.cliente.create({
      data: {
        cpf,
        email,
        telefone,
        nome
      }
    })
    return Response.json(null)
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return Response.json({ error: "Erro ao cadastrar cliente" });
  }
}

export async function PUT(request) {
  try {
    const { id, nome, telefone, email, cpf } = await request.json();

    const clienteAtualizado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        nome,
        telefone,
        email,
        cpf
      }
    });

    return Response.json(clienteAtualizado);
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    return Response.json({ error: "Erro ao editar cliente" });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await prisma.cliente.delete({
      where: { id: Number(id) },
    });

    return Response.json({ message: "Cliente excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    return Response.json({ error: "Erro ao excluir cliente" });
  }
}
