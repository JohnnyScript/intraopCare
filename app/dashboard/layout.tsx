import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Settings, User } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "patient" | "professional";
  userName: string;
}

export default function DashboardLayout({
  children,
  userType,
  userName,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              IntraOpCare
            </Link>
            <nav className="ml-10 space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700"
              >
                Inicio
              </Link>
              {userType === "patient" ? (
                <Link
                  href="/medical-history"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Historial Médico
                </Link>
              ) : (
                <Link
                  href="/patients"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Pacientes
                </Link>
              )}
              <Link
                href="/settings"
                className="text-gray-500 hover:text-gray-700"
              >
                Configuración
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userType === "patient"
                        ? "Paciente"
                        : "Profesional de la Salud"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            © 2023 IntraOpCare. Todos los derechos reservados.
          </p>
          <nav className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Términos de Uso
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Contacto
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
