module.exports = `
input CreateShiftInput {
    vendor_id: String!,
    employee_id: String!,
    date: String!,
    label: String!, 
    from: String!,
    to: String!
}
`;