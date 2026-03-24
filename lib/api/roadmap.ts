import { httpClient } from "./clients";
import type { Roadmap } from "@/types/roadmap";

export const roadmapService = {
  async getRoadmaps(): Promise<Roadmap[]> {
    const response = await httpClient.get<Roadmap[]>("/api/roadmaps");
    return response.data ?? [];
  },

  async getRoadmapById(id: string, userId?: string): Promise<Roadmap | null> {
    const response = await httpClient.get<Roadmap>(`/api/roadmaps/${id}`, {
      params: userId ? { userId } : undefined,
    });
    return response.data;
  },

  async completeStep(stepId: string): Promise<boolean> {
    const response = await httpClient.post(`/api/progress/complete`, {
      stepId,
    });
    return response.success;
  },

  async uncompleteStep(stepId: string): Promise<boolean> {
    const response = await httpClient.post(`/api/progress/uncomplete`, {
      stepId,
    });
    return response.success;
  },
};
