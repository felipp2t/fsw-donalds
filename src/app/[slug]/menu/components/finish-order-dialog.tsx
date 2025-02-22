"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";
import { createOrder } from "../actions/create-order";
import { CartContext } from "../contexts/cart";
import { isValidCpf } from "../helpers/cpf";

const formSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .trim()
    .min(3, "O nome deve ter no mínimo 3 caracteres"),
  cpf: z
    .string({ required_error: "O cpf é obrigatório" })
    .trim()
    .refine((value) => isValidCpf(value), "CPF inválido"),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FinishOrderDialog = ({
  open,
  onOpenChange,
}: FinishOrderDialogProps) => {
  const [isPending, startTransiction] = useTransition();

  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const seachParams = useSearchParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = seachParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      startTransiction(async () => {
        await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products,
          slug,
        });

        onOpenChange(false);
        toast.success("Pedido finalizado com sucesso!");
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar seu pedido
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite seu nome..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Finalizar"
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
