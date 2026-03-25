# 🎓 Configuração de Cursos - EndoStart Platform

## ✅ O Que Foi Feito

### 1. **Cursos Criados no Banco de Dados**

```
📚 5 Cursos Disponíveis:

1. ✓ Imersão em Endoscopia (já existia)
2. ✓ Colonoscopia Avançada (já existia)
3. ✓ Endoscopia Clínica (já existia)
4. ✓ Endoscopia Terapêutica (NOVO!)
5. ✓ Balão Gástrico (NOVO!)
```

### 2. **Estrutura de Pastas Criada**

```
public/cursos/
├── endoscopia/
├── endoscopia-terapeutica/
├── balao-gastrico/
├── colonoscopia/
└── README.md
```

### 3. **Scripts Criados**

| Arquivo | Função |
|---------|--------|
| `backend/prisma/seed-courses.ts` | Lê PDFs das pastas e cria aulas automaticamente |
| `backend/scripts/list-courses.ts` | Lista todos os cursos e módulos criados |
| `public/cursos/README.md` | Documentação com instruções passo a passo |
| `public/cursos/EXEMPLO-ESTRUTURA.txt` | Exemplos de como estruturar os PDFs |

---

## 📁 Próximo Passo: Adicionar PDFs

### **Passo 1: Coloque os PDFs nas Pastas**

Coloque os arquivos PDF nomeados assim:

**Exemplo para Endoscopia:**
```
C:\TurboOps\Code\public\cursos\endoscopia\
├── 01-Anatomia-do-Esofago.pdf
├── 02-DRGE-e-Acalasia.pdf
├── 03-Cancer-de-Esofago.pdf
└── 04-Polipectomia.pdf
```

**Exemplo para Endoscopia Terapêutica:**
```
C:\TurboOps\Code\public\cursos\endoscopia-terapeutica\
├── 01-Introducao-a-Terapeutica.pdf
├── 02-Tecnicas-Avancadas.pdf
└── 03-Manejo-de-Complicacoes.pdf
```

**Exemplo para Balão Gástrico:**
```
C:\TurboOps\Code\public\cursos\balao-gastrico\
├── 01-Introducao.pdf
├── 02-Criterios-de-Selecao.pdf
├── 03-Tecnica-de-Colocacao.pdf
├── 04-Acompanhamento-Pos-Operatorio.pdf
└── 05-Casos-Clinicos.pdf
```

**Exemplo para Colonoscopia:**
```
C:\TurboOps\Code\public\cursos\colonoscopia\
├── 01-Rastreamento.pdf
├── 02-Polipectomia-Basica.pdf
├── 03-Polipectomia-Avancada.pdf
└── 04-Manejo-de-Complicacoes.pdf
```

### **Passo 2: Padrão de Nomes**

Use este padrão OBRIGATÓRIO:

```
[NÚMERO]-[DESCRIÇÃO].pdf

Exemplos CORRETOS:
✓ 01-Anatomia.pdf
✓ 02-Tecnicas-Avancadas.pdf
✓ 03-Casos-Clinicos.pdf
✓ 04-Manejo-de-Complicacoes.pdf

Exemplos INCORRETOS:
✗ Anatomia.pdf (falta número)
✗ 1-Anatomia.pdf (número com 1 dígito)
✗ Anatomia-do-Esófago.pdf (evite acentuação)
```

**O número define a ordem das aulas:**
- `01-...` = Primeira aula
- `02-...` = Segunda aula
- `03-...` = Terceira aula

---

## 🚀 Passo 3: Executar o Script

Abra o terminal e execute:

```bash
cd C:\TurboOps\Code\backend

# Para carregar os PDFs e criar as aulas
npx ts-node prisma/seed-courses.ts

# Ou para apenas listar os cursos criados
npx ts-node scripts/list-courses.ts
```

### **Output Esperado:**

