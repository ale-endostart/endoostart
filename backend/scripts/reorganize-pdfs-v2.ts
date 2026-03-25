#!/usr/bin/env ts-node
import * as fs from 'fs'
import * as path from 'path'

interface PDFRename {
  current: string
  newName: string
  description: string
}

// Reorganização completa com separação de partes (Parte 1, 2, 3...)
const courseOrganization = {
  endoscopia: [
    // 01-02 - Esophageal Anatomy and Diseases
    { current: '02 - Esofagite-Caustica-e-Anatomia-do-Esofago.pdf', newName: '01-Anatomia-do-Esofago-e-Fundamentos.pdf', description: 'Anatomia e técnica endoscópica' },
    { current: '01- Esofagites-Especificas.pdf', newName: '02-Esofagites-Especificas-Diagnostico-Manejo.pdf', description: 'Esofagites infecciosas' },
    { current: '03 - Esofagite-Eosinofilica-e-Disturbios-Motores-Esofagicos.pdf', newName: '03-Esofagite-Eosinofilica-Disturbios-Motores.pdf', description: 'Patologias motoras esofágicas' },

    // 04-07 - DRGE (4 partes)
    { current: 'DRGE-Clinica-e-Diagnostico.pdf', newName: '04-DRGE-Parte-1-Clinica-e-Diagnostico.pdf', description: 'DRGE - Parte 1: Clínica e diagnóstico' },
    { current: 'DRGE-Patogenese-e-Mecanismos-Fisiologicos.pdf', newName: '05-DRGE-Parte-2-Patogenese-Mecanismos.pdf', description: 'DRGE - Parte 2: Fisiopatologia' },
    { current: 'DRGE-Complicacoes-Evolucao-e-Tratamento.pdf', newName: '06-DRGE-Parte-3-Complicacoes-Tratamento.pdf', description: 'DRGE - Parte 3: Complicações e tratamento' },
    { current: 'DRGE-Avancado-Fisiopatologia-Raciocinio-Clinico-e-Integracao-Pratica.pdf', newName: '07-DRGE-Parte-4-Raciocinio-Clinico-Avancado.pdf', description: 'DRGE - Parte 4: Manejo avançado' },

    // 08-10 - Helicobacter pylori (3 partes)
    { current: 'Helicobacter-pylori-Da-Descoberta-a-Pratica-Clinica.pdf', newName: '08-Helicobacter-Pylori-Parte-1-Descoberta-Pratica.pdf', description: 'H. pylori - Parte 1: Epidemiologia e diagnóstico' },
    { current: 'Helicobacter-Pylori.pdf', newName: '09-Helicobacter-Pylori-Parte-2-Diagnostico-Avancado.pdf', description: 'H. pylori - Parte 2: Testes diagnósticos' },
    { current: 'Helicobacter-Pylori-Parte-2.pdf', newName: '10-Helicobacter-Pylori-Parte-3-Manejo-Terapeutico.pdf', description: 'H. pylori - Parte 3: Tratamento e erradicação' },

    // 11-20 - Outros tópicos
    { current: 'Fundamentos-da-Medicina-Baseada-em-Evidencias.pdf', newName: '11-Fundamentos-Medicina-Baseada-em-Evidencias.pdf', description: 'Metodologia científica em endoscopia' },
    { current: 'Tumores-Esofagicos.pdf', newName: '12-Tumores-Esofagicos-Diagnostico-Rastreamento.pdf', description: 'Neoplasias esofágicas' },
    { current: 'Tumores-do-Trato-Gastrointestinal.pdf', newName: '13-Tumores-Gastricos-Trato-GI.pdf', description: 'Adenocarcinoma gástrico e outros tumores' },
    { current: 'Hemorragia-Digestiva.pdf', newName: '14-Hemorragia-Digestiva-HDA-Varicosa.pdf', description: 'Hemorragia digestiva alta' },
    { current: '06 - NAFLD-e-NASH-Nova-Terminologia.pdf', newName: '15-NAFLD-NASH-Hepatopatia-Metabolica.pdf', description: 'Doença hepática gordurosa' },
    { current: 'Doencas-Funcionais-do-Trato-Gastrointestinal.pdf', newName: '16-Doencas-Funcionais-Trato-Gastrointestinal.pdf', description: 'Dispepsia funcional e SII' },
    { current: 'Doencas-Orais-e-Nutricao-em-Gastroenterologia.pdf', newName: '17-Doencas-Orais-Nutricao-Parte-1.pdf', description: 'Doenças orais - Parte 1: Fundamentação' },
    { current: 'Doencas-Orais-e-Nutricao-em-Gastroenterologia Part2.pdf', newName: '18-Doencas-Orais-Nutricao-Parte-2.pdf', description: 'Doenças orais - Parte 2: Metabolismo' },
    { current: 'Doencas-Orais-e-Nutricao-em-Gastroenterologia part3.pdf', newName: '19-Doencas-Orais-Nutricao-Parte-3-Avancado.pdf', description: 'Doenças orais - Parte 3: Tópicos avançados' },
    { current: 'Sintomas-Diagnostico-e-Avaliacao-Clinica.pdf', newName: '20-Sintomas-Diagnostico-Avaliacao-Clinica.pdf', description: 'Avaliação clínica sistêmica' },
    { current: '04 - Fisiopatologia-Diagnostico-e-Manifestacoes-Clinicas.pdf', newName: '21-Fisiopatologia-Diagnostico-Manifestacoes.pdf', description: 'Fisiopatologia geral GI' },
    { current: '05 - Classificacao-de-Kodsi.pdf', newName: '22-Classificacao-de-Kodsi-Endoscopia.pdf', description: 'Classificação de achados endoscópicos' },
    { current: '07 - Doenca-do-Refluxo-Gastroesofagico-DRGE.pdf', newName: '23-DRGE-Parte-5-Complementar.pdf', description: 'DRGE - Material complementar' },
  ],

  colonoscopia: [
    // 01-03 - Fundamentos e técnica
    { current: 'Fundamentos-Diagnostico-e-Principais-Doencas.pdf', newName: '01-Fundamentos-Colonoscopia-Tecnica-Basica.pdf', description: 'Fundamentos técnicos e anatomia' },
    { current: 'Exames-Complementares-em-Gastroenterologia.pdf', newName: '02-Exames-Complementares-Investigacao.pdf', description: 'Exames complementares diagnósticos' },
    { current: 'Colonoscopia-e-Capsula-Endoscopica.pdf', newName: '03-Colonoscopia-Avancada-Capsula.pdf', description: 'Técnicas avançadas e cápsula endoscópica' },

    // 04-07 - Câncer colorretal (rastreamento e classificação)
    { current: 'Classificacao-JNET-em-Tumores-Colorretais.pdf', newName: '04-Classificacao-JNET-Tumores-Colorretais.pdf', description: 'Classificação JNET de lesões' },
    { current: 'Parte-3-Tratamento-e-Rastreamento.pdf', newName: '05-Rastreamento-Cancer-Colorretal.pdf', description: 'Programas de rastreamento CRC' },
    { current: 'Tumores-do-Colon-e-Intestino-Delgado (2).pdf', newName: '06-Tumores-Colon-Intestino-Delgado-Parte-1.pdf', description: 'Neoplasias - Parte 1: Epidemiologia' },
    { current: 'Tumores-do-Colon-e-Intestino-Delgado (3).pdf', newName: '07-Tumores-Colon-Intestino-Delgado-Parte-2.pdf', description: 'Neoplasias - Parte 2: Tratamento' },
    { current: 'Adenocarcinoma-Gastrico-Do-Conceito-a-Pratica-Clinica.pdf', newName: '08-Adenocarcinoma-Gastrico-Conceito-Pratica.pdf', description: 'Adenocarcinoma gástrico' },
    { current: 'Adenocarcinoma-Gastrico (1).pdf', newName: '09-Adenocarcinoma-Gastrico-Complementar.pdf', description: 'Adenocarcinoma gástrico - Material complementar' },

    // 10 - Hemorragia
    { current: 'Hemorragia-Digestiva-HDA-Varicosa-HDB-e-HDM.pdf', newName: '10-Hemorragia-Digestiva-Varicosa-Nao-Varicosa.pdf', description: 'Manejo da hemorragia digestiva' },

    // 11-16 - DII (Doença Inflamatória Intestinal - 6 partes)
    { current: 'Doenca-Inflamatoria-Intestinal.pdf', newName: '11-DII-Parte-1-Introducao-Conceitos.pdf', description: 'DII - Parte 1: Introdução e conceitos' },
    { current: 'Doenca-Inflamatoria-Intestinal (1).pdf', newName: '12-DII-Parte-2-Tipos-Clinica.pdf', description: 'DII - Parte 2: Tipos e manifestações clínicas' },
    { current: 'Doenca-Inflamatoria-Intestinal-DII.pdf', newName: '13-DII-Parte-3-Diagnostico-Endoscopico.pdf', description: 'DII - Parte 3: Diagnóstico endoscópico' },
    { current: 'DII-Diagnostico-Endoscopico-Radiologico-e-Histologico.pdf', newName: '14-DII-Parte-4-Diagnostico-Radiologico-Histologico.pdf', description: 'DII - Parte 4: Imagem e histologia' },
    { current: 'DII-Complicacoes-e-Apresentacoes-Clinicas.pdf', newName: '15-DII-Parte-5-Complicacoes-Manifestacoes.pdf', description: 'DII - Parte 5: Complicações sistêmicas' },
    { current: 'Fisiopatologia-Avancada-Fatores-de-Risco-Evolucao-e-Classificacoes.pdf', newName: '16-DII-Parte-6-Fisiopatologia-Fatores-Risco.pdf', description: 'DII - Parte 6: Fisiopatologia avançada' },
    { current: 'Indices-de-Atividade-Avaliacao-Clinica-e-Manifestacoes.pdf', newName: '17-DII-Parte-7-Indices-Atividade-Avaliacao.pdf', description: 'DII - Parte 7: Índices de atividade' },
    { current: 'Estrategia-Terapeutica-Farmacologia-e-Manejo-Avancado (1).pdf', newName: '18-DII-Parte-8-Terapia-Farmacologica.pdf', description: 'DII - Parte 8: Tratamento medicamentoso' },
    { current: 'mini-atlas-de-colonoscopia-na-doenca-inflamatoria-intestinal.pdf', newName: '19-DII-Atlas-Visual-Casos-Clinicos.pdf', description: 'DII - Atlas visual de achados endoscópicos' },

    // 20-23 - Doença diverticular (3 partes)
    { current: 'Diverticulose-Um-Problema-Comum.pdf', newName: '20-Diverticulose-Parte-1-Diagnostico-Epidemiologia.pdf', description: 'Diverticulose - Parte 1: Diagnóstico' },
    { current: 'Doenca-Diverticular-Diverticulite-Aguda-e-Doencas-Vasculares-Intestinais (1).pdf', newName: '21-Diverticulose-Parte-2-Diverticulite-Aguda.pdf', description: 'Diverticulose - Parte 2: Diverticulite aguda' },
    { current: 'Doenca-Vascular-Intestinal-Doenca-Diverticular-e-Apendicopatias.pdf', newName: '22-Doenca-Vascular-Apendicopatias.pdf', description: 'Vasculopatias intestinais e apendicopatias' },

    // 24 - Afecções anorretais
    { current: 'Afeccoes-Anorretais-Doencas-Comuns-e-Manejo-Clinico.pdf', newName: '23-Afeccoes-Anorretais-Manejo-Clinico.pdf', description: 'Hemorroides, fissuras, abcessos' },
    { current: 'Afeccoes-Anorretais (3).pdf', newName: '24-Afeccoes-Anorretais-Complementar.pdf', description: 'Afecções anorretais - Material complementar' },

    // 25-27 - Técnicas terapêuticas e tumores especiais
    { current: 'eMucossectomia-EMR (1).pdf', newName: '25-eMucossectomia-EMR-Tecnicas.pdf', description: 'Mucossectomia endoscópica' },
    { current: 'Tumores-do-Intestino-Delgado-GIST-e-Tumores-Raros.pdf', newName: '26-Tumores-GIST-Intestino-Delgado-Raros.pdf', description: 'GISTs e tumores raros' },
    { current: 'Neoplasias-do-Apendice-Mucocele-e-Doenca-Diverticular.pdf', newName: '27-Neoplasias-Apendice-Mucocele.pdf', description: 'Patologia apendicular' },
    { current: 'Schwannoma-Colonico.pdf', newName: '28-Schwannoma-Tumores-Subepiteliais.pdf', description: 'Tumores subepiteliais benignos' },
  ],

  'balao-gastrico': [
    { current: 'Balao-Intragastrico-Spatz.pdf', newName: '01-Balao-Intragastrico-Spatz-Protocolo.pdf', description: 'Balão Spatz - indicações e técnica' },
  ],

  'endoscopia-terapeutica': [
    { current: 'eMucossectomia-EMR (1) (1).pdf', newName: '01-eMucossectomia-EMR-Tecnicas-Avancadas.pdf', description: 'Mucossectomia endoscópica - técnicas' },
    { current: 'Gastrostomia-Endoscopica-PEG.pdf', newName: '02-Gastrostomia-Endoscopica-PEG.pdf', description: 'Gastrostomia percutânea endoscópica' },
  ],
}

