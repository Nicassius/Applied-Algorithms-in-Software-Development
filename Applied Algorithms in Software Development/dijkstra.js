function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new PriorityQueue();

    // Initialize distances with infinity, except the start vertex which is 0
    for (const vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add the start vertex to the priority queue with a distance of 0
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const { vertex: currentVertex, priority: currentDistance } = priorityQueue.dequeue();

        if (visited.has(currentVertex)) {
            continue;
        }
        visited.add(currentVertex);

        for (const neighbor in graph[currentVertex]) {
            const distance = graph[currentVertex][neighbor];
            const totalDistance = currentDistance + distance;

            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance;
                priorityQueue.enqueue(neighbor, totalDistance);
            }
        }
    }

    return distances;
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(vertex, priority) {
        this.values.push({ vertex, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    isEmpty() {
        return this.values.length === 0;
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
// Output should be: { A: 0, B: 4, C: 2, D: 5 }
