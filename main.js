//الروابط عنا من الموقع وفيو شرح انو اخر اشي بغير محتوا ال ابيز
var httpRequest= new XMLHttpRequest();
//عشان لما اضغط يحدد ابيز للي كبست عليه
var data=[];
var links = document.querySelectorAll(".nav-link");
var loading=document.querySelector('.loading');

for(var i=0 ; i<links.length ;i++){

    links[i].onclick=function(e){
        getData(e.target.innerText)
       

    }
    }



function getData(value){
httpRequest.open("get",`https://forkify-api.herokuapp.com/api/search?q=${value}`)
httpRequest.send();
    httpRequest.onreadystatechange=function(){
        if(httpRequest.readyState==4 && httpRequest.status==200)
        {
        data=JSON.parse(httpRequest.response).recipes
        display();
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




function display(){
    var result=``;
for(var i=0 ; i<data.length;i++){
    result += `
    <div class="col-md-4 my-3">
    <div class="card p-2 ">
     <h2>${data[i].title}</h2>
     <p>${data[i].publisher}</p>
     <img src="${data[i].image_url}" class="w-100" alt=""/>
     <a class="btn btn-outline-success m-3" href="details.html?id=${data[i].recipe_id}">show recipe details</a>
     </div>
     </div>
    `
    //هون بوخد لكل صورة ايدي فاناا بدي لما اكبس على الكبسة ينبعث بالعنوان الايدي للصورة فستخدمت الكويري والبراميتير 
}
var content= document.getElementById("content");
content.innerHTML=result; 
}


