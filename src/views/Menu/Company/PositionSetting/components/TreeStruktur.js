export class Tree {
    constructor(root) {
        this.root = root;
    }

    toObject() {
        return this.root.toObject();
    }

    toJson() {
        return this.root.toJson();
    }
}

export class Node {
    children = [];
    constructor({ name, title }, parent = null) {
        this.name = name;
        this.title = title;
        this.parent = parent;
    }

    static create(data, parent = null) {
        const { name, title, children = [] } = data;
        const root = new Node({ name, title }, parent);
        children.forEach((child) => {
            root.addChild(Node.create(child, root));
        });
        return root;
    }

    hasPredecessor(node) {
        if (this === node) {
            return true;
        }
        if (this.parent !== null) {
            return this.parent.hasPredecessor(node);
        }
        return false;
    }

    getParent() {
        return this.parent;
    }

    setParent(node) {
        return this.parent = node;
    }

    addChild(node) {
        node.setParent(this);
        this.children.push(node);
    }

    removeChild(node) {
        this.children = this.children.filter(n => n !== node);
    }

    toObject() {
        const { name, title, children, parent } = this;

        return { 
            name,
            title,
            children: children.map(node => node.toObject()),
            parent
        };
    }

    toJson() {
        const { name, title, children } = this;

        return {
            name, title, children: children.map(node => node.toJson())
        };
    }
}


