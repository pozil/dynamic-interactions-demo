import { LightningElement, api } from "lwc";

export default class RecordForm extends LightningElement {
  _recordId;
  _objectApiName;
  errorMessage;

  @api columns;

  @api
  set recordId(value) {
    this._recordId = value;
    this.errorMessage = null;
  }
  get recordId() {
    return this._recordId;
  }

  @api
  set objectApiName(value) {
    this._objectApiName = value;
    this.errorMessage = null;
  }
  get objectApiName() {
    return this._objectApiName;
  }

  handleRecordFormError(event) {
    this.errorMessage = event.detail.message;
  }

  get isEmptyState() {
    return !this._recordId && !this.errorMessage;
  }
}
