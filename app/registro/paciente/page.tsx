"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const formSchema = z
  .object({
    nombreCompleto: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    numeroIdentificacion: z.string().min(5, {
      message: "El número de identificación debe tener al menos 5 caracteres.",
    }),
    edad: z.number().min(0).max(120),
    sexo: z.enum(["masculino", "femenino", "otro"]),
    ciudadOrigen: z.string().min(2, {
      message: "La ciudad de origen debe tener al menos 2 caracteres.",
    }),
    ciudadResidencia: z.string().min(2, {
      message: "La ciudad de residencia debe tener al menos 2 caracteres.",
    }),
    numeroTelefono: z.string().min(7, {
      message: "El número de teléfono debe tener al menos 7 caracteres.",
    }),
    numeroTelefonoFamiliar: z.string().min(7, {
      message:
        "El número de teléfono familiar debe tener al menos 7 caracteres.",
    }),
    eps: z.string().min(2, {
      message: "La EPS debe tener al menos 2 caracteres.",
    }),
    enfermedades: z.string(),
    aceptaDonacion: z.boolean(),
    razonNoTransfusional: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.aceptaDonacion && !data.razonNoTransfusional) {
        return false;
      }
      return true;
    },
    {
      message:
        "Debe proporcionar una razón para no aceptar donaciones de sangre.",
      path: ["razonNoTransfusional"],
    }
  );

export default function PatientRegistration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreCompleto: "",
      numeroIdentificacion: "",
      edad: 0,
      sexo: "masculino",
      ciudadOrigen: "",
      ciudadResidencia: "",
      numeroTelefono: "",
      numeroTelefonoFamiliar: "",
      eps: "",
      enfermedades: "",
      aceptaDonacion: false,
      razonNoTransfusional: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aquí iría la lógica para enviar los datos al servidor
  }

  const aceptaDonacion = form.watch("aceptaDonacion");

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-800">
            Registro de Paciente
          </CardTitle>
          <CardDescription className="text-center">
            Por favor, complete todos los campos del formulario para registrarse
            en la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nombreCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroIdentificacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Identificación</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="edad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edad</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sexo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione su sexo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ciudadOrigen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad o País de Origen</FormLabel>
                    <FormControl>
                      <Input placeholder="Bogotá" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ciudadResidencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad de Residencia</FormLabel>
                    <FormControl>
                      <Input placeholder="Medellín" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroTelefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número Telefónico</FormLabel>
                    <FormControl>
                      <Input placeholder="3001234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroTelefonoFamiliar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número Telefónico de un Familiar</FormLabel>
                    <FormControl>
                      <Input placeholder="3009876543" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EPS a la que se encuentra afiliado</FormLabel>
                    <FormControl>
                      <Input placeholder="Sura" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enfermedades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enfermedades que padece</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describa las enfermedades que padece"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aceptaDonacion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Acepta Donación de Sangre
                      </FormLabel>
                      <FormDescription>
                        Indique si acepta recibir donaciones de sangre en caso
                        de ser necesario.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {!aceptaDonacion && (
                <FormField
                  control={form.control}
                  name="razonNoTransfusional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Razón por la cual NO acepta donaciones de sangre
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Indique su religión o patología"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Por favor, indique la religión a la que pertenece o la
                        patología que padece que le impide recibir
                        transfusiones.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
