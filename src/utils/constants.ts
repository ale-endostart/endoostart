// Contact Information
export const CONTACT = {
  whatsapp: '+55 11 99999-9999',
  whatsappNumber: '5511999999999',
  email: 'contato@endostart.com.br',
  phone: '(11) 99999-9999',
};

// Course Information
export const COURSES = {
  ENDOSCOPIA: {
    id: 'endoscopia',
    name: 'Imersão em Endoscopia',
    duration: '6 meses',
  },
  COLONOSCOPIA: {
    id: 'colonoscopia',
    name: 'Imersão em Colonoscopia',
    duration: '6 meses',
  },
  BALAO: {
    id: 'balao',
    name: 'Imersão em Balão Gástrico',
    duration: '3 meses',
  },
  TERAPEUTICA: {
    id: 'terapeutica',
    name: 'Imersão em Terapêutica',
    duration: '6 meses',
  },
};

// ROI Calculator
export const ROI_CONFIG = {
  pricePerExam: 2000,
  onCallSalary: 6000,
  examsPerWeekDefault: 8,
};

// Dr. Alessandro Info
export const DR_ALESSANDRO = {
  name: 'Dr. Alessandro',
  experience: '12 anos',
  studentsFormed: '100+',
  credentials: ['Cirurgião Geral', 'Ex-Responsável Técnico SEMA', 'Speaker em Balão Gástrico'],
};

// WhatsApp Message Templates
export const WHATSAPP_MESSAGES = {
  default: 'Olá! Sou médico e gostaria de saber mais sobre a Imersão em EndoStart',
  course: (courseName: string) => `Olá! Sou médico e gostaria de saber mais sobre a Imersão em ${courseName}`,
  module: (moduleName: string) => `Olá! Sou médico e gostaria de saber mais sobre o módulo ${moduleName}`,
  consultation: 'Olá! Sou médico e gostaria de agendar uma consultoria gratuita com o Dr. Alessandro',
};

// Site Config
export const SITE_CONFIG = {
  name: 'EndoStart',
  domain: 'endostart.com.br',
  tagline: 'Abandone o plantão de 12h. Fature até R$ 2.000 por procedimento de 30 minutos.',
};

// Analytics
export const ANALYTICS = {
  googleTagManagerId: 'G-XXXXXXXXXX',
  metaPixelId: 'XXXXXXXXXX',
};
