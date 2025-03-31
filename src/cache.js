class Node {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  
  class LRUCache {
    constructor(capacity = 100000) { 
      this.capacity = capacity;
      this.cache = new Map(); 
      this.head = new Node(0, 0);
      this.tail = new Node(0, 0);
      this.head.next = this.tail;
      this.tail.prev = this.head;
      this.size = 0;
    }
  
    addToFront(node) {
      node.next = this.head.next;
      node.prev = this.head;
      this.head.next.prev = node;
      this.head.next = node;
    }
  
    removeNode(node) {
      const prev = node.prev;
      const next = node.next;
      prev.next = next;
      next.prev = prev;
    }
  
    moveToFront(node) {
      this.removeNode(node);
      this.addToFront(node);
    }
  
    removeLRU() {
      const lru = this.tail.prev;
      this.removeNode(lru);
      return lru.key;
    }
  
    put(key, value) {
      if (key.length > 256 || value.length > 256) {
        throw new Error("Key or value exceeds maximum length of 256 characters");
      }
  
      if (this.cache.has(key)) {
        const node = this.cache.get(key);
        node.value = value;
        this.moveToFront(node);
        return true;
      }
  
      if (this.size === this.capacity) {
        const lruKey = this.removeLRU();
        this.cache.delete(lruKey);
        this.size--;
      }
  
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addToFront(newNode);
      this.size++;
      return true;
    }
  
    get(key) {
      if (!this.cache.has(key)) {
        return null;
      }
      
      const node = this.cache.get(key);
      this.moveToFront(node); 
      return node.value;
    }
  
    getSize() {
      return this.size;
    }
  
    getCapacity() {
      return this.capacity;
    }
  }
  
  module.exports = new LRUCache();
  