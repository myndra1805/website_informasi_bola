import idb from "idb"

const dbPromise = idb.open("favorite", 1, upgradeDb => {
    upgradeDb.createObjectStore("clubs", {keyPath: "idClub", autoIncrement: true})
    upgradeDb.createObjectStore("players", {keyPath: "idPlayer", autoIncrement: true})
    upgradeDb.createObjectStore("schedules", {keyPath: "idSchedule", autoIncrement: true})
})

function createData(tableName, data){
    return dbPromise.then(db => {
        const tx = db.transaction(tableName, "readwrite")
        const store = tx.objectStore(tableName)
        store.add(data)
        return tx.complete
    }).then(() => {
        return true
    }).catch(() => {
        return false
    })
}

function readData(tableName){
    return dbPromise.then(db => {
        const tx = db.transaction(tableName, "readonly")
        const store = tx.objectStore(tableName)
        return store.getAll()
    }).then(clubs => clubs)
}

function readDataById(tableName, id){
    return dbPromise.then(db => {
        const tx = db.transaction(tableName, "readonly")
        const store = tx.objectStore(tableName)
        return store.get(id)
    }).then(clubs => clubs)
}

function deleteData(tableName, id){
    return dbPromise.then(db => {
        const tx = db.transaction(tableName, "readwrite")
        const store = tx.objectStore(tableName)
        store.delete(id)
        return tx.complete
    }).then(() => {
        return true
    }).catch(() => {
        return false
    })
}

function updateData(tableName, data){
    return dbPromise.then(db => {
        const tx = db.transaction(tableName, "readwrite")
        const store = tx.objectStore(tableName)
        store.put(data)
        return tx.complete
    }).then(() => {
        return true
    }).catch(() => {
        return false
    })
}

export {
    createData,
    readData,
    deleteData,
    updateData
}
