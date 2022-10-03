//membuat event listener
document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const searchForm = document.getElementById("search");
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        mySearch();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

//menangkap event ondatasaved
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

//menangkap event ondataloaded
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});