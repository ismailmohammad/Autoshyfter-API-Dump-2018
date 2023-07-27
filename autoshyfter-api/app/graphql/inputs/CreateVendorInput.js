module.exports = `
input CreateVendorInput {
    name: String!,
    description: String!,
    images: [String]!,
    address: String!,
    phone_number: String!,
    location: LocationInput!,
    open_hours: OpenHoursInput!,
    head_office_id: String!,
    shift_dates: [ShiftDayInput]!
}
`;