import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query") || "";

  const itens = await prisma.item.findMany({
    where: {
      titulo: {
        contains: query,
      }
    },
    take: 10
  });

  return Response.json(itens);
}


export async function POST(request) {
  try {
    const { titulo, categoria, anoDeLancamento, classificacaoEtaria, quantidadeCopias } = await request.json();

    const novoItem = await prisma.item.create({
      data: {
        titulo,
        categoria,
        anoDeLancamento: Number(anoDeLancamento),
        classificacaoEtaria: Number( classificacaoEtaria),
        quantidadeCopias: Number(quantidadeCopias),
      },
    });

    return Response.json(novoItem);

  } catch (error) {
    console.error("Erro ao cadastrar item:", error);
    return Response.json({ error: "Erro ao cadastrar item" });
  }
}

export async function PUT(request) {
  try {
    const { id, titulo, categoria, anoDeLancamento, classificacaoEtaria, quantidadeCopias } = await request.json();

    const itemAtualizado = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        titulo,
        categoria,
        anoDeLancamento: Number(anoDeLancamento),
        classificacaoEtaria: Number(classificacaoEtaria),
        quantidadeCopias: Number(quantidadeCopias),
      },
    });

    return Response.json(itemAtualizado);
  } catch (error) {
    console.error("Erro ao editar item:", error);
    return Response.json({ error: "Erro ao editar item" });
  }
}

export async function DELETE(request) {
  const { id } = await request.json();

  await prisma.item.delete({
    where: { id },
  });

  return Response.json({ message: "Item excluído !" });
}

