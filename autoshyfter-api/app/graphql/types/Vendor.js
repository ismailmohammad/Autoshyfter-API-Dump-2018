/*
 * Copyright 2018 AutoShyfter All Rights Reserved
 * This is an unlicensed repository, any unauthorized use is strictly forbidden by Canadian copyright law.
 */

module.exports = `
type Vendor {
    _id: String,
    employees: [Employee],
    head_office: HeadOffice,
    name: String,
    description: String,
    images: [String],
    address: String,
    phone_number: String,
    location: Location,
    open_hours: OpenHours,
    status: String,
    shift_dates: [ShiftDay]
    timezone: String,
    created_at: String,
    updated_at: String
}
`;
