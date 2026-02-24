import { CONTACT, WHATSAPP_MESSAGES } from './constants';

/**
 * Generate WhatsApp URL with pre-filled message
 * @param message - The message to send
 * @param phoneNumber - WhatsApp phone number (default: CONTACT.whatsappNumber)
 * @returns WhatsApp URL
 */
export function generateWhatsAppURL(
  message: string,
  phoneNumber: string = CONTACT.whatsappNumber
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp in new tab
 * @param message - The message to send
 */
export function openWhatsApp(message: string): void {
  const url = generateWhatsAppURL(message);
  window.open(url, '_blank');
}

/**
 * Send WhatsApp message for specific course
 * @param courseName - Name of the course
 */
export function sendWhatsAppForCourse(courseName: string): void {
  const message = WHATSAPP_MESSAGES.course(courseName);
  openWhatsApp(message);
}

/**
 * Send WhatsApp message for specific module
 * @param moduleName - Name of the module
 */
export function sendWhatsAppForModule(moduleName: string): void {
  const message = WHATSAPP_MESSAGES.module(moduleName);
  openWhatsApp(message);
}

/**
 * Send consultation request via WhatsApp
 */
export function requestConsultation(): void {
  const message = WHATSAPP_MESSAGES.consultation;
  openWhatsApp(message);
}

/**
 * Send default WhatsApp message
 */
export function sendDefaultMessage(): void {
  const message = WHATSAPP_MESSAGES.default;
  openWhatsApp(message);
}

/**
 * Track WhatsApp click event (for analytics)
 * @param eventName - Name of the event
 * @param metadata - Additional metadata
 */
export function trackWhatsAppClick(eventName: string, metadata?: Record<string, any>): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'engagement',
      event_label: 'whatsapp_click',
      ...metadata,
    });
  }
}
