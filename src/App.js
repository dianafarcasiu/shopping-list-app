import { useState } from "react";
import "./index.css";

export default function App() {
  const [itemsList, setItemsList] = useState([]);

  function handleAddItem(item) {
    setItemsList((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItemsList((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItemsList((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }
  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItemsList([]);
  }

  return (
    <div className="container">
      <Title />
      <ItemsInput onAddItem={handleAddItem} />
      <ItemsList
        items={itemsList}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      {itemsList.length > 0 && <Clear onClear={handleClear} />}
      <Stats items={itemsList} />
    </div>
  );
}

function Title() {
  return <h1>🍊 Grocery List 🍊</h1>;
}

function ItemsInput({ onAddItem }) {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!item) return;

    const newItem = { item, quantity, checked: false, id: Date.now() };
    onAddItem(newItem);
    setItem("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Insert item here..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      <select
        className="select"
        value={quantity}
        onChange={(e) => Number(setQuantity(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <button className="btn">Add item</button>
    </form>
  );
}

function ItemsList({ items, onDeleteItem, onToggleItem }) {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <div className="item">
      <li>
        <input
          type="checkbox"
          className="checkbox"
          value={item.checked}
          onChange={() => onToggleItem(item.id)}
        />
        <span className={item.checked ? "checked" : ""}>
          {item.quantity} {item.item}
        </span>
      </li>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </div>
  );
}

function Clear({ onClear }) {
  return (
    <div className="clear">
      <button className="btn" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numChecked = items.filter((item) => item.checked).length;

  if (!numItems)
    return (
      <footer className="stats">
        <p>Start adding some items to your shopping list!</p>
      </footer>
    );

  return (
    <footer className="stats">
      {numItems !== numChecked ? (
        <p>
          You have {numItems} {numItems === 1 ? "item" : "items"} on your list,
          and you already bought {numChecked}.
        </p>
      ) : (
        <p>Yay, you got everything!</p>
      )}
    </footer>
  );
}
