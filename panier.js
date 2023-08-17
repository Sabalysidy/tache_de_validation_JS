document.addEventListener('DOMContentLoaded', () => {
    const countCart = document.getElementById('countCart');
    const cartItemList = document.getElementById('cartItemList');
    const totalAmountElement = document.getElementById('totalAmount');

    // Charger les éléments du panier depuis le stockage local et les afficher dans le tableau
    function afficherArticlesPanier() {
        cartItemList.innerHTML = '';
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        cartItems.forEach((item, index) => {
            const cartItemRow = document.createElement('tr');
            cartItemRow.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 80px;"></td>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)} €</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteFromCart(${index})">Supprimer</button>
                </td>
            `;
            cartItemList.appendChild(cartItemRow);
        });

        // Mettre à jour le compteur du panier
        countCart.innerText = cartItems.length.toString();
        afficherTotal();
    }

    // Calculer et afficher le montant total de la commande
    function afficherTotal() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
        totalAmountElement.textContent = totalAmount.toFixed(2) + " €";
    }

    // Supprimer un élément du panier
    window.deleteFromCart = (index) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        afficherArticlesPanier();
    }

    // Afficher les éléments du panier
    afficherArticlesPanier();
});