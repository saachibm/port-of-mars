<template>
  <b-container fluid class="h-100 w-100 m-0 p-0 overflow-auto">
    <div class="h-100 p-3">
      <b-row class="h-100 m-0">
        <b-col>
          <b-form class="mb-5" @submit="onSubmit" @reset="onReset">
            <!-- General Section -->
            <div class="mb-4" id="general">
              <h4>General</h4>
              <hr class="my-2" />
              <b-form-group
                id="max-connections-group"
                label="Max Connections"
                label-for="max-connections"
                description="The maximum number of clients that can connect to the game server at once."
              >
                <b-form-input
                  class="custom-form-input"
                  id="max-connections"
                  type="number"
                  min="10"
                  max="200"
                  v-model="form.maxConnections"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="mute-length-group"
                label="Default Mute Length (days)"
                label-for="mute-length"
                description="The length that a player is muted for when they are muted by an admin."
              >
                <b-form-input
                  class="custom-form-input"
                  id="mute-length"
                  type="number"
                  min="1"
                  max="30"
                  v-model="form.defaultDaysMuted"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="announcement-banner-group"
                label="Announcement Banner"
                label-for="announcement-banner"
                description="Text to be displayed in a banner at the top of the landing page. Set empty to disable."
              >
                <div class="custom-form-input">
                  <b-button
                    class="float-right py-0 px-1"
                    style="margin-top: -2rem"
                    variant="primary"
                    size="sm"
                    @click="form.announcementBannerText = ''"
                  >
                    Clear
                  </b-button>
                  <b-form-textarea
                    class="custom-form-input"
                    id="announcement-banner"
                    rows="2"
                    max-rows="5"
                    v-model="form.announcementBannerText"
                  ></b-form-textarea>
                </div>
              </b-form-group>
              <b-form-group
                id="free-play-enabled-group"
                label-for="free-play-enabled"
                description="Free play allows anyone to join the free play lobby and play with others and bots."
              >
                <b-form-checkbox
                  class="custom-form-input"
                  id="free-play-enabled"
                  type="boolean"
                  v-model="form.isFreePlayEnabled"
                  required
                >
                  Enable Free Play
                </b-form-checkbox>
              </b-form-group>
            </div>

            <!-- Tournament Section -->
            <div class="mb-4" id="tournament">
              <h4>Tournament</h4>
              <hr class="my-2" />
              <b-form-group
                id="tournament-enabled-group"
                label-for="tournament-enabled"
                description="Open the tournament lobby (launch times will still need to be scheduled)."
              >
                <b-form-checkbox
                  class="custom-form-input"
                  id="tournament-enabled"
                  type="boolean"
                  v-model="form.isTournamentEnabled"
                  required
                >
                  Enable Tournament Mode
                </b-form-checkbox>
              </b-form-group>
              <b-form-group
                id="signups-threshold-group"
                label="Scheduled Date Signups Popularity Threshold"
                label-for="signups-threshold"
                description="Number of signups at which a date will be considered 'most popular'"
              >
                <b-form-input
                  class="custom-form-input"
                  id="signups-threshold"
                  type="number"
                  min="1"
                  max="100"
                  v-model="form.tournamentSignupsPopularityThreshold"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="before-offset-group"
                label="Tournament Lobby Open Before (minutes)"
                label-for="before-offset"
                description="Minutes before a tournament start time that the lobby will be open."
              >
                <b-form-input
                  class="custom-form-input"
                  id="before-offset"
                  type="number"
                  min="0"
                  max="60"
                  v-model="form.tournamentLobbyOpenBeforeOffset"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="after-offset-group"
                label="Tournament Lobby Open After (minutes)"
                label-for="after-offset"
                description="Minutes after a tournament start time that the lobby will remain open."
              >
                <b-form-input
                  class="custom-form-input"
                  id="after-offset"
                  type="number"
                  min="0"
                  max="60"
                  v-model="form.tournamentLobbyOpenAfterOffset"
                  required
                ></b-form-input>
              </b-form-group>
            </div>

            <!-- Prolific Study Section -->
            <div class="mb-4" id="prolific-study">
              <h4>Prolific Study</h4>
              <hr class="my-2" />
              <div class="d-flex justify-content-end align-items-center mb-3">
                <b-button variant="success" class="mr-2" @click="showAddStudyModal">
                  Add Study
                </b-button>
              </div>
              <div class="h-100-header w-100 content-container">
                <b-table
                  dark
                  sticky-header
                  class="h-100 m-0 custom-table"
                  :fields="studyFields"
                  :items="prolificStudies"
                >
                  <template #cell(description)="data">
                    {{ data.item.description || '-' }}
                  </template>
                  <template #cell(studyId)="data">
                    {{ data.item.studyId || '-' }}
                  </template>
                  <template #cell(completionCode)="data">
                    {{ data.item.completionCode || '-' }}
                  </template>
                  <template #cell(actions)="data">
                    <b-button @click="showEditStudyModal(data.item)" variant="primary" class="mr-2">
                      Edit
                    </b-button>
                    <b-button variant="danger" @click="confirmDeleteStudy(data.item)" class="mr-2">
                      Delete
                    </b-button>
                    <!-- <b-button @click="showInfoModal(data.item)">
                      Info
                    </b-button> -->
                  </template>
                </b-table>
              </div>
            </div>

            <!-- Add Study Modal -->
            <b-modal
              id="add-study-modal"
              centered
              title="Add New Study"
              body-bg-variant="dark"
              header-bg-variant="dark"
              footer-bg-variant="dark"
              okTitle="Add Study"
              cancelTitle="Cancel"
              @ok="addStudy"
              @hidden="resetStudy"
            >
              <b-form>
                <b-form-group label="Study Description" label-for="study-description-input">
                  <b-form-input
                    id="study-description-input"
                    v-model="newStudy.description"
                    required
                    placeholder="Enter study description"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Study ID" label-for="study-id-input">
                  <b-form-input
                    id="study-id-input"
                    v-model="newStudy.studyId"
                    required
                    placeholder="Enter study ID"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Completion Code" label-for="completion-code-input">
                  <b-form-input
                    id="completion-code-input"
                    v-model="newStudy.completionCode"
                    required
                    placeholder="Enter completion code"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-modal>

            <!-- Edit Study Modal -->
            <b-modal
              id="edit-study-modal"
              centered
              title="Edit Study"
              body-bg-variant="dark"
              header-bg-variant="dark"
              footer-bg-variant="dark"
              okTitle="Save Changes"
              cancelTitle="Cancel"
              @ok="saveStudyChanges"
              @hidden="resetStudy"
            >
              <b-form>
                <b-form-group label="Study Description" label-for="edit-study-description-input">
                  <b-form-input
                    id="edit-study-description-input"
                    v-model="newStudy.description"
                    required
                  ></b-form-input>
                </b-form-group>

                <!-- <b-form-group label="Study ID" label-for="edit-study-id-input">
                  <b-form-input
                    id="edit-study-id-input"
                    v-model="newStudy.studyId"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Completion Code" label-for="edit-completion-code-input">
                  <b-form-input
                    id="edit-completion-code-input"
                    v-model="newStudy.completionCode"
                    required
                  ></b-form-input>
                </b-form-group> -->
              </b-form>
            </b-modal>

            <!-- Delete Study Modal -->
            <b-modal
              id="delete-study-modal"
              centered
              title="Delete Study"
              body-bg-variant="dark"
              header-bg-variant="dark"
              footer-bg-variant="dark"
              okTitle="Confirm"
              cancelTitle="Cancel"
              @ok="deleteStudy"
            >
              <p>Are you sure you want to delete this study? This action cannot be undone.</p>
            </b-modal>

            <!-- Info Modal -->
            <!-- <b-modal
              id="info-modal"
              centered
              title="Information About Study"
              body-bg-variant="dark"
              header-bg-variant="dark"
              footer-bg-variant="dark"
              exitTitle="Exit"
              @ok="exitInfoStudy"
            >
              <p>Are you sure you want to delete this study? This action cannot be undone.</p>
            </b-modal>
             -->
          </b-form>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AdminAPI } from "@port-of-mars/client/api/admin/request"; // Admin API
