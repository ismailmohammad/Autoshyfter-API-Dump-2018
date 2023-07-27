module.exports = `
input OpenHoursInput {
    monday: [TimeSpanInput]!,
    tuesday: [TimeSpanInput]!,
    wednesday: [TimeSpanInput]!,
    thursday: [TimeSpanInput]!,
    friday: [TimeSpanInput]!,
    saturday: [TimeSpanInput]!,
    sunday: [TimeSpanInput]!
}
`;