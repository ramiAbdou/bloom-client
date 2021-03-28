export type ExpandedDetailProps = { label: string; value: unknown };

export interface IntegrationsDetailsData {
  connected?: boolean;
  description: string;
  details?: ExpandedDetailProps[];
  href: string;
  logo: string;
  name: string;
}
