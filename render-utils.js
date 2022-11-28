export function renderListItem(itemObject) {
    const listItemEl = document.createElement('li');
    listItemEl.textContent = `${itemObject.item}: ${itemObject.rating}/10`;

    return listItemEl;
}

// trains: 10/10

// {item: 'trains',
// rating: 10,
// cross_out: false,
// id:
// user_id: }
