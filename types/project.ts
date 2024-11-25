export interface Project {
  id: string;
  uploadingFlag: boolean;
  deletingFlag: boolean;
  editingFlag: boolean;
  cssFile: string | null;
  htmlFile: string | null;
  jsFile: string | null;
  editCount: number;
}
