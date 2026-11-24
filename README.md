# Soldes

Le prix des produits que tu attends, surveillé pour toi.

*English version: [README.en.md](README.en.md)*

## Surveiller ce prix (nouveau en 1.1.0)

Sur la page d'un produit ouverte dans NeoDex, le bouton SURVEILLER CE PRIX de la barre d'adresse le suit d'un clic, avec le prix affiché. Sur un produit déjà suivi, il relève le prix du moment.

## Comment ça marche

- Colle l’adresse de la **page du produit** et, si tu veux, un **prix cible**, puis **Suivre**.
- NeoDex lit le prix sur la page (les données produit que la plupart des boutiques publient), puis **toutes les 6 heures**, même onglet fermé.
- Quand le prix **baisse**, tu reçois une **notification** (cliquer dessus ouvre la page). Sous ta cible, la carte s’allume.
- Chaque produit a sa **courbe de prix** (vert quand ça baisse, rose quand ça monte, pointillés pour la cible), son prix le plus bas et l’écart depuis le début.
- **À la main** : certains sites bloquent les robots. Note alors le prix toi-même, la courbe continue.

## Autorisations

- **Données** : tes produits et l’historique des prix.
- **Réseau (tous les sites)** : lire la page des produits que tu ajoutes, et seulement celles-là.
- **Notifications** : te prévenir d’une baisse.
- **Tâche de fond** : vérifier toutes les 6 heures, même onglet fermé.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Soldes → Installer**.

## Surveiller ce prix, depuis le navigateur (1.1.0)

Sur la page d’un produit ouverte dans NeoDex, un bouton **SURVEILLER CE PRIX** apparaît à droite de la barre d’adresse. Un clic, et le produit est suivi avec le prix affiché, sans quitter la page.

- Le bouton n’apparaît que sur les fiches produit (celles qui donnent leur prix aux moteurs de recherche, comme la plupart des boutiques).
- Le prix est lu **dans la page que tu vois** : ça marche aussi sur les sites qui bloquent les robots.
- Sur un produit déjà suivi, le même bouton **relève le prix du moment** et te dit de combien il a bougé.
- Jamais dans un onglet privé. Soldes ne voit que l’adresse, le titre et les données du produit, et seulement quand tu cliques.

Il faut NeoDex 3.4.2 ou plus récent.
