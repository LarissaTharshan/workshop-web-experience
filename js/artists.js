export {EPOCHS, ARTISTS};

const EPOCHS = {
    gotik: {label: "Spätgotik"},
    ren: {label: "Renaissance"},
    bar: {label: "Barock"}
};

const ARTISTS = [
    {
        id: "vaneyck",
        name: "Jan van Eyck",
        born: 1390,
        died: 1441,
        approx: true,
        epoch: "gotik",
        place: "Brügge",
        work: "Genter Altar"
    },
    {
        id: "botticelli",
        name: "Sandro Botticelli",
        born: 1445,
        died: 1510,
        approx: false,
        epoch: "ren",
        place: "Florenz",
        work: "Die Geburt der Venus"
    },
    {
        id: "leonardo",
        name: "Leonardo da Vinci",
        born: 1452,
        died: 1519,
        approx: false,
        epoch: "ren",
        place: "Florenz, Mailand",
        work: "Mona Lisa"
    },
    {
        id: "duerer",
        name: "Albrecht Dürer",
        born: 1471,
        died: 1528,
        approx: false,
        epoch: "ren",
        place: "Nürnberg",
        work: "Selbstbildnis im Pelzrock"
    },
    {
        id: "michelangelo",
        name: "Michelangelo",
        born: 1475,
        died: 1564,
        approx: false,
        epoch: "ren",
        place: "Florenz, Rom",
        work: "Deckenfresken der Sixtinischen Kapelle"
    },
    {
        id: "raffael",
        name: "Raffael",
        born: 1483,
        died: 1520,
        approx: false,
        epoch: "ren",
        place: "Urbino, Rom",
        work: "Die Schule von Athen"
    },
    {
        id: "tizian",
        name: "Tizian",
        born: 1488,
        died: 1576,
        approx: true,
        epoch: "ren",
        place: "Venedig",
        work: "Venus von Urbino"
    },
    {
        id: "bruegel",
        name: "Pieter Bruegel d. Ä.",
        born: 1525,
        died: 1569,
        approx: true,
        epoch: "ren",
        place: "Antwerpen, Brüssel",
        work: "Die Jäger im Schnee"
    },
    {
        id: "caravaggio",
        name: "Caravaggio",
        born: 1571,
        died: 1610,
        approx: false,
        epoch: "bar",
        place: "Rom",
        work: "Die Berufung des Matthäus"
    },
    {
        id: "rubens",
        name: "Peter Paul Rubens",
        born: 1577,
        died: 1640,
        approx: false,
        epoch: "bar",
        place: "Antwerpen",
        work: "Kreuzaufrichtung"
    },
    {
        id: "gentileschi",
        name: "Artemisia Gentileschi",
        born: 1593,
        died: 1656,
        approx: true,
        epoch: "bar",
        place: "Rom, Neapel",
        work: "Judith enthauptet Holofernes"
    },
    {
        id: "rembrandt",
        name: "Rembrandt",
        born: 1606,
        died: 1669,
        approx: false,
        epoch: "bar",
        place: "Amsterdam",
        work: "Die Nachtwache"
    },
    {
        id: "vermeer",
        name: "Johannes Vermeer",
        born: 1632,
        died: 1675,
        approx: false,
        epoch: "bar",
        place: "Delft",
        work: "Das Mädchen mit dem Perlenohrring"
    }
];
