module.exports = `
input UpdateVendorInput {
    name: String,
    description: String,
    images: [String],
    open_hours: OpenHoursInput,
    address: String,
    phone_number: String,
    location: LocationInput,
    status: String,
    shift_dates: [ShiftDayInput]
}
`;