module.exports = `
input CreateEmployeeInput {
    username: String!,
    password: String!,
    role: String!,
    email_address: String!,
    phone_number: String!,
    vendor_id: String!
    availability: [AvailabilityDetailsInput]!,
    image: String,
    name: String!
}
`;