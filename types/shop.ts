export interface Shop {
  id: string;
  ownerUserId: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  primaryColor: string;
  domain: string | null;
}
