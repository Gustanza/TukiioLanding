<script setup>
import TukiioLogo from '../ui/TukiioLogo.vue'
import AppIcon from '../ui/AppIcon.vue'
import { contact, links, social, telHref } from '../../data/site.js'

const year = new Date().getFullYear()
// No newsletter backend exists yet, so this block links to email/contact instead of faking a sign-up.
// TODO(client): swap for a real newsletter form once a list/CRM endpoint is available.
const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Event enquiry from tukiio landing page')}`

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Ticketing', href: '#use-cases' },
      { label: 'Voting & awards', href: links.voting },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Browse events', href: links.browse },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Tukiio', href: links.about },
      { label: 'Contact', href: links.contact },
      { label: 'Dephics', href: links.dephics },
      { label: 'FAQs', href: '#faq' },
    ],
  },
  {
    title: 'Get the apps',
    links: [
      { label: 'Tukiio for Android', href: links.android },
      { label: 'Tukiio for iOS', href: links.ios },
      { label: 'Tukiio Organizer', href: links.organizerApp },
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Terms, privacy & refunds', href: links.terms }],
  },
]
</script>

<template>
  <footer class="footer">
    <div class="card fcard">
      <div class="fcard__top">
        <div class="news">
          <TukiioLogo :height="28" />
          <h2 class="news__title">Stay in touch</h2>
          <p class="news__sub">Planning an event? Email our team or send us a message, and we’ll get back to you.</p>
          <div class="news__form">
            <span class="news__addr">{{ contact.email }}</span>
            <a :href="mailto" class="news__btn">Email us</a>
          </div>
          <p class="news__alt">
            Or use the <a :href="links.contact" class="news__link">contact form on tukiio.com</a>.
          </p>

          <address class="contact">
            <a :href="`mailto:${contact.email}`"><AppIcon name="mail" :size="18" />{{ contact.email }}</a>
            <a v-for="p in contact.phones" :key="p" :href="telHref(p)"><AppIcon name="phone" :size="18" />{{ p }}</a>
            <a :href="contact.whatsappUrl" target="_blank" rel="noopener"
              ><AppIcon name="whatsapp" :size="18" />WhatsApp {{ contact.whatsapp }}<span class="sr-only"> (opens in a new tab)</span></a
            >
            <span><AppIcon name="pin" :size="18" />{{ contact.address }}</span>
          </address>
        </div>

        <nav class="cols" aria-label="Footer">
          <div v-for="c in columns" :key="c.title" class="col">
            <h2 class="col__title">{{ c.title }}</h2>
            <ul role="list">
              <li v-for="l in c.links" :key="l.label">
                <a :href="l.href">{{ l.label }}</a>
              </li>
            </ul>
          </div>
          <div class="col">
            <h2 class="col__title">Social</h2>
            <ul role="list" class="socials">
              <li v-for="s in social" :key="s.label">
                <a :href="s.href" target="_blank" rel="noopener">
                  <AppIcon :name="s.icon" :size="18" />{{ s.label }}<span class="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="fcard__bottom">
        <p>© {{ year }} Tukiio. A product of Dephics Company Limited, Dar es Salaam.</p>
        <!-- TODO(client): Kiswahili draft from the copy bank; needs native-speaker review before publishing. -->
        <p class="sw" lang="sw">Matukio na tiketi kwa kila mtu.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 0 var(--gutter) 24px;
}

.fcard {
  max-width: 1329px;
  margin: 0 auto;
  border-radius: 32px;
  padding: 48px;
}

.fcard__top {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 2fr;
  gap: 48px;
}

.news {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.news__title {
  margin-top: 16px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.06em;
  color: var(--ink-strong);
}

.news__sub {
  font-size: 15px;
  color: var(--text-muted);
}

.news__form {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 420px;
  padding: 6px 6px 6px 16px;
  border-radius: 14px;
  background: var(--surface-muted);
  border: 1px solid var(--border);
}

.news__addr {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text);
}

.news__btn {
  flex: none;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-hairline);
  font-weight: 500;
  color: var(--ink);
  transition: background-color 0.2s;
}

.news__btn:hover {
  background: var(--accent);
}

.news__alt {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.news__link {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.contact {
  display: grid;
  gap: 10px;
  font-style: normal;
  font-size: 15px;
  color: var(--text-muted);
}

.contact a,
.contact span {
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
}

.contact a:hover {
  color: var(--ink);
}

.contact :deep(svg) {
  flex: none;
  margin-top: 1px;
  color: var(--ink);
}

.cols {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 32px;
}

.col__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 500;
  letter-spacing: -0.06em;
  color: var(--ink-strong);
  margin-bottom: 16px;
}

.col ul {
  display: grid;
  gap: 12px;
}

.col a {
  font-size: 16px;
  color: var(--text-muted);
  transition: color 0.2s;
}

.col a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.socials a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.fcard__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  color: var(--text-muted);
}

.sw {
  font-family: var(--font-display);
  color: var(--ink);
}

@media (max-width: 1199px) {
  .fcard__top {
    grid-template-columns: minmax(0, 1fr);
  }
  .cols {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .fcard {
    padding: 28px 20px;
    border-radius: 26px;
  }
  .cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 16px;
  }
  .col__title {
    font-size: 18px;
  }
  .col a {
    font-size: 15px;
  }
  .fcard__bottom {
    flex-direction: column;
  }
}
</style>
