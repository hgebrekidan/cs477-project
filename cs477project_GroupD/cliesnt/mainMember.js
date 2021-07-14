function displayMemberPage() {
    //   getProductsMember();
    
    document.getElementById('div-member').style.display = 'block'
    document.getElementById('shopping').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('loginErrorMsg').textContent = '';
    document.getElementById('shopping-cart').style.display = 'block';
    // let addBtn=document.getElementById("titlesBtn")
    // let show=document.getElementById("showCart")
    // addBtn.onclick = addBookToLibrary;
    // show.onclick = showCart;
    
   }



   
async function getProductsMember() {
    let products = await fetch('http://localhost:3000/books/', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        }
    }).then(response => response.json());
    products.forEach(prod => renderProductMember(prod));
}

function renderProductMember(prod) {
    const div = document.createElement('div');
    div.classList = 'col-lg-4';
    div.id = prod._id;
    div.innerHTML = `<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
    <title>Placeholder</title>
    <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
        dy=".3em">140x140</text>
    </svg>`;

    const h2 = document.createElement('h2');
    h2.textContent = prod.title;

    const isbn = document.createElement('p');
    isbn.textContent = Number(prod.isbn);

    const publishedDate = document.createElement('p');
    publishedDate.textContent = prod.publishedDate;

    const author = document.createElement('p');
    author.textContent = prod.author;

    div.appendChild(h2);
    div.appendChild(isbn);
    div.appendChild(publishedDate);
    div.appendChild(author);

    const actions = document.createElement('p');
    const updateBtn = document.createElement('a');
    updateBtn.classList = 'btn btn-info mx-2';
    updateBtn.textContent = 'ADD TO CART';
    updateBtn.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('product-heading').textContent = 'Edit Book';
        document.getElementById('title').value = prod.title;
        document.getElementById('isbn').value = prod.isbn;
        document.getElementById('publishedDate').value = prod.publishedDate;
        document.getElementById('author').value = prod.author;
        document.getElementById('product-btn').dataset.id = prod._id;
    });

    const deleteBtn = document.createElement('a');
    deleteBtn.classList = 'btn btn-danger';
    deleteBtn.textContent = 'REMOVE FROM CART';
    deleteBtn.addEventListener('click', function(event) {
        event.preventDefault();

        if (!confirm("Are you sure, want to delete this book?")) {
            return;
        }

        fetch('http://localhost:3000/books/' + prod._id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            }
        }).then(response => {
            alert('Delete Successfully!');
            div.remove();
        });
    });

    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(actions);

    document.getElementById('products').appendChild(div);
}