```
🌱 Seeding 4 new courses with PDF support...

✅ Course created: "Endoscopia Terapêutica"
   📄 Aula criada: "Introducao a Terapeutica" (2.50 MB)
   📄 Aula criada: "Tecnicas Avancadas" (3.10 MB)
   📄 Aula criada: "Manejo de Complicacoes" (2.80 MB)

✅ Course created: "Balão Gástrico"
   📄 Aula criada: "Introducao" (1.80 MB)
   📄 Aula criada: "Criterios de Selecao" (2.20 MB)
   📄 Aula criada: "Tecnica de Colocacao" (3.50 MB)
   📄 Aula criada: "Acompanhamento Pos Operatorio" (2.10 MB)

✅ Course seeding completed!
```

---

## 📊 Estrutura de Dados Gerada

Quando você executa o script, ele cria:

```
Curso
├── Módulo (1 por curso)
│   └── Aulas (1 por PDF)
│       └── Conteúdo (PDF + Metadados)
│           ├── Tipo: PDF
│           ├── URL: /cursos/[slug]/[nome].pdf
│           └── Tamanho: [X.XX MB]
```

**Exemplo Real:**
```
Endoscopia Terapêutica
└── Módulo: "Endoscopia Terapêutica"
    ├── Aula 1: "Introducao a Terapeutica"
    │   └── PDF: /cursos/endoscopia-terapeutica/01-Introducao-a-Terapeutica.pdf (2.50 MB)
    ├── Aula 2: "Tecnicas Avancadas"
    │   └── PDF: /cursos/endoscopia-terapeutica/02-Tecnicas-Avancadas.pdf (3.10 MB)
    └── Aula 3: "Manejo de Complicacoes"
        └── PDF: /cursos/endoscopia-terapeutica/03-Manejo-de-Complicacoes.pdf (2.80 MB)
```

---

## 🔄 Atualizar PDFs Depois

Se precisar:

1. **Adicionar novas aulas:**
   - Coloque o novo PDF com número superior (ex: `05-Topico-Novo.pdf`)
   - Execute o script novamente

2. **Remover aulas:**
   - Delete o arquivo PDF da pasta
   - Execute o script novamente

3. **Reorganizar ordem:**
   - Renomeie o número dos PDFs (ex: `01-...` vira `05-...`)
   - Execute o script novamente

---

## 🛠️ Troubleshooting

### PDFs não aparecem após executar o script

**Possível causa:** Nome do arquivo incorreto

```
❌ Errado: Anatomia.pdf
✓ Correto: 01-Anatomia.pdf
```

**Solução:**
- Renomeie o arquivo seguindo o padrão `[NÚMERO]-[NOME].pdf`
- Execute o script novamente

### Pasta não encontrada

**Possível causa:** Pasta foi movida ou deletada

**Solução:**
```bash
# Recrie as pastas
mkdir -p C:\TurboOps\Code\public\cursos\{endoscopia,endoscopia-terapeutica,balao-gastrico,colonoscopia}

# Coloque os PDFs
# Execute o script
npx ts-node prisma/seed-courses.ts
```

### Arquivo PDF muito grande

**Limite:** Sem limite técnico, mas:
- Recomenda-se < 50MB por PDF
- Para PDFs > 10MB, considere compactar

---

## 📞 Próximos Passos

Após adicionar os PDFs:

1. ✅ PDFs colocados nas pastas
2. ▶️ Script executado (`npx ts-node prisma/seed-courses.ts`)
3. 🚀 Cursos prontos no portal!
4. 📱 Alunos conseguem acessar via dashboard

---

## 📋 Checklist de Conclusão

- [ ] Criei/obtive os PDFs dos cursos
- [ ] Coloquei os PDFs nas pastas com o padrão `[NÚMERO]-[NOME].pdf`
- [ ] Executei o script `npx ts-node prisma/seed-courses.ts`
- [ ] Verifiquei que as aulas foram criadas (`npx ts-node scripts/list-courses.ts`)
- [ ] Testei o acesso aos PDFs no portal de alunos
- [ ] Criei administrador no banco (se necessário)
- [ ] Inscrevi alunos nos cursos

---

**Versão:** 1.0 | **Data:** 24/03/2026 | **Status:** ✅ Pronto para usar
