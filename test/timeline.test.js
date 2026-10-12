import {yearToPercent, assignLanes, stackLanes, formatYears, START_YEAR, END_YEAR} from "../js/timeline.js";

let failures = 0;
const assertEquals = (actual, expected, message) => {
    if (actual === expected) {
        console.log("✓ " + message);
    } else {
        failures++;
        console.error("✗ " + message + " – erwartet " + expected + ", erhalten " + actual);
    }
};

// yearToPercent
assertEquals(yearToPercent(START_YEAR), 0, "Startjahr liegt ganz links");
assertEquals(yearToPercent(END_YEAR), 100, "Endjahr liegt ganz rechts");
assertEquals(yearToPercent(1540), 50, "Mitte der Achse");

// assignLanes: zwei überlappende Personen landen in verschiedenen Zeilen
const overlap = assignLanes([
    {id: "a", born: 1450, died: 1500},
    {id: "b", born: 1470, died: 1520}
]);
assertEquals(overlap.get("a") !== overlap.get("b"), true, "Überlappende Balken in verschiedenen Zeilen");

// assignLanes: nacheinander lebende Personen teilen sich eine Zeile
const sequential = assignLanes([
    {id: "a", born: 1450, died: 1500},
    {id: "b", born: 1510, died: 1560}
]);
assertEquals(sequential.get("a"), sequential.get("b"), "Nicht überlappende Balken teilen eine Zeile");

// stackLanes: jede Person eine eigene Zeile, nach Geburtsjahr sortiert
const stacked = stackLanes([
    {id: "spaet", born: 1600},
    {id: "frueh", born: 1400}
]);
assertEquals(stacked.get("frueh"), 0, "Früheste Person in der obersten Zeile");
assertEquals(stacked.get("spaet"), 1, "Spätere Person darunter");

// formatYears
assertEquals(formatYears({born: 1452, died: 1519, approx: false}), "1452–1519", "Exakte Jahre");
assertEquals(formatYears({born: 1390, died: 1441, approx: true}), "um 1390–1441", "Ungefähre Jahre mit 'um'");

console.log(failures === 0 ? "Alle Tests grün." : failures + " Test(s) fehlgeschlagen.");
document.body.textContent = failures === 0 ? "Alle Tests grün ✓ (Details in der Konsole)" : failures + " Test(s) fehlgeschlagen – siehe Konsole";
