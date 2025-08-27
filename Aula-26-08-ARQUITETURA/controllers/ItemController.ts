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

  addItem(title: string): Item | null {
    if (!title.trim()) return null;
    return this.service.addItem(title.trim());
  }

  updateItem(id: string, title: string): Item | null {
    if (!title.trim()) return null;
    return this.service.updateItem(id, title.trim());
  }

  deleteItem(id: string): boolean {
    return this.service.deleteItem(id);
  }
}
