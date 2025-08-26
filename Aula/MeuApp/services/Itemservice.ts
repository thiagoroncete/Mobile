import { Item } from '../models/Item';

export class ItemService {
  generateId(): string {
    return Date.now().toString();
  }

  validateTitle(title: string): boolean {
    return title.trim().length > 0;
  }

  createItem(title: string): Item {
    return {
      id: this.generateId(),
      title: title.trim(),
    };
  }

  updateItem(items: Item[], id: string, title: string): Item[] {
    return items.map(item =>
      item.id === id
        ? { ...item, title: title.trim() }
        : item
    );
  }

  deleteItem(items: Item[], id: string): Item[] {
    return items.filter(item => item.id !== id);
  }
}
