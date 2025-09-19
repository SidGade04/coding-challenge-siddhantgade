const references = require("./references.json");
const eventDetails = require("./event_details.json");

// ---------------------------- Task 1: Color frequencies by month ----------------------------
const count = (year, month) => {
    const counts = {};
    eventDetails
      .filter(e => e.date.startsWith(`${year}-${String(month).padStart(2, '0')}`))
      .forEach(e => {
        counts[e.color] = (counts[e.color] || 0) + 1;
      });
    return counts;
};

// ---------------------------- Task 2: Work only with referenced events ----------------------------

// ---------------------------- Task2a: The sum of the events’ value property ----------------------------
const idsA = references.filter(r => r.id_a).map(r => r.id_a);
const idsB = references.filter(r => r.id_b).map(r => r.id_b)

const getReferencedEvents = () => eventDetails.filter(e => idsA.includes(e.id_a) || idsB.includes(e.id_b));
const getNameForEvent = (event) => references.find(r => r.id_a === event.id_a || r.id_b === event.id_b)?.name;

const total = getReferencedEvents().reduce((sum, e) => sum + e.value, 0);

// ---------------------------- Task2b: Earliest date & min value → names ----------------------------
const earliestDateName = getReferencedEvents()
    .map(e => ({date: e.date, name: getNameForEvent(e)}))
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0].name;

const minValueName = getReferencedEvents()
  .map(e => ({value: e.value, name: getNameForEvent(e)}))
  .sort((a, b) => a.value - b.value)[0].name;

// ---------------------------- Task2c: High value threshold filter ----------------------------
const valueGreaterThan25Names = getReferencedEvents()
    .filter(e => e.value > 25)
    .map(e => ({value: e.value, name: getNameForEvent(e)}))
    .sort((a, b) => a.name < b.name ? -1 : 1);

    // ---------------------------- Result ----------------------------
const result = {
    task1: {
        color_freq_2024_06: count(2024, 6),
        color_freq_2025_03: count(2025, 3)
    },
    task2: {
        sum_value: total,
        earliest_date_name: earliestDateName,
        min_value_name: minValueName,
        high_value_names: valueGreaterThan25Names.map(item => item.name)
    }
}

console.log(result);