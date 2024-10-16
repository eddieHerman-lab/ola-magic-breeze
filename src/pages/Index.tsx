import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Index = () => {
  const [force, setForce] = useState('');
  const [area, setArea] = useState('');
  const [result, setResult] = useState('');
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Simular dados do sensor em tempo real
    const interval = setInterval(() => {
      setSensorData(prevData => [
        ...prevData,
        { time: new Date().toLocaleTimeString(), value: Math.random() * 10 }
      ].slice(-10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSimulation = () => {
    // Implementar a lógica de simulação baseada no código Python
    const forceValue = parseFloat(force);
    const areaValue = parseFloat(area);
    const tensao = forceValue / areaValue;
    const comprimento_trinca_metros = 0.001;
    const fator_geometrico = 1;
    const tenacidade_fratura = 150;

    const fator_intensidade_tensao = fator_geometrico * tensao * Math.sqrt(Math.PI * comprimento_trinca_metros);

    if (fator_intensidade_tensao >= tenacidade_fratura) {
      setResult(`Fratura ocorrerá: Fator da intensidade = ${fator_intensidade_tensao.toFixed(2)} Pa·sqrt(m), que é maior que a tenacidade à fratura = ${tenacidade_fratura} Pa·sqrt(m)`);
    } else {
      setResult(`Fratura não ocorrerá: Fator da intensidade = ${fator_intensidade_tensao.toFixed(2)} Pa·sqrt(m), que é menor que a tenacidade à fratura = ${tenacidade_fratura} Pa·sqrt(m)`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Análise de Fraturas em Materiais</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full">
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dados do Sensor em Tempo Real</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={400} height={200} data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
      {result && (
        <Card className="mt-4 w-full">
          <CardHeader>
            <CardTitle>Resultado da Simulação</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;