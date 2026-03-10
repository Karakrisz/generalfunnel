<script setup>
import { ref, onMounted } from 'vue'

useHead({
  title:
    'Burkolás árak, csempézés, fürdőszoba burkolás | ReBaco Kft. – Budapest és 50 km',
})

// ====== GOOGLE ADS TRACKING ======
function persistClickIdsFromUrl() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  ;['gclid', 'wbraid', 'gbraid'].forEach((key) => {
    const v = params.get(key)
    if (v) localStorage.setItem(key, v)
  })
}

function getClickIds() {
  if (typeof window === 'undefined')
    return { gclid: null, wbraid: null, gbraid: null }

  const sanitize = (key) => {
    const v = String(localStorage.getItem(key) ?? '').trim()
    if (!v) return null
    const lower = v.toLowerCase()
    if (
      lower === 'test' ||
      lower === 'null' ||
      lower === 'undefined' ||
      lower === 'nan'
    ) {
      localStorage.removeItem(key)
      return null
    }
    return v
  }

  return {
    gclid: sanitize('gclid'),
    wbraid: sanitize('wbraid'),
    gbraid: sanitize('gbraid'),
  }
}

// Reactive variables
const isSubmitting = ref(false)
const submitMessage = ref('')
const contactMethod = ref('form')
const formData = ref({
  licensePlate: '',
  brand: '',
  model: '',
  service: 'festes_burkolas_kartonozas',
  name: '',
  email: '',
  phone: '',
})

// ====== FAQ accordion ======
const faqRefs = ref([])

const handleFaqToggle = (activeIndex) => {
  const activeEl = faqRefs.value?.[activeIndex]
  if (!activeEl?.open) return

  faqRefs.value.forEach((el, i) => {
    if (i !== activeIndex && el?.open) el.open = false
  })
}

// Form submission handler
const submitForm = async (event) => {
  event.preventDefault()

  if (isSubmitting.value) return

  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const webhookUrl =
      'https://services.leadconnectorhq.com/hooks/nuY3rh6v028UIToEeod0/webhook-trigger/a6396f93-af54-46cb-a379-32bd8d2aafb0'

    const { gclid, wbraid, gbraid } = getClickIds()
    const serviceName = getServiceDisplayName(formData.value.service)

    const payload = {
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,

      license_plate: formData.value.licensePlate,
      vehicle_brand: formData.value.brand,
      vehicle_model: formData.value.model,
      service_type: serviceName,

      gclid,
      wbraid,
      gbraid,
      source: 'ReBaco Kft. ajánlatkérő űrlap',
      form_type: 'felujitas_generalkivitelezes_ajanlatkeres',
      submission_date: new Date().toISOString(),
      custom_field_1: `${formData.value.brand} ${formData.value.model}`,
      custom_field_2: formData.value.licensePlate,
      custom_field_3: serviceName,
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      submitMessage.value =
        '✅ Köszönjük! Hamarosan visszahívjuk az egyeztetéshez. Sürgős esetben inkább telefonáljon: +36 20 347 5029.'

      formData.value = {
        licensePlate: '',
        brand: '',
        model: '',
        service: 'festes_burkolas_kartonozas',
        name: '',
        email: '',
        phone: '',
      }
    } else {
      throw new Error('Hiba történt a küldés során')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    submitMessage.value =
      '❌ Hiba történt. Kérjük, próbálja újra, vagy hívjon minket: +36 20 347 5029.'
  } finally {
    isSubmitting.value = false
  }
}

const getServiceDisplayName = (serviceValue) => {
  const serviceMap = {
    general_kivitelezes: 'Generál kivitelezés',
    mernoki_tevekenyseg: 'Mérnöki tevékenység',
    muszaki_tanacsadas: 'Műszaki tanácsadás',
    statikai_tervek_opt: 'Statikai tervek optimalizálása',
    szerkezetepites: 'Szerkezetépítés',
    fit_out: 'Fit-out',
    festes_burkolas_kartonozas: 'Festés, burkolás, kartonozás',
    epuletgepeszet: 'Épületgépészet',
    villamos_szereles: 'Villamos szerelési munkák',
    acelszerkezetek: 'Acélszerkezetek',
    komuves_munkak: 'Kőműves munkák',
    acs_tetofedo: 'Ács- és tetőfedő munkák',
    viz_hoszigetelesek: 'Víz- és hőszigetelések',
    szerkezet_megerositesek: 'Szerkezet megerősítések',
    aljzatkepzes: 'Aljzatképzés',
    egyeb: 'Egyéb',
  }
  return serviceMap[serviceValue] || serviceValue
}

