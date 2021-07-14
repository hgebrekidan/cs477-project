function displayAdminPage() {
    console.log('-----------------')
    document.getElementById('shopping').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('loginErrorMsg').textContent = '';
    document.getElementById('shopping-cart').style.display = 'none';
    getProducts();
}

function displayLoginPage() {
    document.getElementById('shopping').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('shopping-cart').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';

}

window.onload = function (event) {
    event.preventDefault();
    displayLoginPage();
    document.getElementById('loginBtn').onclick = async function (event) {
        event.preventDefault();
        let result = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        }).then(response => response.json());

        if (result.accessToken) {

            sessionStorage.setItem('accessToken', result.accessToken);
            sessionStorage.setItem('role', result.role);

            // displayAdminPage();
        } else {
            document.getElementById('loginErrorMsg').textContent = result.error;
        }

        sessionStore()
    }
    function sessionStore() {
        //alert("test")
        let token = sessionStorage.getItem('accessToken');
        let role = sessionStorage.getItem('role');
        // console.log()
        //alert(sessionstorage.getItem('accessToken'));
        if (token && role === 'admin') {
            //  alert(role);
            displayAdminPage();
        }
        else if (token && role === 'member') {
            // put some logic here to detect the user is a member then display
            // alert(sessionstorage.getItem('role'));
            //   alert("Show something");

            displayMemberPage()


            //         // purchasing cart for the member
        }

        else {
            displayLoginPage();
        }
    }

    //    function showCart(){
    //     let title=""
    //     let sortResult=booksList.sort((a,b)=>{
    //         let title1 = a.title.toLowerCase(),
    //             title2 = b.title.toLowerCase();
    //         if (title1 > title2) {
    //         return 1;
    //         }
    //         if (title1 < title2) {
    //         return -1;
    //         }
    //         return 0; 
    //         })
    //     for(let i=0;i<sortResult.length;i++){
    //     title+=i+1 +") "+(sortResult[i]+"\n" )
    //     }
    //     document.getElementById("displayArea").value=title;
    //    }

    document.getElementById('logoutBtn').onclick = function () {
        // event.preventDefault();

        sessionStorage.removeItem('accessToken');
        location.reload();
    }

    // add/update product
    document.getElementById('product-btn').onclick = function (event) {
        event.preventDefault();
        if (!document.getElementById('product-btn').dataset.id) {
            addProduct();
        } else {
            editProduct();
        }
    }
}
"------------------------------------------------------------------------------------------------------------------"

function displayMemberPage() {
    getProductsMember();
    document.getElementById('shopping').style.display = 'block'
    document.getElementById('div-member').style.display = 'none'
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        }
    }).then(response => response.json());
    console.log(products + '--------------------');
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
    updateBtn.addEventListener('click', function (event) {
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
    deleteBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (!confirm("Are you sure, want to delete this cart?")) {
            return;
        }


    });

    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(actions);

    document.getElementById('products').appendChild(div);
}

"------------------------------------------------------------------------------------------------------------------"
async function getProducts() {
    let products = await fetch('http://localhost:3000/books/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        }
    }).then(response => response.json());
    console.log(products, '======');
    products.forEach(prod => renderProduct(prod));
}

function renderProduct(prod) {
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
    isbn.textContent = prod.isbn;

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
    updateBtn.textContent = 'UPDATE';
    updateBtn.addEventListener('click', function (event) {
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
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', function (event) {
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
// Member User Shopping Page


async function addProduct() {
    let result = await fetch('http://localhost:3000/books/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            title: document.getElementById('title').value,
            isbn: document.getElementById('isbn').value,
            publishedDate: document.getElementById('publishedDate').value,
            author: document.getElementById('author').value
        })
    }).then(res => res.json());
    document.getElementById('product-form').reset();
    renderProduct(result);
}

function editProduct() {
    const prodId = document.getElementById('product-btn').dataset.id;
    const title = document.getElementById('title').value;
    const isbn = document.getElementById('isbn').value;
    const publishedDate = document.getElementById('publishedDate').value;
    const author = document.getElementById('author').value;
    fetch('http://localhost:3000/books/' + prodId, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            title: title,
            isbn: isbn,
            publishedDate: publishedDate,
            author: author
        })
    }).then(response => response.json())
        .then(jsonObj => {
            const productDiv = document.getElementById(prodId);
            productDiv.querySelector('h2').textContent = title;
            const paragraphArr = productDiv.querySelectorAll('p');
            paragraphArr[0].textContent = isbn;
            paragraphArr[1].textContent = publishedDate;
            paragraphArr[2].textContent = author;


            document.getElementById('product-heading').textContent = 'Add a new Book';
            document.getElementById('product-btn').dataset.id = '';
            document.getElementById('product-form').reset();
        });
}
