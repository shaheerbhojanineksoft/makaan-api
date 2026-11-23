# Google Sign-in

## API purpose
Verify a Google ID token, find-or-create an account in the selected role database, and return a JWT.

## HTTP method
`POST`

## Endpoint URL
`/api/auth/google`

## Authentication requirements
None (public).

## Headers
```http
Content-Type: application/json
```

## Request payload
```json
{
  "idToken": "<Google ID token from frontend>",
  "type": "user"
}
```

`type` must be one of: `user`, `agency`, `lawyer`.

## Successful response example
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h",
  "account": {
    "type": "user",
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "profilePicture": "https://lh3.googleusercontent.com/...",
    "fullname": "Ali Hassan",
    "email": "ali.hassan@email.com",
    "phoneNumber": "",
    "modifiedOn": "2026-11-23T12:00:00.000Z"
  }
}
```

## Error responses
- `400` validation error
- `401` invalid/unverified Google token
- `503` `GOOGLE_CLIENT_ID` not configured

## Database and collection
Selected by `type`:
| type | Database | Collection |
|---|---|---|
| user | `makaan_user` | `users` |
| agency | `makaan_agency` | `users` |
| lawyer | `makaan_lawyer` | `users` |

Same email may exist independently in all three databases.

## Frontend integration instructions
1. Complete Google sign-in on the client and obtain an ID token.
2. POST token + selected role (`user` / `agency` / `lawyer`).
3. Persist `accessToken` and use `Authorization: Bearer ...` for profile APIs.
4. Configure matching `GOOGLE_CLIENT_ID` in `.env`.
