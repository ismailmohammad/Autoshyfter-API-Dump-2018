module.exports = `
type Query {
    head_offices(_id: String, identifier: String): [HeadOffice]
    vendors(_id: String): [Vendor]
    the_employee: Employee
    request_logs(_id: String, identifier: String): [RequestLog]
    employee(_id: String!): Employee
}
`;
