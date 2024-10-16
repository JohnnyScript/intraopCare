"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { faqs, patients, patientsPerPage } from "./data";

export default function HealthcareDashboard() {
  const [filteredPatients, setFilteredPatients] = React.useState(patients);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedPatient, setSelectedPatient] = React.useState(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = patients.filter((patient) =>
      Object.values(patient).some((value) =>
        value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-blue-800">
          Dashboard Profesional
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Buscar pacientes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Filtrar por <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Columnas</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>DNI</DropdownMenuItem>
                  <DropdownMenuItem>Nombre</DropdownMenuItem>
                  <DropdownMenuItem>Edad</DropdownMenuItem>
                  <DropdownMenuItem>Grupo Sanguíneo</DropdownMenuItem>
                  <DropdownMenuItem>Acepta Donación</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DNI</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Grupo Sanguíneo</TableHead>
                  <TableHead>Acepta Donación</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPatients.map((patient) => (
                  <TableRow key={patient.dni}>
                    <TableCell>{patient.dni}</TableCell>
                    <TableCell>{patient.nombre}</TableCell>
                    <TableCell>{patient.edad}</TableCell>
                    <TableCell>{patient.grupoSanguineo}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          patient.aceptaDonacion
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {patient.aceptaDonacion ? "Sí" : "No"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            Consultar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                          <DialogHeader>
                            <DialogTitle>Información del Paciente</DialogTitle>
                            <DialogDescription>
                              Detalles completos del paciente seleccionado.
                            </DialogDescription>
                          </DialogHeader>
                          {selectedPatient && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  DNI:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.dni}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Nombre:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.nombre}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Edad:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.edad} años
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Sexo:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.sexo}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Grupo Sanguíneo:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.grupoSanguineo}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Acepta Donación:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.aceptaDonacion ? "Sí" : "No"}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Ciudad de Origen:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.ciudadOrigen}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Ciudad de Residencia:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.ciudadResidencia}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Número Telefónico:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.numeroTelefono}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Número Telefónico Familiar:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.numeroTelefonoFamiliar}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  EPS:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.eps}
                                </span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <label className="font-bold text-left mr-2">
                                  Enfermedades:
                                </label>
                                <span className="col-span-3">
                                  {selectedPatient.enfermedades}
                                </span>
                              </div>
                              {!selectedPatient.aceptaDonacion && (
                                <div className="grid grid-cols-4 items-center gap-2">
                                  <label className="font-bold text-left mr-2">
                                    Razón No Transfusional:
                                  </label>
                                  <span className="col-span-3">
                                    {selectedPatient.razonNoTransfusional}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Mostrando {indexOfFirstPatient + 1} -{" "}
                {Math.min(indexOfLastPatient, filteredPatients.length)} de{" "}
                {filteredPatients.length}
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastPatient >= filteredPatients.length}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preguntas Frecuentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  className="my-4 border-b-2 last:border-b-0 py-2"
                  value={`item-${index}`}
                  key={index}
                >
                  <AccordionTrigger className="font-bold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
