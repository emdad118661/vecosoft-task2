# 🗂️ LRU Cache Implementation (with TTL Support)

This project is a JavaScript implementation of a **Least Recently Used (LRU) Cache**. It efficiently manages a fixed-size cache by removing the oldest, least-used items when capacity is reached. It also includes an optional **TTL (Time-To-Live)** feature for data expiration.

## ✨ Features

- **O(1) Average Time Complexity** for both `get()` and `put()` operations.
- **LRU Eviction Policy:** Automatically removes the least recently used entry when the capacity is exceeded.
- **TTL (Time-To-Live):** Support for expiration, where items are removed after a specified time.
- **Ordered Tracking:** Maintains the usage order using a Doubly Linked List.

## 🧱 Data Structures Used and Why

To achieve `O(1)` efficiency, this implementation combines two data structures:

### 1. Hash Map (JavaScript `Map`)

- **Why:** A Hash Map allows us to look up any key and access its corresponding node in `O(1)` time. This is essential for the `get(key)` operation to be near-instant.

### 2. Doubly Linked List

- **Why:** A Doubly Linked List allows us to add or remove elements from any position (head, tail, or middle) in `O(1)` time.
  - **MRU (Most Recently Used):** When a key is accessed or added, its node is moved to the **head** of the list.
  - **LRU (Least Recently Used):** The node at the **tail** of the list represents the least recently used item. When eviction is needed, we simply remove the tail node.

## 🔄 How LRU Ordering is Maintained

- **On `put(key, value)`:**
  - If the key already exists, we update the value and move it to the head.
  - If it's a new key and the cache is full, we delete the tail node from both the Map and the Linked List before adding the new node to the head.
- **On `get(key)`:** If the key exists, we move that node to the head (marking it as recently used) and return its value.

## 📊 Complexity Analysis

| Operation         | Time Complexity   | Space Complexity              |
| :---------------- | :---------------- | :---------------------------- |
| `get(key)`        | `O(1)` (Average)  | `O(1)`                        |
| `put(key, value)` | `O(1)` (Average)  | `O(1)`                        |
| **Overall Cache** | -                 | `O(n)` where `n` is capacity  |

## ⏳ Bonus: TTL (Expiration) Support

Each node stores an **expiry timestamp**. During a `get()` operation, the cache checks if the current time exceeds the expiry time. If it has expired, the cache removes the item and returns `-1`, ensuring no stale data is served.

## ▶️ How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Steps

1. Clone this repository or download the source code.
2. Open your terminal/command prompt in the project folder.
3. Run the following command:

```bash
   node index.js
```

## 🖼️ Output Screenshot

Here is the execution result showing `put`, `get`, LRU eviction, and TTL expiration:

<img width="496" height="103" alt="Screenshot 2026-09-24 194130" src="https://github.com/user-attachments/assets/d7cd7cbd-529a-4279-96ed-49148db9b980" />


## 👤 Author

**Emdadul Haque**
