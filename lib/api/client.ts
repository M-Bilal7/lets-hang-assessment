import { APIResponse, Background } from '@/lib/types/api';

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error(`Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Events
  async createEvent(eventData: any) {
    return this.request<any>('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async getEvent(id: string) {
    return this.request<any>(`/events/${id}`, {
      method: 'GET',
    });
  }

  async updateEvent(id: string, eventData: Partial<any>) {
    return this.request<any>(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(id: string) {
    return this.request<any>(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Images
  async uploadFlyerImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload/flyer`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }

  async uploadBackgroundImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload/background`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }

  // Backgrounds
  async getBackgrounds() {
    return this.request<Background[]>('/backgrounds', {
      method: 'GET',
    });
  }

  // Modules
  async getAvailableModules() {
    return this.request<any[]>('/modules', {
      method: 'GET',
    });
  }

  async addModuleToEvent(eventId: string, moduleData: any) {
    return this.request<any>(`/events/${eventId}/modules`, {
      method: 'POST',
      body: JSON.stringify(moduleData),
    });
  }

  async removeModuleFromEvent(eventId: string, moduleId: string) {
    return this.request<any>(`/events/${eventId}/modules/${moduleId}`, {
      method: 'DELETE',
    });
  }

  async updateEventModule(eventId: string, moduleId: string, moduleData: any) {
    return this.request<any>(`/events/${eventId}/modules/${moduleId}`, {
      method: 'PATCH',
      body: JSON.stringify(moduleData),
    });
  }
}

export const apiClient = new APIClient();