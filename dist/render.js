class Render {
    constructor(){

    }
    renderData(restorant){
    const source = $('#restorant-template').html()
    const template = Handlebars.compile(source)
    const newHTML = template(/* {city:city} */)
    $('').empty()
    $('').append(newHTML)
  
}

}

const render= new Render


