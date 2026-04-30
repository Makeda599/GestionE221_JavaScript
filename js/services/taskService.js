import { getData, sauvegardeData} from "../store/taskStore.js"
import { formatDate } from "../utils/dateFormatter.js"
import { btnAjouter, listeInscription,btnFormulaireAjout ,listeArchives} from "../dom/element.js"
// const allIns = getData()
   
   export function verifMail(email, idModifier) {
    const allIns = getData()
    const verif = allIns.find(u => u.email === email)
    if (!verif) return 0                                         // email n'existe pas → OK
    if (idModifier !== null && verif.id === idModifier) return 0 // c'est la même personne → OK
    return 1                                                     // doublon → erreur
    }

    export function verifTelephone(telephone, idModifier) {
        const allIns = getData()
        const verif = allIns.find(u => u.telephone === telephone)
        if (!verif) return 0
        if (idModifier !== null && verif.id === idModifier) return 0
        return 1
    }
export function verifData(nom,prenom,email,telephone,selectformation,idModifier){
    let errors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^((\+221|00221)?(70|71|75|76|77|78)\d{7})|((\+220|00220)?[235679]\d{6})$/;
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/
    
    if (nom === ""){
        errors.nom = "veuillez remplir le nom" 
    }else if(!nameRegex.test(nom)){
        errors.nom = "Le nom doit contenir que des lettres"
    }
    if (prenom === ""){
        errors.prenom = "veuillez remplir le prenom" 
    }else if(!nameRegex.test(prenom)){
        errors.prenom = "Le prenom doit contenir que des lettres"
    }
    if (email === ""){
        errors.email = "veuillez remplir le email" 
    }else if(!emailRegex.test(email)){
         errors.email = "Email invalide"
    }
    //verification de mail unique
    const verifEmail = verifMail(email,idModifier)
    if(verifEmail === 1){
        errors.email = "L'email doit être unique"
    }
    if (telephone === ""){
        errors.telephone = "veuillez remplir le telephone" 
    } else if(!phoneRegex.test(telephone)){
        errors.telephone = "Numéro sénégalais ou gambien invalide"
    }
    //telephone unique
    const verifTel = verifTelephone(telephone,idModifier)
    if(verifTel === 1){
        errors.telephone = "Le numéro de téléphone doit être unique"
    }
    if (selectformation === ""){
        errors.selectformation = "veuillez remplir la formation" 
    }


    return errors
   }
   export function resetErrors(){
    const errorSpans = document.querySelectorAll('[id$="Error"]')

    errorSpans.forEach(span => {
        span.textContent = ""
    })
    }

   export function afficherErreurs(errors){
    resetErrors()
    
    if(errors.nom){
        document.getElementById("nomError").textContent = errors.nom
        document.getElementById("nomError").style.color = "red"
    }
    if(errors.prenom){
        document.getElementById("prenomError").textContent = errors.prenom
        document.getElementById("prenomError").style.color = "red"
    }


    if(errors.email){
        document.getElementById("emailError").textContent = errors.email
        document.getElementById("emailError").style.color = "red"
    }

    if(errors.telephone){
        document.getElementById("telephoneError").textContent = errors.telephone
        document.getElementById("telephoneError").style.color = "red"
    }
    if(errors.selectformation){
        document.getElementById("formationError").textContent = errors.selectformation
        document.getElementById("formationError").style.color = "red"
    }

    }

export function saisiInscription(nom,prenom,email,telephone,selectformation){
    const allIns = getData()
    const dernierID = allIns.length > 0 ? Math.max(...allIns.map(i => i.id)) : 0
    const inscription = {
       "id": dernierID + 1,
       "nom" : nom,
       "prenom" : prenom,
       "email" : email,
       "telephone" : telephone,
       "formation" : selectformation,
       "date" : formatDate(Date.now()),
       "statue" : true   
    }
    return inscription
}

