export const site = {
  brand: 'CODEXA',
  byline: 'by Adam',
  tagline: 'Code. Automate. Grow.',
  description:
    'CODEXA by Adam — practical tech courses in web, mobile, automation, and office skills. Online & on-site classes with hands-on projects.',
  whatsapp: {
    number: '923304656990',
    // wa.me link base (no +)
    getUrl(text) {
      const msg =
        text ||
        'Hi CODEXA, I want to know more about your courses.'
      return `https://wa.me/${this.number}?text=${encodeURIComponent(msg)}`
    },
    courseMessage(courseName) {
      return `Hi CODEXA, I'm interested in the ${courseName} course. Please share details.`
    },
  },
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSefn7zQOOunWticggLEsxBgV-ub5OhicxKqo-Syo9QuttNR1A/viewform?embedded=true',
  /**
   * Prefill a Google Form field with the selected course name.
   * How to get the entry ID:
   * 1. Open the form edit page → click the course/name field → ⋮ → "Get pre-filled link"
   * 2. Fill a sample value and click "Get link"
   * 3. In the URL, find entry.XXXXXXXXXXXX=YourValue — that number is the ID
   * 4. Paste it below (e.g. "1234567890"). Leave "" to skip prefill.
   */
  FORM_PREFILL_ENTRY_ID: '',
  SHOW_FEES: true,
  navLinks: [
    { href: '#courses', label: 'Courses' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#instructor', label: 'Instructor' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ],
}

export function formatFee(amountPkr) {
  if (!site.SHOW_FEES) return 'Contact for fee'
  return `PKR ${amountPkr.toLocaleString('en-PK')}`
}

export function buildFormUrl(courseName) {
  let url = site.formUrl
  if (site.FORM_PREFILL_ENTRY_ID && courseName) {
    const sep = url.includes('?') ? '&' : '?'
    url += `${sep}entry.${site.FORM_PREFILL_ENTRY_ID}=${encodeURIComponent(courseName)}`
  }
  return url
}
