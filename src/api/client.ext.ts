import { NewProjectRequest, ProjectRequestClient, ProjectRequestDelta, UpdateProjectRequest, type FileParameter, type FileType } from "./client";

// old init: const client = new ProjectRequestClientExt("", { fetch: authFetch });

export class ProjectRequestClientExt {
  private readonly inner: ProjectRequestClient;
  private readonly baseUrl: string;
  private readonly http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };

  constructor(
    baseUrl: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.inner = new ProjectRequestClient(baseUrl, http);
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.http = http ? http : window as any;
  }

  async projectRequest_GetById(
    id: number,
    signal?: AbortSignal
  ): Promise<unknown> {
    if (id === undefined || id === null) {
      throw new Error("The parameter 'id' must be defined.");
    }

    const url = `${this.baseUrl}/api/ProjectRequest/${encodeURIComponent(
      String(id)
    )}`;

    const response = await this.http.fetch(url, {
      method: "GET",
      signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      const text = await response.text();
      return text === "" ? null : JSON.parse(text);
    }

    if (response.status === 404) {
      throw new Error("Not Found");
    }

    const text = await response.text();
    throw new Error(
      `Unexpected error (${response.status}): ${text}`
    );
  }

  async projectRequest_Get() {
    return this.inner.projectRequest_Get;
  }

  async projectRequest_Patch(projectRequestId: number, projectRequestDelta: ProjectRequestDelta) {
    return this.inner.projectRequest_Patch(projectRequestId, projectRequestDelta);
  }

  async projectRequest_Put(projectRequestId: number, updateProjectRequest: UpdateProjectRequest ) {
    return this.inner.projectRequest_Put(projectRequestId, updateProjectRequest);
  }

  async projectRequest_Post(newProjectRequest: NewProjectRequest) {
    return this.inner.projectRequest_Post(newProjectRequest);
  }

  async projectRequest_FileUpload(projectRequestId: number, fileParameter: FileParameter, fileType: FileType) {
    return this.inner.projectRequest_FileUpload(projectRequestId, fileParameter, fileType);
  }
}
