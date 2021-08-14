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
