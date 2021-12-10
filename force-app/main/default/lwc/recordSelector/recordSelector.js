import { LightningElement } from "lwc";
import getObjectNames from "@salesforce/apex/RecordSelectorController.getObjectNames";
import getRecords from "@salesforce/apex/RecordSelectorController.getRecords";

export default class AccountList extends LightningElement {
  objectApiName = "Account";
  objectOptions = [];
  recordId;
  recordOptions = [];

  async connectedCallback() {
    try {
      this.objectOptions = await getObjectNames();
      this.recordOptions = await getRecords({
        objectApiName: this.objectApiName
      });
    } catch (error) {
      console.error(error);
    }
  }

  async handleObjectApiNameChange(event) {
    this.objectApiName = event.detail.value;
    this.recordId = null;
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
      new CustomEvent("itemselected", {
        detail: { objectApiName, recordId }
      })
    );
  }
}
