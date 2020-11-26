class CcListeAliments extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsule'
        this._root = this.attachShadow({ mode: 'open' });

        //donnees
        this.nom = '';
        this.quantite = 0;
        this.categorie = '';
        this.datePeremption = '';
        this.allergenes = '';
        this.photoSrc = '';
        
    }

    //lorsque connecte'
    connectedCallback() {
        //defini le code encapsule'
        this._root.innerHTML = `
        <style>
            .frame {
                background-color: #eeeeee;
                margin: 5px;
                padding: 5px;
            }
            h2 {
                color:blue;
            }
            .grid-container {
                display: grid;
                grid-template-columns: 25% 75%;
                padding: 10px;
              }
              .grid-item {
                font-size: 30px;
                text-align: center;
                font-family: Arial, Helvetica, sans-serif;
              }
            #photo{
                width: 40px;
            }
        </style>
        <template id="template-aliment">
            <div class="grid-container frame" id="cadre">
                <div class="grid-item">
                    <img id="photo"/>
                </div>
                <div class="grid-item">
                    <h2 id="nom"></h2>
					<p id="quantite"></p>
                    <p id="categorie"></p>
                    <p id="date-peremption"></p>
                    <p id="allergenes"></p>
                </div>

            </div>
        </template>
        <div id="result"></div>
    `;
        //cree les variables avec le fragment du code encapsule'
        this.templateContent = this._root.querySelector('#template-aliment').content;
        this.result = this._root.querySelector('#result');

            //clone le templateContent
            const clone = document.importNode(this.templateContent, true);
            //met 'a jour le clone avec les donnees de chaque vehicule si demande
            clone.querySelector('#nom').innerHTML = this.nom;
            clone.querySelector('#quantite').innerHTML = this.quantite;
            clone.querySelector('#categorie').innerHTML = this.categorie;
            clone.querySelector('#date-peremption').innerHTML = this.datePeremption;
            clone.querySelector('#allergenes').innerHTML = this.allergenes;
            clone.querySelector("#photo").setAttribute("src", this.photoSrc);
        //     }
        //     if (this.affiche_modele === "true") {
        //         clone.querySelector('#modele').innerHTML = vehicule.modele;
        //     }
        //     if (this.affiche_annee === "true") {
        //         clone.querySelector('#annee').innerHTML = vehicule.annee;
        //     }
        //     // Met à jour la couleur    
        //     clone.querySelector("#cadre").setAttribute("style", "background-color:" + this.couleur + ";");
        //     if (this.affiche_photo === "true") {
        //         clone.querySelector("#photo").setAttribute("src", vehicule.photo);
        //     }
            //ajoute le clone au shadow DOM
            this.result.appendChild(clone);
    }

    static get observedAttributes() {
        return ["nom", "quantite", "categorie", "date_peremption", "allergenes", "photo_src"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        //this._root.getElementById(name).innerHTML=newValue;   
        console.log('attributChanged', name, oldValue, newValue);

        if (name === 'nom') {
            this.nom = newValue;
        }
        if (name === 'quantite') {
            this.quantite = newValue;
        }
        if (name === 'categorie') {
            this.categorie = newValue;
        }
        if (name === 'date_peremption') {
            this.datePeremption = newValue;
        }
        if (name === 'allergenes') {
            this.allergenes = newValue;
        }
        if (name === 'photo_src') {
            this.photoSrc = newValue;
        }
		console.log(this.photoSrc);
    }/**/



}//fin de la classe

//registre de la classe en dehors de la classe
window.customElements.define('cc-liste-aliments', CcListeAliments); // (tag , instance)






