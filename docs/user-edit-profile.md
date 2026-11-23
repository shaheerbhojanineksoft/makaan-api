# User Edit Profile

## API purpose
Partially update the authenticated user profile in `makaan_user.users`.

## HTTP method
`PATCH`

## Endpoint URL
`/api/profile/user`

## Authentication requirements
JWT required. Account ID/type come from JWT (`type` must be `user`).

## Headers
```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

## Request payload
```json
{
  "name": "Ali Hassan",
  "email": "ali.hassan@email.com",
  "phone": "+92 300 1234567",
  "profilePicture": "https://randomuser.me/api/portraits/men/75.jpg"
}
```

Field mapping:
- `name` → `fullname`
- `phone` → `phoneNumber`
- `email` → `email`
- `profilePicture` → `profilePicture`

## Successful response example
```json
{
  "type": "user",
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "profilePicture": "https://randomuser.me/api/portraits/men/75.jpg",
  "fullname": "Ali Hassan",
  "email": "ali.hassan@email.com",
  "phoneNumber": "+92 300 1234567",
  "modifiedOn": "2026-11-23T12:30:00.000Z"
}
```

## Error responses
- `400` validation
- `401` unauthorized
- `403` JWT type is not `user`
- `404` user not found

## Database and collection
- Database: `makaan_user`
- Collection: `users`

## Frontend integration instructions
Call from User My Profile form after Google sign-in as `user`. Send only changed fields if needed.
