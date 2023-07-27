module.exports = `
input AvailabilityDetailsInput {
    date: String!,
    hours: [AvailableHoursInput]!
}
`;