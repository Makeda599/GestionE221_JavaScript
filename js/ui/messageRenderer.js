import { zoneToast } from "../dom/element.js";
/* ── Toast ── */
export function afficherToast(message, type = 'succes') {
  const couleurs = { succes: 'bg-green-600', erreur: 'bg-red-600', info: 'bg-blue-600' };
  const icones   = { succes: '✅', erreur: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast flex items-center gap-3 ${couleurs[type]} text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg min-w-[280px]`;
  toast.innerHTML = `<span>${icones[type]}</span><span>${message}</span>`;
  zoneToast.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 10);
  setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 300); }, 3000);
}