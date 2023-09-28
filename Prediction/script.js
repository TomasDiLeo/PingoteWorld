let previousHour = -1;
let jsonData = null;
let innit = false

async function setup() {
  url = "data/probabilities.json";
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  jsonData = data
}
// Calling that async function
setup();

function hideloader() {
  document.getElementById("loadingScreen").style.visibility = "hidden";

  innit = true
}

function hourListener() {
  const today = new Date();
  let day = today.getDay();
  let hour = today.getHours();

  if (previousHour != hour && jsonData != null) {
    updateEscabillitat(day, hour);
  }

  setTimeout(hourListener, 1000);
}

function updateEscabillitat(day, hour) {
  updateName('tomas', day, hour)
  updateName('ram', day, hour)
  updateName('santiago', day, hour)

  previousHour = hour
  if(!innit){
    setTimeout(hideloader(), 1500)
  }
}

function updateName(name, day, hour) {
  let day_string
  switch (day) {
    case 1:
      day_string = 'MONDAY'
    break;
    case 2:
      day_string = 'TUESDAY'
    break;
    case 3:
      day_string = 'WEDNESDAY'
    break;
    case 4:
      day_string = 'THURSDAY'
    break;
    case 5:
      day_string = 'FRIDAY'
    break;
    case 6:
      day_string = 'SATURDAY'
    break;
    case 0:
      day_string = 'SUNDAY'
    break;
    default:
      break;
  }
  jsonDict = jsonData[0]

  if(jsonDict[name].probable_hour[day_string].includes(hour)){
    document.getElementById('img-parado-'+name).style.display = 'none'
    document.getElementById('img-sentado-'+name).style.display = 'inline'
    document.getElementById('text-parado-'+name).style.display = 'none'
    document.getElementById('text-sentado-'+name).style.display = 'inline'
  }else{
    document.getElementById('img-parado-'+name).style.display = 'inline'
    document.getElementById('img-sentado-'+name).style.display = 'none'
    document.getElementById('text-parado-'+name).style.display = 'inline'
    document.getElementById('text-sentado-'+name).style.display = 'none'
  }
  
  let probability = jsonDict[name].probabilities[day_string][hour] 
  document.getElementById('probabilidad-'+name).textContent = (probability * 100).toFixed(2) + '%'

  let r = probability*(-670.37)+235
  let g = probability*(670.37)+54
  let b = probability*(77.78)+63
  r = Math.ceil(r)
  g = Math.ceil(g)
  b = Math.ceil(b)

  //document.getElementById('probabilidad-'+name).style.color = "rgb(200,2, 2)"
  document.getElementById('probabilidad-'+name).style.color = "#"+(r).toString(16)+(g).toString(16)+(b).toString(16)
  document.getElementById('carta-'+name).style.background = 'rgba('+r+','+g+','+b+', 0.3)'

}

function FUpper(string) {
  return string[0].toUpperCase() +
  string.slice(1)
}
