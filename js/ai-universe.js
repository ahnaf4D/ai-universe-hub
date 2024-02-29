const fetchButton = document.getElementById('get-data');
// console.log(fetchButton);
const loader = document.getElementById('loader');
const serverDataContainer = document.getElementById('server-data-container');
const loadData = async () => {
    try {
        displayLoading();
        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
        hideLoading();
        const data = await res.json();
        const serverResponse = data.data.tools;
        displayServerData(serverResponse);
    }
    catch (err) {
        console.error('Server is 404!', err);
    }
}
// fetchButton.addEventListener('click',)
const displayServerData = (data) => {
    const published_inArr = [];
    data.forEach((element => {
        // console.log(element.name);
        const dynamicCard = document.createElement('div');
        dynamicCard.classList = `card  bg-base-100 shadow-xl`;
        dynamicCard.innerHTML = `
    <figure><img src="${element.image}" alt="Shoes" class='w-80 p-2' /></figure>
  <div class="card-body">
  <ol class= "list-decimal">
  <li>${element.features[0]}</li>
  <li>${element.features[1]}</li>
  <li>${element.features[2]}</li>
  </ol>
  <h2 class="card-title">${element.name}</h2>
  <div class="join flex items-center gap-1">
  <i class='bx bxs-calendar join-item text-2xl'></i>

  <span class = "join-item">${element.published_in}</span>
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  <button class = "join-item btn rounded-xl" onclick = "my_modal_3.showModal();showData('${element.id}')"><i class='bx bx-right-arrow-alt'></i></button>

  </div>
  </div>
    `
    serverDataContainer.appendChild(dynamicCard);
    published_inArr.push(element.published_in);
}))
}
fetchButton.addEventListener('click',()=>{
    displayLoading();
   loadData();
});
// Loader
function displayLoading(){
    loader.classList.remove(`hidden`);
}
function hideLoading(){
    loader.classList.add(`hidden`);

}
// Show data on the modal box
const modalRoot = document.getElementById('modal-root-container');
const showData = async(id) => {
    modalRoot.textContent =  ' ';
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const modalParentData = data.data;
    // console.log(modalParentData);
    const modalMainDiv = document.createElement('div');
    modalMainDiv.classList = `flex flex-col gap-2 lg:flex-row`;
    const childrenDivOne = document.createElement('div');
    childrenDivOne.classList = ` border-1 border-red`;
    childrenDivOne.innerHTML = `
        <h1>${modalParentData.description}</h1>
        <img src = "${modalParentData.image_link[0]}">
        <h2 class ="text-2xl font-bold">Features</h2>
        <ul>
            <li>${modalParentData.features['1'].feature_name}</li>
            <li>${modalParentData.features['2'].feature_name}</li>
        </ul>
    `
    modalMainDiv.appendChild(childrenDivOne);
    modalRoot.appendChild(modalMainDiv);
}
showData();