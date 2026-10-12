# workshop-web-experience

Workshop Web Experience HS26, FHNW – Gruppe 5

**Auswahlkomponente „Timeline“:** Künstler:innen von 1400 bis 1700 werden als Balken über ihre Lebenszeit dargestellt. Man kann einen Balken auswählen, nach Epoche filtern und sieht beim Hovern das Geburtsjahr auf der Achse.

## Starten

ES-Module funktionieren nicht per Doppelklick (`file://`). Die Seite muss über einen lokalen Server laufen:

- **IntelliJ / WebStorm:** `index.html` öffnen → oben rechts auf ein Browser-Icon klicken
- **oder Terminal:** `npx serve .` bzw. `python -m http.server` → http://localhost:3000 bzw. :8000

Tests: `test/test.html` genauso öffnen, Ergebnis steht auf der Seite und in der Konsole.

## Developer Tool

**Shift + D** drücken oder `index.html?dev` öffnen. Ein Panel zeigt live den Zustand (`selectedId`, `hoveredId`, `filter`, `compact`) und die aktuelle Fenstergrösse.

## Resize

Alle Positionen sind in Prozent, die Timeline wächst und schrumpft also mit dem Fenster. Ein `ResizeObserver` misst die Breite der Zeitachse: Unter 640 px wechselt sie ins kompakte Layout mit einer Person pro Zeile, damit jeder Name lesbar bleibt.

## Struktur

```
index.html            Markup: Kopf, Filter, Zeitachse, Detailkarte
css/timeline.css      Design-Tokens (= Style Tile), alle Zustände, kompaktes Layout, Developer Tool
js/artists.js         Daten (Künstler:innen, Epochen)
js/observable.js      Observable-Muster aus den Kursfolien
js/timeline.js        Reine Rechenfunktionen (Position, Zeilen) – testbar
js/devtool.js         Developer Tool
js/main.js            Verbindet Daten, Zustand und DOM
test/                 Tests für timeline.js
docs/                 Notizen und Fragen für die Dozierenden
```

## Prinzip

- **JS rechnet, CSS gestaltet:** JS setzt nur Position (`--left`, `--width`, `--lane`) und Zustände (`aria-pressed`, `is-dimmed`, `is-compact`). Wie das aussieht, steht ausschliesslich in `timeline.css`.
- **Zustand in Observables:** Events ändern den Zustand, Listener aktualisieren das DOM.
- **Zugänglich:** Balken und Filter sind echte `<button>`, per Tab und Enter bedienbar. Fokus sieht aus wie Hover.
- **Code-Stil:** jede JavaScript-Anweisung endet mit `;`.

## Team

- Larissa Tharshan
- Elena Henrici