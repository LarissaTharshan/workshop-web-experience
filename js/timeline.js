export {START_YEAR, END_YEAR, yearToPercent, assignLanes, stackLanes, formatYears};

const START_YEAR = 1380;
const END_YEAR = 1700;

const yearToPercent = year => (year - START_YEAR) / (END_YEAR - START_YEAR) * 100;

const assignLanes = (artists, gap = 4) => {
    const laneEnds = [];
    const lanes = new Map();
    const sorted = [...artists].sort((a, b) => a.born - b.born);

    sorted.forEach(artist => {
        let lane = laneEnds.findIndex(end => end + gap <= artist.born);
        if (lane === -1) {
            lane = laneEnds.length;
            laneEnds.push(artist.died);
        } else {
            laneEnds[lane] = artist.died;
        }
        lanes.set(artist.id, lane);
    });
    return lanes;
};

const stackLanes = artists => {
    const sorted = [...artists].sort((a, b) => a.born - b.born);
    return new Map(sorted.map((artist, index) => [artist.id, index]));
};

const formatYears = artist => (artist.approx ? "um " : "") + artist.born + "–" + artist.died;
