module.exports = `
type RequestLog {
    _id: String,
    type: String,
    identifier: String,
    endpoint: String,
    ip: String,
    headers: String,
    error: String,
    payload: String,
    created_at: String,
    updated_at: String
}
`;
