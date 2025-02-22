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
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";
import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";

const formSchema = z.object({
  cpf: z
    .string({ required_error: "O cpf é obrigatório" })
    .trim()
    .refine((value) => isValidCpf(value), "CPF inválido"),
});

type FormSchema = z.infer<typeof formSchema>;

export const CpfForm = () => {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { cpf: "" },
  });

  const pathname = usePathname();

  const onSubmit = (data: FormSchema) =>
    router.replace(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);

  const handleCancel = () => router.back();

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF abaixo para visualisar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
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
                className="w-full rounded-full"
              >
                Confirmar
              </Button>
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