import { StudyAPI } from "@port-of-mars/client/api/study/request"; // Study API
import { ProlificStudyData } from "@port-of-mars/shared/types";

@Component({})
export default class Reports extends Vue {
  adminApi!: AdminAPI;
  studyApi!: StudyAPI;

  prolificStudies: ProlificStudyData[] = [];
  newStudy: ProlificStudyData = this.resetStudy();
  selectedStudy: ProlificStudyData | null = null; 

  // Fields for displaying studies in the table
  studyFields = [
    { key: "description", label: "Description" },
    { key: "studyId", label: "Study ID" },
    { key: "completionCode", label: "Completion Code" },
    { key: "actions", label: "Actions"}
  ];

  // Form data for general and tournament settings
  form = {
    isTournamentEnabled: false,
    isFreePlayEnabled: false,
    maxConnections: 0,
    defaultDaysMuted: 0,
    tournamentLobbyOpenBeforeOffset: 10,
    tournamentLobbyOpenAfterOffset: 30,
    tournamentSignupsPopularityThreshold: 10,
    announcementBannerText: "",
  };

  async created() {
    this.adminApi = new AdminAPI(this.$tstore, this.$ajax);
    this.studyApi = new StudyAPI(this.$tstore, this.$ajax);
    await this.loadProlificStudies();
  }

