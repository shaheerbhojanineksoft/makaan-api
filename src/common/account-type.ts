export const ACCOUNT_TYPES = ['user', 'agency', 'lawyer'] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const DB_CONNECTION = {
  user: 'makaanUser',
  agency: 'makaanAgency',
  lawyer: 'makaanLawyer',
  admin: 'makaanAdmin',
} as const;

export function isAccountType(value: string): value is AccountType {
  return (ACCOUNT_TYPES as readonly string[]).includes(value);
}
