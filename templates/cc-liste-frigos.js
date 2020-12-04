class CcListeFrigos extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsule'
        this._root = this.attachShadow({ mode: 'open' });

        //proprietes
        this.frigos = []; 
    }

    getJSON(path){
        return fetch(path).then(response => response.json()).then(json => this.frigos = json.frigos); 
    }

    //lorsque connecte'
    connectedCallback() { 
        //defini le code encapsule'
        this._root.innerHTML = `
        <style>
        .grid-container {
            float: left;
            width: 48%;
            display: grid;
            grid-template-columns: 25% 60% 10%; //25% pour l'image de frigo, 60%  pour les infos et 10% pour la distance 
            padding: 10px;
            padding-left: 1%;
          }
          .grid-item {
            font-size: 15px;
            text-align: left;
            line-height: 10px;
            font-family: Arial, Helvetica, sans-serif;
          }
            .frame {
                background-color: #ffffff;
                color: #000000;
                margin: 5px;
                padding: 5px;
            }
            h1, h2 {
                color:black;
            }
            .sous-paragraphe {
                font-size: 13px; 
            }
            .global-container {
                display: inline-block;
            }
        </style>
        <template id="template-frigo" class="global-container">
            <div class="grid-container frame">
                <div class="grid-item">
                    <a id="navigation-plats">
                        <input type="image" id="photo-frigo" alt="image introuvable">
                    </a>
                </div>
                
                
                <div class="grid-item"  id="cadre">
                     <h2 id="nom"></h2>
                      <p id="adresse"></p>
                      <p class="sous-paragraphe" id="Raison-Non-Disponibilite"></p>
                 </div>

                 <div class="grid-item">
                    <p id="distance"></p>
                 </div>
            
            </div>


        </template>
        <div id="result"></div>
    `;
        //cree les variables avec le fragment du code encapsule'
        this.templateContent = this._root.querySelector('#template-frigo').content;
        
        this.result = this._root.querySelector('#result');

         this.getJSON("../scripts/frigos.json").then(frigo => {

            //console.log(this.frigos);
            this.frigos.map(frigo => {
                //clone le templateContent
                const clone = document.importNode(this.templateContent, true);
                //met 'a jour le clone avec les donnees de chaque vehicule si demande
                clone.querySelector('#nom').innerHTML = frigo.nom;
                clone.querySelector('#adresse').innerHTML = frigo.adresse;
                clone.querySelector('#distance').innerHTML = frigo.distance;
                if (frigo.disponible === "false") {
                    clone.querySelector('#Raison-Non-Disponibilite').innerHTML = frigo.statut;
                    clone.querySelector('#photo-frigo').setAttribute("src", '../assets/FrigoRouge.png');
                }
                else {
                    clone.querySelector('#photo-frigo').setAttribute("src", '../assets/FrigoVert.png');
                    clone.querySelector('#navigation-plats').setAttribute("href", `../pages/plats.html?frigo=${frigo.nom}`);

                }
                clone.querySelector('#photo-frigo').setAttribute("width", "50%");  
                clone.querySelector('#photo-frigo').setAttribute("height", "100%");
                //ajoute le clone au shadow DOM
                this.result.appendChild(clone);    
            });
         })
    }


    static get observedAttributes() {
        return ["frigos"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //this._root.getElementById(name).innerHTML=newValue;   
        console.log('attributCHanged', name, oldValue, newValue);

        if (name === 'frigos') {
            this.nom = newValue;
        }

    }/**/



}//fin de la classe

//registre de la classe en dehors de la classe
window.customElements.define('cc-liste-frigos', CcListeFrigos); //