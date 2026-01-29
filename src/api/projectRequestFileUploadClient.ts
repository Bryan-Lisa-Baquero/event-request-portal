// projectRequestClient.ext.ts
import {
  ProjectRequestUploadResponse
} from "./client";

export class ProjectRequestFileUploadClient {
  private readonly http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private readonly baseUrl: string;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.http = http ? http : window as any;
    this.baseUrl = baseUrl ?? "";
  }

 
  uploadFile(
    projectRequestId: number,
    file: File,
    fileType: string,
    signal?: AbortSignal
  ): Promise<ProjectRequestUploadResponse> {
    let url_ = this.baseUrl + "/api/ProjectRequest/{projectRequestId}/FileUpload";
    url_ = url_.replace("{projectRequestId}", encodeURIComponent("" + projectRequestId));

    const content_ = new FormData();
    content_.append("contractOrProposal", file);
    content_.append("fileType", fileType);

    return this.http.fetch(url_, {
      method: "PUT",
      body: content_,
      signal,
      headers: { "Accept": "application/json" }
    }).then(async r => {
      if (!r.ok) throw new Error(`Upload failed (${r.status})`);
      return ProjectRequestUploadResponse.fromJS(await r.json());
    });
  }
}
