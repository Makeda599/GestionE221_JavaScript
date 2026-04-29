import { 
    btnAjouter,
    modalAjout,
    formAjout,
    btnFermerAjout,
    zoneToast,
 } from "./dom/element.js"
// import { btnAjouter } from "./dom/element.js"
import { getData ,sauvegardeData} from "./store/taskStore.js"
import { verifData,resetErrors,afficherErreurs,saisiInscription,ajoutInscription,afficheOneIns,afficheAllIns } from "./services/taskService.js"
import { afficherToast } from "./ui/messageRenderer.js"

 btnAjouter.addEventListener("click",function(){
    modalAjout.classList.remove('hidden')
 })
 
 btnFermerAjout.addEventListener("click",function(){
    modalAjout.classList.add("hidden")
 })
 formAjout.addEventListener("submit",function(event){
   event.preventDefault()
   let nomValue = nom.value.trim()
   let prenomValue = prenom.value.trim()
   let emailValue = email.value.trim()
   let telephoneValue = telephone.value.trim()
   let selectFormationValue = selectFormation.value.trim()

   let errors = verifData(nomValue,prenomValue,emailValue,telephoneValue,selectFormationValue)
    if(Object.keys(errors).length > 0){
        afficherErreurs(errors)
        return
    }
    const ajoutInscrip = saisiInscription(nomValue,prenomValue,emailValue,telephoneValue,selectFormationValue)
    ajoutInscription(ajoutInscrip)
    modalAjout.classList.add('hidden')
   afficherToast('Inscription ajouté avec succcés','succes')
   formAjout.reset()
   
})
afficheAllIns()