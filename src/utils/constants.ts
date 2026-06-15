// Contact Information
export const CONTACT = {
  whatsapp: '+55 62 99433-8845',
  whatsappNumber: '5562994338845',
  email: 'contato@endostart.com.br',
  phone: '(11) 99999-9999',
  location: 'Goiânia, GO',
};

// Course Information
export const FORMATION = {
  name: 'Formação em Endoscopia e Colonoscopia',
  duration: '4 semanas presenciais',
  location: 'Goiânia',
  modality: 'Presencial',
};

// Dr. Alessandro Info
export const DR_ALESSANDRO = {
  name: 'Dr. Alessandro Rodrigues',
  credentials: [
    'Graduação em Medicina pela UNIG',
    'Residência Médica em Cirurgia Geral',
    'Formação em Cirurgia de Urgência pelo Hospital Sírio Libanês',
  ],
  roles: [
    'Responsável técnico do serviço de Endoscopia e Colonoscopia do Hospital Sagrado Coração de Jesus',
    'Cirurgião titular do Núcleo de Especialidades da Prefeitura de Nerópolis',
    'Associado da Sociedade Brasileira de Cirurgia Bariátrica e Metabólica',
    'Cirurgião responsável pelo projeto Viva Leve em parceria com a Prefeitura de Campo Limpo de Goiás',
  ],
};

// WhatsApp Message Templates
export const WHATSAPP_MESSAGES = {
  default: 'Olá, vim através do site e gostaria de mais informações sobre o curso ENDOSTART',
  course: (_courseName: string) => `Olá, vim através do site e gostaria de mais informações sobre o curso ENDOSTART`,
  module: (_moduleName: string) => `Olá, vim através do site e gostaria de mais informações sobre o curso ENDOSTART`,
  consultation: 'Olá, vim através do site e gostaria de mais informações sobre o curso ENDOSTART',
};

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGES.default)}`;
export const LP_CTA_URL = 'https://inlead.digital/endostart-01';

// Site Config
export const SITE_CONFIG = {
  name: 'EndoStart',
  domain: 'endostart.com.br',
  tagline: 'Formação presencial em Endoscopia Digestiva Alta e Colonoscopia com segurança e técnica.',
};

// Analytics
export const ANALYTICS = {
  googleTagManagerId: 'G-XXXXXXXXXX',
  metaPixelId: 'XXXXXXXXXX',
};
