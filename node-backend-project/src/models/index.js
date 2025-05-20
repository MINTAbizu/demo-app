class Item {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    static validate(item) {
        if (!item.name || !item.quantity) {
            throw new Error('Invalid item data');
        }
    }

    static create(itemData) {
        Item.validate(itemData);
        return new Item(itemData.name, itemData.quantity);
    }

    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
    }
}

module.exports = Item;