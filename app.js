/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem, editListItem, getListItems } from './fetch-utils.js';
import { renderListItem } from './render-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.create-form');
// const deleteButton = document.querySelector('#delete-button');
const listEl = document.querySelector('.list');
const error = document.querySelector('#error');

/* State */

/* Events */
window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const rating = data.get('rating');
    form.reset();

    const newItem = await createListItem(item, rating);
    if (newItem) {
        fetchAndDisplayList();
    } else {
        error.textContent = 'Something went wrong while adding your favorite';
    }
});

/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';
    // call our fetch to supabase
    const list = await getListItems();
    if (list) {
        for (let item of list) {
            const listItemEl = renderListItem(item);
            listItemEl.addEventListener('click', async () => {
                await editListItem(item);
                fetchAndDisplayList();
            });
            if (item.cross_out) {
                listItemEl.classList.add('cross-out-true');
            }

            listEl.append(listItemEl);
        }
    }
}
