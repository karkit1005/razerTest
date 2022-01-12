/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

class ADBObjectStore {
  databaseName: string;

  constructor(databaseName: string) {
    this.databaseName = databaseName;
  }

  public async createDatabase(database_schema: any, records: any): Promise<IDBOpenDBRequest> {
    const { version, objectStores } = database_schema;

    let request = indexedDB.open(this.databaseName, version);
    request.onupgradeneeded = (event) => {
      let db = request.result;

      const [{name, keyPath, autoIncrement, indexes}] = objectStores;

      let objectStore = db.createObjectStore(name, { keyPath, autoIncrement });
      indexes.forEach((index: any) =>
        objectStore.createIndex(index.name, index.keyPath, {
          multiEntry: index.multiEntry,
          unique: index.unique,
        }),
      );

      objectStore.transaction.oncomplete = (event) => {
        let recordObjectStore = db
          .transaction(name, 'readwrite')
          .objectStore(name);
        records.forEach((record: any) => recordObjectStore.add(record));
      };
    };

    return request;
  }
}

const database = {
  version: 3,
  objectStores: [
    {
      name: 'usb',
      keyPath: ['VID', 'PID'],
      autoIncrement: false,
      indexes: [
        {
          name: 'by_vendor_id',
          keyPath: 'VID',
          multiEntry: false,
          unique: false,
        },
        {
          name: 'by_product_id',
          keyPath: 'PID',
          multiEntry: false,
          unique: false,
        },
        {
          name: 'by_type',
          keyPath: 'type',
          multiEntry: false,
          unique: false,
        },
      ],
    },
  ],
};

const records = [
  {
    VID: 5426,
    PID: 201,
    type: 'mouse',
    device_name: 'Razer Basilisk Essential',
  },
  {
    VID: 5426,
    PID: 379,
    type: 'keyboard',
    device_name: 'Razer Huntsman Tournament Edition',
  },
  {
    VID: 5426,
    PID: 479,
    type: 'keyboard',
    device_name: 'Razer Huntsman Tournament Edition',
  },
  {
    VID: 5426,
    PID: 579,
    type: 'keyboard',
    device_name: 'Razer Huntsman Tournament Edition',
  },
  {
    VID: 5426,
    PID: 1000,
    type: 'keyboard',
    device_name: 'Razer Huntsman Tournament Edition',
  },
  {
    VID: 6426,
    PID: 108,
    type: 'keyboard',
    device_name: 'Razer Huntsman Tournament Edition',
  },
  {
    VID: 6426,
    PID: 579,
    type: 'keyboard',
    device_name: 'Razer Huntsman Tournament Edition',
  },
  {
    VID: 6426,
    PID: 888,
    type: 'keyboard',
    device_name: 'Razer Huntsman Tournament Edition',
  },
];

const databaseName = 'usb_devices';
const db = new ADBObjectStore(databaseName);

let createResult = await db.createDatabase(database, records);

export { ADBObjectStore };
