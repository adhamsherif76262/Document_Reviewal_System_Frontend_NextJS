import api from "../lib/api";

export const fetchTemplates = async () => {
  const { data } = await api.get("api/documents/templates");
  return data;
};

export const fetchTemplateByKey = async (key: string , state: string) => {
  const { data } = await api.get(`api/documents/${key}/templates/?state=${state}`);
  return data;
};
