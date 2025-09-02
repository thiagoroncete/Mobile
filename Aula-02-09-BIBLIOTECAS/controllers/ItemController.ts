import { Item } from '../models/ItemModel';
import { ItemService } from '../services/ItemService';

export class ItemController {
  private service: ItemService;

  constructor(service: ItemService) {
    this.service = service;
  }

  getItems(): Item[] {
    return this.service.getItems();
  }

  addItem(title: string, imageUri?: string): Item | null {
    if (!title.trim()) return null;
    return this.service.addItem(title.trim(), imageUri);
  }

  updateItem(id: string, title: string, imageUri?: string): Item | null {
    if (!title.trim()) return null;
    return this.service.updateItem(id, title.trim(), imageUri);
  }

  deleteItem(id: string): boolean {
    return this.service.deleteItem(id);
  }
}
