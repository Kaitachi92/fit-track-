# FitTrack - Seu Companheiro de Treino 💪

FitTrack é uma aplicação web moderna e responsiva desenvolvida em React.js para acompanhar sua rotina de treinos semanais. Com uma interface intuitiva e recursos interativos, o app permite visualizar exercícios, assistir vídeos demonstrativos e marcar o progresso através de checklists.

## ✨ Funcionalidades

### 📅 Agenda Semanal
- Visualização dos treinos organizados por dia da semana (Segunda a Domingo)
- Navegação fácil entre os dias com interface em abas
- Destaque do dia atual com indicador visual

### 🏋️ Lista de Exercícios
- Exercícios organizados por grupos musculares
- Informações detalhadas: nome, descrição e séries/repetições
- Vídeos demonstrativos integrados do YouTube
- Interface clean e moderna

### ✅ Sistema de Checklist
- Marcar exercícios como concluídos com um clique
- Progresso salvo automaticamente no navegador (localStorage)
- Barra de progresso visual para cada dia
- Mensagens motivacionais de conquista

### 📱 Design Responsivo
- Otimizado para mobile, tablet e desktop
- Interface moderna com gradientes e animações suaves
- Cores inspiradas em apps de fitness (azul, verde, branco)
- Experiência de usuário intuitiva

## 🚀 Tecnologias Utilizadas

- **React.js 19** - Framework principal
- **Vite** - Build tool e desenvolvimento
- **CSS Modules** - Estilização component-based
- **Lucide React** - Biblioteca de ícones
- **localStorage** - Persistência de dados local

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para executar

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd fittrack
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 🏗️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter para verificar código

## 📂 Estrutura do Projeto

```
fittrack/
├── public/               # Arquivos públicos
├── src/
│   ├── components/       # Componentes React
│   │   ├── Header.jsx
│   │   ├── DaySelector.jsx
│   │   ├── WorkoutDay.jsx
│   │   └── ExerciseCard.jsx
│   ├── data/            # Dados dos treinos
│   │   └── workouts.js
│   ├── hooks/           # Hooks customizados
│   │   └── useWorkoutProgress.js
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos globais
│   └── main.jsx         # Ponto de entrada
├── .github/
│   └── copilot-instructions.md
├── package.json
└── README.md
```

## 💡 Como Usar

1. **Selecione o dia**: Clique em qualquer dia da semana no seletor superior
2. **Visualize os exercícios**: Veja a lista de exercícios para o dia selecionado
3. **Assista aos vídeos**: Clique no botão ▶️ para ver a demonstração do exercício
4. **Marque como concluído**: Use o checkbox ✅ para marcar exercícios realizados
5. **Acompanhe o progresso**: Veja a barra de progresso e estatísticas no header

## 🎯 Funcionalidades Futuras

- [ ] Autenticação de usuário
- [ ] Sincronização em nuvem
- [ ] Notificações push
- [ ] Personalização de treinos
- [ ] Histórico de progressos
- [ ] Timer para exercícios
- [ ] Modo offline

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para facilitar sua jornada fitness!

---

**FitTrack** - Transforme seus treinos em uma experiência digital moderna e motivadora! 🚀+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