const initPage = () => {
  persistClickIdsFromUrl()

  const header = document.querySelector('header')
  const footer = document.querySelector('footer')
  const navbar = document.querySelector('nav')
  const siteChatWidget = document.querySelector('.lc_text-widget')

  if (header) header.style.display = 'none'
  if (footer) footer.style.display = 'none'
  if (navbar) navbar.style.display = 'none'
  if (siteChatWidget) siteChatWidget.style.display = 'none'

  document.querySelectorAll('header, footer, .lc_text-widget').forEach((el) => {
    el.style.display = 'none'
  })
}

onMounted(() => {
  initPage()
})
</script>

<template>
  <section>
    <div
      class="about-content about-content--subpage-next-format position-relative no-header-footer-page"
    >
      <span class="dom-phone-number" aria-hidden="true">+36 20 347 5029</span>
      <div class="subpage-content">
        <!-- HERO BANNER -->
        <div class="trust-banner trust-banner--with-image">
          <div class="banner-bg-image">
            <NuxtImg
              src="/img/hero.svg"
              alt="Burkolás Budapesten – tételes árajánlattal, megbízható kivitelezéssel – ReBaco Kft."
              class="banner-image"
              width="1200"
              height="600"
            />
          </div>

          <div class="banner-content">
            <h1 class="main-title">
              Burkolás Budapesten – gyors árbecslés egyeztetés után
            </h1>

            <div class="hero-benefits" aria-label="Fő előnyök">
              <div class="hero-benefit-card">
                <div class="hero-benefit-check">✓</div>
                <div class="hero-benefit-text">
                  <div class="hero-benefit-title">Gyors egyeztetés</div>
                  <div class="hero-benefit-desc">
                    Telefonon reális ár-sáv, pár kérdés alapján
                  </div>
                </div>
              </div>

              <div class="hero-benefit-card">
                <div class="hero-benefit-check">✓</div>
                <div class="hero-benefit-text">
                  <div class="hero-benefit-title">Díjmentes tanácsadás</div>
                  <div class="hero-benefit-desc">
                    Röviden átbeszéljük a lényeget, hogy tisztább képet kapjon
                    az egészről
                  </div>
                </div>
              </div>

              <div class="hero-benefit-card">
                <div class="hero-benefit-check">✓</div>
                <div class="hero-benefit-text">
                  <div class="hero-benefit-title">Budapest + 50 km</div>
                  <div class="hero-benefit-desc">
                    Kiszállás és kivitelezés a környéken is
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="keyword-chips " aria-label="Fő előnyök">
              <span class="keyword-chip">Tételes ajánlat</span>
              <span class="keyword-chip">Rejtett költségek nélkül</span>
              <span class="keyword-chip">Pontos egyeztetés</span>
            </div>
            <p class="banner-proof">
              <strong>Kovács Balázs vagyok</strong>, a
              <strong>ReBaco Kft.</strong>
              kivitelezési szakértője.
            </p>
            <p class="banner-subtitle">
              <i class="supage-content__p__i"
                >Ne csak egy m2 árat kapjon – hanem pontos képet arról, mi
                mennyibe kerül és miért.</i
              >
            </p>
            <p class="banner-value-prop">
              Ha most burkolás árat keres (csempézés, fürdőszoba, terasz, hideg-
              vagy melegburkolás), egy gyors egyeztetés után
              <strong>reális ársávot</strong> tudunk mondani — majd
              <strong>tételes</strong> ajánlatot adunk.
            </p>
    
            <p class="banner-value-prop">
              Célunk, hogy burkolásnál se legyen "majd a végén meglátjuk" —
              hanem előre egyeztetett műszaki tartalom és tiszta költségek.
            </p> -->
          </div>
        </div>

        <div class="includes-section">
          <h2 class="section-heading">Mennyibe kerül a burkolás?</h2>
          <p class="price-bridge">
            Megtévesztően alacsony „Ft/m2” árakat sok hirdetésben lehet látni.
            Ezek gyakran csak a legegyszerűbb burkolás munkadíjára vonatkoznak.
            Ha több helyről kér árat,
            <strong>mindenképpen tisztázza előre</strong>
            ezt a 3 kérdést — így az ajánlatok tartalma összehasonlítható lesz:
          </p>

          <div class="includes-grid">
            <div class="include-item">
              <span class="include-check">?</span>
              <span
                ><strong>Mi van benne pontosan az m2 árban?</strong> (csak
                burkolás, vagy előkészítés is)</span
              >
            </div>
            <div class="include-item">
              <span class="include-check">?</span>
              <span
                ><strong>Aljzat:</strong> benne van-e javítás/szintezés, vagy
                ezt plusz költségnek minősül?</span
              >
            </div>
            <div class="include-item">
              <span class="include-check">?</span>
              <span
                ><strong>Részletek:</strong> benne vannak-e a kivágások/sarkok,
                illetve fürdő/terasz esetén a vízszigetelés és lejtések?</span
              >
            </div>
          </div>

          <p class="price-bridge d-none">
            Ezek a tényezők számítanak leggyakrabban:
          </p>
        </div>

        <div class="includes-section">
          <h2 class="section-heading">
            3 dolog, amit érdemes tudni burkolás előtt
          </h2>
          <p class="price-bridge">
            Pár szakértői tanács, ha más kivitelezőkkel veszi fel a kapcsolatot,
            amit érdemes előre tisztázni, hogy a burkolás tartós legyen, és a
            végén ne legyenek meglepetések.
          </p>
          <div class="includes-grid">
            <div class="include-item">
              <span class="include-check">✓</span>
              <span
                ><strong>Aljzat állapota</strong><br />
                Ha a felület hullámos, repedt vagy nem teljesen sík, azt a
                kivitelezőnek burkolás előtt
                <strong>mindenképp rendbe kell tennie</strong> (javítás,
                kiegyenlítés, szintezés). Ha bármelyik céget bízza meg a
                munkával, ezt nyugodtan <strong>rögzítse elvárásként</strong> —
                ettől lesz a burkolat stabil és tartós.</span
              >
            </div>
            <div class="include-item">
              <span class="include-check">✓</span>
              <span
                ><strong>Sarkok, kivágások és illesztések</strong><br />
                Minél több sarok, csőkiállás vagy vágás van egy helyiségben,
                annál több időt és precíz munkát igényel a burkolás. Ezért
                fontos, hogy ezek is bele legyenek írva az ajánlatba. Ha más
                kivitelezőt bíz meg, ezt is nyugodtan kérje
                <strong>tételesen, előre rögzítve</strong> a szerződésben.</span
              >
            </div>
            <div class="include-item">
              <span class="include-check">✓</span>
              <span
                ><strong>Vízszigetelés és lejtések</strong><br />
                Fürdőszobánál és terasznál érdemes előre tisztázni, hogy
                készül-e vízszigetelés és megfelelő lejtés. Ez sok későbbi
                problémát tud megelőzni. Bármelyik céggel dolgozik, érdemes ezt
                <strong>külön elvárásként kimondani</strong>: mi készül, hol, és
                milyen rétegrenddel.</span
              >
            </div>
          </div>

          <p class="price-bridge">
            Ha szeretné, egy rövid egyeztetés során végigmegyünk ezeken a
            pontokon, és segítünk tisztábban látni minden fontos szempontot.
          </p>
        </div>

        <!-- HOGYAN MŰKÖDIK SECTION -->
        <div class="process-section d-none">
          <h2 class="section-heading">Hogyan dolgozunk burkolásnál?</h2>
          <div class="process-steps">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Gyors egyeztetés</h4>
                <p>
                  Felület, burkolat, helyszín, határidő — pár perc alatt
                  tisztázzuk az alapokat.
                </p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Helyszíni felmérés</h4>
                <p>
                  Megnézzük az aljzatot/falakat, a csatlakozásokat és a kritikus
                  pontokat (fürdő, terasz, lejtések).
                </p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Tételes ajánlat</h4>
                <p>
                  Írásos, érthető ajánlatot kap — így tud m2 ár helyett valódi
                  műszaki tartalom alapján dönteni.
                </p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Kivitelezés és átadás</h4>
                <p>
                  Megbeszélt ütemezés szerint dolgozunk, a végén közös
                  átadás-átvétellel zárunk.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="safety-bridge">
          <p class="safety-bridge__text">
            <strong>Az egyeztetés díj és kötelezettség mentes.</strong>
          </p>
        </div>

        <div class="closing-cta-section">
          <p class="closing-cta-lead">
            Általában 5–10 perc alatt tisztázható, minden fontos szempont amire
            figyelni kell.
          </p>
          <h2 class="section-heading">
            Kérek gyors telefonos egyeztetést burkolásról
          </h2>
        </div>

        <!-- FORM -->
        <div class="contact-section">
          <form class="appointment-form" @submit="submitForm">
            <div class="form-section">
              <h3 class="section-title">Elérhetőségek</h3>

              <div class="form-group">
                <label class="supage-content__ul__li__strong">Név *</label>
                <input
                  type="text"
                  v-model="formData.name"
                  required
                  class="form-input"
                  placeholder="Név"
                  :disabled="isSubmitting"
                />
              </div>

              <div class="form-group">
                <label class="supage-content__ul__li__strong"
                  >Email cím *</label
                >
                <input
                  type="email"
                  v-model="formData.email"
                  required
                  class="form-input"
                  placeholder="Email cím"
                  :disabled="isSubmitting"
                />
              </div>

              <div class="form-group">
                <label class="supage-content__ul__li__strong"
                  >Telefonszám *</label
                >
                <input
                  type="tel"
                  v-model="formData.phone"
                  required
                  class="form-input"
                  placeholder="Telefonszám"
                  :disabled="isSubmitting"
                />
              </div>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span class="btn-text" v-if="!isSubmitting"
                >Kérek gyors telefonos egyeztetést</span
              >
              <span class="btn-text" v-else>Küldés...</span>
            </button>

            <p class="call-direct">
              Inkább felhívom (Kovács Balázs, szakértőtechnikus):
              <a class="call-direct__link" href="tel:+36203475029"
                >+36 20 347 5029</a
              >
            </p>

            <p class="privacy-text">
              <i class="supage-content__p__i">
                Az űrlap elküldésével automatikusan elfogadja az
                <NuxtLink
                  class="supage-content__nlink"
                  to="/adatvedelmi-tajekoztato"
                  >Adatvédelmi Szabályzatot.</NuxtLink
                >
              </i>
            </p>
          </form>

          <div
            v-if="submitMessage"
            class="submit-message"
            :class="{
              success: submitMessage.includes('✅'),
              error: submitMessage.includes('❌'),
            }"
          >
            {{ submitMessage }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Header és footer elrejtése */
header,
footer,
.header,
.footer,
nav,
.navbar,
.site-header,
.site-footer {
  display: none !important;
}

body > header,
body > footer {
  display: none !important;
}

.call-direct {
  margin-top: 16px;
  margin-bottom: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
  font-size: 16px;
  color: #3a3a3a;
}

.call-direct__link {
  font-weight: 700;
  color: #a2141e;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.subpage-content {
  padding: 3em;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  font-family: 'Raleway', sans-serif;
  --primary: #a2141e;
  --primary-rgb: 162, 20, 30;
  --accent: #ff9500;
  --text: #000;
}

/* ========== HERO BANNER ========== */
.trust-banner {
  position: relative;
  border-radius: 15px;
  margin-bottom: 40px;
  overflow: hidden;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(var(--primary-rgb), 0.18);
}

.trust-banner--with-image {
  background: #fff;
}

.banner-bg-image {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  z-index: 1;
  display: none;
}

.banner-bg-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(var(--primary-rgb), 0.28);
  z-index: 2;
  pointer-events: none;
}

