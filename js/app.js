import { 
    btnAjouter,
    modalAjout,
    formAjout,
    btnFermerAjout,
    zoneToast,
    listeInscription,
    modalConfirm,
    messageConfirm,
    confirmOui,
    confirmNon,
    drawerFond,
    drawer,
    fermerDrawer,
    listeArchives,
    barreActions,
   nbSelectionnes,
   btnDesarchiver,
   rechercher 
  
 } from "./dom/element.js"
// import { btnAjouter } from "./dom/element.js"
import { getData ,sauvegardeData} from "./store/taskStore.js"
import { verifMail,verifTelephone,verifData,resetErrors,afficherErreurs,saisiInscription,ajoutInscription,afficheOneIns,afficheAllIns,rechargerFormulaire, modifInscript, archiveInscr,  afficheOneArchive,
    afficheAllArchive,deArchiveInscr,afficheRecherche } from "./services/taskService.js"
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
  const btnArchi = event.target.closest("#btnArchiver")
   if(btnModif){
      idModifier = parseInt(btnModif.dataset.id)
      modalAjout.classList.remove('hidden')
      rechargerFormulaire(idModifier)
   }
   if(btnArchi){
      // console.log(btnArchi)
      modalConfirm.classList.remove("hidden")
      messageConfirm.textContent = "Voulez-vous vraiment archiver cette insription"
      const idArchi = parseInt(btnArchi.dataset.id)
      confirmOui.addEventListener("click",function(){
         archiveInscr(idArchi)
         modalConfirm.classList.add("hidden")
         afficherToast('Inscription archivé avec succcés','succes')
         listeInscription.innerHTML = ""  
         afficheAllIns()              

      })
      
      confirmNon.addEventListener("click",function(){
         modalConfirm.classList.add("hidden")
         afficherToast('archivage annulé','erreur')
      })

      
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
         modifInscript(idModifier,prenomValue,nomValue,emailValue,telephoneValue,selectFormationValue)
         
         afficherToast('Modification ajouté avec succcés','succes')
         idModifier = null
      }
    
      listeInscription.innerHTML = ""  // ← vider
      afficheAllIns()                  // ← reremplir
      formAjout.reset()
      modalAjout.classList.add('hidden')
})
btnAllArchives.addEventListener("click",function(){
   drawerFond.classList.remove("hidden")
   drawer.classList.remove("hidden")
   afficheAllArchive()
})

fermerDrawer.addEventListener("click",function(){
   drawerFond.classList.add("hidden")
   drawer.classList.add("hidden")

})
listeArchives.addEventListener("change",function(event){
   const checkbox = event.target.closest(".case-archive")
    if (!checkbox) return

    // Compter les cochés
    const cochees = listeArchives.querySelectorAll(".case-archive:checked")
    
    if (cochees.length > 0) {
        barreActions.classList.remove("hidden")
        barreActions.classList.add("flex")
        nbSelectionnes.textContent = `${cochees.length} sélectionné(s)`
    } else {
        barreActions.classList.add("hidden")
        barreActions.classList.remove("flex")
    }
})
btnDesarchiver.addEventListener("click", function() {
    const cochees = listeArchives.querySelectorAll(".case-archive:checked")
    
    cochees.forEach(checkbox => {
        const id = parseInt(checkbox.dataset.id)
        deArchiveInscr(id)
    })

    afficherToast(`${cochees.length} inscription(s) désarchivée(s)`, 'succes')
    
    // Rafraîchir les deux listes
    afficheAllArchive()
    listeInscription.innerHTML = ""
    afficheAllIns()
    
    // Cacher la barre d'actions
    barreActions.classList.add("hidden")
    barreActions.classList.remove("flex")
})
rechercher .addEventListener("input",function(){
   let tab = afficheRecherche()
   listeInscription.innerHTML =""

   // console.log(tab)
   if (tab.length === 0) {
        listeInscription.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-5 text-gray-400">
                    Aucun résultat trouvé
                </td>
            </tr>`
        return
    }
   tab.forEach(t => {
      if(t.statue === true){
         afficheOneIns(t)
      }
   })
})
 afficheAllIns()  