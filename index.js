'use strict';

const STORE = {
  items : [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  display: true
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  if (STORE.display===true){
    //show all items in STORE
    const shoppingListItemsStringAll = generateShoppingItemsString(STORE.items);

    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsStringAll);
  }
  //if the display key is false then:
  if (STORE.display===false){
  //show only checked items
    const shoppingListItemsStringUnchecked = 
    generateShoppingItemsString(STORE.items.filter(obj => obj['checked']===false));
    $('.js-shopping-list').html(shoppingListItemsStringUnchecked);
  }
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
function toggleCheckedForListItem (itemIndex){
  console.log('Toggling checked property for item at ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement (item){
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  // this funciton will be reponsible for when users click the "check" button on
  // a shopping list item.
  $('.js-shopping-list').on('click','.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });

}

function deleteClickedForListItem (itemIndex){
  STORE.items.splice(itemIndex, 1);
}
  
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click','.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteClickedForListItem(itemIndex);
    renderShoppingList();
  });
}

function toggleCheckboxDisplay (){
  STORE.display = !STORE.display;
}

function handleDisplayStyle(){
  ///once the checkbox is clicked:
  $('#js-shopping-list-form').on('change', '.displaying', event =>{
    //show this is running:
    console.log('display style running');

    //change the display key inside object to the opposite value(if true...now false)
    toggleCheckboxDisplay();

    //re render the shopping list which has a if statement to filter by display key
    renderShoppingList();
  });

}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleDisplayStyle();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);