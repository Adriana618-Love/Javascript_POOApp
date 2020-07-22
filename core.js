class Product {
  constructor(name,price,year){
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product){
    const productList = document.getElementById("product-list");
    const element = document.createElement('div');
    element.innerHTML = `
      <div class = "card text-center mb-4">
        <div class = "card-body">
          <strong>Product</strong>:${product.name}
          <strong>Price</strong>:${product.price}
          <strong>Year</strong>:${product.price}
          <a href="#" class="btn btn-danger" name="delete">Delete</a>
        </div>
      </div>
    `;
    productList.appendChild(element);
    this.showMessage('Product added Successfully','success');
    this.resetForm();
  }

  resetForm(){
    document.getElementById('product-form').reset();
  }

  deleteProduct(element){
    if(element.name==='delete'){
      const card = element.parentElement.parentElement.parentElement;
      card.remove();
    }
    this.showMessage('Delete Successfully','danger');
  }

  showMessage(text, cssClass){
    const div = document.createElement('div');
    div.className = "alert alert-"+cssClass+" mt-2";
    const message = document.createTextNode(text);
    div.appendChild(message);
    const container = document.querySelector('.container');
    const app = document.querySelector('#App');
    container.insertBefore(div, app);
    setTimeout(
      function () {
        document.querySelector('.alert').remove();
      } , 3000
    )
  }
}

//DOM Events
document.getElementById("product-form").addEventListener('submit',
      function(evt) {
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const year = document.getElementById("year").value;
        const Int=new UI();
        //Comprobación Rudimentaria
        if(name===''||price===''||year===''){
          Int.showMessage('Please, Complete all fields','danger');
          evt.preventDefault();
          return;
        }
        //////////////////////////
        const P=new Product(name,price,year);
        Int.addProduct(P);
        //Int.resetForm();
        console.log(P);
        /***Evitar que la página se refreque a cada submit***/evt.preventDefault();
      }
);

document.getElementById('product-list').addEventListener('click',
      function(evt) {
        const Int=new UI();
        Int.deleteProduct(evt.target);
      }
)
