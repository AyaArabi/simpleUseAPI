//كل الكويري هون خزنتها
var queryString = window.location.search;
//اخدت البراميتر 
var params= new URLSearchParams(queryString);
//حكتلو جبلي ال ايدي الي جوا البراميتر لانو ممكن يكون اكثر من براميتر 
var id=params.get('id')
var loading=document.querySelector('.loading');
 var httpRequestDetails = new XMLHttpRequest();
 //لازم اي اشي بددي اتعامل معو من ال ابيز اخزنو اول بمتغير 
 var ingredients=[];
 var details={}
getDetails(id);


function getDetails(id){
    httpRequestDetails.open('get',`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    httpRequestDetails.send();
    httpRequestDetails.onreadystatechange=function(){
        if(httpRequestDetails.readyState==4 && httpRequestDetails.status==200)
       {details= JSON.parse(httpRequestDetails.response).recipe
        ingredients=JSON.parse(httpRequestDetails.response).recipe.ingredients
        displayDetails();
        displayingredients();
        loading.style.opacity='0';
        loading.style.visibility='hidden';
        document.body.overflow='auto';
    }
    else{
        loading.style.opacity='1';
        loading.style.visibility='visible';
        document.body.overflow='hidden';
        loading.style.transition='1s';


  }
    }
 
}
function displayDetails(){
    document.getElementById('content').innerHTML=`
    <div class="row">
        <div class="col-md-7">
            <h2>${details.title}</h2>
            <img class="w-100" src="${details.image_url}" alt="">
        </div>
        
        <div class="col-md-5">
            <h3>${details.publisher}</h3>
            <p>recipe ingredients </p>
            <div id="ingredients"></div>
            
            <a class="btn btn-info" href="${details.publisher_url}">publisher url</a>
        </div>
    </div>
    
    `

}

//result=``طريقه ثانيه غير ال
function displayingredients(){
    for(var i=0;i<ingredients.length ;i++){
        //انشانا او خلقنا عنصر تاج لنضيفه داخل الدف حددته انو فقره 
   var el= document.createElement('p')
   //هون حددت القيمه الي داخل التاج الي انشاتو 
el.innerText=ingredients[i]
//هون حطيت التاج الي انشاتو داخل ال دف بال هتمل باستخدام append
document.getElementById('ingredients').append(el)
}}