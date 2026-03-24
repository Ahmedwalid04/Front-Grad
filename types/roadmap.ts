export interface Step {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface Section {
  id: string;
  title: string;
  steps: Step[];
}

export interface Roadmap {
  id: string;
  title: string;
  sections: Section[];
}

export interface RoadmapListResponse {
  data: Roadmap[];
  success: boolean;
}

export interface RoadmapDetailResponse {
  data: Roadmap;
  success: boolean;
}
