document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const addProductForm = document.getElementById('addProductForm');
    const updateButton = document.getElementById('updateButton');

    // const cartButton = document.getElementById('cartButton');
    // const cartList = document.getElementById('cartList');

    // Vérifier si des produits sont déjà présents en LocalStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    // let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let editProductIndex = -1; // Index du produit en cours d'édition, initialement -1 (aucune édition).


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
        displayProducts();
    });

    // Afficher les produits
    function displayProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}" style="width: 100px;"></td>
        <td>${product.name}</td>
        <td>${product.price + " €"}</td>
        <td>${product.description}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${index})">Ajouter au panier</button>
          <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Modifier</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Supprimer</button>
        </td>
      `;
            productList.appendChild(productRow);
        });
    }

    // Modifier un produit
    function editProduct(index) {
        displayProductDetails(index);
        editProductIndex = index; // Stocker l'index du produit en cours d'édition

        updateButton.style.display = 'block';
        updateButton.onclick = () => {
            const newName = document.getElementById('name').value;
            const newPrice = parseFloat(document.getElementById('price').value);
            const newDescription = document.getElementById('description').value;
            const newImage = URL.createObjectURL(document.getElementById('image').files[0]);
            if (newName && newPrice && newDescription) {
                products[index] = {
                    name: newName,
                    price: newPrice,
                    description: newDescription,
                    image: newImage,
                };
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
                addProductForm.reset();
                updateButton.style.display = 'none';
                editProductIndex = -1; // Réinitialiser l'index du produit en cours d'édition après la mise à jour

            }
        };
    }

    // Afficher les détails du produit dans les champs de saisie
    function displayProductDetails(index) {
        const product = products[index];
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('description').value = product.description;
        document.getElementById('image').value = ''; // Par défaut, l'input file n'est pas pré-rempli pour des raisons de sécurité.
    }

    // Modifier un produit
    // window.editProduct = (index) => {
    //     const newName = prompt('Nouveau nom du produit:', products[index].name);
    //     const newPrice = parseFloat(prompt('Nouveau prix:', products[index].price));
    //     const newDescription = prompt('Nouvelle description:', products[index].description);
    //     const newImage = products[index].image; // On ne permet pas de modifier l'image ici, mais vous pouvez ajouter cette fonctionnalité si nécessaire.

    //     if (newName && newPrice && newDescription) {
    //         products[index] = {
    //             name: newName,
    //             price: newPrice,
    //             description: newDescription,
    //             image: newImage,
    //         };
    //         localStorage.setItem('products', JSON.stringify(products));
    //         displayProducts();
    //     }
    // };

    // function displayProducts() {
    //     productList.innerHTML = '';
    //     products.forEach((product, index) => {
    //         const productItem = document.createElement('div');
    //         productItem.innerHTML = `
    //     <img src="${product.image}" alt="${product.name}" style="width: 100px;">
    //     <p><strong>${product.name}</strong></p>
    //     <p>Prix: ${product.price}</p>
    //     <p>${product.description}</p>
    //     <button onclick="editProduct(${index})">Modifier</button>
    //     <button onclick="deleteProduct(${index})">Supprimer</button>
    //     <button onclick="addToCart(${index})">Panier</button>
    //   `;
    //         productList.appendChild(productItem);
    //     });
    // }

    // Supprimer un produit
    window.deleteProduct = (index) => {
        const confirmation = confirm('Voulez-vous vraiment supprimer ce produit ?');
        if (confirmation) {
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();
        }
    };

    // Ajouter au panier
    // window.addToCart = (index) => {
    //     // Code pour ajouter le produit au panier (non implémenté ici)
    //     const product = products[index];
    //     const cartItem = {
    //         name: product.name,
    //         price: product.price,
    //         description: product.description,
    //     };
    //     cartItems.push(cartItem);
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //     displayCartItems();
    //     console.log('Produit ajouté au panier:', products[index]);
    // };

    // Afficher les produits du panier
    // function displayCartItems() {
    //     cartList.innerHTML = '';
    //     cartItems.forEach((item) => {
    //         const cartRow = document.createElement('tr');
    //         cartRow.innerHTML = `
    //     <td>${item.name}</td>
    //     <td>${item.price}</td>
    //     <td>${item.description}</td>
    //   `;
    //         cartList.appendChild(cartRow);
    //     });
    // }

    // Vérifier s'il y a un produit en cours d'édition au chargement de la page
    if (editProductIndex !== -1) {
        displayProductDetails(editProductIndex);
        updateButton.style.display = 'block';
    }

    // Afficher les produits initiaux
    displayProducts();
    // displayCartItems();
});