.banner-image {
  width: 100%;
  height: 650px;
  object-fit: cover;
  object-position: top;
  display: block;
  opacity: 1;
}

.banner-content {
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 3.5em 2em;
  width: 100%;
  background: var(--primary);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    inset 0 0 70px rgba(var(--primary-rgb), 0.45);
}

.hero-benefits {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  max-width: 980px;
  margin: 22px auto 0 auto;
}

.hero-benefit-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  text-align: left;
  padding: 18px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.18),
    inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.hero-benefit-check {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #fff;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.22);
  flex: 0 0 auto;
}

.hero-benefit-title {
  font-family: 'Bakbak One', sans-serif;
  letter-spacing: 0.4px;
  font-weight: 800;
  color: #fff;
  font-size: 1.02rem;
  line-height: 1.2;
}

.hero-benefit-desc {
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
  line-height: 1.35;
}

.keyword-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 1.5em 0 1.5em 0;
}

.keyword-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--text);
  font-weight: 800;
  letter-spacing: 0.3px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-family: 'Bakbak One', sans-serif;
  font-size: 1.05rem;
  line-height: 1;
}

.banner-proof {
  margin: 8px auto 14px auto;
  max-width: 860px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  line-height: 1.55;
  opacity: 0.98;
}

.banner-proof strong {
  color: #fff;
}

