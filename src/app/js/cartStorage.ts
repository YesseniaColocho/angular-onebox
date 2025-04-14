export function getCart() {
    const cart = JSON.parse(localStorage.getItem('events_cart') || '{}')
    if(!cart){
        localStorage.setItem('events_cart', '{}')
    }
    return cart
}

export function modifySession(event: any, date: string, quantity: number) {
    console.log()
    const eventsCart = getCart()
    if(!eventsCart[event.id]) eventsCart[event.id] = {event, sessions: [{date, quantity}]}
    else if(quantity > 0) {
        const session = eventsCart[event.id].sessions.find((session:any) => session.date === date)
        if(!session) {
            eventsCart[event.id].sessions.push({date, quantity})
        } else {
            session.quantity = quantity
        }
    } else {
        const sessionIndex = eventsCart[event.id].sessions.findIndex((session:any) => session.date === date)
        eventsCart[event.id].sessions.splice(sessionIndex, 1)
    }
    if(eventsCart[event.id].sessions.length === 0) {
        delete eventsCart[event.id]
    }

    localStorage.setItem('events_cart', JSON.stringify(eventsCart))
    return eventsCart
}