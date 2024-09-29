const splash = document.getElementById("splash");
const container = document.getElementById("container");
splash.style.display = "block";
container.style.display = "none";
setTimeout(() => {
  container.style.display = "block";
  splash.style.display = "none";
}, 2*1000);

function showResult(title, message, icon) {
  const iconn = icon ? icon.toLowerCase() : "";
  if (iconn === "error"){
   playShortAudio("error.mp3");
  }
  Swal.fire({
    title: title,
    html: message,
    icon: iconn,
  //  showCancelButton: true,
    confirmButtonColor: "#0061ff",
  // cancelButtonColor: "#d33",
    confirmButtonText: "Okay"
  });
}

let sound = null;
function playMusic(url, isalang, isLoop){
  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }
   sound = new Howl({
      src: [url],
      loop: isLoop,
      format: ['mp3'],
      volume: 1,
      onend: () => {}
    });
  if (isalang){
    sound.play();
  }
}

function playShortAudio(url){
  const s = new Howl({
    src: [url],
    loop: false,
    volume: 1,
    autoplay: true
  });
  s.play();
}

const result = document.getElementById('result');
const bar = document.getElementById('barr');
const cookies = document.getElementById('cookies');
const link = document.getElementById('urls');
[cookies, link].forEach(doc => {
  doc.value = localStorage.getItem(doc.id) || "";
  doc.addEventListener("input", () => {
    localStorage.setItem(doc.id, doc.value);
  });
})
bar.style.display = "none";
async function submitForm() {
   event.preventDefault();
   const result = document.getElementById('result');
   const button = document.getElementById('submit-button');
   const select = document.getElementById('items');
   const selectedItem = select.options[select.selectedIndex].value;
   if (!cookies.value || !link.value){
     return showResult("Error", "Please input your appstate and post link.", "error");
   }
   try {
     bar.style.display = "block";
     result.innerHTML = "Please wait, try checking your post react"
     button.style.display = 'none';
     const response = await fetch('/react', {
       method: 'POST',
       body: JSON.stringify({
         cookie: cookies.value,
         link: link.value,
         type: selectedItem.toUpperCase()
       }),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
     });
     const data = await response.json();
     
     if (data) {
     bar.style.display = 'block';
     result.innerHTML = data.message;
     button.style.display = 'block';
     } else {
     showResult("Error", e.message || e, "error");
     result.innerHTML = 'Error: Something went wrong...';
     button.style.display = 'block';
     playShortAudio("error.mp3");
     }
   } catch (e) {
     console.error(e);
     showResult("Error", e.message || e, "error");
     result.innerHTML = 'Error: Something went wrong...';
     button.style.display = 'block';  
     playShortAudio("error.mp3");
   } finally {
     
   }
 }