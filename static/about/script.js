const navTogglers = document.querySelectorAll(".navbar-toggler");
const navClosers = document.querySelectorAll(".navbar-closer");

const modalTogglers = document.querySelectorAll(".modal-toggler");

navTogglers.forEach((toggler) => {
    toggler.addEventListener("click", () => {
        let target = toggler.getAttribute("data-toggle");
        document.getElementById(target).classList.toggle("active");
    });
});
navClosers.forEach((closer) => {
    closer.addEventListener("click", () => {
        let target = closer.getAttribute("data-toggle");
        document.getElementById(target).classList.remove("active");
    });
});
modalTogglers.forEach((toggler) => {
    toggler.addEventListener("click", () => {
        let target = toggler.getAttribute("data-toggle");
        document.getElementById(target).classList.toggle("active");
    });
});

const hobbies = document.querySelectorAll('.hobby');
hobbies.forEach((hobby) => {
    const rand = Math.random() > 0.5 ? 1 : -1;
    if(rand > 0)
        hobby.style.transform = `rotate(-${Math.floor(Math.random() * 30)}deg)`;
    else{
        hobby.style.transform = `rotate(${Math.floor(Math.random() * 30)}deg)`;
    }
    hobby.style.transform = `scale(${1 + Math.random()*0.2})` + hobby.style.transform;
});

const reshuffleHobbies = () => {
    hobbies.forEach((hobby) => {
        const rand = Math.random() > 0.5 ? 1 : -1;
        if(rand > 0)
            hobby.style.transform = `rotate(-${Math.floor(Math.random() * 30)}deg)`;
        else{
            hobby.style.transform = `rotate(${Math.floor(Math.random() * 30)}deg)`;
        }
        hobby.style.transform = `scale(${1 + Math.random()*0.8})` + hobby.style.transform;
    });
}
setInterval(reshuffleHobbies, 1000);