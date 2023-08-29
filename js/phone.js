const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    // 1 get the container
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new card;
    phoneContainer.textContent = ""

    // display show all button if there  are more than 12 phone 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else { showAllContainer.classList.add('hidden') }

    // console.log('is show all', isShowAll);
    // display only first 12 phones if not show all;
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // console.log(phone);
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        // 3: set inner HTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>
        `;
        // 4: append Child;
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner 
    toggleLoadingSpinner(false);
}


// 
const handleShowDetail = async (id) => {
    // console.log(id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}


const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img class="mx-auto" src="${phone.image}" alt="${phone.name}"/>
        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >Storage:</span>${phone?.mainFeatures?.storage}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >Display Size: </span>${phone?.mainFeatures?.displaySize}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >Cheap Set: </span>${phone?.mainFeatures?.chipSet}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >Memory : </span>${phone?.mainFeatures?.memory}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >Slug : </span>${phone?.slug}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >Release Date : </span>${phone?.releaseDate}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >Brand : </span>${phone?.brand}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >GPS: </span>${phone?.others?.GPS || 'No GPS Available'}</p>

        <p class="text-2xl font-medium "><span class="text-3xl font-bold " >GPS: </span>${phone?.others?.GPS ? phone?.others?.GPS : 'No GPS available in this device'}</p>

    `;
    // show the modal
    show_details_modal.showModal();
}



// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}



loadPhone();