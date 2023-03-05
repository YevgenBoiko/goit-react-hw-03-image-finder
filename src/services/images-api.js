export default function fetchImages(name,page){
    return fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=32892374-a95000907ffe9110fe06b3122&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response =>{
            if(response.ok){
               return response.json()
            }
            return Promise.reject(new Error('error'))
        } )
}