interface DeviseType {
  nom: string,
  code: string,
  symbole: string,
  taux:number
}

const devises:DeviseType[] = [
  {nom: "Dollar", code: "Dol", symbole: "$", taux: 1},
  {nom: "Euro", code: "Eur", symbole: "€", taux: 1.20},
  {nom: "Livre", code: "Liv", symbole: "£", taux: 1.39},
  {nom: "Yuan", code: "Yua", symbole: "¥", taux: 0.15},
]

function genererListe(liste:HTMLSelectElement, _devises:DeviseType[] = devises): HTMLSelectElement {
  _devises.forEach(devise => {
    const option = <HTMLOptionElement>document.createElement('option')
    option.value = devise.code
    option.text = `${devise.nom} - ${devise.symbole}`
    liste.add(option)
  })
  return liste
}

function getDevise(code:string, _devises:DeviseType[] = devises):DeviseType {
  const devise = _devises.find(e => e.code === code)
  if (!devise) throw new Error(`Aucune devise trouvée pour le code : ${code}`)
  return devise
}

function calculerResultat(montant:number, devise:DeviseType, convert:DeviseType): number {
  if (devise.code !== "Dol")
    montant = montant / devise.taux
  return montant * convert.taux 
}

function afficherResultat(div:HTMLDivElement, result:number):void {
  div.innerHTML = `<h1>${result}</h1>`
}

const deviseInput = document.querySelector("#devise")! as HTMLSelectElement
const convertInput = document.querySelector("#convert")! as HTMLSelectElement
const montantInput = document.querySelector("#montant")! as HTMLInputElement
const btn = document.querySelector("#button")! as HTMLDivElement
const result = document.querySelector("#result")! as HTMLDivElement

genererListe(deviseInput)
genererListe(convertInput)

btn.addEventListener('click', () => {
  const montant:number = Number(montantInput.value)
  const devise:string = deviseInput.value
  const convert:string = convertInput.value
  afficherResultat(result, calculerResultat(montant, getDevise(devise), getDevise(convert)))
})