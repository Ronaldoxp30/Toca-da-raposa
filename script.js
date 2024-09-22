// Carrinho de Compras
let cart = [];

// Elementos do DOM
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeButtons = document.querySelectorAll('.close-button');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout-button');
const checkoutModal = document.getElementById('checkout-modal');
const orderForm = document.getElementById('orderForm');
const orderConfirmation = document.getElementById('order-confirmation');
const clienteNome = document.getElementById('clienteNome');

// Função para atualizar o carrinho no DOM
function updateCart() {
    // Limpar itens atuais
    cartItemsContainer.innerHTML = '';

    // Variável para total
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        // Criar elementos do item
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const name = document.createElement('div');
        name.classList.add('cart-item-name');
        name.innerText = item.name;

        const quantity = document.createElement('div');
        quantity.classList.add('cart-item-quantity');
        quantity.innerText = 'Quantidade: ';
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = '1';
        qtyInput.value = item.quantity;
        qtyInput.addEventListener('change', (e) => {
            const newQty = parseInt(e.target.value);
            if (newQty > 0) {
                item.quantity = newQty;
                updateCart();
            }
        });
        quantity.appendChild(qtyInput);

        const price = document.createElement('div');
        price.classList.add('cart-item-price');
        price.innerText = `R$${itemTotal.toFixed(2)}`;

        const remove = document.createElement('div');
        remove.classList.add('cart-item-remove');
        remove.innerHTML = '&times;';
        remove.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        cartItem.appendChild(name);
        cartItem.appendChild(quantity);
        cartItem.appendChild(price);
        cartItem.appendChild(remove);

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.innerText = total.toFixed(2);
    cartCount.innerText = cart.length;
}

// Função para adicionar ao carrinho
function addToCart(e) {
    const itemElement = e.target.closest('.hamburguer-item');
    const id = parseInt(itemElement.getAttribute('data-id'));
    const name = itemElement.getAttribute('data-name');
    const price = parseFloat(itemElement.getAttribute('data-price'));

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
    alert(`${name} adicionado ao carrinho!`);
}

// Função para remover do carrinho
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Eventos para abrir/fechar o carrinho
cartButton.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartModal.classList.add('hidden');
        checkoutModal.classList.add('hidden');
    });
});

// Adicionar eventos aos botões de adicionar ao carrinho
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Evento para finalizar o pedido
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
});

// Evento para enviar o formulário de pedido
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obter valores do formulário
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const observacoes = document.getElementById('observacoes').value;

    // Preencher a confirmação
    clienteNome.innerText = nome;

    // Exibir a confirmação e esconder o formulário
    orderForm.classList.add('hidden');
    orderConfirmation.classList.remove('hidden');

    // Limpar o carrinho
    cart = [];
    updateCart();
});

// Inicializar o carrinho
updateCart();
