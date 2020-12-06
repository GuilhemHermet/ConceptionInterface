class CcListeAliments extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsule'
        this._root = this.attachShadow({ mode: 'open' });

        //proprietes
        this.platsTemp = [];
        this.plats = [];
        this.frigo = '';
        this.quantitePanier = 0; 

        // Récupération du frigo courant
        var str = window.location.href;
        var url = new URL(str);
        var search_params = new URLSearchParams(url.search); 
        if(search_params.has('frigo')) {
          this.frigo = search_params.get('frigo');
          console.log(this.frigo);
        }	 

    }
    
    getJSON(path){
        return fetch(path).then(response => response.json()).then(json => this.platsTemp = json.plats); 
    }

    modifierQuantitePanier(){
        var nomAliment = this[1].nom; 

        for(var i = 0; i < this[0].plats.length; i++){
            if (this[0].plats[i].nom == nomAliment){
                var quantiteAliment = this[0].plats[i].quantite; 
                if (quantiteAliment > 0){
                    this[0].plats[i].quantite = quantiteAliment - 1; 
                    this[1].quantite = quantiteAliment - 1; 
                    var elementHTML = this[0]._root.getElementById("result").children[i];
                    elementHTML.getElementsByClassName("quantite")[0].children[0].innerHTML = quantiteAliment - 1
                    this[0].quantitePanier = this[0].quantitePanier + 1; 
                    document.getElementById("btnPanier").innerHTML = this[0].quantitePanier;
                }
            }
        }
    }

    //lorsque connecte'
    connectedCallback() { 
        //defini le code encapsule'
        this._root.innerHTML = `
        <style>
            .liste-plats{
                display: flex;
                flex-wrap: wrap;
                width: 100%;

            }
            .global-container {
                border-radius: 10px;
                width: 29%;
                height: 150px;
                display: flex;
                margin: 5px 15px;
                padding: 5px;
                background-color: #eeeeee;
                overflow-y: auto;
            }
            .image-container {
                width: 30%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .description-container {
                width: 50%;
                display: flex;
                flex-direction: column;
                font-family: Arial, Helvetica, sans-serif;
            }

            .nom-plat{
                font-weight: 600;
                font-size: 1.25rem;
            }

            .categorie-plat{
                font-style: italic;
            }

            .quantite-container {
                width: 20%;
                display: flex;
                flex-direction: column;
                margin-top: 15px;
                margin-right: 15px;
                align-items: flex-end;
                font-family: cursive;
                font-size: 18px;
            }

            .add-container{
                display: flex;
                height: 100%;
                align-items: flex-end;
                padding-bottom: 10px;
            }

            img{
                width: 95%;
            }

            .add-button{
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 100%;
                background-color: #4bc2ba;
                border: none;
                font-weight: bold;
                font-size: 30px;
                color: white;
                padding-bottom: 3px;
            }

            .sous-paragraphe {
                font-size: 13px;
                margin: 3px; 
            }
        </style>
        <template id="templateAliment">
            <div class="global-container">
                <div class="image-container">
                     <img id="photoAliment" class alt="image introuvable">
                </div>
                
                <div class="description-container"  id="cadre">
                     <h2 id="nom" class="nom-plat"></h2>
                      <span id="categorie" class="sous-paragraphe categorie-plat"></span>
                      <span class="sous-paragraphe">Date limite : <span id="datePeremption"></span></span>
                      <span class="sous-paragraphe">Allergènes : <span id="allergenes"></span></span>
                 </div>

                 <div class="quantite-container">
                    <div class="quantite">x <span id="quantite"></span></div>
                    <div class="add-container">
                        <button class="add-button" id="btnAjout" title="Ajouter au panier">+</i></button>
                    </div>   
                 </div>

            </div>
        </template>        
        <div id="result" class="liste-plats"></div>
    `;
        //cree les variables avec le fragment du code encapsule
        this.templateContent = this._root.querySelector('#templateAliment').content; 
        
        this.result = this._root.querySelector('#result');

        this.getJSON("../scripts/plats.json").then(() => {

            this.plats = this.platsTemp.filter(plat => plat.frigos.includes(this.frigo))

            this.plats.map(plat => {
                if (plat.quantite > 0) {
                //clone le templateContent
                const clone = document.importNode(this.templateContent, true);
                //met 'a jour le clone avec les donnees de chaque plat si demande
                clone.querySelector('#nom').innerHTML = plat.nom;
                clone.querySelector('#categorie').innerHTML = plat.categorie;   
                clone.querySelector('#datePeremption').innerHTML = plat.dateDePeremption;
                clone.querySelector('#quantite').innerHTML = plat.quantite;
                clone.querySelector('#allergenes').innerHTML = plat.allergenes;
                clone.querySelector('#photoAliment').setAttribute("src", plat.photoSrc);
                clone.querySelector('#photoAliment').setAttribute("width", "50%");  
                var wrappedArguments = [this,plat];
                clone.querySelector('button').addEventListener('click', this.modifierQuantitePanier.bind(wrappedArguments));
                //ajoute le clone au shadow DOM
                this.result.appendChild(clone);    
                }
            });
        })

        
    }

    static get observedAttributes() {
        return ["frigo", "quantitePanier", "plats"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._root.getElementById(name).innerHTML=newValue;   
        console.log('attributChanged', name, oldValue, newValue);

        if (name === 'frigo') {
            this.frigo = newValue;
        }
        if (name === 'quantitePanier') {
            this.quantitePanier = newValue;
        }
        if (name === 'plats') {
            this.plats = newValue;
        }

    }/**/


}//fin de la classe

//registre de la classe en dehors de la classe
window.customElements.define('cc-liste-aliments', CcListeAliments); //