  resetStudy(): ProlificStudyData {
    return {
      description: "",
      studyId: "",
      completionCode: "",
      isActive: true,
      participationPoints: 0,
    };
  }

  async loadProlificStudies() {
    try {
      this.prolificStudies = await this.studyApi.getAllProlificStudies();
      console.log("Loaded studies:", this.prolificStudies);
    } catch (error) {
      console.error("Failed to load studies:", error);
    }
  }

  async addStudy() {
    try {
      const newStudy = await this.studyApi.addProlificStudy(this.newStudy);
      console.log("Study added:", newStudy);
      this.$bvModal.hide("add-study-modal");
      await this.loadProlificStudies();
      this.newStudy = this.resetStudy();
    } catch (error) {
      console.error("Failed to add study:", error);
    }
  }

  showAddStudyModal() {
    this.newStudy = this.resetStudy();
    this.$bvModal.show("add-study-modal");
  }

  async deleteStudy() {
    if (this.selectedStudy) {
      try {
        console.log("Deleting study with ID: ${this.selectedStudy.studyId}"); 
        await this.studyApi.deleteProlificStudy(this.selectedStudy.studyId.toString());
        this.$bvModal.hide("delete-study-modal");
        await this.loadProlificStudies(); 
      } catch (error) {
        console.error("Failed to delete study:", error);
      }
    }
  }
  
  confirmDeleteStudy(study: ProlificStudyData) {
    this.selectedStudy = study;
    this.$bvModal.show("delete-study-modal");
  }

  // this is for if all textfields can be changed
  // async saveStudyChanges() {
  //   if (this.selectedStudy) {
  //     try {
  //       const updatedStudy = await this.studyApi.updateProlificStudy(this.newStudy);
  //       console.log("Study updated:", updatedStudy);
  //       this.$bvModal.hide("edit-study-modal");
  //       await this.loadProlificStudies(); // Refresh the list
  //     } catch (error) {
  //       console.error("Failed to update study:", error);
  //     }
  //   }
  // } 

  async saveStudyChanges() {
    if (this.selectedStudy) {
      try {
        const updatedStudy = await this.studyApi.updateProlificStudy({
          ...this.selectedStudy, 
          description: this.newStudy.description, 
        });

        console.log("Study updated:", updatedStudy);
        this.$bvModal.hide("edit-study-modal");
        await this.loadProlificStudies(); 
      } catch (error) {
        console.error("Failed to update study:", error);
      }
    }
  }

  showEditStudyModal(study: ProlificStudyData) {
    this.selectedStudy = study;
    this.newStudy = { ...study };
    console.log("Opening edit modal with study:", this.newStudy);
    this.$bvModal.show("edit-study-modal");
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    try {
      await this.adminApi.updateSettings(this.form);
      this.$bvToast.toast("Settings updated successfully.", {
        title: "Success",
        variant: "success",
        solid: true,
      });
    } catch (error) {
      console.error("Failed to update settings:", error);
      this.$bvToast.toast("Failed to update settings.", {
        title: "Error",
        variant: "danger",
        solid: true,
      });
    }
  }

  async onReset(e: Event) {
    e.preventDefault();
    await this.loadProlificStudies();
  }
}
</script>
