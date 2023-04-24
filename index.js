const ball = document.querySelector('.ball')
const rect = ball.getBoundingClientRect()
let x_ball = rect.left + rect.width / 2 //координаты x и y шарика
let y_ball = rect.top + rect.height / 2
const width = window.innerWidth //находим границы страницы
const height = window.innerHeight
let dx = 0 //добавляем скорость
let dy = 0

document.addEventListener("mousemove", (event) => {
    const xMouse = event.clientX //находим позицию нашей мышки
    const yMouse = event.clientY
    const distance = Math.sqrt((xMouse - x_ball) ** 2 + (yMouse - y_ball) ** 2) //тут ищем дистанцию от нашего шара до мышки по замудернной формуле которую придумал бот
    if (distance < 100) {
        const angle = Math.atan2(yMouse - y_ball, xMouse - x_ball) //находим  выраженный в радианах угол, отсчитываемый против часовой стрелки от положительного направления оси X до точки
        const force = 0.1 //значение силы
        dx += Math.cos(angle) + force //прибавляем силу к скорости каждый раз, когда мышка оказывается достаточно близко к шару
        dy += Math.sin(angle) + force
    }
});
//теперь добавим функцию animate, которая позволит нашему шару двигаться
const animate = () => {
    requestAnimationFrame(animate) //указывает браузеру на то, что мы хотим произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации. В качестве параметра метод получает функцию, которая будет вызвана перед перерисовкой.
    ball.style.left = x_ball + "px" //меняем стили нашего шарика (позицию)
    ball.style.top = y_ball + "px"
    x_ball += dx // меняем переменную координат, прибавляя скорость
    y_ball += dy
    //тут мы проверяем, достиг ли мяч границы контейнера, и если да, то меняем направление (то есть знак dx и dy) движения мяча, чтобы он отскочил от границы.
    if (x_ball - rect.width / 2 < 0 || x_ball + rect.width / 2 > width) {
        dx = -dx;
        x_ball += dx;
    }

    if (y_ball - rect.height / 2 < 0 || y_ball + rect.height / 2 > height) {
        dy = -dy;
        y_ball += dy;
    }
}

animate()

//в целом мне очень помог бот, он гениален в геометрии, в отличии от меня.

