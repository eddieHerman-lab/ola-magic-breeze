Análise de Fraturas em Materiais (Simulação IoT)
================================================

Este projeto é uma simulação de análise de fraturas em materiais, combinando conceitos de IoT (Internet das Coisas) com engenharia de materiais. O projeto consiste em duas partes principais: uma simulação em Python e uma interface web em React.

Estrutura do Projeto
--------------------

/
├── python/
│   ├── fracture_analysis.py
│   └── requirements.txt
├── web/
│   └── [arquivos da aplicação React]
├── docs/
│   ├── python_explanation.md
│   └── react_explanation.md
└── README.txt

Componentes do Projeto
----------------------

1. Simulação Python (pasta /python)
   - fracture_analysis.py: Contém a lógica principal da simulação de fraturas.
   - requirements.txt: Lista as dependências necessárias para executar o script Python.

2. Interface Web React (pasta /web)
   - Implementa uma interface de usuário interativa para visualizar e controlar a simulação.

3. Documentação (pasta /docs)
   - python_explanation.md: Explica detalhadamente o funcionamento do código Python.
   - react_explanation.md: Fornece uma visão geral da estrutura e funcionamento da aplicação React.

Funcionalidades Principais
--------------------------

- Simulação de leituras de sensores de força e dureza.
- Cálculo do fator de intensidade de tensão (K) e comparação com a tenacidade à fratura.
- Visualização em tempo real dos dados da simulação.
- Interface web para controle e visualização da simulação.

Como Executar o Projeto
-----------------------

1. Simulação Python:
   - Navegue até a pasta /python
   - Instale as dependências: pip install -r requirements.txt
   - Execute o script: python fracture_analysis.py

2. Interface Web:
   - Navegue até a pasta /web
   - Instale as dependências: npm install
   - Inicie a aplicação: npm start

Para mais detalhes sobre cada componente, consulte os arquivos de documentação na pasta /docs.

Nota: Este projeto foi desenvolvido com assistência de IA e serve como uma demonstração conceitual de análise de fraturas e IoT.