.banner-status {
  margin: 10px auto 0 auto;
  max-width: 860px;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.5;
  opacity: 0.96;
}

.dom-phone-number {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.main-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
  font-family: 'Bakbak One', sans-serif;
}

.banner-subtitle {
  font-size: 1.1rem;
  text-align: center;
  color: #fff;
  margin-bottom: 15px;
  opacity: 0.95;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.banner-value-prop {
  font-size: 1rem;
  color: #fff;
  line-height: 1.6;
  margin-bottom: 25px;
  opacity: 0.95;
}

@media (max-width: 900px) {
  .hero-benefits {
    grid-template-columns: 1fr;
    max-width: 640px;
  }
}

/* ========== BIZALOM MODUL ========== */
.trust-module {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 4em 0;
  padding: 0;
}

.trust-item {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  border-left: 5px solid var(--primary);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 15px;
}

.trust-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.trust-content h4 {
  color: var(--primary);
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  font-family: 'Bakbak One', sans-serif;
}

.trust-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* ========== PROCESS SECTION ========== */
.process-section {
  margin: 4em 0;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.process-step {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  border-top: 5px solid var(--primary);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: #fff;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  font-family: 'Bakbak One', sans-serif;
  font-variant-numeric: tabular-nums;
}

.process-step h4 {
  color: var(--primary);
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  font-family: 'Bakbak One', sans-serif;
}

.process-step p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* ========== INCLUDES SECTION ========== */
.includes-section {
  margin: 4em 0;
}

.price-bridge {
  margin: 18px 0 0 0;
  text-align: center;
  color: #222;
  font-weight: 800;
}

.includes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
  margin-top: 25px;
}

.include-item {
  background: #fff;
  padding: 18px;
  border-radius: 8px;
  border-left: 4px solid var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 12px;
  font-size: 0.95rem;
}

.include-check {
  color: var(--primary);
  font-weight: 700;
  flex-shrink: 0;
}

/* ========== SECTION HEADING ========== */
.section-heading {
  color: var(--primary);
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5em 0 1.5em 0;
  text-align: center;
  font-family: 'Bakbak One', sans-serif;
}

/* ========== CLOSING CTA SECTION ========== */
.closing-cta-section {
  background: #fff;
  color: var(--text);
  padding: 28px 24px;
  border-radius: 15px;
  text-align: center;
  margin: 2.2em 0 1.2em 0;
  border: 2px solid rgba(var(--primary-rgb), 0.18);
  box-shadow:
    0 10px 26px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.7);
}

