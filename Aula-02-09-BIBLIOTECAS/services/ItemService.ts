import { Item } from '../models/ItemModel';

export class ItemService {
  private items: Item[] = [
    { id: '1', title: 'Item Exemplo 1' },
    { id: '2', title: 'Item Exemplo 2' },
  ];

  generateId(): string {
    return Date.now().toString();
  }

  getItems(): Item[] {
    return this.items;
  }

  addItem(title: string): Item {
    const newItem: Item = { id: this.generateId(), title };
    this.items.push(newItem);
    return newItem;
  }

  updateItem(id: string, title: string): Item | null {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return null;

    this.items[index].title = title;
    return this.items[index];
  }

  deleteItem(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }
}
