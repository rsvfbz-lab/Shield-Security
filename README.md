
# Sentinel Guard System - Guia de Configuração e Deploy

Este projeto foi desenvolvido utilizando React, Tailwind CSS e a API Gemini do Google. Para rodar este projeto fora deste editor ou publicá-lo no GitHub, siga as instruções abaixo.

## 🚀 Como rodar localmente (Recomendado)

Como navegadores não executam arquivos `.tsx` diretamente, recomendamos usar o **Vite**.

1. **Instale o Node.js** em seu computador.
2. Abra o terminal e inicie um projeto:
   ```bash
   npm create vite@latest sentinel-guard -- --template react-ts
   ```
3. Entre na pasta: `cd sentinel-guard`
4. Instale as dependências:
   ```bash
   npm install @google/genai react-router-dom
   ```
5. Copie os arquivos (`App.tsx`, `types.ts`, `components/`, etc.) para a pasta `src/`.
6. No `index.html`, certifique-se de chamar o script:
   ```html
   <script type="module" src="/src/index.tsx"></script>
   ```
7. Para rodar: `npm run dev`

## 🌐 Publicando no GitHub Pages

1. **Build**: Gere a versão final com `npm run build`. Isso criará uma pasta `dist/`.
2. **Deploy**: Você pode subir o conteúdo da pasta `dist/` para o GitHub.
3. **Settings**: No GitHub, vá em **Settings > Pages** e aponte para a branch onde você subiu os arquivos do build.

## 🔑 Variáveis de Ambiente (API Key)

O código usa `process.env.API_KEY`. No mundo real (Vite), você deve:
1. Criar um arquivo `.env` na raiz do projeto.
2. Adicionar: `VITE_API_KEY=sua_chave_aqui`
3. No código, mudar para: `import.meta.env.VITE_API_KEY`

## ⚠️ Por que o link direto do GitHub não funciona?
*   **TypeScript**: O arquivo `.tsx` precisa ser transformado em `.js` (o processo de *build* faz isso).
*   **Import Maps**: Embora modernos, a maioria dos fluxos de trabalho profissionais prefere o empacotamento do Vite para garantir que tudo funcione em todos os navegadores.

---
*Sentinel Guard - Sistema Avançado de Gestão de Segurança.*
