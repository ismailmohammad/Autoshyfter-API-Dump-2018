module.exports = `
type ShiftDay {
    date: String,
    operational_load: [Int],
    employees: [ShiftEmployee]
}
`;