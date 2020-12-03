class CcListeAliments extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsule'
        this._root = this.attachShadow({ mode: 'open' });

        //proprietes
        this.plats = []; 
    }

    getJSON(path){
        return fetch(path).then(response => response.json()).then(json => this.plats = json.plats); 
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
        <template id="template-aliment">
            <div class="global-container">
                <div class="image-container">
                     <img id="photo-aliment" class alt="image introuvable">
                </div>
                
                <div class="description-container"  id="cadre">
                     <h2 id="nom" class="nom-plat"></h2>
                      <span id="categorie" class="sous-paragraphe categorie-plat"></span>
                      <span class="sous-paragraphe">Date limite : <span id="date-peremption"></span></span>
                      <span class="sous-paragraphe">Allergènes : <span id="allergenes"></span></span>
                 </div>

                 <div class="quantite-container">
                    <div class="quantite">x <span id="quantite"></span></div>
                    <div class="add-container">
                        <button class="add-button" title="Ajouter au panier">+</i></button>
                    </div>   
                 </div>
            
            </div>


        </template>
        <div id="result" class="liste-plats"></div>
    `;
        //cree les variables avec le fragment du code encapsule'
        this.templateContent = this._root.querySelector('#template-aliment').content;
        
        this.result = this._root.querySelector('#result');

        // this.getJSON("../scripts/plats.json").then(() => {
            this.plats = [
                {
                    "nom": "Salade verte",
                    "categorie": "Salades",
                    "dateDePeremption":"02/12/2020",
                    "allergenes":"Sésame",
                    "quantite": "1",
                    "photoSrc": "../assets/plats/salade.png"
                },
                
                {
                    "nom": "Fromage brie",
                    "categorie": "Fromage",
                    "dateDePeremption":"25/11/2020",
                    "allergenes":"Gluten",
                    "quantite": "1",
                    "photoSrc": "../assets/plats/brie.png"
                },
                
                {
                    "nom": "Gâteau aux framboises",
                    "categorie": "Dessert",
                    "dateDePeremption":"28/11/2020",
                    "allergenes":"Traces de noix et arachides",
                    "quantite": "1",
                    "photoSrc": "../assets/plats/gateau.png"
                },
                
                {
                    "nom": "Spaghetti",
                    "categorie": "Pâtes",
                    "dateDePeremption":"10/12/2020",
                    "quantite": "1",
                    "allergenes":"Gluten",
                    "photoSrc": "../assets/plats/spaghetti.png"
                },
                
                {
                    "nom": "Sandwich au thon",
                    "categorie": "Sandwich",
                    "dateDePeremption":"5/12/2020",
                    "allergenes":"Aucun",
                    "quantite": "1",
                    "photoSrc": "../assets/plats/sandwich.png"
                },
                
                {
                    "nom": "Sushi",
                    "categorie": "Poisson",
                    "dateDePeremption":"30/11/2020",
                    "allergenes":"Sésame",
                    "quantite": "1",
                    "photoSrc": "../assets/plats/sushi.png"
                }
                ];
            //console.log(this.frigos);
            this.plats.map(plat => {
                //clone le templateContent
                const clone = document.importNode(this.templateContent, true);
                //met 'a jour le clone avec les donnees de chaque vehicule si demande
                clone.querySelector('#nom').innerHTML = plat.nom;
                clone.querySelector('#categorie').innerHTML = plat.categorie;   
                clone.querySelector('#date-peremption').innerHTML = plat.dateDePeremption;
                clone.querySelector('#quantite').innerHTML = plat.quantite;
                clone.querySelector('#allergenes').innerHTML = plat.allergenes;
                clone.querySelector('#photo-aliment').setAttribute("src", plat.photoSrc);
                clone.querySelector('#photo-aliment').setAttribute("width", "50%");  
                //ajoute le clone au shadow DOM
                this.result.appendChild(clone);    
            });
            // })
    }


    // static get observedAttributes() {
    //     return ["frigos"];
    // }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     //this._root.getElementById(name).innerHTML=newValue;   
    //     console.log('attributCHanged', name, oldValue, newValue);

    //     if (name === 'frigos') {
    //         this.nom = newValue;
    //     }

    // }/**/



}//fin de la classe

//registre de la classe en dehors de la classe
window.customElements.define('cc-liste-aliments', CcListeAliments); //