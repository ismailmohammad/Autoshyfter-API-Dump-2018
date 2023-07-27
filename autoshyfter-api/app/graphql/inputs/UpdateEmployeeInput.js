module.exports = `
input UpdateEmployeeInput {
    email_address: String,
    password: String,
    phone_number: String
    availability: [AvailabilityDetailsInput]
    image: String,
    name: String
}
`;