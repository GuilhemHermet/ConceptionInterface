class CcListeFrigos extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsulé
        this._root = this.attachShadow({ mode: 'open' });

        //propriétés
        this.frigos = []; 
    }

    getJSON(path){
        return fetch(path).then(response => response.json()).then(json => this.frigos = json.frigos); 
    }

    //lorsque connecté
    connectedCallback() { 
        //defini le code encapsulé
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
        <template id="templateFrigo" class="global-container">
            <div class="grid-container frame">
                <div class="grid-item">
                    <a id="navigationPlats">
                        <input type="image" id="photoFrigo" alt="image introuvable">
                    </a>
                </div>
                
                
                <div class="grid-item"  id="cadre">
                     <h2 id="nom"></h2>
                      <p id="adresse"></p>
                      <p class="sous-paragraphe" id="raisonNonDisponibilite"></p>
                 </div>

                 <div class="grid-item">
                    <p id="distance"></p>
                 </div>
            
            </div>


        </template>
        <div id="result"></div>
    `;
        //cree les variables avec le fragment du code encapsulé
        this.templateContent = this._root.querySelector('#templateFrigo').content;
        
        this.result = this._root.querySelector('#result');

         this.getJSON("../scripts/frigos.json").then(frigo => {

            // Récupérer la quantité de plats dans le panier de l'utilisateur (ou l'initialiser à 0)
            if (!sessionStorage.quantitePanier || sessionStorage.quantitePanier == 'NaN') {
                sessionStorage.quantitePanier = 0;
            }
            document.getElementById('quantitePanier').innerHTML = sessionStorage.quantitePanier;

            this.frigos.map(frigo => {
                //clone le templateContent
                const clone = document.importNode(this.templateContent, true);

                clone.querySelector('#nom').innerHTML = frigo.nom;
                clone.querySelector('#adresse').innerHTML = frigo.adresse;
                clone.querySelector('#distance').innerHTML = frigo.distance;
                if (frigo.disponible === "false") {
                    clone.querySelector('#raisonNonDisponibilite').innerHTML = frigo.statut;
                    clone.querySelector('#photoFrigo').setAttribute("src", '../assets/FrigoRouge.png');
                }
                else {
                    clone.querySelector('#photoFrigo').setAttribute("src", '../assets/FrigoVert.png');
                    clone.querySelector('#navigationPlats').setAttribute("href", `../pages/plats.html?frigo=${frigo.nom}`);

                }
                clone.querySelector('#photoFrigo').setAttribute("width", "50%");  
                clone.querySelector('#photoFrigo').setAttribute("height", "100%");
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
            this.frigos = newValue;
        }

    }/**/



}//fin de la classe

//registre de la classe en dehors de la classe
window.customElements.define('cc-liste-frigos', CcListeFrigos);