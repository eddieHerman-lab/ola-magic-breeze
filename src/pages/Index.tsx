import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import SimulationForm from '@/components/SimulationForm';
import SensorDataChart from '@/components/SensorDataChart';

const materials = {
  'steel': { name: 'Steel', tenacidadeFratura: 50, dureza: 150 },
  'aluminum': { name: 'Aluminum', tenacidadeFratura: 30, dureza: 60 },
  'titanium': { name: 'Titanium', tenacidadeFratura: 70, dureza: 200 },
};

const Index: React.FC = () => {
  const [force, setForce] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [material, setMaterial] = useState<string>('steel');
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

  const simulateSensorReading = () => {
    // Simula a leitura de um sensor de força
    return Math.random() * 1000; // Força aleatória entre 0 e 1000 N
  };

  const simulateDurometer = () => {
    // Simula a leitura de um durômetro
    const selectedMaterial = materials[material];
    return selectedMaterial.dureza + (Math.random() - 0.5) * 20; // Adiciona uma variação de ±10
  };

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
    const selectedMaterial = materials[material];
    const tenacidade_fratura = selectedMaterial.tenacidadeFratura;

    const newSimulationData: Array<{ force: number; K: number }> = [];

    const runSimulationStep = (step: number) => {
      setTimeout(() => {
        const currentForce = simulateSensorReading(); // Simula leitura do sensor
        const dureza = simulateDurometer(); // Simula leitura do durômetro
        const tensao = currentForce / areaValue;
        const fator_intensidade_tensao = fator_geometrico * tensao * Math.sqrt(Math.PI * comprimento_trinca_metros);

        newSimulationData.push({ force: currentForce, K: fator_intensidade_tensao });
        setSimulationData([...newSimulationData]);
        setSimulationProgress((step / simulationSteps) * 100);

        if (step === simulationSteps) {
          // Final step: set result
          if (fator_intensidade_tensao >= tenacidade_fratura) {
            setResult(`Fratura provável: Fator de intensidade máximo = ${fator_intensidade_tensao.toFixed(2)} MPa·√m, que é maior que a tenacidade à fratura = ${tenacidade_fratura} MPa·√m`);
          } else {
            setResult(`Fratura improvável: Fator de intensidade máximo = ${fator_intensidade_tensao.toFixed(2)} MPa·√m, que é menor que a tenacidade à fratura = ${tenacidade_fratura} MPa·√m`);
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
      <h1 className="text-3xl font-bold mb-4">Análise de Fraturas em Materiais (Simulação IoT)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SimulationForm
          force={force}
          setForce={setForce}
          area={area}
          setArea={setArea}
          material={material}
          setMaterial={setMaterial}
          handleSimulation={handleSimulation}
          isSimulating={isSimulating}
        />
        <SensorDataChart sensorData={sensorData} />
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
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="force" label={{ value: 'Força (N)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Fator de Intensidade de Tensão (MPa·√m)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={materials[material].tenacidadeFratura} label="Tenacidade à Fratura" stroke="red" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="K" stroke="#82ca9d" name="Fator de Intensidade de Tensão" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
