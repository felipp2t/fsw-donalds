import { getOrdersByCpf } from "@/data/get-orders-by-cpf";
import { isValidCpf } from "../menu/helpers/cpf";
import { CpfForm } from "./components/cpf-form";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

export const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf || !isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const { orders } = await getOrdersByCpf(cpf);

  return <h1>adfad</h1>;
};