.closing-cta-section .section-heading {
  color: var(--primary);
  margin: 0;
}

.closing-cta-lead {
  margin: 0 0 10px 0;
  color: rgba(0, 0, 0, 0.72);
  font-weight: 700;
  line-height: 1.45;
  font-size: 1.02rem;
}

.choice-phone-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: -12px 0 22px 0;
  color: #333;
  font-weight: 600;
}

.choice-phone-inline__label {
  opacity: 0.85;
}

.choice-phone-inline__link {
  color: #a2141e;
  text-decoration: none;
  font-family: 'Bakbak One', sans-serif;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.choice-phone-inline__link:hover {
  text-decoration: underline;
}

.closing-message {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.95;
}

/* ========== CONTACT CHOICE ========== */
.contact-choice {
  background: #fff;
  padding: 40px 30px;
  border-radius: 15px;
  text-align: center;
  margin: 2.5em auto;
  max-width: 900px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;
}

.safety-bridge {
  background: #fff;
  border-radius: 15px;
  padding: 18px 20px;
  margin: 1.5em auto 1.5em auto;
  max-width: 900px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(var(--primary-rgb), 0.25);
}

.safety-bridge__text {
  margin: 0;
  color: #222;
  font-size: 0.98rem;
  line-height: 1.55;
}

.safety-bridge__text strong {
  color: var(--primary);
}

.choice-intro {
  color: var(--primary);
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 30px 0;
}

.choice-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.choice-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 25px 20px;
  border: 3px solid #ddd;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  font-family: 'Bakbak One', sans-serif;
}