export function ajoutInscription(inscription){
    const allIns = getData()
    allIns.push(inscription)
    sauvegardeData(allIns)
}
export function afficheOneIns(inscript){
    const tabData = document.createElement("tr")
    tabData.className = "border-b border-gray-100 hover:bg-rose-50 transition-colors' h-[50px] "
    tabData.innerHTML = ` 
                                <td class="text-lg px-3 py-3 text-left">${inscript.nom}</td>
                                <td class="text-lg px-3 py-3 text-left">${inscript.prenom}</td>
                                <td class="text-lg px-3 py-3 text-left text-gray-500">${inscript.email}</td>
                                <td class="text-lg px-3 py-3 text-left">${inscript.telephone}</td>
                                <td class="text-sm px-3 py-3 text-left">
                                    <span class="px-4 py-1 rounded-2xl bg-red-100 text-red-800 ">${inscript.formation}</span>
                                </td>
                                <td class="text-lg px-3 py-3 text-left text-gray-500">${inscript.date}</td>
                                <td class="text-center px-3 py-3 ">
                                        <div class="flex gap-2 items-center justify-center ">
                                            <button
                                                data-id="${inscript.id}"
                                                id="btnModifier"
                                                class="w-8 h-8 rounded-lg bg-orange-50 border border-orange-300 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
                                            ✏️
                                            </button>
                                            <button
                                                data-id="${inscript.id}"
                                                id="btnArchiver"
                                                class="w-8 h-8 rounded-lg bg-orange-50 border border-orange-300 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
                                            🗃️
                                            </button> 
                                        </div>
                                </td>
                            `
    listeInscription.appendChild(tabData)
}

export function afficheAllIns(){
    const allIns = getData()
    allIns.forEach(ins =>{
        if(ins.statue === true){
            afficheOneIns(ins)
        }
    })
}

export function rechargerFormulaire(id){
    const allIns = getData()
    const oneIns = allIns.find(ins => ins.id === id)
    if(!oneIns){
        return
    }
   nom.value = oneIns.nom
   prenom.value = oneIns.prenom
   email.value = oneIns.email
   telephone.value = oneIns.telephone
   selectFormation.value = oneIns.formation
   btnFormulaireAjout.textContent = "modifier"

}

export function modifInscript(id,prenomValue,nomValue,emailValue,telephoneValue,selectFormationValue){
    const allIns = getData()
    const index = allIns .findIndex(ins => ins.id === id)
   if(index !== -1){
    allIns[index].prenom = prenomValue
    allIns[index].nom = nomValue
    allIns[index].email = emailValue
    allIns[index].telephone = telephoneValue
    allIns[index].formation = selectFormationValue
    allIns[index].date = formatDate(Date.now())
    sauvegardeData(allIns)

   } 
}
export function archiveInscr(id){
    const allIns = getData()
    const archi = allIns.find(i => i.id === id)
    archi.statue = false
    sauvegardeData(allIns)
}
export function deArchiveInscr(id){
    const allIns = getData()
    const archi = allIns.find(i => i.id === id)
    archi.statue = true
    sauvegardeData(allIns)
}
export function afficheOneArchive(ins){
    const item = document.createElement('div');
    item.className = 'flex items-center gap-4 bg-rose-50 border border-red-100 rounded-xl px-4 py-3 mb-3';

    item.innerHTML = `
      <!-- Checkbox -->
      <input type="checkbox" class="ma-checkbox case-archive" data-id="${ins.id}" />

      <!-- Infos -->
      <div class="flex-1">
        <p class="font-semibold text-sm text-red-900">${ins.nom} ${ins.prenom}</p>
        <p class="text-xs text-gray-500">${ins.email}</p>
        <span class="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
          ${ins.formation}
        </span>
      </div>

      <!-- Date -->
      <span class="text-xs text-gray-400">${ins.date}</span>
    `;

    listeArchives.appendChild(item);

}
export function afficheAllArchive(){
    listeArchives.innerHTML = ""
    const allIns = getData()
    const archi = allIns.filter(i => i.statue === false)
   
    if (archi.length === 0) {
        archivesVides.classList.remove("hidden")
    } else {
        archivesVides.classList.add("hidden")
        archi.forEach(i => afficheOneArchive(i))
    }
}
