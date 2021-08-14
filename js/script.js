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

function handler(el){
    const target = el.target;

    if (target.className != 'product-box__btn') {
        return;
    }

    let item = target.closest("div").querySelector('.qty__item');
    let number = item.value;

    if (!number || number == 0) {
        return;
    }

    let price = parseInt(item.getAttribute('data-price'));
    countSum(item.getAttribute('data-price'), item.value);
}

document.addEventListener("click", handler, false);
