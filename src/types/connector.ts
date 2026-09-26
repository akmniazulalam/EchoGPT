export type ConnectorStatus = "connected" | "connecting" | "failed" | "disabled";

export interface MCPTool {
  name: string;
  displayName: string;
  description: string;
  category?: string;
  parametersSummary?: string;
}

export interface Connector {
  id: string;
  name: string;
  serverUrl: string;
  status: ConnectorStatus;
  enabled: boolean;
  tools: MCPTool[];
  hasAuthToken: boolean;
  createdAt: string;
  updatedAt: string;
  lastConnectedAt?: string;
  errorMessage?: string;
  isDemo: boolean;
}

export interface AddConnectorInput {
  name: string;
  serverUrl: string;
  authorizationHeader?: string;
}
