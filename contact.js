(() => {
  'use strict';

  const form = document.getElementById('inquiryForm');
  if (!form) return;

  /* index.html の各リンクが付ける ?type= と、種別セレクトの値の対応。
     リンクを増やすときは index.html 側と対でここに足す（初版は consult と info の2つ） */
  const TYPE_MAP = {
    consult: '導入を検討している',
    info: 'サービスについて詳しく聞きたい',
  };

  /* Pre-select inquiry type from ?type= query param */
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const typeSelect = document.getElementById('inquiryType');

  if (type && TYPE_MAP[type] && typeSelect) {
    typeSelect.value = TYPE_MAP[type];
  }

  const formPanel = document.getElementById('formPanel');
  const thanksPanel = document.getElementById('thanksPanel');
  const thanksType = document.getElementById('thanksType');
  const submitBtn = document.getElementById('submitBtn');
  const formError = document.getElementById('formError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.reportValidity()) return;

    /* Formspree のフォームIDが差し替え前なら送らない（送っても届かず、送った側には成功に見えてしまう） */
    if (form.action.includes('FORMSPREE_FORM_ID')) {
      if (formError) formError.hidden = false;
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    if (formError) formError.hidden = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error('submission failed');

        if (thanksType) thanksType.textContent = typeSelect.value || 'お問い合わせ';
        if (formPanel) formPanel.hidden = true;
        if (thanksPanel) {
          thanksPanel.hidden = false;
          thanksPanel.setAttribute('tabindex', '-1');
          thanksPanel.focus();
          thanksPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      })
      .catch(() => {
        if (formError) formError.hidden = false;
      })
      .finally(() => {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      });
  });
})();
