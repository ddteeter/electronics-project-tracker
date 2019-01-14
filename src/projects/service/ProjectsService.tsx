import BaseService from "../../common/BaseService";
import Project from "../model/Project";
import { User } from "firebase";
import UnpersistedProject from "../model/UnpersistedProject";
import JsonResponse from "../../common/JsonResponse";

const PROJECTS_BASE_PATH = "/projects";

class ProjectsService extends BaseService {
  async createProject(
    user: User,
    project: UnpersistedProject,
    files: FileList | null
  ): Promise<Project> {
    let response = await this.multipartRequest<Project>(
      user,
      PROJECTS_BASE_PATH,
      "project",
      project,
      files
    );

    return response.body;
  }

  async updateProject(user: User, project: Project): Promise<Project> {
    let response = await this.jsonRequest<Project>(
      user,
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(project.id)}`,
      "PUT",
      project
    );

    return response.body;
  }

  async getProjects(user: User): Promise<Project[]> {
    let response = await this.jsonRequest<Project[]>(
      user,
      PROJECTS_BASE_PATH,
      "GET"
    );

    return response.body;
  }

  async getProject(user: User, projectId: string): Promise<Project> {
    let response = await this.jsonRequest<Project>(
      user,
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(projectId)}`,
      "GET"
    );

    return response.body;
  }
}

export default ProjectsService;
