import UnpersistedProject from "./UnpersistedProject";

class Project extends UnpersistedProject {
  readonly id: string;

  constructor(id: string, name: string) {
    super(name);
    this.id = id;
  }
}

export default Project;
