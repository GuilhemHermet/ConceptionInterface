class CcListeFrigos extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsule'
        this._root = this.attachShadow({ mode: 'open' });

        //proprietes
        this.nom = "";
        this.adresse = "";
        this.distance = 0; 
        this.disponible = new Boolean("false");
        this.raisonNonDisponibilite = ""; 
        this.plats = [];
    }

    getJSON(path){
        return fetch(path).then(response => response.json()); 
    }


    //lorsque connecte'
    connectedCallback() { 
        //defini le code encapsule'
        this._root.innerHTML = `
        <style>
        .grid-container {
            display: grid;
            grid-template-columns: 25% 75%; //25% pour l'image de frigo et 75% pour ses informations 
            padding: 10px;
          }
          .grid-item {
            font-size: 30px;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
          }
            .frame {
                background-color: #ffffff;
                color: #000000;
                margin: 5px;
                padding: 5px;
            }
            h1, h2 {
                color:white;
            }
        </style>
        <template id="template-frigo" class="grid-container">
            <div class="grid-container frame">
                <div class="grid-item"  id="cadre">
                     <h2 id="nom"></h2>
                      <p id="adresse"></p>
                      <p id="distance"></p>
                      <p id="Raison-Non-Disponibilite"></p>
                 </div>

                <div class="grid-item" >
                     <img id="photo-frigo">
                </div>
            
            </div>


        </template>
        <div id="result"></div>
    `;
        //cree les variables avec le fragment du code encapsule'
        this.templateContent = this._root.querySelector('#template-frigo').content;
        
        this.result = this._root.querySelector('#result');

        //clone le templateContent
        const clone = document.importNode(this.templateContent, true);
        //met 'a jour le clone avec les donnees de chaque vehicule si demande
        clone.querySelector('#nom').innerHTML = this.nom;
        clone.querySelector('#adresse').innerHTML = this.adresse;
        clone.querySelector('#distance').innerHTML = this.distance;
        if (this.disponible === "false") {
            clone.querySelector('#Raison-Non-Disponibilite').innerHTML = this.raisonNonDisponibilite;
            clone.querySelector('#photo-frigo').setAttribute("src", 'assets/FrigoRouge.bmp');
        }
        else {
            clone.querySelector('#photo-frigo').setAttribute("src", 'assets/FrigoVert.bmp');
        }
        clone.querySelector('#photo-frigo').setAttribute("width", "100%");  
        clone.querySelector('#photo-frigo').setAttribute("height", "100%");
        //ajoute le clone au shadow DOM
        this.result.appendChild(clone);    
    }


    static get observedAttributes() {
        return ["nom", "adresse", "distance", "disponible", "raisonNonDisponibilite", "plats"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //this._root.getElementById(name).innerHTML=newValue;   
        console.log('attributCHanged', name, oldValue, newValue);

        if (name === 'nom') {
            this.nom = newValue;
        }
        if (name === 'adresse') {
            this.adresse = newValue;
        }
        if (name === 'distance') {
            this.distance = newValue;
        }
        if (name === 'disponible') {
            this.disponible = newValue;
        }
        if (name === 'raisonNonDisponibilite') {
            this.raisonNonDisponibilite = newValue;
        }
        if (name === 'plats') {
            this.plats = newValue;
        }

    }/**/



}//fin de la classe

//registre de la classe en dehors de la classe
window.customElements.define('cc-liste-frigos', CcListeFrigos); //
