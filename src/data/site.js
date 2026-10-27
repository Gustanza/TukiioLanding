// Central place for links & contact details (from tukiio/01-company.md).
// TODO(client): confirm the domain of record (tukiio.com vs tukiio.co.tz) — see tukiio/09-gaps-and-risks.md.

export const links = {
  login: 'https://tukiio.com/login',
  // No public "create event" deep link was found in the route table; organisers start from login.
  createEvent: 'https://tukiio.com/login',
  browse: 'https://tukiio.com',
  voting: 'https://tukiio.com/voting',
  about: 'https://tukiio.com/about',
  contact: 'https://tukiio.com/contact',
  terms: 'https://tukiio.com/terms',
  android: 'https://play.google.com/store/apps/details?id=tz.co.dephics.tukiio',
  ios: 'https://apps.apple.com/tz/app/tukiio/id6443397470',
  organizerApp: 'https://play.google.com/store/apps/details?id=tz.co.dephics.tukiio_organizer',
  dephics: 'https://dephics.co.tz/',
}

export const contact = {
  email: 'info@tukiio.co.tz',
  phones: ['+255 752 030 032', '+255 712 254 966'],
  whatsapp: '+255 677 070 995',
  whatsappUrl: 'https://wa.me/255677070995',
  address: 'Derm Plaza, 6th Floor, Bagamoyo Road, Makumbusho, Dar es Salaam',
}

export const social = [
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/tukiioTZ' },
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/tukiioTZ' },
  { label: 'X (Twitter)', icon: 'x', href: 'https://x.com/tukiioTZ' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/dephics' },
]

export const telHref = (n) => `tel:${n.replace(/\s+/g, '')}`

/** Format a number as Tanzanian shillings, e.g. "TZS 1,250,000". */
export const tzs = (n) => `TZS ${Math.round(n).toLocaleString('en-US')}`
