import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const locacoes = await prisma.locacao.findMany({
    include: {
      cliente: true,
      item: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(locacoes);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { clienteId, itemId, dataDaLocacao, dataDevolucao } = body;

    if (!clienteId || !itemId || !dataDaLocacao || !dataDevolucao) {
      return NextResponse.json(
        { error: "Campos obrigatórios: clienteId, itemId, dataDaLocacao, dataDevolucao." }, {status:400}
      );
    }

    const dataLoc = new Date(`${dataDaLocacao}T00:00:00`);
    const dataDev = new Date(`${dataDevolucao}T00:00:00`);
    const hoje = new Date();

    const locacoesAtivas = await prisma.locacao.count({
      where: {
        clienteId: Number(clienteId),
        dataDevolucao: { gte: hoje }
      },
    });

    if (locacoesAtivas >= 3) {
      const cliente = await prisma.cliente.findUnique({ where: { id: Number(clienteId) } });
      return NextResponse.json(
        { error: `O cliente ${cliente?.nome} já possui 3 locações ativas.` }, {status:409}
      );
    }

    const diffDias = (dataDev - dataLoc) / (1000 * 60 * 60 * 24);
    if (diffDias > 7) {
      return NextResponse.json(
        { error: "A data de devolução deve ser no máximo 7 dias após a retirada." }, {status:409} 
      );
    }

    const item = await prisma.item.findUnique({
      where: { id: Number(itemId) },
    });

    if (!item) {
      return NextResponse.json({ error: "Item não encontrado." }, {status:404});
    }

    if (item.quantidadeCopias <= 0) {
      return NextResponse.json(
        { error: `O item "${item.titulo}" não possui cópias disponíveis.` }, {status:409}
      );
    }

    const locacao = await prisma.$transaction(async (tx) => {
      const nova = await tx.locacao.create({
        data: {
          clienteId: Number(clienteId),
          itemId: Number(itemId),
          dataDaLocacao: dataLoc,
          dataDevolucao: dataDev,
        },
      });

      await tx.item.update({
        where: { id: Number(itemId) },
        data: { quantidadeCopias: { decrement: 1 } },
      });

      return nova;
    });

    const cliente = await prisma.cliente.findUnique({ where: { id: Number(clienteId) } });

    return NextResponse.json(
      { message: `Locação registrada com sucesso para ${cliente?.nome}.`, locacao },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message ?? "Erro interno ao criar locação." }
    );
  }
}

export async function PATCH(req) {
  const body = await req.json();
  const { id, status } = body;

  const updated = await prisma.locacao.update({
    where: { id: Number(id) },
    data: { status },
  });

  if (status === "Devolvida") {
    await prisma.item.update({
      where: { id: updated.itemId },
      data: { quantidadeCopias: { increment: 1 } },
    });
  }

  return NextResponse.json({ message: `Status atualizado para ${status}.`, locacao: updated });
}

