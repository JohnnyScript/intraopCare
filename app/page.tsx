"use client";
import { useState } from "react";
import { Fingerprint, Lock, Mail, Heart, UserPlus } from "lucide-react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userType, setUserType] = useState<"patient" | "professional">(
    "patient"
  );
  const router = useRouter();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-800">IntraOpCare</h1>
          <p className="mt-2 text-xl text-gray-600">
            Cuidado personalizado para pacientes con restricciones de
            transfusión
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-2" />
                  Para Pacientes
                </CardTitle>
                <CardDescription>
                  Gestione su información médica y preferencias de tratamiento
                  de manera segura.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Acceso rápido a su historial médico</li>
                  <li>Control sobre sus preferencias de tratamiento</li>
                  <li>Comunicación directa con profesionales de la salud</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="w-6 h-6 text-green-500 mr-2" />
                  Para Profesionales
                </CardTitle>
                <CardDescription>
                  Acceda a información crítica del paciente para brindar el
                  mejor cuidado posible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Visualización rápida de restricciones de transfusión</li>
                  <li>Historial médico completo del paciente</li>
                  <li>Herramientas para toma de decisiones informadas</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Iniciar Sesión</CardTitle>
              <CardDescription>
                Acceda a su cuenta de IntraOpCare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="patient"
                onValueChange={(value) =>
                  setUserType(value as "patient" | "professional")
                }
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="patient">Paciente</TabsTrigger>
                  <TabsTrigger value="professional">Profesional</TabsTrigger>
                </TabsList>
                <TabsContent value="patient">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="su@email.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        router.push("/dashboard/paciente");
                      }}
                      type="button"
                      className="w-full"
                    >
                      Iniciar Sesión
                      <Fingerprint className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="professional">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="pro-email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Profesional
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="pro-email"
                          type="email"
                          placeholder="doctor@hospital.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="pro-password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="pro-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        router.push("/dashboard/profesional");
                      }}
                      type="button"
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Acceso Profesional
                      <Fingerprint className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button variant="link" className="text-blue-600">
                ¿Olvidó su contraseña?
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  router.push(
                    userType === "patient"
                      ? "/registro/paciente"
                      : "/registro/profesional"
                  );
                }}
              >
                {userType === "patient"
                  ? "Registrarse como Paciente"
                  : "Registrarse como Profesional"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <footer className="text-center text-sm text-gray-500">
          <p>© 2023 IntraOpCare. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
