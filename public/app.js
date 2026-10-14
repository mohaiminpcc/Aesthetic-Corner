(function () {
  'use strict';

  // ---------- Translations ----------
  const I18N = {
    en: {
      skip: 'Skip to the paintings',
      navGallery: 'Paintings', navHow: 'How to buy', navDeco: 'Decoration ideas', navAbout: 'The artist', navContact: 'Contact',
      whatsapp: 'WhatsApp', emailUs: 'Email us', cEmail: 'Email',
      heroLead: 'Original paintings by Asma Binte Nurul Huda. Choose one, read its details, and pay with bKash.',
      viewGallery: 'See the paintings',
      galleryTitle: 'Paintings',
      fAll: 'All', fAvailable: 'Available', fSold: 'Sold',
      empty: 'No paintings here yet. Check back soon.',
      howTitle: 'How to buy',
      s1t: 'Pick a painting', s1d: 'Open any painting to see its size, materials, colours and a short description.',
      s2t: 'Send the payment on bKash', s2d: 'Send the exact price to our bKash number. Write the painting name as the reference.',
      s3t: 'Enter your TrxID', s3d: 'Fill in your delivery details and the TrxID from your bKash message.',
      s4t: 'We confirm and deliver', s4d: 'We check the payment, then contact you on WhatsApp or phone to arrange delivery.',
      decoTitle: 'Paintings for your space',
      decoLead: 'Not sure which painting suits your wall? We take orders for decoration ideas for homes, offices and businesses. Tell us about the space and we suggest paintings that fit it.',
      decoHome: 'Home',
      decoHomeD: 'Living room, bedroom, dining area or entrance. We help you choose paintings that suit your colours and furniture.',
      decoOffice: 'Office',
      decoOfficeD: 'Reception, meeting rooms and workspaces. Paintings that make the room feel welcoming and professional.',
      decoBiz: 'Business',
      decoBizD: 'Cafes, clinics, shops, hotels and showrooms. Art that gives your customers something to remember.',
      decoAsk: 'Ask on WhatsApp',
      decoHow: 'Send us a few photos of the wall, its size, and the colours you like. We reply with ideas.',
      decoMailLine: 'Prefer email? Send your photos to',
      decoMsgHome: 'Hello, I would like decoration ideas with paintings for my home.',
      decoMsgOffice: 'Hello, I would like decoration ideas with paintings for my office.',
      decoMsgBiz: 'Hello, I would like decoration ideas with paintings for my business.',
      decoMailSubject: 'Decoration ideas with paintings',
      siteViews: 'Total site views',
      aboutTitle: 'About the artist',
      artistName: 'Asma Binte Nurul Huda',
      aboutP1: 'Asma Binte Nurul Huda is a professional artist with 12 years of experience in painting. She works in two styles: photo-realistic paintings that look like photographs, and abstract paintings built from colour and shape.',
      aboutP2: 'She paints in acrylic and watercolour. Each painting is handmade, so each piece is the only one of its kind.',
      aboutP3: 'To see more photos of a painting, or to talk about colours and size, message us on WhatsApp.',
      aLabelName: 'Artist', aLabelExp: 'Experience', aLabelStyle: 'Styles', aLabelMedium: 'Mediums',
      aValExp: '12 years', aValStyle: 'Photo-realistic and abstract', aValMedium: 'Acrylic and watercolour',
      contactTitle: 'Talk to us',
      contactLead: 'Questions about a painting, delivery or payment? Message us any time.',
      langBtn: 'বাংলা',
      heroTitleSuffix: '',
      available: 'Available', reserved: 'Payment being checked', sold: 'Sold',
      size: 'Size', type: 'Type', materials: 'Materials', colour: 'Colours', year: 'Year',
      buy: 'Buy with bKash', askWa: 'Ask on WhatsApp', askMail: 'Email us',
      close: 'Close', open: 'Open painting: ',
      soldNote: 'This painting has been sold. Message us if you would like something similar.',
      reservedNote: 'Someone has paid for this painting and we are checking the payment. If it is not confirmed, it will be available again.',
      back: 'Back to details',
      payTitle: 'Pay with bKash',
      payStep1: 'Open your bKash app and choose',
      payStep1b: 'Send Money', payStep1c: 'Payment',
      payTo: 'Send exactly this amount to this number:',
      payRef: 'In the reference, write:',
      copy: 'Copy number', copied: 'Copied',
      afterPay: 'After you pay, fill in this form. Use the TrxID from your bKash confirmation message.',
      fName: 'Your name', fPhone: 'Phone number', fEmail: 'Email (optional)',
      fAddress: 'Delivery address', fSender: 'bKash number you paid from (optional)',
      fTrx: 'bKash TrxID', fTrxHint: 'Example: 9G4H7K2LMN', fNote: 'Note for us (optional)',
      submit: 'Send order', sending: 'Sending…',
      errGeneric: 'Could not send your order. Check your connection and try again.',
      errTaken: 'Sorry, this painting was just taken. Please choose another one.',
      doneTitle: 'Order received',
      doneText: 'Thank you. We will check your bKash payment and contact you on the phone number you gave. This usually takes a few hours.',
      doneRef: 'Your order reference:',
      doneClose: 'Back to paintings',
      mailSubject: 'Question about: ',
      waMsg: 'Hello, I am interested in this painting: ',
      waGeneral: 'Hello, I have a question about your paintings.',
      price: 'Price',
      pricePending: 'Ask for price',
    },
    bn: {
      skip: 'ছবিগুলোতে যান',
      navGallery: 'ছবি', navHow: 'কীভাবে কিনবেন', navDeco: 'সাজসজ্জার আইডিয়া', navAbout: 'শিল্পী', navContact: 'যোগাযোগ',
      whatsapp: 'হোয়াটসঅ্যাপ', emailUs: 'ইমেইল করুন', cEmail: 'ইমেইল',
      heroLead: 'আসমা বিনতে নুরুল হুদার হাতে আঁকা মৌলিক ছবি। পছন্দের ছবিটি বেছে নিন, বিস্তারিত দেখুন এবং বিকাশে দাম দিন।',
      viewGallery: 'ছবিগুলো দেখুন',
      galleryTitle: 'ছবি',
      fAll: 'সব', fAvailable: 'বিক্রির জন্য আছে', fSold: 'বিক্রি হয়েছে',
      empty: 'এখানে এখনো কোনো ছবি নেই। একটু পরে আবার দেখুন।',
      howTitle: 'কীভাবে কিনবেন',
      s1t: 'ছবি বেছে নিন', s1d: 'যেকোনো ছবিতে ক্লিক করে মাপ, কী দিয়ে আঁকা, রং এবং ছোট একটি বর্ণনা দেখুন।',
      s2t: 'বিকাশে টাকা পাঠান', s2d: 'আমাদের বিকাশ নম্বরে ছবির সঠিক দাম পাঠান। রেফারেন্সে ছবির নাম লিখুন।',
      s3t: 'ট্রানজেকশন আইডি দিন', s3d: 'আপনার ঠিকানা এবং বিকাশের মেসেজে পাওয়া TrxID ফর্মে লিখুন।',
      s4t: 'আমরা নিশ্চিত করে পাঠাই', s4d: 'আমরা পেমেন্ট যাচাই করে হোয়াটসঅ্যাপ বা ফোনে আপনার সঙ্গে ডেলিভারির ব্যবস্থা করি।',
      decoTitle: 'আপনার জায়গার জন্য ছবি',
      decoLead: 'আপনার দেয়ালে কোন ছবি মানাবে বুঝতে পারছেন না? বাসা, অফিস ও ব্যবসা প্রতিষ্ঠান ছবি দিয়ে সাজানোর আইডিয়ার অর্ডার আমরা নিই। জায়গাটি সম্পর্কে আমাদের জানান, আমরা মানানসই ছবির পরামর্শ দেব।',
      decoHome: 'বাসা',
      decoHomeD: 'ড্রয়িংরুম, শোবার ঘর, খাবার ঘর বা প্রবেশপথ। আপনার রং ও আসবাবের সঙ্গে মানানসই ছবি বেছে নিতে আমরা সাহায্য করি।',
      decoOffice: 'অফিস',
      decoOfficeD: 'রিসেপশন, মিটিং রুম ও কাজের জায়গা। ঘরটিকে আন্তরিক ও পেশাদার দেখানোর মতো ছবি।',
      decoBiz: 'ব্যবসা প্রতিষ্ঠান',
      decoBizD: 'ক্যাফে, ক্লিনিক, দোকান, হোটেল ও শোরুম। এমন শিল্পকর্ম, যা গ্রাহকের মনে থাকবে।',
      decoAsk: 'হোয়াটসঅ্যাপে জিজ্ঞাসা করুন',
      decoHow: 'দেয়ালের কয়েকটি ছবি, মাপ এবং আপনার পছন্দের রং আমাদের পাঠান। আমরা আইডিয়া জানিয়ে উত্তর দেব।',
      decoMailLine: 'ইমেইলে পাঠাতে চান? ছবি পাঠান এই ঠিকানায়:',
      decoMsgHome: 'আসসালামু আলাইকুম, আমার বাসা ছবি দিয়ে সাজানোর আইডিয়া জানতে চাই।',
      decoMsgOffice: 'আসসালামু আলাইকুম, আমার অফিস ছবি দিয়ে সাজানোর আইডিয়া জানতে চাই।',
      decoMsgBiz: 'আসসালামু আলাইকুম, আমার ব্যবসা প্রতিষ্ঠান ছবি দিয়ে সাজানোর আইডিয়া জানতে চাই।',
      decoMailSubject: 'ছবি দিয়ে সাজানোর আইডিয়া',
      siteViews: 'সাইটের মোট ভিউ',
      aboutTitle: 'শিল্পী পরিচিতি',
      artistName: 'আসমা বিনতে নুরুল হুদা',
      aboutP1: 'আসমা বিনতে নুরুল হুদা একজন পেশাদার শিল্পী, ছবি আঁকায় তাঁর ১২ বছরের অভিজ্ঞতা। তিনি দুই ধারায় কাজ করেন: ফটোগ্রাফের মতো দেখতে ফটোরিয়ালিস্টিক ছবি এবং রং ও আকারে গড়া বিমূর্ত ছবি।',
      aboutP2: 'তিনি অ্যাক্রিলিক ও জলরঙে আঁকেন। প্রতিটি ছবি হাতে আঁকা, তাই প্রতিটি ছবি একেবারে একটিই।',
      aboutP3: 'কোনো ছবির আরও ছবি দেখতে চাইলে, অথবা রং ও মাপ নিয়ে কথা বলতে চাইলে হোয়াটসঅ্যাপে আমাদের মেসেজ করুন।',
      aLabelName: 'শিল্পী', aLabelExp: 'অভিজ্ঞতা', aLabelStyle: 'ধারা', aLabelMedium: 'মাধ্যম',
      aValExp: '১২ বছর', aValStyle: 'ফটোরিয়ালিস্টিক ও বিমূর্ত', aValMedium: 'অ্যাক্রিলিক ও জলরং',
      contactTitle: 'আমাদের সঙ্গে কথা বলুন',
      contactLead: 'ছবি, ডেলিভারি বা পেমেন্ট নিয়ে প্রশ্ন আছে? যেকোনো সময় মেসেজ করুন।',
      langBtn: 'English',
      available: 'পাওয়া যাচ্ছে', reserved: 'পেমেন্ট যাচাই চলছে', sold: 'বিক্রি হয়েছে',
      size: 'মাপ', type: 'ধরন', materials: 'উপকরণ', colour: 'রং', year: 'সাল',
      buy: 'বিকাশে কিনুন', askWa: 'হোয়াটসঅ্যাপে জিজ্ঞাসা করুন', askMail: 'ইমেইল করুন',
      close: 'বন্ধ করুন', open: 'ছবি খুলুন: ',
      soldNote: 'এই ছবিটি বিক্রি হয়ে গেছে। অনুরূপ কিছু চাইলে আমাদের মেসেজ করুন।',
      reservedNote: 'কেউ এই ছবির জন্য টাকা পাঠিয়েছেন এবং আমরা পেমেন্ট যাচাই করছি। নিশ্চিত না হলে ছবিটি আবার পাওয়া যাবে।',
      back: 'বিস্তারিতে ফিরে যান',
      payTitle: 'বিকাশে দাম দিন',
      payStep1: 'আপনার বিকাশ অ্যাপ খুলে বেছে নিন',
      payStep1b: 'সেন্ড মানি', payStep1c: 'পেমেন্ট',
      payTo: 'এই নম্বরে ঠিক এই পরিমাণ টাকা পাঠান:',
      payRef: 'রেফারেন্সে লিখুন:',
      copy: 'নম্বর কপি করুন', copied: 'কপি হয়েছে',
      afterPay: 'টাকা পাঠানোর পর এই ফর্মটি পূরণ করুন। বিকাশের কনফার্মেশন মেসেজে পাওয়া TrxID ব্যবহার করুন।',
      fName: 'আপনার নাম', fPhone: 'ফোন নম্বর', fEmail: 'ইমেইল (ঐচ্ছিক)',
      fAddress: 'ডেলিভারির ঠিকানা', fSender: 'যে বিকাশ নম্বর থেকে পাঠিয়েছেন (ঐচ্ছিক)',
      fTrx: 'বিকাশ TrxID', fTrxHint: 'যেমন: 9G4H7K2LMN', fNote: 'আমাদের জন্য নোট (ঐচ্ছিক)',
      submit: 'অর্ডার পাঠান', sending: 'পাঠানো হচ্ছে…',
      errGeneric: 'অর্ডার পাঠানো যায়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন।',
      errTaken: 'দুঃখিত, ছবিটি এইমাত্র অন্য কেউ নিয়ে নিয়েছেন। অনুগ্রহ করে অন্য একটি বেছে নিন।',
      doneTitle: 'অর্ডার পেয়েছি',
      doneText: 'ধন্যবাদ। আমরা আপনার বিকাশ পেমেন্ট যাচাই করে আপনার দেওয়া ফোন নম্বরে যোগাযোগ করব। সাধারণত কয়েক ঘণ্টা লাগে।',
      doneRef: 'আপনার অর্ডার রেফারেন্স:',
      doneClose: 'ছবিগুলোতে ফিরে যান',
      mailSubject: 'ছবি সম্পর্কে প্রশ্ন: ',
      waMsg: 'আসসালামু আলাইকুম, এই ছবিটি নিয়ে আমি আগ্রহী: ',
      waGeneral: 'আসসালামু আলাইকুম, আপনাদের ছবি নিয়ে আমার একটি প্রশ্ন আছে।',
      price: 'দাম',
      pricePending: 'দাম জিজ্ঞাসা করুন',
    },
  };

  // ---------- State ----------
  let lang = 'en';
  try { lang = localStorage.getItem('lang') === 'bn' ? 'bn' : 'en'; } catch (e) {}
  let cfg = { shopNameEn: '', shopNameBn: '', bkashNumber: '', bkashType: 'Personal', whatsappNumber: '', contactEmail: '', currency: '৳' };
  let paintings = [];
  let filter = 'all';
  let current = null;   // painting id open in dialog
  let view = 'details'; // details | order | done
  let doneRef = '';
  let siteViews = null;

  const $ = (s) => document.querySelector(s);
  const t = (k) => I18N[lang][k] != null ? I18N[lang][k] : (I18N.en[k] || k);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pick = (p, base) => {
    const en = p[base + 'En'], bn = p[base + 'Bn'];
    return lang === 'bn' ? (bn || en || '') : (en || bn || '');
  };
  const money = (n) => {
    if (!n) return t('pricePending');
    return cfg.currency + ' ' + new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-US').format(n);
  };
  const shopName = () => (lang === 'bn' ? cfg.shopNameBn || cfg.shopNameEn : cfg.shopNameEn || cfg.shopNameBn);
  const num = (n) => new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-US').format(n);
  const viewsText = (n) => (lang === 'bn' ? num(n) + ' বার দেখা হয়েছে' : n === 1 ? '1 view' : num(n) + ' views');
  // 8801733403122 -> 01733403122 (how people in Bangladesh write it)
  const localPhone = (n) => (/^880\d{10}$/.test(n || '') ? '0' + n.slice(3) : (n || ''));
  const waLink = (msg) => 'https://wa.me/' + encodeURIComponent(cfg.whatsappNumber) + '?text=' + encodeURIComponent(msg);
  const mailLink = (subject, body) => 'mailto:' + cfg.contactEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body || '');

  // ---------- Static text ----------
  function applyStaticText() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $('#langBtn').textContent = t('langBtn');
    $('#langBtn').setAttribute('aria-label', lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন');
    $('#dlgClose').setAttribute('aria-label', t('close'));
    const name = shopName();
    $('#brandName').textContent = name;
    $('#heroTitle').textContent = name;
    $('#footName').textContent = name;
    $('#footMail').textContent = cfg.contactEmail;
    document.title = name + (lang === 'bn' ? ' - হাতে আঁকা ছবি' : ' - Original paintings');
    $('#waTop').href = waLink(t('waGeneral'));
    $('#waContact').href = waLink(t('waGeneral'));
    $('#mailContact').href = mailLink(t('mailSubject') + name);
    document.querySelectorAll('[data-deco]').forEach((a) => { a.href = waLink(t(a.dataset.deco)); });
    $('#decoMail').textContent = cfg.contactEmail;
    $('#decoMail').href = mailLink(t('decoMailSubject'));
    $('#waNum').textContent = localPhone(cfg.whatsappNumber);
    $('#waNum').href = waLink(t('waGeneral'));
    $('#mailNum').textContent = cfg.contactEmail;
    $('#mailNum').href = mailLink(t('mailSubject') + name);
    renderSiteViews();
  }

  function renderSiteViews() {
    $('#footViews').textContent = cfg.showViews && siteViews != null ? t('siteViews') + ': ' + num(siteViews) : '';
  }

  // ---------- Gallery ----------
  function specLine(p) {
    return [p.size, pick(p, 'type')].filter(Boolean).join(', ');
  }

  function hungHTML(p, opts) {
    const title = pick(p, 'title');
    const sold = p.status === 'sold';
    return `
      <figure class="hung ${sold ? 'is-sold' : ''}">
        <button type="button" class="frame" data-id="${esc(p.id)}" aria-label="${esc(t('open') + title)}">
          <div class="matt"><img src="${esc(p.image)}" alt="${esc(title)}" ${opts && opts.eager ? '' : 'loading="lazy"'}></div>
        </button>
        <figcaption class="label">
          <p class="t">${esc(title)}</p>
          <p class="m">${esc(specLine(p))}</p>
          ${cfg.showViews ? `<p class="views">${esc(viewsText(p.views || 0))}</p>` : ''}
          <div class="row"><span class="price">${esc(money(p.price))}</span><span class="status ${esc(p.status)}">${esc(t(p.status))}</span></div>
        </figcaption>
      </figure>`;
  }

  function renderFeatured() {
    const box = $('#featured');
    const p = paintings.find((x) => x.status === 'available') || paintings[0];
    box.innerHTML = p ? hungHTML(p, { eager: true }) : '';
  }

  function renderWall() {
    const list = paintings.filter((p) => filter === 'all' || (filter === 'sold' ? p.status === 'sold' : p.status !== 'sold'));
    $('#wall').innerHTML = list.map((p) => hungHTML(p)).join('');
    $('#empty').hidden = list.length > 0;
  }

  function renderAll() {
    applyStaticText();
    renderFeatured();
    renderWall();
    if ($('#dlg').open) renderDialog();
  }

  // ---------- Dialog ----------
  function specRows(p) {
    const rows = [
      [t('size'), p.size],
      [t('type'), pick(p, 'type')],
      [t('materials'), pick(p, 'materials')],
      [t('colour'), pick(p, 'colour')],
      [t('year'), p.year],
    ].filter((r) => r[1]);
    return `<dl class="specs">${rows.map((r) => `<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl>`;
  }

  function detailsHTML(p) {
    const title = pick(p, 'title');
    const desc = pick(p, 'description');
    const link = location.origin + '/';
    const wa = waLink(t('waMsg') + title + ' ' + link);
    const mail = mailLink(t('mailSubject') + title, t('waMsg') + title);
    let note = '', buy = '';
    if (p.status === 'available') buy = `<button type="button" class="btn btn-bkash" id="buyBtn">${esc(t('buy'))}</button>`;
    else if (p.status === 'reserved') note = `<p class="note">${esc(t('reservedNote'))}</p>`;
    else note = `<p class="note">${esc(t('soldNote'))}</p>`;
    return `
      <div class="detail">
        <div class="pic"><img src="${esc(p.image)}" alt="${esc(title)}"></div>
        <div class="info">
          <h2 id="dlgTitle">${esc(title)}</h2>
          <p class="big-price">${esc(money(p.price))}</p>
          ${cfg.showViews ? `<p class="views" id="dlgViews">${esc(viewsText(p.views || 0))}</p>` : ''}
          ${specRows(p)}
          ${desc ? `<p class="desc">${esc(desc)}</p>` : ''}
          ${note}
          <div class="actions">
            ${buy}
            <a class="btn btn-wa" href="${esc(wa)}" target="_blank" rel="noopener">${esc(t('askWa'))}</a>
            <a class="btn btn-ghost" href="${esc(mail)}">${esc(t('askMail'))}</a>
          </div>
        </div>
      </div>`;
  }

  function orderHTML(p) {
    const title = pick(p, 'title');
    const field = (id, label, type, extra) => `
      <div class="field">
        <label for="${id}">${esc(label)}</label>
        ${type === 'textarea'
          ? `<textarea id="${id}" name="${id}" ${extra || ''}></textarea>`
          : `<input id="${id}" name="${id}" type="${type}" ${extra || ''}>`}
      </div>`;
    return `
      <div class="detail">
        <div class="pic"><img src="${esc(p.image)}" alt="${esc(title)}"></div>
        <div class="info">
          <button type="button" class="back" id="backBtn">${esc(t('back'))}</button>
          <h2 id="dlgTitle">${esc(t('payTitle'))}</h2>
          <div class="pay-box">
            <p>${esc(t('payStep1'))} <strong>${esc(cfg.bkashType === 'Merchant' ? t('payStep1c') : t('payStep1b'))}</strong>.</p>
            <p>${esc(t('payTo'))}</p>
            <p class="big-price">${esc(money(p.price))}</p>
            <div class="pay-num"><strong dir="ltr">${esc(cfg.bkashNumber)}</strong><button type="button" class="copy" id="copyBtn">${esc(t('copy'))}</button></div>
            <p style="margin-top:.6rem">${esc(t('payRef'))} <strong>${esc(title)}</strong></p>
          </div>
          <p class="note">${esc(t('afterPay'))}</p>
          <form class="order" id="orderForm" novalidate>
            ${field('name', t('fName'), 'text', 'required autocomplete="name"')}
            ${field('phone', t('fPhone'), 'tel', 'required autocomplete="tel" inputmode="tel"')}
            ${field('email', t('fEmail'), 'email', 'autocomplete="email"')}
            ${field('address', t('fAddress'), 'textarea', 'required autocomplete="street-address"')}
            ${field('senderNumber', t('fSender'), 'tel', 'inputmode="tel"')}
            <div class="field">
              <label for="trxId">${esc(t('fTrx'))}</label>
              <input id="trxId" name="trxId" type="text" required autocapitalize="characters" autocomplete="off" spellcheck="false" aria-describedby="trxHint">
              <small id="trxHint">${esc(t('fTrxHint'))}</small>
            </div>
            ${field('note', t('fNote'), 'textarea')}
            <p class="error" id="formError" role="alert" hidden></p>
            <div class="actions"><button type="submit" class="btn btn-bkash" id="submitBtn">${esc(t('submit'))}</button></div>
          </form>
        </div>
      </div>`;
  }

  function doneHTML(p) {
    return `
      <div class="detail">
        <div class="pic"><img src="${esc(p.image)}" alt="${esc(pick(p, 'title'))}"></div>
        <div class="info success">
          <h2 id="dlgTitle">${esc(t('doneTitle'))}</h2>
          <p>${esc(t('doneText'))}</p>
          <p>${esc(t('doneRef'))} <strong dir="ltr">${esc(doneRef)}</strong></p>
          <div class="actions">
            <button type="button" class="btn btn-primary" id="doneBtn">${esc(t('doneClose'))}</button>
            <a class="btn btn-wa" target="_blank" rel="noopener" href="${esc(waLink(t('waMsg') + pick(p, 'title') + ' (' + doneRef + ')'))}">${esc(t('whatsapp'))}</a>
          </div>
        </div>
      </div>`;
  }

  function renderDialog() {
    const p = paintings.find((x) => x.id === current);
    if (!p) { $('#dlg').close(); return; }
    const body = $('#dlgBody');
    // keep what the buyer already typed when switching language
    const saved = {};
    const form = $('#orderForm');
    if (form) new FormData(form).forEach((v, k) => { saved[k] = v; });

    body.innerHTML = view === 'order' ? orderHTML(p) : view === 'done' ? doneHTML(p) : detailsHTML(p);

    if (view === 'order') {
      Object.keys(saved).forEach((k) => { const el = $('#' + k); if (el) el.value = saved[k]; });
      $('#backBtn').onclick = () => { view = 'details'; renderDialog(); };
      $('#copyBtn').onclick = copyNumber;
      $('#orderForm').onsubmit = submitOrder;
    } else if (view === 'details') {
      const b = $('#buyBtn');
      if (b) b.onclick = () => { view = 'order'; renderDialog(); $('#dlg').scrollTop = 0; const n = $('#name'); if (n) n.focus(); };
    } else {
      $('#doneBtn').onclick = () => $('#dlg').close();
    }
  }

  function openDialog(id) {
    current = id; view = 'details';
    renderDialog();
    $('#dlg').showModal();
    $('#dlg').scrollTop = 0;
    countPaintingView(id);
  }

  // Count a painting once per browser session, however many times it is opened.
  async function countPaintingView(id) {
    const key = 'pv_' + id;
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1'); } catch (e) {}
    try {
      const res = await fetch('/api/views/painting/' + encodeURIComponent(id), { method: 'POST' });
      if (!res.ok) return;
      const json = await res.json();
      const p = paintings.find((x) => x.id === id);
      if (p && typeof json.views === 'number') {
        p.views = json.views;
        renderFeatured(); renderWall();
        const v = $('#dlgViews'); if (v) v.textContent = viewsText(p.views);
      }
    } catch (e) {}
  }

  // Count the visit once per browser session; later page loads only read the total.
  async function countSiteView() {
    let counted = false;
    try { counted = !!sessionStorage.getItem('sv'); if (!counted) sessionStorage.setItem('sv', '1'); } catch (e) {}
    try {
      const res = counted ? await fetch('/api/stats') : await fetch('/api/views/site', { method: 'POST' });
      const json = await res.json();
      if (typeof json.siteViews === 'number') { siteViews = json.siteViews; renderSiteViews(); }
    } catch (e) {}
  }

  function copyNumber() {
    const btn = $('#copyBtn');
    const done = () => { btn.textContent = t('copied'); setTimeout(() => { btn.textContent = t('copy'); }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(cfg.bkashNumber).then(done, () => {});
  }

  async function submitOrder(e) {
    e.preventDefault();
    const form = e.target;
    const err = $('#formError');
    const btn = $('#submitBtn');
    err.hidden = true;
    const data = Object.fromEntries(new FormData(form).entries());
    data.paintingId = current;
    btn.disabled = true; btn.textContent = t('sending');
    try {
      const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        doneRef = json.orderId || '';
        view = 'done';
        await loadPaintings();
        renderDialog();
        return;
      }
      err.textContent = json.error === 'unavailable' ? t('errTaken') : (json.error || t('errGeneric'));
      if (json.error === 'unavailable') await loadPaintings();
    } catch (x) {
      err.textContent = t('errGeneric');
    }
    err.hidden = false;
    btn.disabled = false; btn.textContent = t('submit');
  }

  // ---------- Data ----------
  async function loadPaintings() {
    try {
      const res = await fetch('/api/paintings');
      paintings = await res.json();
    } catch (e) { paintings = []; }
    renderFeatured();
    renderWall();
  }

  // ---------- Events ----------
  document.addEventListener('click', (e) => {
    const frame = e.target.closest('button.frame');
    if (frame) openDialog(frame.dataset.id);
  });
  $('#dlgClose').addEventListener('click', () => $('#dlg').close());
  $('#dlg').addEventListener('click', (e) => { if (e.target === $('#dlg')) $('#dlg').close(); });
  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'en' ? 'bn' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    renderAll();
  });
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      filter = chip.dataset.filter;
      document.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      renderWall();
    });
  });

  // ---------- Start ----------
  (async function init() {
    try { cfg = Object.assign(cfg, await (await fetch('/api/config')).json()); } catch (e) {}
    applyStaticText();
    await loadPaintings();
    countSiteView();
  })();
})();
