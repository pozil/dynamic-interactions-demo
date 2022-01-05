import { LightningElement } from "lwc";
import getObjectNames from "@salesforce/apex/RecordSelectorController.getObjectNames";
import getRecords from "@salesforce/apex/RecordSelectorController.getRecords";

export default class RecordSelector extends LightningElement {
  objectApiName = "Account";
  objectOptions = [];
  recordId;
  recordOptions = [];

  async connectedCallback() {
    try {
      const results = await Promise.all([
        getObjectNames(),
        getRecords({
          objectApiName: this.objectApiName
        })
      ]);
      this.objectOptions = results[0];
      this.recordOptions = results[1];
    } catch (error) {
      console.error(error);
    }
  }

  async handleObjectApiNameChange(event) {
    this.objectApiName = event.detail.value;
    this.recordId = null;
    this.recordOptions = [];
    try {
      this.recordOptions = await getRecords({
        objectApiName: this.objectApiName
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleRecordIdChange(event) {
    this.recordId = event.detail.value;
  }

  handleRecordSelected() {
    const { recordId, objectApiName } = this;
    this.dispatchEvent(
      new CustomEvent("recordselected", {
        detail: { objectApiName, recordId }
      })
    );
  }
}
