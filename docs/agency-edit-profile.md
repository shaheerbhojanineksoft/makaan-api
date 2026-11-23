# Agency Edit Profile

## API purpose
Partially update the authenticated agency profile in `makaan_agency.users`.

## HTTP method
`PATCH`

## Endpoint URL
`/api/profile/agency`

## Authentication requirements
JWT required. Account ID/type come from JWT (`type` must be `agency`).

## Headers
```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

## Request payload
```json
{
  "name": "Ahmed Raza",
  "agency": "Raza Estates & Builders",
  "city": "Karachi",
  "phone": "+922134561001",
  "whatsapp": "0323 2910307",
  "email": "ahmed.raza@razaestates.pk",
  "officeAddress": "402, Sea Breeze Plaza, Shahrah-e-Faisal, Karachi",
  "bio": "Ahmed leads an 18-member team...",
  "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg",
  "coverImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  "licenseNumber": "PK-RERA-KHI-2012-4821",
  "responseTime": "Within 2 hours",
  "experienceYears": 14,
  "teamSize": 18,
  "specializations": ["Residential Sales", "Luxury Villas"],
  "areasServed": ["DHA Karachi", "Clifton"],
  "services": ["Buyer representation and shortlisting"]
}
```

## Successful response example
Updated agency document (without `createdOn`), including `type: "agency"` and refreshed `modifiedOn`.

## Error responses
- `400` validation
- `401` unauthorized
- `403` JWT type is not `agency`
- `404` agency not found

## Database and collection
- Database: `makaan_agency`
- Collection: `users`

## Frontend integration instructions
Call from Agency Profile update form after Google sign-in as `agency`. Arrays and numbers must match DTO types.
