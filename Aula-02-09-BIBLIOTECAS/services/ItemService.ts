import { Item } from '../models/ItemModel';

export class ItemService {
  private items: Item[] = [
    { id: '1', title: 'Item Exemplo 1', imageUri: undefined },
    { id: '2', title: 'Item Exemplo 2', imageUri: undefined },
  ];

  generateId(): string {
    return Date.now().toString();
  }

  getItems(): Item[] {
    return this.items;
  }

  addItem(title: string, imageUri?: string): Item {
    const newItem: Item = { id: this.generateId(), title, imageUri };
    this.items.push(newItem);
    return newItem;
  }

  updateItem(id: string, title: string, imageUri?: string): Item | null {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return null;

    this.items[index].title = title;
    if (imageUri !== undefined) {
      this.items[index].imageUri = imageUri;
    }
    return this.items[index];
  }

  deleteItem(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }
}


