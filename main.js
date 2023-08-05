document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const addProductForm = document.getElementById('addProductForm');
    const countCart = document.getElementById('countCart'); // Compteur du panier

    // Vérifier si des produits sont déjà présents en LocalStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Ajouter un produit
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const description = document.getElementById('description').value;
        const image = URL.createObjectURL(document.getElementById('image').files[0]);

        const newProduct = {
            name,
            price,
            description,
            image,
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        addProductForm.reset();
        afficherLesProduits();
    });

    // Afficher les produits
    function afficherLesProduits() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
    <td><img src="${product.image}" alt="${product.name}" style="width: 80px;"></td>
    <td>${product.name}</td>
    <td>${product.price + " €"}</td>
    <td>${product.description}</td>
    <td>
      <button class="btn btn-primary btn-sm" onclick="addToCart(${index})">Au Panier</button>
      <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Modifier</button>
      <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Supprimer</button>
    </td>
  `;
            productList.appendChild(productRow);
        });
    }

    // Modifier un produit
    window.editProduct = (index) => {
        const newName = prompt('Nouveau nom du produit:', products[index].name);
        const newPrice = parseFloat(prompt('Nouveau prix:', products[index].price));
        const newDescription = prompt('Nouvelle description:', products[index].description);
        const newImage = products[index].image;

        if (newName && newPrice && newDescription) {
            products[index] = {
                name: newName,
                price: newPrice,
                description: newDescription,
                image: newImage,
            };
            localStorage.setItem('products', JSON.stringify(products));
            afficherLesProduits();
        }
    };

    // Supprimer un produit
    window.deleteProduct = (index) => {
        const confirmation = confirm('Voulez-vous vraiment supprimer ce produit ?');
        if (confirmation) {
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            afficherLesProduits();
        }
    };


    // Ajouter un produit au panier
    window.addToCart = (index) => {
        const product = products[index];
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Mettre à jour le compteur du panier
        countCart.innerText = cartItems.length.toString();
    };

    // Afficher les éléments du panier
    afficherLesProduits();
});