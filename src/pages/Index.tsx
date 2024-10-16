import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const Index = () => {
  const [force, setForce] = useState('');
  const [area, setArea] = useState('');
  const [result, setResult] = useState('');

  const handleSimulation = () => {
    // Placeholder for simulation logic
    setResult(`Simulação realizada com força ${force}N e área ${area}m²`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Análise de Fraturas em Materiais</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Simulador de Fratura</CardTitle>
          <CardDescription>Insira os parâmetros para simular a fratura</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="force" className="block text-sm font-medium text-gray-700">Força (N)</label>
              <Input
                id="force"
                type="number"
                value={force}
                onChange={(e) => setForce(e.target.value)}
                placeholder="Ex: 3"
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
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSimulation}>Simular</Button>
        </CardFooter>
      </Card>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Resultado:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Index;