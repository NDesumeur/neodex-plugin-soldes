// lancé par le test « local » de NeoDex : vérification interne (lecture des prix), un produit avec 4 relevés dont une baisse sous la cible, carte allumée et courbe dessinée
module.exports = async ({ pj, sleep }) => {
  const sc = await pj(`document.querySelector('[data-selfcheck]')?.dataset.selfcheck`); if (sc !== 'ok') throw new Error('vérification interne : ' + sc);
  const n = await pj(`document.getElementById('soList').__add('Casque sans fil', [129.99, 134.5, 119, 89.9], 95)`);
  if (n !== 4) throw new Error('relevés : ' + n); await sleep(300);
  const t = await pj(`document.getElementById('soList').innerText`);
  if (!/89,90/.test(t) || !/40,09/.test(t)) throw new Error('carte : ' + t.slice(0, 300));
  if (!await pj(`!!document.querySelector('#soList .sysCard.on canvas')`)) throw new Error('cible atteinte non signalée');
  return 'prix lus, 4 relevés, cible atteinte';
};
