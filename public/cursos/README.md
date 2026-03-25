# 📚 Estrutura de Cursos - EndoStart Platform

## 📂 Pastas de Cursos

Este diretório contém os PDFs para os 4 cursos principais da plataforma:

### 1. **Endoscopia** (`/endoscopia`)
- Imersão completa em técnicas de endoscopia diagnóstica
- Preço: R$ 45.000
- Duração: 12 semanas

### 2. **Endoscopia Terapêutica** (`/endoscopia-terapeutica`)
- Especialização em procedimentos terapêuticos avançados
- Preço: R$ 38.000
- Duração: 10 semanas

### 3. **Balão Gástrico** (`/balao-gastrico`)
- Técnicas de procedimentos com balão gástrico
- Preço: R$ 25.000
- Duração: 6 semanas

### 4. **Colonoscopia Avançada** (`/colonoscopia`)
- Rastreamento e remoção de lesões complexas
- Preço: R$ 35.000
- Duração: 8 semanas

---

## 📌 Como Adicionar PDFs

### Passo 1: Nomeie seus PDFs corretamente
Use este padrão para nomear os arquivos:
```
01-Nome-da-Aula.pdf
02-Proxima-Aula.pdf
03-Terceira-Aula.pdf
```

O **número** define a **ordem** das aulas no módulo.

### Passo 2: Coloque os PDFs na pasta do curso
Cada PDF deve ir na pasta correspondente:
- `endoscopia/01-Anatomia.pdf`
- `endoscopia-terapeutica/01-Tecnicas-Avancadas.pdf`
- `balao-gastrico/01-Introducao.pdf`
- `colonoscopia/01-Rastreamento.pdf`

### Passo 3: Execute o script para carregar
No terminal, na pasta `backend/`, execute:

```bash
npx ts-node prisma/seed-courses.ts
```

O script irá:
✅ Ler os PDFs das pastas
✅ Criar aulas automaticamente
✅ Atualizar o banco de dados
✅ Gerar URLs de acesso

---

## 📋 Exemplo Prático

**Se você colocar esses PDFs em `/endoscopia/`:**
```
01-Anatomia-do-Esofago.pdf
02-DRGE-e-Acalasia.pdf
03-Cancer-de-Esofago.pdf
04-Polipectomia.pdf
```

**O script criará automaticamente:**
- 1 Módulo: "Imersão em Endoscopia"
- 4 Aulas:
  - Aula 1: Anatomia do Esôfago
  - Aula 2: DRGE e Acalasia
  - Aula 3: Cancer de Esôfago
  - Aula 4: Polipectomia

Cada aula terá o PDF disponível para download/visualização.

---

## 🚀 Próximos Passos

1. ✅ Pastas criadas (você está aqui!)
2. 📄 Coloque os PDFs nas pastas
3. ▶️ Execute `npx ts-node prisma/seed-courses.ts`
4. ✨ Os cursos estarão prontos no portal!

---

## ❓ Dúvidas?

- **Como mudar a ordem das aulas?** - Renomeie o número no início do arquivo
- **Como renomear uma aula?** - Coloque um nome descritivo após o número
- **Preciso atualizar os PDFs?** - Coloque os novos arquivos e execute o script novamente
