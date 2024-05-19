// class produit 
class Produit {
    constructor(id, nom, image, prix, qte_Stock, seuil, catégorie) {
        this.id = id;
        this.nom = nom;
        this.image = image;
        this.prix = prix;
        this.qte_Stock = qte_Stock;
        this.seuil = seuil;
        this.catégorie = catégorie;
    }
}

// Function to create shopping cart line items
function lignePanier(idLigne, produit, qte) {
    this.idLigne = idLigne;
    this.produit = produit;
    this.qte = qte;
    this.totalLigne = this.produit.prix * this.qte;
}
let panier = [];

// Function to add a line item to the shopping cart
function ajouterLigne(idProduit) {
    $(`#error-${idProduit}`).text("");
    $.getJSON("./assets/data/products.json", function (data) {
        let produit = data.find(p => p.id == idProduit);
        let qte = parseInt($(`#product-quantity-${idProduit}`).val());
        if (produit && qte > 0) {
            let ligneExist = panier.find(l => l.produit.id == idProduit);
            if (!ligneExist) {
                panier.push(new lignePanier(panier.length + 1, produit, qte));
            } else {
                ligneExist.qte += qte;
                ligneExist.totalLigne = ligneExist.produit.prix * ligneExist.qte;
            }
            $(`#product-quantity-${idProduit}`).val("");
            showPanier();
        }else{
            $(`#product-quantity-${idProduit}`).val("");
            $(`#error-${idProduit}`).text("Veuillez entrer une quantité supérieure à 0");
        }
    });
}

// Function to remove a line item from the shopping cart
function supprimerLigne(idLigne) {
    let confirmation = confirm("Are you sure you want to remove this item from the cart?");
    if (confirmation) {
        panier = panier.filter(l => l.idLigne != idLigne);
        showPanier();
    }
}



$(function () {

    // Load products from JSON file and display them
    $.getJSON("./assets/data/products.json", function (products) {
        $("#products").empty();
        products.forEach(prod => {
            let p = `
            <div class="product">
                <img src="assets/img/${prod.image}" alt="${prod.nom}">
                <h2 class="product-name">${prod.nom}</h2>
                <p class="product-price">MAD ${prod.prix}</p>
                <input type="number" min="1" id="product-quantity-${prod.id}" class="product-quantity">
                <div> <span class="error"  id="error-${prod.id}"></span>  </div>
                <button class="add-to-cart" onclick="ajouterLigne(${prod.id})">Ajouter au panier</button>
            </div>
            `;
            $("#products").append(p);
        });
    });
    // show panier 



})

function showPanier() {
    $("#panier-content").empty();
    panier.forEach(ligne => {
        let l = `
            <tr>
                <td>${ligne.produit.nom}</td>
                <td>${ligne.qte}</td>
                <td>${ligne.produit.prix}</td>
                <td>${ligne.totalLigne}</td>
                <td><button class="supprimer-ligne" onclick="supprimerLigne(${ligne.idLigne})">Supprimer</button></td>
            </tr>
        `
        $("#panier-content").append(l);
        $("#total-panier").text("Total: MAD " + panier.reduce((acc, ligne) => acc + ligne.totalLigne, 0));
    })
}




// qst 7
$(document).ready(function () {
    $.getJSON("./assets/data/products.json", function (data) {
        let stockf = data.filter(p => p.qte_Stock < p.seuil);
        console.log("les produits en dessous du seuil sont : ");
        console.log(stockf);
    })
});


// qst 8
$(document).ready(function () {
    $.getJSON("./assets/data/products.json", function (data) {
        let produits = data.filter(p => p.catégorie == "PC");
        console.log("les produits de la catégorie PC sont : ");
        console.log(produits);
    })
})


$(document).ready(function () {
    $.getJSON("./assets/data/products.json", function (data) {
        let total = 0;
        data.forEach(p => {
            total += p.prix * p.qte_Stock;
        })
        console.log("la valeur en Stock de tous les produits  est : " + total + " MAD");
    })
})

$(document).ready(function () {
    $.getJSON("./assets/data/products.json", function (data) {
        let produits = data.filter(p => p.catégorie == "PC");
        let total = 0;
        produits.forEach(p => {
            total += p.prix * p.qte_Stock;
        })
        console.log("la valeur en Stock de tous les produits de la catégorie PC est : " + total + " MAD");

    })
})