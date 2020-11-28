class CcListeFrigos extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsule'
        this._root = this.attachShadow({ mode: 'open' });

        //proprietes
        this.nom = "";
        this.adresse = "";
        this.distance = ""; 
        this.disponible = new Boolean("false");
        this.raisonNonDisponibilite = ""; 
        this.plats = [];
        this.frigos = [
            {
                "nom": "FrigoVégétarien",
                "adresse": "333 rue des Légumes",
                "distance": "3.3 km",
                "disponible": "true", 
                "statut": "ouvert"
            },
            
            {
                "nom": "FrigoTechno",
                "adresse": "34 rue des Disques Durs",
                "distance": "3.5 km",
                "disponible": "false", 
                "statut": "fermé pour entretien"
            },
            
            {
                "nom": "FrigoCarnivore",
                "adresse": "89 rue des Moutons",
                "distance": "4.2 km",
                "disponible": "true", 
                "statut": "ouvert"
            },
            
            {
                "nom": "FrigoMusical",
                "adresse": "905 avenue Queen",
                "distance": "6 km",
                "disponible": "true", 
                "statut": "ouvert"   
            },
            
            {
                "nom": "PolyFrigo",
                "adresse": "666 boulevard des Étudiants Honnêtes",
                "distance": "7.9 km",
                "disponible": "true", 
                "statut": "ouvert"
            },
            
            {
                "nom": "FrigoMondial",
                "adresse": "45 avenue de la Culture",
                "distance": "9.7 km",
                "disponible": "false", 
                "statut": "fermé pour nettoyage"
            },
            
            {
                "nom": "FrigoNature",
                "adresse": "9 rue des Arbres",
                "distance": "12.4 km",
                "disponible": "false", 
                "statut": "fermé pour entretien"
            },
            
            {
                "nom": "FrigoMathématique",
                "adresse": "314 rue Pi",
                "distance": "14.5 km",
                "disponible": "true", 
                "statut": "ouvert"
            }
            ]
    }

    //lorsque connecte'
    connectedCallback() { 
        //defini le code encapsule'
        this._root.innerHTML = `
        <style>
        .grid-container {
            display: grid;
            grid-template-columns: 25% 70% 5%; //25% pour l'image de frigo et 75% pour ses informations 
            padding: 10px;
          }
          .grid-item {
            font-size: 25px;
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
                color:black;
            }
        </style>
        <template id="template-frigo" class="grid-container">
            <div class="grid-container frame">
                <div class="grid-item" >
                     <img id="photo-frigo" alt="image introuvable">
                </div>
                
                <div class="grid-item"  id="cadre">
                     <h2 id="nom"></h2>
                      <p id="adresse"></p>
                      <p id="Raison-Non-Disponibilite"></p>
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

        this.frigos.map(frigo => {
            //clone le templateContent
            const clone = document.importNode(this.templateContent, true);
            //met 'a jour le clone avec les donnees de chaque vehicule si demande
            clone.querySelector('#nom').innerHTML = frigo.nom;
            clone.querySelector('#adresse').innerHTML = frigo.adresse;
            clone.querySelector('#distance').innerHTML = frigo.distance;
            if (frigo.disponible === "false") {
                clone.querySelector('#Raison-Non-Disponibilite').innerHTML = frigo.statut;
                clone.querySelector('#photo-frigo').setAttribute("src", 'assets/FrigoRouge.png');
            }
            else {
                clone.querySelector('#photo-frigo').setAttribute("src", 'assets/FrigoVert.png');
            }
            clone.querySelector('#photo-frigo').setAttribute("width", "100%");  
            clone.querySelector('#photo-frigo').setAttribute("height", "100%");
            //ajoute le clone au shadow DOM
            this.result.appendChild(clone);    
        });
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