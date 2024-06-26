import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  const transact = db.transaction('jate', 'readwrite');

  const objStore = transact.objectStore('jate');

  const request = objStore.put(content);

  if(!request){
    return console.log(err, 'No data to PUT or internal server error.')
  }

  console.log(request)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);

  const transact = db.transaction('jate', 'readonly');

  const objStore = transact.objectStore('jate');

  const request = objStore.getAll()

  const result = await request;
  
  if(!result){
    return console.log(err, 'No data to GET or internal server error.')
  }

  return result[result.length - 1]?.content;
};

initdb();
