import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface SimulationFormProps {
  force: string;
  setForce: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
  material: string;
  setMaterial: (value: string) => void;
  handleSimulation: () => void;
  isSimulating: boolean;
}

const SimulationForm: React.FC<SimulationFormProps> = ({
  force, setForce, area, setArea, material, setMaterial, handleSimulation, isSimulating
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Simulador de Fratura IoT</CardTitle>
        <CardDescription>Configure os parâmetros para simular a fratura</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="force" className="block text-sm font-medium text-gray-700">Força Máxima (N)</label>
            <Input
              id="force"
              type="number"
              value={force}
              onChange={(e) => setForce(e.target.value)}
              placeholder="Ex: 1000"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área (m²)</label>
            <Input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ex: 0.0045"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material</label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="steel">Steel</option>
              <option value="aluminum">Aluminum</option>
              <option value="titanium">Titanium</option>
            </select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSimulation} disabled={isSimulating}>
          {isSimulating ? 'Simulando...' : 'Simular'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimulationForm;