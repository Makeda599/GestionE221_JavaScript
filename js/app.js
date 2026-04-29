import { 
    btnAjouter,
    modalAjout,
    formAjout,
    btnFermerAjout,
    zoneToast,
    listeInscription,
    
 } from "./dom/element.js"
// import { btnAjouter } from "./dom/element.js"
import { getData ,sauvegardeData} from "./store/taskStore.js"
import { verifMail,verifTelephone,verifData,resetErrors,afficherErreurs,saisiInscription,ajoutInscription,afficheOneIns,afficheAllIns,rechargerFormulaire, modifUser } from "./services/taskService.js"
import { afficherToast } from "./ui/messageRenderer.js"

let idModifier = null

 btnAjouter.addEventListener("click",function(){
    modalAjout.classList.remove('hidden')
 })
 
 btnFermerAjout.addEventListener("click",function(){
    modalAjout.classList.add("hidden")
 })

listeInscription.addEventListener("click",function(event){
  const btnModif = event.target.closest("#btnModifier")
  console.log(btnModif)
   if(btnModif){
      idModifier = parseInt(btnModif.dataset.id)
      modalAjout.classList.remove('hidden')
      rechargerFormulaire(idModifier)
   }
})

 formAjout.addEventListener("submit",function(event){
   event.preventDefault()
   let nomValue = nom.value.trim()
   let prenomValue = prenom.value.trim()
   let emailValue = email.value.trim()
   let telephoneValue = telephone.value.trim()
   let selectFormationValue = selectFormation.value.trim()

   let errors = verifData(nomValue,prenomValue,emailValue,telephoneValue,selectFormationValue,idModifier)
    if(Object.keys(errors).length > 0){
        afficherErreurs(errors)
        return
    }
    if(idModifier === null){
       const ajoutInscrip = saisiInscription(nomValue,prenomValue,emailValue,telephoneValue,selectFormationValue)
       ajoutInscription(ajoutInscrip)
      
      afficherToast('Inscription ajouté avec succcés','succes')
      
    }else{
         modifUser(idModifier,prenomValue,nomValue,emailValue,telephoneValue,selectFormationValue)
         
         afficherToast('Modification ajouté avec succcés','succes')
         idModifier = null
      }
    
      listeInscription.innerHTML = ""  // ← vider
      afficheAllIns()                  // ← reremplir
      formAjout.reset()
      modalAjout.classList.add('hidden')
})
 afficheAllIns()  