.choice-btn:hover {
  border-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.choice-btn.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.choice-icon {
  font-size: 2rem;
}

.choice-text {
  text-align: center;
  line-height: 1.3;
}

/* ========== CONTACT SECTION ========== */
.contact-section {
  margin: 2em auto;
  max-width: 900px;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== PHONE CARD ========== */
.phone-card {
  background: var(--primary);
  padding: 45px 35px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #fff;
}

.phone-card-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
}

.phone-card-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #fff;
  font-family: 'Bakbak One', sans-serif;
}

.phone-card-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0 0 30px 0;
}

.phone-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #fff;
  color: var(--primary);
  padding: 18px 35px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0 0 30px 0;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  border: none;
  cursor: pointer;
  font-family: 'Bakbak One', sans-serif;
  animation: phonePulse 1.05s infinite;
}

@keyframes phonePulse {
  0% {
    transform: translateY(0) scale(1);
    box-shadow:
      0 6px 15px rgba(0, 0, 0, 0.15),
      0 0 0 0 rgba(var(--primary-rgb), 0.7);
  }
  55% {
    transform: translateY(-1px) scale(1.03);
    box-shadow:
      0 14px 35px rgba(0, 0, 0, 0.28),
      0 0 0 16px rgba(var(--primary-rgb), 0);
  }
  100% {
    transform: translateY(0) scale(1);
    box-shadow:
      0 6px 15px rgba(0, 0, 0, 0.15),
      0 0 0 0 rgba(var(--primary-rgb), 0);
  }
}

.phone-button:hover {
  animation: none;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  background: #f0f0f0;
}

.phone-button:active {
  transform: translateY(-1px);
}

.phone-icon {
  font-size: 1.4rem;
}

.phone-number {
  letter-spacing: 0.5px;
}

.phone-info {
  background: rgba(255, 255, 255, 0.15);
  padding: 18px 16px;
  border-radius: 10px;
  margin-bottom: 25px;
}

.phone-info p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.phone-info p strong {
  display: block;
  font-weight: 700;
}

.phone-info p.small {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 6px;
}

.phone-benefits {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.phone-benefits .benefit {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #fff;
}

/* ========== FORM STYLES ========== */
.appointment-form {
  max-width: 900px;
  margin: 0 auto;
}

.submit-message {
  padding: 18px;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
}

.submit-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 2px solid #c3e6cb;
}

.submit-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #f5c6cb;
}

.form-section {
  background: #fff;
  padding: 28px;
  margin: 2.5em 0;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  border-left: 5px solid var(--primary);
}

.form-stepper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto 18px auto;
  padding: 12px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.step-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  background: #fff;
  color: #000;
  border: 2px solid rgba(0, 0, 0, 0.12);
  font-family: 'Bakbak One', sans-serif;
}

.step-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Bakbak One', sans-serif;
}

.step-line {
  flex: 1;
  height: 2px;
  background: rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}

.step.active .step-circle {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.step.done .step-circle {
  background: #000;
  color: #fff;
  border-color: #000;
}

.step-line.done {
  background: var(--primary);
}

.step-error {
  background: #fff;
  border: 2px solid rgba(var(--primary-rgb), 0.25);
  color: var(--primary);
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 14px;
  font-weight: 700;
}

.wizard-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.wizard-btn {
  width: 100%;
  border-radius: 10px;
  padding: 16px 18px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-family: 'Bakbak One', sans-serif;
}

.wizard-btn--primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.wizard-btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  background: var(--accent);
}

.wizard-btn--secondary {
  background: #fff;
  color: #000;
  border-color: rgba(0, 0, 0, 0.18);
}

.wizard-btn--secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--primary);
}

.wizard-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.section-title {
  color: var(--primary);
  font-size: 1.35rem;
  margin-bottom: 25px;
  border-bottom: 3px solid var(--primary);
  padding-bottom: 12px;
  font-weight: 700;
  font-family: 'Bakbak One', sans-serif;
}

