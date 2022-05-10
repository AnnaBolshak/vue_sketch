import { Project } from "@/typings/project";

export default (projects: Project[], keyword: string): Project[] => {
  return projects.filter((project: Project) => {
    const filteredByName = project.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const filteredByCustomer = project.customer
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const filteredByCode = project.id
      .toLowerCase()
      .includes(keyword.toLowerCase());

    return filteredByName || filteredByCustomer || filteredByCode;
  });
};
