export interface MenuItemType {
    label: string;
    value: string;
    children?: MenuItemType[];
  }
  
  const createMenuItem = (label: string, value: string, children?: MenuItemType[]): MenuItemType => ({
    label,
    value,
    children,
  });
  
  export const menuData: MenuItemType[] = [
    createMenuItem('Case Deal', 'case-deal', [
      createMenuItem('Fruits & Vegetables', 'fruits-vegetables'),
      createMenuItem('Meat & Seafood', 'meat-seafood'),
    ]),
    createMenuItem('Fruits & Vegetables', 'fruits-vegetables', [
      createMenuItem('Fresh Produce', 'fresh-produce'),
      createMenuItem('Organic', 'organic'),
    ]),
    createMenuItem('Meat & Seafood', 'meat-seafood', [
      createMenuItem('Fresh Meat', 'fresh-meat'),
      createMenuItem('Seafood', 'seafood'),
    ]),
    createMenuItem('Dairy, Chilled & Eggs', 'dairy-chilled-eggs', [
      createMenuItem('Fresh Milk', 'fresh-milk'),
      createMenuItem('UHT, Milk & Milk Powder', 'uht-milk-powder'),
      createMenuItem('Eggs', 'eggs'),
      createMenuItem('Yoghurt', 'yoghurt'),
    ]),
    createMenuItem('Rice, Oil & Noodles', 'rice-oil-noodles', [
      createMenuItem('Rice', 'rice'),
      createMenuItem('Cooking Oil', 'cooking-oil'),
      createMenuItem('Noodles', 'noodles'),
    ]),
    createMenuItem('Breakfast & Bakery', 'breakfast-bakery', [
      createMenuItem('Bread', 'bread'),
      createMenuItem('Pastries', 'pastries'),
    ]),
    createMenuItem('Frozen Food', 'frozen-food', [
      createMenuItem('Frozen Meals', 'frozen-meals'),
      createMenuItem('Ice Cream', 'ice-cream'),
    ]),
    createMenuItem('Snacks & Confectionery', 'snacks-confectionery', [
      createMenuItem('Chips', 'chips'),
      createMenuItem('Chocolate', 'chocolate'),
    ]),
    createMenuItem('Beer, Wines & Spirits', 'beer-wines-spirits', [
      createMenuItem('Beer', 'beer'),
      createMenuItem('Wine', 'wine'),
    ]),
    createMenuItem('Beverages', 'beverages', [
      createMenuItem('Soft Drinks', 'soft-drinks'),
      createMenuItem('Juices', 'juices'),
    ]),
    createMenuItem('Canned, Preserved & Soup', 'canned-preserved-soup', [
      createMenuItem('Canned Goods', 'canned-goods'),
      createMenuItem('Soups', 'soups'),
    ]),
    createMenuItem('Condiment & Sauce', 'condiment-sauce', [
      createMenuItem('Sauces', 'sauces'),
      createMenuItem('Spices', 'spices'),
    ]),
    createMenuItem('Household Supplies', 'household-supplies', [
      createMenuItem('Cleaning', 'cleaning'),
      createMenuItem('Paper Goods', 'paper-goods'),
    ]),
  ];