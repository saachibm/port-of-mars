import { url } from "@port-of-mars/client/util";
import { ProlificStudyData, ProlificParticipantStatus } from "@port-of-mars/shared/types";
import { TStore } from "@port-of-mars/client/plugins/tstore";
import { AjaxRequest } from "@port-of-mars/client/plugins/ajax";

export class StudyAPI {
  constructor(public store: TStore, public ajax: AjaxRequest) {}

  async getProlificParticipantStatus(): Promise<ProlificParticipantStatus> {
    return await this.ajax.get(url("/study/prolific/status"), ({ data }) => {
      return data;
    });
  }

  async completeProlificStudy(): Promise<string> {
    return await this.ajax.get(url("/study/prolific/complete"), ({ data }) => {
      return data;
    });
  }

  async getAllProlificStudies(): Promise<ProlificStudyData[]> {
    return await this.ajax.get(url("/study/prolific/studies"), ({ data }) => {
      return data; 
    });
  }  

  async addProlificStudy(data: ProlificStudyData): Promise<ProlificStudyData> {
    return new Promise((resolve, reject) => {
      this.ajax.post(
        url("/study/prolific/add"), 
        (response: { data: ProlificStudyData }) => {
          resolve(response.data); 
        }, data 
      ).catch((error: any) => {
        console.error("Failed to add study:", error);
        reject(error); 
      });
    });
  }

  async deleteProlificStudy(studyId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ajax
        .delete(
          url("/study/prolific/${studyId}/delete"),
          (response: { status: number }) => {
            if (response.status === 200 || response.status === 204) {
              console.log("Study with ID ${studyId} deleted successfully.");
              resolve(); 
            } else {
              console.warn("Unexpected response status: ${response.status}");
              resolve(); 
            }
          }
        )
        .catch((error: any) => {
          console.error("Failed to delete study with ID ${studyId}:", error);
          reject(error); 
        });
    });
  }  

  async updateProlificStudy(study: ProlificStudyData): Promise<ProlificStudyData> {
    return new Promise((resolve, reject) => {
      this.ajax
        .post(
          url("/study/prolific/update/${study.studyId}"), 
          (response: { status: number; data: ProlificStudyData }) => {
            if (response.status === 200) {
              console.log("Study with ID ${study.studyId} updated successfully.");
              resolve(response.data); 
            } else {
              console.warn("Unexpected response status: ${response.status}");
              reject(new Error("Failed to update study")); 
            }
          },
          study 
        )
        .catch((error: any) => {
          console.error("Failed to update study with ID ${study.studyId}:", error);
          reject(error); 
        });
    });
  }  
}

