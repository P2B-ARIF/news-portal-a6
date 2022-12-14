const getCategoryName = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => getCategory(data.data.news_category))
        .catch(error => console.log(error));
}

const getCategory = allCategoryName => {

    const allCategory = document.getElementById('all-category')
    allCategoryName.forEach(categoryName => {

        const li = document.createElement('li')
        li.innerHTML = `
    <button onclick="getCategoryDetails(${categoryName.category_id}, '${categoryName.category_name}')"  href="#" class="btn btn-light">${categoryName.category_name}</button>
    `
        allCategory.appendChild(li);
    });

}
getCategoryName();

const getCategoryDetails = async (searchId, name) => {
    loading(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${searchId}`
    try {
        const res = await fetch(url);
        const data = await res.json()
        categoriesDetais(data.data, name);
    }
    catch (error) {
        console.log(error);
    }
}

const categoriesDetais = (detailsData, name) => {
    const totalItem = document.getElementById('total-item')
    totalItem.innerText = detailsData.length;

    const tagName = document.getElementById('tagName')
    tagName.innerText = name;

    const detailsSec = document.getElementById('details-sec')
    detailsSec.textContent = '';

    if (totalItem.innerText === '0') {
        totalItem.innerText = "EMPTY";
    }

    if (detailsData.length === 0) {
        error(true)
    } else {
        error(false)
    }


    detailsData = detailsData.sort(
        (obj1, obj2) => obj2.total_view - obj1.total_view
    );
    detailsData.forEach(details => {
        const div = document.createElement('div')
        div.classList.add('card-sec')
        div.innerHTML = `
        <div onclick="personDetials('${details._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  class="right-pic">
            <img class="" src="${details.image_url}" alt="">
        </div>
        <div onclick="personDetials('${details._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  class="details">
            <h1>${details.title}</h1>
            <p>${details.details.length > 350 ? details.details.slice(0, 350) + "..." : details.details}</p>
            <div class="buttom-sec ">
                <div class="profile-sec">
                    <div class="image">
                        <img src="${details.thumbnail_url}" alt="">
                    </div>
                    <div class="profile-detail">
                        <h6>${details.author.name === null ? 'No Data Available' : details.author.name}</h6>
                        <h6>${details.author.published_date.split(" ")[0]}</h6>
                    </div>
                </div>
                <div class="watch">
                  <i class="fa-solid fa-eye"></i>
                    <span>${details.total_view === null ? 'No Data Available' : details.total_view}</span>
                </div>
                <div class="star">
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <button onclick="personDetials('${details._id}')" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
        </div>
        `;
        detailsSec.appendChild(div);
    });
    loading(false);
}

// loading / spinner section start 
const loading = (isLoading) => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}
// loading / spinner section end


// eorror message start 
const error = (isError) => {
    const error = document.getElementById('error')
    if (isError) {
        error.classList.remove('d-none');
    } else {
        error.classList.add('d-none');
    }
}
// eorror message end 



const personDetials = async bigId => {
    console.log(bigId);
    const modalSection = document.getElementById('modalSection');
    modalSection.innerHTML = '';

    const url = `https://openapi.programming-hero.com/api/news/${bigId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        categoriesModal(data.data[0]);
        console.log(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
    
}

const categoriesModal = (person) => {
    console.log(person);
    const { author, thumbnail_url, category_id, details, image_url, rating, title, total_view } = person;

    // console.log(person);
    const modalSection = document.getElementById('modalSection');
    modalSection.innerHTML = ` 
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
        <img class="progile" src="${thumbnail_url}" alt="">
        <h5 class="modal-title" id="exampleModalLabel"><strong> ${author.name === null ? 'No Data Available' : author.name} | ${author.published_date.split(" ")[0]} </strong></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="image">
        <img class="img-fluid" src="${image_url}" alt="">
        </div>
        <div class="person-data">
        <h5><strong>Title : </strong>${title}</h5>
            <h6><strong>Rating : </strong> ${Object.values(rating).toString().split(',').join(', ')}</h6>
            <h6><strong>Total View :  <i class="fa-solid fa-eye"></i> </strong>${total_view === null ? 'No Data Available' : total_view}</h6>
            <h6><strong>Category ID : </strong>${category_id}</h6>
            <h6><strong>Details : </strong>${details.length > 350 ? details.slice(0, 350) + "..." : details}</h6>
        </div>
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`;
console.log('hi');

}

