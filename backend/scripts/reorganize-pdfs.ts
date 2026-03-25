#!/usr/bin/env ts-node
import * as fs from 'fs'
import * as path from 'path'

interface PDFMove {
  from: string
  to: string
}

// Define the new structure for each course based on medical curriculum standards
const courseOrganization = {
  endoscopia: [
    // Module 1: Fundamentos e Anatomia
    {
      original: '02 - Esofagite-Caustica-e-Anatomia-do-Esofago.pdf',
      newName: '01-Anatomia-do-Esofago-e-Fundamentos.pdf',
      description: 'Anatomia esofágica, fisiologia e técnica endoscópica básica'
    },
    // Esophageal Diseases
    {
      original: '01- Esofagites-Especificas.pdf',
      newName: '02-Esofagites-Especificas-Diagnostico-e-Manejo.pdf',
      description: 'Esofagites infecciosas, causticas e especiais'
    },
    {
      original: '03 - Esofagite-Eosinofilica-e-Disturbios-Motores-Esofagicos.pdf',
      newName: '03-Esofagite-Eosinofilica-e-Disturbios-Motores.pdf',
      description: 'Patologias motoras e eosinofílicas do esôfago'
    },
    // DRGE - Complete Module
    {
      original: 'DRGE-Clinica-e-Diagnostico.pdf',
      newName: '04-DRGE-Clinica-e-Diagnostico.pdf',
      description: 'Doença do refluxo gastroesofágico - clínica e diagnóstico'
    },
    {
      original: 'DRGE-Patogenese-e-Mecanismos-Fisiologicos.pdf',
      newName: '05-DRGE-Patogenese-e-Mecanismos-Fisiologicos.pdf',
      description: 'Mecanismos fisiopatológicos da DRGE'
    },
    {
      original: 'DRGE-Complicacoes-Evolucao-e-Tratamento.pdf',
      newName: '06-DRGE-Complicacoes-Evolucao-e-Tratamento.pdf',
      description: 'Complicações, evolução natural e tratamento da DRGE'
    },
    {
      original: 'DRGE-Avancado-Fisiopatologia-Raciocinio-Clinico-e-Integracao-Pratica.pdf',
      newName: '07-DRGE-Avancado-Raciocinio-Clinico-Integracao-Pratica.pdf',
      description: 'Manejo avançado e integração clínico-prática da DRGE'
    },
    // Helicobacter pylori
    {
      original: 'Helicobacter-pylori-Da-Descoberta-a-Pratica-Clinica.pdf',
      newName: '08-Helicobacter-Pylori-Da-Descoberta-a-Pratica-Clinica.pdf',
      description: 'H. pylori - epidemiologia, diagnóstico e erradicação'
    },
    {
      original: 'Helicobacter-Pylori.pdf',
      newName: '09-Helicobacter-Pylori-Parte-2-Diagnostico-Avancado.pdf',
      description: 'Testes diagnósticos avançados e resistência antimicrobiana'
    },
    {
      original: 'Helicobacter-Pylori-Parte-2.pdf',
      newName: '10-Helicobacter-Pylori-Manejo-Terapeutico.pdf',
      description: 'Estratégias terapêuticas e acompanhamento'
    },
    // Gastric and Duodenal Pathology
    {
      original: 'Fundamentos-da-Medicina-Baseada-em-Evidencias.pdf',
      newName: '11-Fundamentos-Medicina-Baseada-em-Evidencias.pdf',
      description: 'Metodologia de pesquisa e evidência científica em endoscopia'
    },
    {
      original: 'Tumores-Esofagicos.pdf',
      newName: '12-Tumores-Esofagicos-Diagnostico-e-Rastreamento.pdf',
      description: 'Neoplasias esofágicas - diagnóstico, estadiamento e terapia'
    },
    {
      original: 'Tumores-do-Trato-Gastrointestinal.pdf',
      newName: '13-Tumores-Gastricos-e-do-Trato-GI.pdf',
      description: 'Adenocarcinoma gástrico, MALT e outros tumores GI'
    },
    // Bleeding and complications
    {
      original: 'Hemorragia-Digestiva.pdf',
      newName: '14-Hemorragia-Digestiva-HDA-Varicosa-e-Nao-Varicosa.pdf',
      description: 'Hemorragia digestiva alta - técnicas diagnósticas e terapêuticas'
    },
    // Liver and Metabolism
    {
      original: '06 - NAFLD-e-NASH-Nova-Terminologia.pdf',
      newName: '15-NAFLD-NASH-Hepatopatia-Metabolica.pdf',
      description: 'Doença hepática gordurosa não alcoólica'
    },
    // Functional and Nutritional
    {
      original: 'Doencas-Funcionais-do-Trato-Gastrointestinal.pdf',
      newName: '16-Doencas-Funcionais-do-Trato-Gastrointestinal.pdf',
      description: 'Dispepsia funcional, SII e distúrbios motores'
    },
    {
      original: 'Doencas-Orais-e-Nutricao-em-Gastroenterologia.pdf',
      newName: '17-Doencas-Orais-e-Nutricao-Parte-1.pdf',
      description: 'Doenças orais e suporte nutricional em gastroenterologia'
    },
    {
      original: 'Doencas-Orais-e-Nutricao-em-Gastroenterologia Part2.pdf',
      newName: '18-Doencas-Orais-e-Nutricao-Parte-2.pdf',
      description: 'Continuação - metabolismo e reabilitação nutricional'
    },
    {
      original: 'Doencas-Orais-e-Nutricao-em-Gastroenterologia part3.pdf',
      newName: '19-Doencas-Orais-e-Nutricao-Parte-3-Avancado.pdf',
      description: 'Tópicos avançados em nutrição e distúrbios metabólicos'
    },
    {
      original: 'Sintomas-Diagnostico-e-Avaliacao-Clinica.pdf',
      newName: '20-Sintomas-Diagnostico-e-Avaliacao-Clinica.pdf',
      description: 'Abordagem clínica sistêmica dos sintomas GI'
    },
  ],

  colonoscopia: [
    // Foundation and Technique
    {
      original: 'Fundamentos-Diagnostico-e-Principais-Doencas.pdf',
      newName: '01-Fundamentos-Colonoscopia-Tecnica-Basica.pdf',
      description: 'Fundamentos técnicos, anatomia do colon e manejo do colonoscópio'
    },
    {
      original: 'Exames-Complementares-em-Gastroenterologia.pdf',
      newName: '02-Exames-Complementares-em-Gastroenterologia.pdf',
      description: 'Investigação diagnóstica complementar - ultrassom, TC, RM'
    },
    {
      original: 'Colonoscopia-e-Capsula-Endoscopica.pdf',
      newName: '03-Colonoscopia-Avancada-Capsula-Endoscopica.pdf',
      description: 'Técnicas avançadas e cápsula endoscópica no intestino delgado'
    },
    // Colorectal Cancer Screening and Prevention
    {
      original: 'Classificacao-JNET-em-Tumores-Colorretais.pdf',
      newName: '04-Classificacao-JNET-Tumores-Colorretais.pdf',
      description: 'Classificação JNET - identificação e polipectomia de lesões'
    },
    {
      original: 'Parte-3-Tratamento-e-Rastreamento.pdf',
      newName: '05-Rastreamento-Cancer-Colorretal-e-Tratamento.pdf',
      description: 'Programas de rastreamento e prevenção de câncer colorretal'
    },
    {
      original: 'Tumores-do-Colon-e-Intestino-Delgado (2).pdf',
      newName: '06-Tumores-Colon-Intestino-Delgado-Parte-1.pdf',
      description: 'Neoplasias do colon - epidemiologia, classificação, estadiamento'
    },
    {
      original: 'Tumores-do-Colon-e-Intestino-Delgado (3).pdf',
      newName: '07-Tumores-Colon-Intestino-Delgado-Parte-2.pdf',
      description: 'Adenocarcinoma colônico - prognóstico e tratamento'
    },
    {
      original: 'Adenocarcinoma-Gastrico-Do-Conceito-a-Pratica-Clinica.pdf',
      newName: '08-Adenocarcinoma-Gastrico-Conceito-Pratica-Clinica.pdf',
      description: 'Adenocarcinoma gástrico - diagnóstico e manejo terapêutico'
    },
    // Hemorrhage
    {
      original: 'Hemorragia-Digestiva-HDA-Varicosa-HDB-e-HDM.pdf',
      newName: '09-Hemorragia-Digestiva-Varicosa-e-Nao-Varicosa.pdf',
      description: 'Manejo da hemorragia digestiva alta - varizes e não varizes'
    },
    // IBD - Inflammatory Bowel Disease
    {
      original: 'Doenca-Inflamatoria-Intestinal.pdf',
      newName: '10-Doenca-Inflamatoria-Intestinal-DII-Introducao.pdf',
      description: 'DII - Doença de Crohn e Retocolite Ulcerativa - fundamentos'
    },
    {
      original: 'Doenca-Inflamatoria-Intestinal-DII.pdf',
      newName: '11-DII-Diagnostico-Endoscopico-Radiologico-Histologico.pdf',
      description: 'Diagnóstico integrado da DII - endoscopia, imagem e histologia'
    },
    {
      original: 'DII-Diagnostico-Endoscopico-Radiologico-e-Histologico.pdf',
      newName: '12-DII-Indices-Atividade-Avaliacao-Clinica.pdf',
      description: 'Índices de atividade e avaliação clínica da DII'
    },
    {
      original: 'DII-Complicacoes-e-Apresentacoes-Clinicas.pdf',
      newName: '13-DII-Complicacoes-Manifestacoes-Extraintestinais.pdf',
      description: 'Complicações da DII e manifestações sistêmicas'
    },
    {
      original: 'Fisiopatologia-Avancada-Fatores-de-Risco-Evolucao-e-Classificacoes.pdf',
      newName: '14-DII-Fisiopatologia-Fatores-Risco-Evolucao.pdf',
      description: 'Mecanismos fisiopatológicos, fatores de risco e evolução natural'
    },
    {
      original: 'Estrategia-Terapeutica-Farmacologia-e-Manejo-Avancado (1).pdf',
      newName: '15-DII-Estrategia-Terapeutica-Manejo-Farmacologico.pdf',
      description: 'Terapia medicamentosa avançada da DII'
    },
    {
      original: 'mini-atlas-de-colonoscopia-na-doenca-inflamatoria-intestinal.pdf',
      newName: '16-Atlas-Colonoscopia-DII-Casos-Clinicos.pdf',
      description: 'Atlas visual de achados endoscópicos na DII'
    },
    // Diverticular Disease
    {
      original: 'Diverticulose-Um-Problema-Comum.pdf',
      newName: '17-Diverticulose-Doenca-Diverticular-Diagnostico.pdf',
      description: 'Epidemiologia, diagnóstico e manejo da diverticulose'
    },
    {
      original: 'Doenca-Diverticular-Diverticulite-Aguda-e-Doencas-Vasculares-Intestinais (1).pdf',
      newName: '18-Diverticulite-Aguda-e-Doencas-Vasculares-Intestinais.pdf',
      description: 'Diverticulite aguda, doença diverticular complicada e vasculopatias'
    },
    // Vascular and Anorectal
    {
      original: 'Doenca-Vascular-Intestinal-Doenca-Diverticular-e-Apendicopatias.pdf',
      newName: '19-Doenca-Vascular-Intestinal-Apendicopatias.pdf',
      description: 'Malformações vasculares, hemangiomas, apendicopatias'
    },
    {
      original: 'Afeccoes-Anorretais-Doencas-Comuns-e-Manejo-Clinico.pdf',
      newName: '20-Afeccoes-Anorretais-Comuns-Manejo-Clinico.pdf',
      description: 'Hemorroides, fissuras, abcessos perianais e fistulas'
    },
    // Advanced Topics
    {
      original: 'eMucossectomia-EMR (1).pdf',
      newName: '21-eMucossectomia-EMR-Tecnicas-Terapeuticas.pdf',
      description: 'Mucossectomia endoscópica - indicações, técnica e complicações'
    },
    {
      original: 'Tumores-do-Intestino-Delgado-GIST-e-Tumores-Raros.pdf',
      newName: '22-Tumores-Intestino-Delgado-GIST-Tumores-Raros.pdf',
      description: 'GISTs, sarcomas, metástases e tumores raros do intestino'
    },
    {
      original: 'Neoplasias-do-Apendice-Mucocele-e-Doenca-Diverticular.pdf',
      newName: '23-Neoplasias-Apendice-Mucocele-Doencas-Apendiculares.pdf',
      description: 'Patologia apendicular - neoplasias, mucoceles, distúrbios motores'
    },
    {
      original: 'Schwannoma-Colonico.pdf',
      newName: '24-Schwannoma-Colonico-Tumores-Subepiteliais.pdf',
      description: 'Tumores subepiteliais benignos - schwannomas e neurofibromas'
    },
  ],

  'balao-gastrico': [
    {
      original: 'Balao-Intragastrico-Spatz.pdf',
      newName: '01-Balao-Intragastrico-Spatz-Introducao-Protocolo.pdf',
      description: 'Balão intragástrico Spatz - indicações, técnica de inserção e protocolos'
    },
  ],

  'endoscopia-terapeutica': [
    {
      original: 'eMucossectomia-EMR (1) (1).pdf',
      newName: '01-eMucossectomia-EMR-Tecnicas-Avancadas.pdf',
      description: 'Mucossectomia endoscópica - técnicas, complicações e manejo'
    },
    {
      original: 'Gastrostomia-Endoscopica-PEG.pdf',
      newName: '02-Gastrostomia-Endoscopica-PEG-Tecnica-Indicacoes.pdf',
      description: 'Gastrostomia endoscópica percutânea - indicações, técnica, complicações'
    },
  ],
}

