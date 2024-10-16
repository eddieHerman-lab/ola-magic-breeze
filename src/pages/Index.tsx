import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Progress } from "@/components/ui/progress"

const Index: React.FC = () => {
  const [force, setForce] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [sensorData, setSensorData] = useState<Array<{ time: string; value: number }>>([]);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationData, setSimulationData] = useState<Array<{ force: number; K: number }>>([]);

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
    setIsSimulating(true);
    setSimulationProgress(0);
    setResult('');

    const simulationSteps = 100;
    const stepDuration = 20; // 20ms per step for faster simulation
    const maxForce = parseFloat(force) || 1000; // Use input force or default to 1000N
    const areaValue = parseFloat(area) || 0.0045; // Use input area or default to 0.0045m²
    const comprimento_trinca_metros = 0.001;
    const fator_geometrico = 1;
    const tenacidade_fratura = 150; // MPa√m

    const newSimulationData: Array<{ force: number; K: number }> = [];

    const runSimulationStep = (step: number) => {
      setTimeout(() => {
        const currentForce = (step / simulationSteps) * maxForce;
        const tensao = currentForce / areaValue;
        const fator_intensidade_tensao = fator_geometrico * tensao * Math.sqrt(Math.PI * comprimento_trinca_metros);

        newSimulationData.push({ force: currentForce, K: fator_intensidade_tensao });
        setSimulationData([...newSimulationData]);
        setSimulationProgress((step / simulationSteps) * 100);

        if (step === simulationSteps) {
          // Final step: set result
          if (fator_intensidade_tensao >= tenacidade_fratura) {
            setResult(`Fratura ocorrerá: Fator da intensidade máximo = ${fator_intensidade_tensao.toFixed(2)} MPa·√m, que é maior que a tenacidade à fratura = ${tenacidade_fratura} MPa·√m`);
          } else {
            setResult(`Fratura não ocorrerá: Fator da intensidade máximo = ${fator_intensidade_tensao.toFixed(2)} MPa·√m, que é menor que a tenacidade à fratura = ${tenacidade_fratura} MPa·√m`);
          }
          setIsSimulating(false);
        } else {
          runSimulationStep(step + 1);
        }
      }, stepDuration);
    };

    runSimulationStep(1);
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
                <label htmlFor="force" className="block text-sm font-medium text-gray-700">Força Máxima (N)</label>
                <Input
                  id="force"
                  type="number"
                  value={force}
                  onChange={(e) => setForce(e.target.value)}
                  placeholder="Ex: 1000"
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
            <Button onClick={handleSimulation} disabled={isSimulating}>
              {isSimulating ? 'Simulando...' : 'Simular'}
            </Button>
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
      {isSimulating && (
        <Card className="mt-4 w-full">
          <CardHeader>
            <CardTitle>Progresso da Simulação</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={simulationProgress} className="w-full" />
          </CardContent>
        </Card>
      )}
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
      {simulationData.length > 0 && (
        <Card className="mt-4 w-full">
          <CardHeader>
            <CardTitle>Gráfico de Simulação</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={600} height={300} data={simulationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="force" label={{ value: 'Força (N)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Fator de Intensidade de Tensão (MPa·√m)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={150} label="Tenacidade à Fratura" stroke="red" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="K" stroke="#82ca9d" name="Fator de Intensidade de Tensão" />
            </LineChart>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;