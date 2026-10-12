import {ARTISTS, EPOCHS} from "./artists.js";
import {Observable} from "./observable.js";
import {yearToPercent, assignLanes, stackLanes, formatYears} from "./timeline.js";
import {DevTool} from "./devtool.js";

const COMPACT_BELOW_PX = 640;

const selectedId = Observable("leonardo");
const hoveredId = Observable(null);
const filter = Observable("all");
const compact = Observable(false);

const track = document.getElementById("track");
const axis = document.getElementById("axis");
const guide = document.getElementById("guide");
const guideYear = document.getElementById("guide-year");

const wideLanes = assignLanes(ARTISTS);
const stackedLanes = stackLanes(ARTISTS);

[1400, 1450, 1500, 1550, 1600, 1650, 1700].forEach(year => {
    const left = yearToPercent(year) + "%";

    const line = document.createElement("div");
    line.className = "tick-line";
    line.style.left = left;
    line.setAttribute("aria-hidden", "true");
    track.prepend(line);

    const label = document.createElement("span");
    label.className = "tick-label";
    label.style.left = left;
    label.textContent = String(year);
    axis.append(label);
});

const barsById = new Map();

ARTISTS.forEach(artist => {
    const bar = document.createElement("button");
    bar.type = "button";
    bar.className = "bar";
    bar.dataset.epoch = artist.epoch;
    bar.textContent = artist.name;
    bar.title = artist.name;
    bar.setAttribute("aria-label", artist.name + ", " + formatYears(artist) + ", " + EPOCHS[artist.epoch].label);

    const left = yearToPercent(artist.born);
    const width = yearToPercent(artist.died) - left;
    bar.style.setProperty("--left", left + "%");
    bar.style.setProperty("--width", width + "%");

    bar.addEventListener("click", () => {
        selectedId.setValue(selectedId.getValue() === artist.id ? null : artist.id);
    });
    bar.addEventListener("pointerenter", () => hoveredId.setValue(artist.id));
    bar.addEventListener("pointerleave", () => hoveredId.setValue(null));
    bar.addEventListener("focus", () => hoveredId.setValue(artist.id));
    bar.addEventListener("blur", () => hoveredId.setValue(null));

    track.append(bar);
    barsById.set(artist.id, bar);
});

document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => filter.setValue(chip.dataset.filter));
});
document.getElementById("detail-clear").addEventListener("click", () => selectedId.setValue(null));

const resizeObserver = new ResizeObserver(entries => {
    const width = entries[0].contentRect.width;
    compact.setValue(width < COMPACT_BELOW_PX);
});
resizeObserver.observe(track);

const findArtist = id => ARTISTS.find(artist => artist.id === id);

compact.onChange(isCompact => {
    const lanes = isCompact ? stackedLanes : wideLanes;
    track.classList.toggle("is-compact", isCompact);
    track.style.setProperty("--lanes", String(Math.max(...lanes.values()) + 1));
    barsById.forEach((bar, id) => bar.style.setProperty("--lane", String(lanes.get(id))));
});

selectedId.onChange(id => {
    barsById.forEach((bar, barId) => bar.setAttribute("aria-pressed", String(barId === id)));

    const artist = findArtist(id);
    document.getElementById("detail").hidden = !artist;
    document.getElementById("empty").hidden = Boolean(artist);
    if (!artist) {
        return;
    }

    const epochEl = document.getElementById("detail-epoch");
    epochEl.textContent = EPOCHS[artist.epoch].label;
    epochEl.style.setProperty("--solid", "var(--" + artist.epoch + ")");

    document.getElementById("detail-name").textContent = artist.name;
    document.getElementById("detail-years").textContent = formatYears(artist) + " · " + (artist.died - artist.born) + " Jahre";
    document.getElementById("detail-place").textContent = artist.place;
    document.getElementById("detail-work").textContent = artist.work;
});

hoveredId.onChange(id => {
    const artist = findArtist(id);
    guide.hidden = !artist;
    guideYear.hidden = !artist;
    if (!artist) {
        return;
    }

    const left = yearToPercent(artist.born) + "%";
    guide.style.left = left;
    guideYear.style.left = left;
    guideYear.textContent = String(artist.born);
});

filter.onChange(active => {
    document.querySelectorAll(".chip").forEach(chip => {
        chip.setAttribute("aria-pressed", String(chip.dataset.filter === active));
    });
    ARTISTS.forEach(artist => {
        const dimmed = active !== "all" && artist.epoch !== active;
        barsById.get(artist.id).classList.toggle("is-dimmed", dimmed);
    });
});

DevTool({selectedId, hoveredId, filter, compact});
