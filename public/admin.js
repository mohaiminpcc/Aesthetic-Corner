(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const FIELDS = ['titleEn', 'titleBn', 'price', 'size', 'typeEn', 'typeBn', 'materialsEn', 'materialsBn', 'colourEn', 'colourBn', 'year', 'descriptionEn', 'descriptionBn'];
  const STATUS = { available: 'Available', reserved: 'Payment being checked', sold: 'Sold' };

  let paintings = [];
  let editingId = null;

  async function api(url, opts) {
    const res = await fetch(url, opts);
    const json = await res.json().catch(() => ({}));
    if (res.status === 401 && url !== '/api/login') { showLogin(); throw new Error('Please log in again'); }
    if (!res.ok) throw new Error(json.error || 'Something went wrong');
    return json;
  }

  // ---------- Views ----------
  function showLogin() {
    $('#loginView').hidden = false; $('#appView').hidden = true; $('#logoutBtn').hidden = true;
    $('#username').focus();
  }
  async function showApp() {
    $('#loginView').hidden = true; $('#appView').hidden = false; $('#logoutBtn').hidden = false;
    await Promise.all([loadPaintings(), loadOrders()]);
  }
  function tab(which) {
    const p = which === 'p';
    $('#paintingsPane').hidden = !p; $('#ordersPane').hidden = p;
    $('#tabP').setAttribute('aria-pressed', String(p)); $('#tabO').setAttribute('aria-pressed', String(!p));
  }
  $('#tabP').onclick = () => tab('p');
  $('#tabO').onclick = () => tab('o');

  // ---------- Login ----------
  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#loginError'); err.hidden = true;
    try {
      await api('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: $('#username').value, password: $('#password').value }) });
      $('#password').value = '';
      showApp();
    } catch (x) { err.textContent = x.message; err.hidden = false; }
  });
  $('#logoutBtn').onclick = async () => { await fetch('/api/logout', { method: 'POST' }); showLogin(); };

  // ---------- Paintings ----------
  async function loadPaintings() {
    paintings = await api('/api/paintings');
    const stats = await api('/api/stats').catch(() => ({}));
    $('#stSite').textContent = Number(stats.siteViews || 0).toLocaleString();
    $('#stPaint').textContent = paintings.reduce((n, p) => n + (p.views || 0), 0).toLocaleString();
    const list = $('#list');
    $('#noPaintings').hidden = paintings.length > 0;
    list.innerHTML = paintings.map((p) => `
      <div class="row-card">
        <img src="${esc(p.image)}" alt="">
        <div>
          <h3>${esc(p.titleEn || p.titleBn)}</h3>
          <p>${esc([p.size, p.typeEn].filter(Boolean).join(', '))}${p.price ? ' · ৳ ' + esc(p.price) : ''}</p>
          <p>${esc((p.views || 0).toLocaleString())} views</p>
          <p><span class="pill ${p.status === 'sold' ? 'rejected' : p.status === 'reserved' ? 'pending' : 'confirmed'}">${esc(STATUS[p.status] || p.status)}</span></p>
        </div>
        <div class="row-actions">
          <button class="btn btn-ghost small" data-edit="${esc(p.id)}" type="button">Edit</button>
          <button class="btn btn-danger small" data-del="${esc(p.id)}" type="button">Delete</button>
        </div>
      </div>`).join('');
  }

  $('#list').addEventListener('click', async (e) => {
    const ed = e.target.closest('[data-edit]');
    const del = e.target.closest('[data-del]');
    if (ed) startEdit(ed.dataset.edit);
    if (del) {
      const p = paintings.find((x) => x.id === del.dataset.del);
      if (!p || !confirm('Delete "' + (p.titleEn || p.titleBn) + '"? This cannot be undone.')) return;
      try { await api('/api/admin/paintings/' + p.id, { method: 'DELETE' }); await loadPaintings(); if (editingId === p.id) resetForm(); } catch (x) { alert(x.message); }
    }
  });

  function resetForm() {
    editingId = null;
    $('#paintingForm').reset();
    $('#preview').hidden = true;
    $('#formTitle').textContent = 'Add a painting';
    $('#saveBtn').textContent = 'Upload painting';
    $('#cancelEdit').hidden = true;
    $('#statusField').hidden = true;
    $('#imageLabel').textContent = 'Photo (JPG, PNG or WEBP, up to 8 MB)';
    $('#formError').hidden = true;
  }

  function startEdit(id) {
    const p = paintings.find((x) => x.id === id);
    if (!p) return;
    resetForm();
    editingId = id;
    FIELDS.forEach((f) => { $('#' + f).value = p[f] == null ? '' : p[f]; });
    $('#status').value = p.status;
    $('#statusField').hidden = false;
    $('#preview').src = p.image; $('#preview').hidden = false;
    $('#imageLabel').textContent = 'Replace photo (leave empty to keep the current one)';
    $('#formTitle').textContent = 'Edit painting';
    $('#saveBtn').textContent = 'Save changes';
    $('#cancelEdit').hidden = false;
    $('#formTitle').scrollIntoView({ behavior: 'smooth' });
  }
  $('#cancelEdit').onclick = resetForm;

  $('#image').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (f) { $('#preview').src = URL.createObjectURL(f); $('#preview').hidden = false; }
  });

  $('#paintingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#formError'); err.hidden = true;
    const btn = $('#saveBtn'); const label = btn.textContent;
    const fd = new FormData();
    FIELDS.forEach((f) => fd.append(f, $('#' + f).value));
    const file = $('#image').files[0];
    if (file) fd.append('image', file);
    if (editingId) fd.append('status', $('#status').value);
    if (!editingId && !file) { err.textContent = 'Please choose a photo of the painting.'; err.hidden = false; return; }
    if (!$('#titleEn').value.trim() && !$('#titleBn').value.trim()) { err.textContent = 'Please enter a title in English or Bangla.'; err.hidden = false; return; }
    btn.disabled = true; btn.textContent = 'Saving…';
    try {
      await api(editingId ? '/api/admin/paintings/' + editingId : '/api/admin/paintings', { method: editingId ? 'PUT' : 'POST', body: fd });
      const wasEdit = !!editingId;
      resetForm();
      await loadPaintings();
      if (!wasEdit) $('#list').scrollIntoView({ behavior: 'smooth' });
    } catch (x) { err.textContent = x.message; err.hidden = false; }
    btn.disabled = false; if (btn.textContent === 'Saving…') btn.textContent = label;
  });

  // ---------- Orders ----------
  async function loadOrders() {
    const orders = await api('/api/admin/orders');
    const pending = orders.filter((o) => o.status === 'pending').length;
    $('#orderBadge').textContent = pending ? String(pending) : '';
    $('#noOrders').hidden = orders.length > 0;
    $('#orders').innerHTML = orders.map((o) => `
      <div class="order-card">
        <h3>${esc(o.paintingTitle)} <span class="pill ${esc(o.status)}">${esc(o.status)}</span></h3>
        <p class="meta">${esc(new Date(o.createdAt).toLocaleString())}</p>
        <p><strong>${esc(o.name)}</strong>, <a href="tel:${esc(o.phone)}">${esc(o.phone)}</a>${o.email ? ', ' + esc(o.email) : ''}</p>
        <p>${esc(o.address)}</p>
        <p>Amount: ৳ ${esc(o.price)}</p>
        <p>bKash TrxID: <span class="trx">${esc(o.trxId)}</span>${o.senderNumber ? ' from ' + esc(o.senderNumber) : ''}</p>
        ${o.note ? `<p class="meta">Note: ${esc(o.note)}</p>` : ''}
        ${o.status === 'pending' ? `<div class="actions">
          <button class="btn btn-primary small" data-act="confirm" data-id="${esc(o.id)}" type="button">Payment received, confirm</button>
          <button class="btn btn-danger small" data-act="reject" data-id="${esc(o.id)}" type="button">Reject</button>
        </div>` : ''}
      </div>`).join('');
  }

  $('#orders').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const verb = b.dataset.act === 'confirm' ? 'Confirm this order and mark the painting as sold?' : 'Reject this order and make the painting available again?';
    if (!confirm(verb)) return;
    try {
      await api('/api/admin/orders/' + b.dataset.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: b.dataset.act }) });
      await Promise.all([loadOrders(), loadPaintings()]);
    } catch (x) { alert(x.message); }
  });

  // ---------- Start ----------
  (async function init() {
    try {
      const me = await (await fetch('/api/me')).json();
      if (me.loggedIn) showApp(); else showLogin();
    } catch (e) { showLogin(); }
  })();
})();
