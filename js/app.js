const getCategoryName = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => getCategory(data.data.news_category))
        .catch(error => console.log(error));
}

const getCategory = (allCategoryName) => {

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
    // modal(data.data);
}

const categoriesDetais = (detailsData, name) => {
    const totalItem = document.getElementById('total-item')
    totalItem.innerText = detailsData.length;

    const tagName = document.getElementById('tagName')
    tagName.innerText = name;

    const detailsSec = document.getElementById('details-sec')
    detailsSec.textContent = '';

    if (detailsData.length === 0) {
        error(true)
    } else {
        error(false)
    }


detailsData = detailsData.sort(
    (obj1, obj2)=> obj2.total_view - obj1.total_view
);
    detailsData.forEach(details => {
        const div = document.createElement('div')
        // div.setAttribute('onclick', 'modal()');
        div.classList.add('card-sec')
        div.innerHTML = `
        <div  class="right-pic">
            <img class="" src="${details.image_url}" alt="">
        </div>
        <div  class="details">
            <h1>${details.title}</h1>
            <p>${details.details.length > 350 ? details.details.slice(0, 350) + "..." : details.details}</p>
            <div class="buttom-sec">
                <div class="profile-sec">
                    <div class="image">
                        <img src="${details.thumbnail_url}" alt="">
                    </div>
                    <div class="profile-detail">
                        <h6>${details.author.name}</h6>
                        <h6>${details.author.published_date.split(" ")[0]}</h6>
                    </div>
                </div>
                <div class="watch">
                  <i class="fa-solid fa-eye"></i>
                    <span>${details.total_view === 0 ? 'No Data' : details.total_view}</span>
                </div>
                <div class="star">
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="personDetials('${details._id}')"  class="btn"><i class="fa-solid fa-arrow-right arrow"></i></button>
            </div>
        </div>
        `
        detailsSec.appendChild(div);
    });
    loading(false)

}


const loading = (isLoading) => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

const error = (isError) => {
    const error = document.getElementById('error')
    if (isError) {
        error.classList.remove('d-none');
    } else {
        error.classList.add('d-none');
    }
}

const personDetials = async (bigId) => {
    const url = `https://openapi.programming-hero.com/api/news/${bigId}`;
    const response = await fetch(url);
    const data = await response.json();
    categoriesModal(data.data[0]);
}

personDetials();


const categoriesModal = async (person) => {
    //     const url = `https://openapi.programming-hero.com/api/news/${bigId}`
    // try {
    //     const res = await fetch(url);
    //      data = await res.json()
    // }
    // catch (error) {
    //     console.log(error);
    // }

    // const { author, category_id, details, image_url, rating, title, total_view } = data.data[0];
    const { author, category_id, details, image_url, rating, title, total_view } = person;

    console.log(author);
    console.log(category_id);
    console.log(details);
    console.log(image_url);
    console.log(rating);
    console.log(title);
    console.log(total_view);
    console.log('total_view');
    const modalSection = document.getElementById('modalSection');
    modalSection.innerHTML = ` 
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header close-btn">
            <h5 class="modal-title" id="exampleModalLabel"><strong> ${author.name} | ${author.published_date.split(" ")[0]} </strong></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div> 
          <div class="modal-body">
            <div class="image">
            <img class="img-fluid" src="${image_url}" alt="">
            </div>
            <div class="person-data">
            <h5><strong>Title : </strong>${title}</h5>
                <h6><strong>Rating : </strong> ${Object.values(rating).toString().split(',').join(', ')}</h6>
                <h6><strong>Total View : </strong>${total_view}</h6>
                <h6><strong>Category ID : </strong>${category_id}</h6>
                <h6><strong>Details : </strong>${details}</h6>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
`
}
// categoriesModal()