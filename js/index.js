import overlayFunc from "./overlay.js"

const catalogContent = document.querySelector(".catalog__content")
const searchInput = document.querySelector(".catalog__search")
import { cartt, renderCartItems, deleteCardItem, LS } from "./renderCartItems.js"
import { renderSkeleton } from "./renderSkeleton.js"
const favPrice = document.querySelector(".fav__price");

const animCards = () => {
    gsap.from(".card", {
        duration: 0.5,
        opacity: 0,
        x: 30,
        delay: 0.5,
        stagger: 0.2,
    })
}


export let cart = []
if (LS.getItem("cart")) {
    cartt.push(JSON.parse(LS.getItem("cart")))
    cart = cartt[0]
}
const response = async () => {
    const data = [
        {
            "id": 0,
            "name": "Мужские Кроссовки Nike Blazer Mid Suede",
            "imgURL": "./assets/img/sneaker-1.png",
            "price": 12999
        },
        {
            "id": 1,
            "name": "Мужские Кроссовки Nike Air Max 270",
            "imgURL": "./assets/img/sneaker-2.png",
            "price": 12999
        },
        {
            "id": 2,
            "name": "Мужские Кроссовки Nike Blazer Mid Suede",
            "imgURL": "./assets/img/sneaker-3.png",
            "price": 8499
        },
        {
            "id": 3,
            "name": "Кроссовки Puma X Aka Boku Future Rider",
            "imgURL": "./assets/img/sneaker-4.png",
            "price": 8999
        },
        {
            "id": 4,
            "name": "Мужские Кроссовки Under Armour Curry 8",
            "imgURL": "./assets/img/sneaker-5.png",
            "price": 15199
        },
        {
            "id": 5,
            "name": "Мужские Кроссовки Nike Kyrie 7",
            "imgURL": "./assets/img/sneaker-6.png",
            "price": 11299
        },
        {
            "id": 6,
            "name": "Мужские Кроссовки Jordan Air Jordan 11",
            "imgURL": "./assets/img/sneaker-7.png",
            "price": 10799
        },
        {
            "id": 7,
            "name": "Мужские Кроссовки Nike LeBron XVIII",
            "imgURL": "./assets/img/sneaker-8.png",
            "price": 16499
        },
        {
            "id": 8,
            "name": "Мужские Кроссовки Nike Lebron XVIII Low",
            "imgURL": "./assets/img/sneaker-9.png",
            "price": 13999
        },
        {
            "id": 9,
            "name": "Мужские Кроссовки Nike Blazer Mid Suede",
            "imgURL": "./assets/img/sneaker-1.png",
            "price": 8499
        },
        {
            "id": 10,
            "name": "Мужские Кроссовки Nike Kyrie Flytrap IV",
            "imgURL": "./assets/img/sneaker-10.png",
            "price": 11299
        }
    ]


    renderCartItems()


    const handleAdd = () => {
        
        const addCart = document.querySelectorAll(".card__added")
        addCart.forEach((item) => {
            item.addEventListener("click", () => {
                item.classList.toggle("active")
            })
        })

        const addCard = catalogContent.querySelectorAll(".addCardItem")

        const AddCardItem = (id) => {
            cartt.push(data.find(item => +item.id === +id))
           
        }



        addCard.forEach(cartAdd => {
            cartAdd.addEventListener("click", () => {
                const itemId = cartAdd.parentElement.parentElement.parentElement.dataset.id
                cart.push(data.find(item => +item.id === +itemId))
                AddCardItem(itemId)
                for (let i = 0; i < cart.length; i++) {
                    LS.clear()
                    LS.setItem("cart", JSON.stringify(cart))


                }
                renderCartItems()

            })
        })

        const deleteCard = catalogContent.querySelectorAll(".deleteCardItem")

        deleteCard.forEach(cartDelete => {
            cartDelete.addEventListener("click", () => {
                const itemId = cartDelete.parentElement.parentElement.parentElement.dataset.id
                deleteCardItem(itemId)

                renderCartItems()
            })
        })

    }

    const renderGoods = (a) => {
        renderSkeleton()

        setTimeout(() => {
            catalogContent.innerHTML = ""
            a.forEach(item => {
                catalogContent.innerHTML += `
                <div data-id="${item.id}" class="card">
                    <div class="card__top">
                     
                        <img class="card__img" src="${item.imgURL}" alt="">
                    </div>
                    <h2>${item.name}</h2>
                    <div class="card__bottom">
                        <div class="price">
                            Цена:
                            <p>${item.price} руб.</p>
                        </div>
                        <div class="card__added">
                            <img class="addCardItem" src="./assets/img/add.svg" alt="">
                            <img class="deleteCardItem" src="./assets/img/added.svg" alt="">
                        </div>
                    </div>
               </div>
        `
                const cardItems = document.querySelectorAll(".card")
                cart.forEach(cardItem => {
                    if (cardItem.id === item.id) {
                        cardItems[item.id].querySelector(".card__added").classList.add("active")
                    }
                })


            });
            animCards()
            handleAdd()
        }, 400)
    }

    renderGoods(data)



    searchInput.addEventListener("keypress", () => {
        const inputsText = searchInput.value

        catalogContent.innerHTML = ""

        if (searchInput.value.trim() === "") {
            renderGoods(data)
        } else {
            const filteredGoods = data.filter(item => item.name.toLowerCase().includes(inputsText.trim().toLowerCase()))
            renderGoods(filteredGoods)
        }
    })



    return data
}


response()

overlayFunc()