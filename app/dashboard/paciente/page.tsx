"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, User, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PatientDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    nombre: "Juan Pérez",
    edad: 35,
    sexo: "Masculino",
    ciudadOrigen: "Bogotá",
    ciudadResidencia: "Medellín",
    numeroTelefono: "3001234567",
    numeroTelefonoFamiliar: "3009876543",
    eps: "Sura",
    enfermedades: "Ninguna",
    aceptaDonacion: true,
    razonNoTransfusional: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setPersonalInfo({
      ...personalInfo,
      aceptaDonacion: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Aquí iría la lógica para enviar los datos actualizados al servidor
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">
          Bienvenido, {personalInfo.nombre}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Información Personal
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancelar" : "Editar"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={personalInfo.nombre}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad</Label>
                  <Input
                    id="edad"
                    name="edad"
                    type="number"
                    value={personalInfo.edad}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select
                    disabled={!isEditing}
                    onValueChange={(value) => handleSelectChange("sexo", value)}
                    value={personalInfo.sexo}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudadOrigen">Ciudad de Origen</Label>
                  <Input
                    id="ciudadOrigen"
                    name="ciudadOrigen"
                    value={personalInfo.ciudadOrigen}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudadResidencia">Ciudad de Residencia</Label>
                  <Input
                    id="ciudadResidencia"
                    name="ciudadResidencia"
                    value={personalInfo.ciudadResidencia}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numeroTelefono">Número Telefónico</Label>
                  <Input
                    id="numeroTelefono"
                    name="numeroTelefono"
                    value={personalInfo.numeroTelefono}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numeroTelefonoFamiliar">
                    Número Telefónico Familiar
                  </Label>
                  <Input
                    id="numeroTelefonoFamiliar"
                    name="numeroTelefonoFamiliar"
                    value={personalInfo.numeroTelefonoFamiliar}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eps">EPS</Label>
                  <Input
                    id="eps"
                    name="eps"
                    value={personalInfo.eps}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="enfermedades">Enfermedades</Label>
                <Textarea
                  id="enfermedades"
                  name="enfermedades"
                  value={personalInfo.enfermedades}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="aceptaDonacion"
                  checked={personalInfo.aceptaDonacion}
                  onCheckedChange={handleSwitchChange}
                  disabled={!isEditing}
                />
                <Label htmlFor="aceptaDonacion">
                  Acepta Donación de Sangre
                </Label>
              </div>
              {!personalInfo.aceptaDonacion && (
                <div className="space-y-2">
                  <Label htmlFor="razonNoTransfusional">
                    Razón por la cual NO acepta donaciones de sangre
                  </Label>
                  <Textarea
                    id="razonNoTransfusional"
                    name="razonNoTransfusional"
                    value={personalInfo.razonNoTransfusional}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              )}
              {isEditing && (
                <Button type="submit" className="w-full">
                  Guardar Cambios
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Entidad Médica</TableHead>
                  <TableHead>Profesional</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>15/05/2023</TableCell>
                  <TableCell>Hospital Central</TableCell>
                  <TableCell>Dr. García</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>03/04/2023</TableCell>
                  <TableCell>Clínica San Rafael</TableCell>
                  <TableCell>Dra. Martínez</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>20/03/2023</TableCell>
                  <TableCell>Centro Médico Esperanza</TableCell>
                  <TableCell>Dr. López</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Resumen de Actividad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <User className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-500">Consultas este mes</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <Edit2 className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-gray-500">
                Actualizaciones de información
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!personalInfo.aceptaDonacion && (
        <div
          className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
          role="alert"
        >
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <p className="font-bold">Atención</p>
          </div>
          <p>
            Este paciente NO acepta donaciones de sangre. Por favor, considere
            tratamientos alternativos.
          </p>
        </div>
      )}
    </div>
  );
}
