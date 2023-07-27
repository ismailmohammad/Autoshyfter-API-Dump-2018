module.exports = `
type Mutation {
    createHeadOffice(identifier: String!): HeadOffice
    updateHeadOffice(id: String!, identifier: String): HeadOffice
    deleteHeadOffice(id: String!): String
    
    createVendor(vendor: CreateVendorInput!): Vendor
    updateVendor(id: String!, vendor: UpdateVendorInput!): Vendor
    
    createEmployee(employee: CreateEmployeeInput!): Employee
    updateEmployee(id: String!, employee: UpdateEmployeeInput!): Employee
    deleteEmployee(id: String!): String
    
    createEmployeeToken(vendor_id: String!, username: String!, password: String!): EmployeeToken

    createShift(shift: CreateShiftInput! ): Vendor
}
`;