async function reorganizePDFsV2() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗')
  console.log('║    🔧 REORGANIZANDO PDFs - COM SEPARAÇÃO DE PARTES             ║')
  console.log('║        (Parte 1, Parte 2, Parte 3...)                          ║')
  console.log('╚════════════════════════════════════════════════════════════════╝\n')

  const basePath = 'C:\\TurboOps\\Code\\public\\cursos'
  let totalSuccess = 0
  let totalFailed = 0

  for (const [course, files] of Object.entries(courseOrganization)) {
    const coursePath = path.join(basePath, course)
    console.log(`\n📚 CURSO: ${course.toUpperCase().replace(/-/g, ' ')}`)
    console.log('═'.repeat(70))

    let courseSuccess = 0
    let courseFailed = 0

    for (const file of files) {
      const oldPath = path.join(coursePath, file.current)
      const newPath = path.join(coursePath, file.newName)

      if (fs.existsSync(oldPath)) {
        try {
          fs.renameSync(oldPath, newPath)
          console.log(`✅ ${file.newName}`)
          console.log(`   📝 ${file.description}`)
          courseSuccess++
          totalSuccess++
        } catch (error) {
          console.log(`❌ ERRO: ${file.current}`)
          console.log(`   ${error}`)
          courseFailed++
          totalFailed++
        }
      }
    }

    console.log(`\n→ Resultado: ${courseSuccess} renomeados, ${courseFailed} erros\n`)
  }

  console.log('\n' + '═'.repeat(70))
  console.log('\n📊 RESUMO FINAL:\n')
  console.log(`✅ Total de sucesso: ${totalSuccess} arquivos`)
  if (totalFailed > 0) {
    console.log(`❌ Total de erros: ${totalFailed} arquivos`)
  }

  console.log('\n' + '═'.repeat(70))
  console.log('\n📋 ESTRUTURA RESULTANTE:\n')

  for (const course of ['endoscopia', 'colonoscopia', 'balao-gastrico', 'endoscopia-terapeutica']) {
    const coursePath = path.join(basePath, course)
    const pdfCount = fs.readdirSync(coursePath).filter(f => f.endsWith('.pdf')).length
    console.log(`📂 ${course}: ${pdfCount} aulas`)
  }

  console.log('\n' + '═'.repeat(70))
  console.log('\n✨ Próximo passo: Executar o seed para carregar no banco!\n')
  console.log('   cd /c/TurboOps/Code/backend')
  console.log('   npx ts-node prisma/seed-courses.ts\n')
}

reorganizePDFsV2().catch(console.error)
