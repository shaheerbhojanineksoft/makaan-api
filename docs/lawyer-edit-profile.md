# Lawyer Edit Profile

## API purpose
Partially update the authenticated lawyer profile in `makaan_lawyer.users`.

## HTTP method
`PATCH`

## Endpoint URL
`/api/profile/lawyer`

## Authentication requirements
JWT required. Account ID/type come from JWT (`type` must be `lawyer`).

## Headers
```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

## Request payload
```json
{
  "name": "Adv. Bilal Ahmed",
  "city": "Lahore",
  "specialty": "Plot disputes & registry checks",
  "bio": "Lahore-based lawyer focused on plot verification...",
  "phone": "+92 42 3567 0202",
  "whatsapp": "0323 2910307",
  "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
  "registered": true
}
```

Field mapping:
- `name` → `fullname`
- `city` → `location`
- `specialty` → `SpecialistIn`
- `bio` → `Bio`
- `phone` → `phonenumber`
- `whatsapp` → `whatsappNumber`
- `avatar` → `profilePicture`
- `registered` → `registered`

## Successful response example
```json
{
  "type": "lawyer",
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "Bio": "Lahore-based lawyer focused on plot verification...",
  "SpecialistIn": "Plot disputes & registry checks",
  "fullname": "Adv. Bilal Ahmed",
  "location": "Lahore",
  "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg",
  "phonenumber": "+92 42 3567 0202",
  "whatsappNumber": "0323 2910307",
  "registered": true,
  "email": "bilal@email.com",
  "modifiedOn": "2026-11-23T12:30:00.000Z"
}
```

## Error responses
- `400` validation
- `401` unauthorized
- `403` JWT type is not `lawyer`
- `404` lawyer not found

## Database and collection
- Database: `makaan_lawyer`
- Collection: `users`

## Frontend integration instructions
Call from Lawyer profile update/submit flow after Google sign-in as `lawyer`.