.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 13px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s;
  background-color: #fff;
  color: #333;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #999;
}

.form-select {
  width: 100%;
  padding: 13px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  color: #333;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a2141e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 45px;
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
}

.form-select:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
}

.form-select:hover:not(:disabled) {
  border-color: var(--primary);
  background-color: #fefefe;
}

.form-input:disabled,
.form-textarea:disabled,
.form-select:disabled {
  background-color: #f0f0f0;
  opacity: 0.65;
  cursor: not-allowed;
}

/* ========== SUBMIT BUTTON ========== */
.submit-btn {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 18px 45px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  margin-top: 15px;
  font-family: 'Bakbak One', sans-serif;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  background: var(--accent);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.btn-text {
  font-size: 1.05rem;
  letter-spacing: 0.5px;
}

.btn-subtext {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.95;
}

/* ========== PRIVACY TEXT ========== */
.privacy-text {
  color: #666;
  font-size: 0.85rem;
  margin-top: 15px;
  text-align: center;
}

.privacy-text a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.privacy-text a:hover {
  color: #000000;
  text-decoration: underline;
}

/* ========== FAQ SECTION ========== */
.faq-section {
  margin: 3em 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 30px;
}

.faq-item {
  background: #fff;
  border-radius: 10px;
  border-left: 5px solid var(--primary);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
  overflow: hidden;
  width: 100%;
}

.faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  background: #fff;
}

.faq-question {
  list-style: none;
  cursor: pointer;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-title {
  color: var(--primary);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.4;
  font-family: 'Bakbak One', sans-serif;
}

.faq-icon {
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  position: relative;
}

.faq-icon::before,
.faq-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 2px;
  background: var(--primary);
  transform: translate(-50%, -50%);
  border-radius: 2px;
  transition: transform 0.2s ease;
}

.faq-icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.faq-item[open] .faq-icon::after {
  transform: translate(-50%, -50%) rotate(0deg);
}

.faq-item[open] .faq-question {
  border-bottom: 1px solid rgba(var(--primary-rgb), 0.12);
}

.faq-answer {
  padding: 17px 22px 18px 22px;
}

.faq-text {
  color: #333;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .choice-buttons {
    grid-template-columns: 1fr;
  }

  .choice-btn {
    padding: 20px 15px;
  }

  .phone-card {
    padding: 30px 25px;
  }

  .phone-card-icon {
    font-size: 2.5rem;
  }

  .phone-button {
    padding: 16px 28px;
    font-size: 1rem;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .banner-subtitle {
    font-size: 0.95rem;
  }

  .banner-content {
    padding: 2.5em 1.5em;
  }

  .form-section {
    padding: 20px;
    margin: 1.25em 0;
  }

  .form-stepper {
    gap: 8px;
    padding: 10px 12px;
  }

  .step-label {
    font-size: 0.8rem;
  }

  .step-circle {
    width: 30px;
    height: 30px;
    font-size: 0.85rem;
  }

  .wizard-actions {
    gap: 10px;
  }

  .wizard-btn {
    padding: 14px 16px;
  }

  .section-heading {
    font-size: 1.6rem;
  }

  .section-title {
    font-size: 1.15rem;
  }

  .subpage-content {
    padding: 1.5em;
  }
  .banner-image {
    height: 100%;
  }
}

@media (max-width: 480px) {
  .trust-banner {
    border-radius: 10px;
  }

  .banner-image {
    height: 100%;
  }

  .main-title {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .banner-subtitle {
    font-size: 0.9rem;
  }

  .banner-content {
    padding: 2em 1em;
  }

  .subpage-content {
    padding: 1em;
  }

  .section-heading {
    font-size: 1.3rem;
  }

  .faq-title {
    font-size: 0.95rem;
  }

  .faq-text {
    font-size: 0.85rem;
  }

  .contact-choice {
    padding: 25px 20px;
  }

  .choice-intro {
    font-size: 1.1rem;
  }

  .form-stepper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    justify-content: flex-start;
  }

  .step-label {
    display: none;
  }

  .step-line {
    min-width: 22px;
  }

  .wizard-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .submit-btn,
  .wizard-btn {
    padding: 16px 18px;
  }
}
</style>
