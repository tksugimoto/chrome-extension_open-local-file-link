
( **Français(French)** /[English](README.md) /[日本語(Japanese)](README-ja.md) )

# Accéder aux fichiers locaux
A l'inverse d'IE, Chrome ne peut pas ouvrir de fichier local (file://).
Cette extension vous permet d'ouvrir des fichiers locaux depuis Chrome.

1. Cliquer sur un lien vers un fichier local.<br>
    <img src="chrome-store/screenshot-01.png" width="640px;">
1. Le fichier s'ouvre.

# Chrome Store
https://chrome.google.com/webstore/detail/nikfmfgobenbhmocjaaboihbeocackld

# Todo
- [x] Ouvrir un fichier local en cliquant sur son lien.
- [x] Renforcer la sécurité (empêcher l'ouverture arbitraire de lien en Javascript).
    - [x] ~~Rendre possible de choisir les pages qui peuvent être ouvertes (confirmé par une notification).~~ Remplacé par la méthode suivante.
    - [x] S'ouvre uniquement lorsque l'utilisateur clique dessus (plus de confirmation par notification).
        - De sorte à interdire l'ouverture (infinie)  de pages malicieuses par des scripts.
        - [Event.isTrusted - Web APIs | MDN](https://developer.mozilla.org/en/docs/Web/API/Event/isTrusted "https://developer.mozilla.org/en/docs/Web/API/Event/isTrusted") est utilisé.
- [ ] Lier les fichiers locaux dans les balises `<pre>` ou `<code>`.
- [ ] Faire en sorte que les fichiers ppt, xls etc. s'ouvrent directement (Native Messaging + changement du registre nécessaire).
