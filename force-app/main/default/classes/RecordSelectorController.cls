public with sharing class RecordSelectorController {
  @AuraEnabled(cacheable=true)
  public static List<ComboBoxItem> getObjectNames() {
    List<ComboBoxItem> items = new List<ComboBoxItem>();
    List<EntityDefinition> entities = [
      SELECT MasterLabel, QualifiedApiName, IsTriggerable, IsQueryable
      FROM EntityDefinition
      WHERE IsTriggerable = TRUE AND IsQueryable = TRUE
      ORDER BY MasterLabel
    ];
    for (EntityDefinition entity : entities) {
      items.add(new ComboBoxItem(entity.MasterLabel, entity.QualifiedApiName));
    }
    return items;
  }

  @AuraEnabled(cacheable=true)
  public static List<ComboBoxItem> getRecords(String objectApiName) {
    List<ComboBoxItem> items = new List<ComboBoxItem>();
    String query =
      'SELECT ID FROM ' +
      String.escapeSingleQuotes(objectApiName) +
      ' LIMIT 10';
    List<SObject> records = Database.query(query);
    for (SObject record : records) {
      items.add(new ComboBoxItem(record.Id, record.Id));
    }
    return items;
  }

  public class ComboBoxItem {
    @AuraEnabled
    public String label;

    @AuraEnabled
    public String value;

    public ComboBoxItem(String label, String value) {
      this.label = label;
      this.value = value;
    }
  }
}
