# Deutsch mit Plan

Professor particular de alemão (A0 → C2) com repetição espaçada FSRS-5, currículo alinhado ao CEFR/Goethe-Institut, correção de erros, conversa com IA e avaliações por habilidade.

**App:** https://rickdevdadz7.github.io/deutsch-mit-plan/ — abra no celular (Chrome/Safari) e escolha "Instalar app".

## Estrutura
- Raiz: versão instalável (PWA) servida pelo GitHub Pages. Funciona offline; os dados ficam no aparelho.
- `codigo-fonte/src/`: módulos (fsrs, grading, content, model, store, method, local, app, style).
- `codigo-fonte/test/`: testes unitários (`node --test codigo-fonte/test/core.test.js`) e e2e (Playwright).
- `codigo-fonte/desktop/`: programa de Windows (Electron).
- `codigo-fonte/build.mjs`: gera `dist/` (Claude.ai), `pwa/` (copiar para a raiz deste repositório) e `desktop/app/`.

## Privacidade
Nenhum dado de estudo é enviado a este repositório. A chave de IA opcional fica só no aparelho.
