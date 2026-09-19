/* 默认英语；中文与英文集中写在 HTML 对应元素上，无网络请求或依赖。 */
(() => {
  'use strict';
  const storageKey = 'cozz-language';
  const textNodes = [...document.querySelectorAll('[data-zh]')].map(element => ({
    element, en: element.textContent, zh: element.dataset.zh
  }));
  const labelNodes = [...document.querySelectorAll('[data-zh-label]')].map(element => ({
    element, en: element.getAttribute('aria-label'), zh: element.dataset.zhLabel
  }));
  const descriptions = {
    en: 'XieChengzong — Graduate Student, School of Cyber Science and Technology, Shandong University. Research, projects and personal notes.',
    zh: 'XieChengzong 的个人主页。山东大学网络空间安全学院研究生，记录研究、探索与成长。'
  };
  const buttons = [...document.querySelectorAll('[data-language]')];
  function setLanguage(language, announce = false) {
    const lang = language === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    textNodes.forEach(item => { item.element.textContent = item[lang]; });
    labelNodes.forEach(item => { item.element.setAttribute('aria-label', item[lang]); });
    document.querySelector('meta[name="description"]').content = descriptions[lang];
    document.title = lang === 'zh' ? 'Cozz. | XieChengzong · 个人主页' : 'Cozz. | XieChengzong';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === lang)));
    if (announce) {
      document.getElementById('language-status').textContent = lang === 'zh' ? '已切换到中文' : 'Switched to English';
      try { localStorage.setItem(storageKey, lang); } catch { /* 隐私模式或禁用存储时仍能切换。 */ }
    }
  }
  let saved = 'en';
  try { saved = localStorage.getItem(storageKey) || 'en'; } catch { /* 首次访问默认英语。 */ }
  setLanguage(saved);
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
  document.querySelector('.language-switch').hidden = false;
  // Both scroll layouts share the same Home / Back to top links.
  document.querySelectorAll('a[href="#home"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      document.getElementById('main').scrollTo({ top: 0, behavior });
      window.scrollTo({ top: 0, behavior });
      history.replaceState(null, '', '#home');
    });
  });
})();
