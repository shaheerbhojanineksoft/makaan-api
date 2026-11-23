# makaan-webapi

NestJS backend for Makaan user / agency / lawyer APIs.

## Stack
- NestJS + TypeScript
- MongoDB (3 databases via named Mongoose connections)
- Google ID token verification
- JWT + Passport
- class-validator / class-transformer

## Setup
```bash
cp .env.example .env
# set GOOGLE_CLIENT_ID
npm install
npm run start:dev
```

Default port: `3002`

## Databases
| type | Database | Collection |
|---|---|---|
| user | `makaan_user` | `users` |
| agency | `makaan_agency` | `users` |
| lawyer | `makaan_lawyer` | `users` |

## Key endpoints
| Method | Path | Auth |
|---|---|---|
| POST | `/api/auth/google` | Public |
| PATCH | `/api/profile/user` | JWT (`user`) |
| PATCH | `/api/profile/lawyer` | JWT (`lawyer`) |
| PATCH | `/api/profile/agency` | JWT (`agency`) |

See `docs/` for full API documentation.
