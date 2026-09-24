class Node {
    constructor(key, value, expiry = null) {
        this.key = key;
        this.value = value;
        this.expiry = expiry; // for TTL
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity, ttl = null) {
        this.capacity = capacity;
        this.ttl = ttl; // in milliseconds (e.g., 5000 means 5 seconds)
        this.cache = new Map(); // For O(1) lookup
        
        // To simplify operations on the dummy head and tail list.
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Adding a node at the very beginning of the list (after the Head) - Most Recently Used.
    _add(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    // Deleting a node from the list
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    get(key) {
        if (this.cache.has(key)) {
            let node = this.cache.get(key);

            // Checking TTL (Bonus)
            if (node.expiry && Date.now() > node.expiry) {
                this.cache.delete(key);
                this._remove(node);
                return -1;
            }

            // Since it has been used, move it to the beginning of the list.
            this._remove(node);
            this._add(node);
            return node.value;
        }
        return -1;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this._remove(this.cache.get(key));
        }

        // Calculating TTL
        let expiry = this.ttl ? Date.now() + this.ttl : null;
        let newNode = new Node(key, value, expiry);
        
        this.cache.set(key, newNode);
        this._add(newNode);

        // If the capacity is exceeded, delete from the end of the list (LRU).
        if (this.cache.size > this.capacity) {
            let lruNode = this.tail.prev;
            this._remove(lruNode);
            this.cache.delete(lruNode.key);
        }
    }
}

// --- testing ---
const cache = new LRUCache(2, 5000); // Capacity 2, TTL 5 seconds

cache.put("A", 10);
cache.put("B", 20);
console.log("Get A:", cache.get("A")); // It will return 10; A is now MRU.

cache.put("C", 30); // B will be deleted because it is the Least Recently Used.
console.log("Get B:", cache.get("B")); // -1 will return

console.log("Get C:", cache.get("C")); // 30 will be returned.
console.log("Get A:", cache.get("A")); // 10 will be returned.

// TTL test (A and C will disappear if checked after 5 seconds)
setTimeout(() => {
    console.log("After 6 seconds, Get A:", cache.get("A")); // -1 will return (Expired)
}, 6000);