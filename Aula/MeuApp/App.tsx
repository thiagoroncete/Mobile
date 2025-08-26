import React, { useState } from 'react';
import { Item } from './models/Item';
import ItemView from './views/ItemView';

export default function App() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', title: 'Item Exemplo 1' },
    { id: '2', title: 'Item Exemplo 2' },
  ]);

  return <ItemView items={items} setItems={setItems} />;
}