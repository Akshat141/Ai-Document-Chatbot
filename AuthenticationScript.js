const container = document.querySelector(".container")
const LoginLink = document.querySelector(".SingInLink")
const RegisterLink = document.querySelector(".SingUpLink")
RegisterLink.addEventListener('click',function(){
    container.classList.add('active');
})
LoginLink.addEventListener('click',function(){
    container.classList.remove('active')
})


gsap.from(".stars",{
    y:-100,
    opacity:0,
    delay:0.4,
    duration:1,
})

gsap.from(".container",{
    y: 150,
    opacity:0,
    delay:0.4,
    duration: 1.6,
    stagger:1
})