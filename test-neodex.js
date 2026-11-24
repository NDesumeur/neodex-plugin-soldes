// lancé par le test « local » de NeoDex : vérification interne (lecture des prix), un produit avec 4 relevés dont une baisse sous la cible, carte allumée et courbe dessinée,
// puis pour de vrai dans un onglet de NeoDex : une petite boutique locale ; le bouton SURVEILLER CE PRIX n'apparaît que sur la fiche produit, il ajoute le produit, et à la visite suivante il relève le nouveau prix
module.exports = async ({ pj, js, sleep, shot }) => {
  const sc = await pj(`document.querySelector('[data-selfcheck]')?.dataset.selfcheck`); if (sc !== 'ok') throw new Error('vérification interne : ' + sc);
  const n = await pj(`document.getElementById('soList').__add('Casque sans fil', [129.99, 134.5, 119, 89.9], 95)`);
  if (n !== 4) throw new Error('relevés : ' + n); await sleep(300);
  const t = await pj(`document.getElementById('soList').innerText`);
  if (!/89,90/.test(t) || !/40,09/.test(t)) throw new Error('carte : ' + t.slice(0, 300));
  if (!await pj(`!!document.querySelector('#soList .sysCard.on canvas')`)) throw new Error('cible atteinte non signalée');

  let price = '49.90';
  const srv = require('http').createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    r.end(q.url.startsWith('/p/') ? `<!doctype html><title>Lampe de bureau – Boutique</title><script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"Lampe de bureau","offers":{"@type":"Offer","price":"${price}","priceCurrency":"EUR"}}</script><h1>Lampe de bureau</h1><p>${price} €</p>`
      : '<!doctype html><title>Le blog</title><p>Rien à vendre ici.</p>'); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port;
  const bar = () => js(`$('bPage').hidden ? '' : $('bPage').textContent`);
  const card = () => pj(`[...document.querySelectorAll('#soList .sysCard')].find(c => /Lampe de bureau/.test(c.innerText))?.innerText || ''`);
  try {
    await js(`newTab(${JSON.stringify(base + '/blog')}), 0`); await sleep(2000);
    if (await bar()) throw new Error('un bouton sur une page sans produit : ' + await bar());
    await js(`(active.v.src = ${JSON.stringify(base + '/p/lampe-42?utm=x')}), 0`); await sleep(2000);
    const b1 = await bar(); if (!/SURVEILLER CE PRIX/.test(b1)) throw new Error('pas de bouton sur la fiche produit : ' + JSON.stringify(b1));
    if (shot) await shot('barre');
    await js(`$('bPage').querySelector('button').click(), 0`); await sleep(1500);
    const c1 = await card(); if (!/49,90/.test(c1)) throw new Error('après le clic : ' + c1.slice(0, 200));
    if (await js(`active && !active.app && /lampe-42/.test(active.url)`) !== true) throw new Error('le clic a quitté la page du produit');
    price = '44.50'; await js(`(active.v.src = ${JSON.stringify(base + '/p/lampe-42/?ref=mail')}), 0`); await sleep(2000);
    await js(`$('bPage').querySelector('button').click(), 0`); await sleep(1500);
    const c2 = await card(); if (!/44,50/.test(c2) || !/−5,40/.test(c2)) throw new Error('2e visite : ' + c2.slice(0, 200));
  } finally {
    srv.close(); await js(`(active && !active.app && closeTab(active)), 0`).catch(() => {});
    await pj(`document.getElementById('soList').__drop(/127\\.0\\.0\\.1|exemple\\.invalid/)`).catch(() => {});  // le profil de test reste propre
  }
  return 'prix lus, 4 relevés, cible atteinte · dans un vrai onglet : pas de bouton sans produit, SURVEILLER CE PRIX ajoute la lampe (49,90 €), la 2e visite relève 44,50 € (−5,40 €), on reste sur la page';
};