// Execute reorganization
async function reorganizePDFs() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗')
  console.log('║        🔧 REORGANIZANDO PDFs DOS CURSOS                        ║')
  console.log('║     Estrutura Pedagógica + Padrão de Nomenclatura              ║')
  console.log('╚════════════════════════════════════════════════════════════════╝\n')

  const basePath = 'C:\\TurboOps\\Code\\public\\cursos'
  const moves: PDFMove[] = []

  for (const [course, files] of Object.entries(courseOrganization)) {
    const coursePath = path.join(basePath, course)
    console.log(`\n📚 CURSO: ${course.toUpperCase().replace(/-/g, ' ')}`)
    console.log('═'.repeat(70))

    for (const file of files) {
      const oldPath = path.join(coursePath, file.original)
      const newPath = path.join(coursePath, file.newName)

      if (fs.existsSync(oldPath)) {
        console.log(`\n✅ ${file.newName}`)
        console.log(`   📝 ${file.description}`)
        console.log(`   From: ${file.original}`)
        console.log(`   To:   ${file.newName}`)
        moves.push({ from: oldPath, to: newPath })
      } else {
        console.log(`\n❌ NÃO ENCONTRADO: ${file.original}`)
      }
    }
  }

  console.log('\n\n' + '═'.repeat(70))
  console.log(`\n🚀 EXECUTANDO ${moves.length} RENOMEAÇÕES...\n`)

  let success = 0
  let failed = 0

  for (const move of moves) {
    try {
      fs.renameSync(move.from, move.to)
      success++
    } catch (error) {
      console.error(`❌ Erro ao renomear: ${path.basename(move.from)}`)
      console.error(`   ${error}`)
      failed++
    }
  }

  console.log(`\n✅ SUCESSO: ${success} arquivos renomeados`)
  if (failed > 0) {
    console.log(`❌ FALHAS: ${failed} arquivos`)
  }

  console.log('\n' + '═'.repeat(70))
  console.log('📊 RESUMO FINAL:\n')

  for (const [course, files] of Object.entries(courseOrganization)) {
    const coursePath = path.join(basePath, course)
    const pdfCount = fs.readdirSync(coursePath).filter(f => f.endsWith('.pdf')).length
    console.log(`✓ ${course}: ${pdfCount} PDFs`)
  }

  console.log('\n' + '═'.repeat(70))
  console.log('\n✨ Próximo passo: Execute o seed-courses.ts para carregar no banco!\n')
  console.log('   cd /c/TurboOps/Code/backend')
  console.log('   npx ts-node prisma/seed-courses.ts\n')
}

reorganizePDFs().catch(console.error)
