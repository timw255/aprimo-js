export interface MaintenanceAction {
  action: string;
  description: string;
  label: string;
  parameters: { [key: string]: object };
}
