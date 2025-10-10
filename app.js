let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let descount = document.getElementById('descount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mode = 'create'
let tmp;

//Total

function gettotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +descount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = "#ad6a13";
    }
}

// create product

let datapro ;

if (localStorage && localStorage.product) {
    datapro = JSON.parse(localStorage.product);

    if (!Array.isArray(datapro)) {
        datapro = [];
    }
    
} else {
    datapro = [];
}
showdata()

submit.onclick = function() {
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        descount:descount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    
    if( title.value != ''  && price.value != '' && category.value != '' && newpro.count <= 100){
        if(mode === 'create'){          
            if(newpro.count > 1){
                for(let i = 0 ; i < newpro.count ; i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
                mode = 'create'           
            }
        }else{
            datapro[tmp] = newpro
            count.style.display = 'block';
            submit.innerHTML = 'Create';
        }
        cleardata()
    }
    //save
    localStorage.setItem('product' , JSON.stringify(datapro));

    
    showdata();
}

//clear inputs

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    descount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read

function showdata() {
    gettotal()
    let table = '';
    for(let i = 0 ; i < datapro.length ; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].descount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="update(${i})" id=""update>Update</button></td>
            <td><button onclick="deletedata(${i})">Delete</button></td>
        </tr>`; 
    }
    document.getElementById('tbody').innerHTML = table;

    let btndelete = document.getElementById('deleteAll');

    if(datapro.length > 0) {
        btndelete.innerHTML = `
        <button onclick="deleteall()">Delete All (${datapro.length})</button>`;
    } else {
        btndelete.innerHTML = '';
    }
}

showdata()

//delete 

function deletedata(i) {
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata()
}

function deleteall() {
    datapro.splice(0);
    localStorage.clear();
    showdata() 
}

//count
//update

function update(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    descount.value = datapro[i].descount;
    gettotal()
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    category.value = datapro[i].category;
    mode = 'update'
    tmp = i
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//search
let searchmode = 'title';

function getsearchid(id) {
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchmode = 'title';
    }else{
        searchmode = 'category';
    }
    search.placeholder = 'search by ' + searchmode;
    search.focus();
    search.value = '';
    showdata()
}

function searchdata(value){
    let table = ''
    for(let i = 0 ; i < datapro.length ; i++){
        if(searchmode == 'title'){          
                if(datapro[i].title.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].descount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})" id=""update>Update</button></td>
                        <td><button onclick="deletedata(${i})">Delete</button></td>
                    </tr>`;
                }
        
        }else{
                if(datapro[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].descount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})" id=""update>Update</button></td>
                        <td><button onclick="deletedata(${i})">Delete</button></td>
                    </tr>`;
                }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
//clean data

