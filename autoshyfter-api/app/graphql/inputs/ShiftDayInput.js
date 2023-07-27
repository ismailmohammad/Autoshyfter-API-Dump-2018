module.exports = `
input ShiftDayInput {
    date: String!
    operational_load: [Int]!,
    employees: [ShiftEmployeeInput]!
}
`;0