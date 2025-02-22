import { getOrdersByCpf } from "@/data/get-orders-by-cpf";
import { isValidCpf } from "../menu/helpers/cpf";
import { CpfForm } from "./components/cpf-form";
import { OrderList } from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { cpf } = await searchParams;

  if (!cpf || !isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const { orders } = await getOrdersByCpf(cpf);

  return <OrderList orders={orders} />;
}
