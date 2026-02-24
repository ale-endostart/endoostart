/**
 * Track event with Google Analytics
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, any>
): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: document.title,
  });
}

/**
 * Track conversion
 */
export function trackConversion(
  conversionName: string,
  value?: number
): void {
  trackEvent(conversionName, {
    conversion_name: conversionName,
    ...(value && { value }),
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(
  ctaName: string,
  ctaType: 'whatsapp' | 'button' | 'link',
  metadata?: Record<string, any>
): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_type: ctaType,
    ...metadata,
  });
}

/**
 * Track calculator interaction
 */
export function trackCalculatorInteraction(
  examsPerWeek: number,
  monthlyEarnings: number
): void {
  trackEvent('calculator_interaction', {
    exams_per_week: examsPerWeek,
    monthly_earnings: monthlyEarnings,
  });
}

/**
 * Track course interest
 */
export function trackCourseInterest(courseName: string): void {
  trackEvent('course_interest', {
    course_name: courseName,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string): void {
  trackEvent('form_submission', {
    form_name: formName,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
  });
}

/**
 * Track testimonial view
 */
export function trackTestimonialView(testimonialIndex: number): void {
  trackEvent('testimonial_view', {
    testimonial_index: testimonialIndex,
  });
}
