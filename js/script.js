function sortFunction(){
    let category = document.getElementById('sort_category').value;
    let priceRange = parseInt(document.getElementById('sort_price').value);
    let items = document.getElementsByClassName('product-box__item');

    Array.prototype.forEach.call(items, item => {        
        if (category == 0 && priceRange == 0) {
            item.style.display = "block";
            return;
        }

        if (priceRange == 0) {
            if (category == item.getAttribute('data-category-number')){
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
            return;
        }

        let price = parseInt(item.querySelector('.qty__item').getAttribute('data-price'));

        if (category == 0) {
            if (price <= priceRange) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
            return;
        }

        if (category == item.getAttribute('data-category-number') && price <= priceRange) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function countSum(price, number) {
    price = parseInt(price);
    number = parseInt(number);
    let cartNumber = localStorage.getItem('cartNumber') ? parseInt(localStorage.getItem('cartNumber')) : 0;
    let cartSum = localStorage.getItem('cartSum') ? parseInt(localStorage.getItem('cartSum')) : 0;
    localStorage.setItem('cartNumber', cartNumber + number);
    localStorage.setItem('cartSum', price * number + cartSum);
    document.getElementById('total_number').innerHTML = cartNumber + number;
    document.getElementById('total_sum').innerHTML = price * number + cartSum;
}

function makeOrder() {
    if (!localStorage.getItem('cartNumber')) {
        alert('В корзине нет ни одного товара.');
        return;
    }
    document.getElementById('modal_check').classList.add('active');
    
    document.getElementById('modal_close').addEventListener("click", () => {
        document.getElementById('modal_check').classList.remove('active');
    });

    document.getElementById('btn_send_order').addEventListener("click", () => {
        let customerName = document.getElementById("customer_name").value;
        let customerEmail = document.getElementById("customer_email").value;
        let error = '';
        if (!customerName.match('^[a-zA-Zа-яёА-ЯЁ][a-zA-Zа-яёА-ЯЁ]+$')) {
            alert('Имя должно содержить только буквы!');
            error++;
        }

        if (!customerEmail.match('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')) {
            alert('Поверьте правильность написания емейла!');
            error++;
        }

        if (!error) {
            //there should be a form submit by ajax
            document.getElementById('modal_check').classList.remove('active');
            alert('Благодарим за покупки!');
            localStorage.clear();
            document.getElementById('total_number').innerHTML = document.getElementById('total_sum').innerHTML = 'XXX';
            let inputs = document.querySelectorAll('input');
            for (let i = 0;  i < inputs.length; i++) {
                inputs[i].value = '';
            };
        }
    });
}

function handler(el){
    const target = el.target;

    if (target.id == 'btn_modal_check') {
        makeOrder();
        return;
    }

    if (target.className != 'product-box__btn') {
        return;
    }

    let item = target.closest("div").querySelector('.qty__item');
    let number = item.value;

    if (!number || number == 0) {
        return;
    }

    countSum(item.getAttribute('data-price'), item.value);
}

document.addEventListener("click", handler, false);
