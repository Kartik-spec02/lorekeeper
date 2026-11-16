export interface Character {
  id: string;
  name: string;
  description: string;
  lastSeenLocation: string;
  voiceSamples: string[];
}

export interface Scene {
  id: string;
  title: string;
  content: string;
  characters: string[];
  emotionalBeat: number;
}

export interface CanonWarning {
  id: string;
  severity: "low" | "medium" | "high";
  message: string;
  relatedCharacter: string;
}

export type AgentStatus = "idle" | "running" | "done" | "error";

export interface AgentStep {
  id: string;
  name: string;
  status: AgentStatus;
  latencyMs?: number;
}

export interface ArcDataPoint {
  sceneId: string;
  sceneTitle: string;
  emotionalBeat: number;
}

export interface PipelineResult {
  scene: Scene;
  warnings: CanonWarning[];
  voiceFidelityScore: number;
  arcData: ArcDataPoint[];
}

export interface PipelineRunResponse {
  result: PipelineResult;
  steps: AgentStep[];
}