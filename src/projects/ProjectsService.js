import BaseService from "../config/BaseService";

const PROJECTS_BASE_PATH = "/projects";

class ProjectsService extends BaseService {
  async createProject(user, project, files) {
    return await this.multipartRequest(
      user,
      PROJECTS_BASE_PATH,
      "project",
      project,
      files
    );
  }

  async updateProject(user, project) {
    return await this.jsonRequest(
      user,
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(project.id)}`,
      "PUT",
      project
    );
  }

  async getProjects(user) {
    return await this.jsonRequest(user, PROJECTS_BASE_PATH, "GET");
  }

  async getProject(user, projectId) {
    return await this.jsonRequest(
      user,
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(projectId)}`,
      "GET"
    );
  }
}

export default ProjectsService;
