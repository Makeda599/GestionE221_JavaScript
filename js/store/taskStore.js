const STORAGE_KEY = "inscriptions"

export function getData(){
    const tabIns = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return tabIns ? tabIns : []
}

export function sauvegardeData(data){
    const dataJson = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY,dataJson)
}