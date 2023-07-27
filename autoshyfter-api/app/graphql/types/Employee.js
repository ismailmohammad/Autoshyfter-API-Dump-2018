module.exports = `
type Employee {
    _id: String,
    username: String,
    password: String,
    role: String,
    email_address: String,
    phone_number: String,
    vendor: Vendor,
    availability: [AvailabilityDetails],
    image: String,
    name: String,
    created_at: String,
    updated_at: String
}
`;