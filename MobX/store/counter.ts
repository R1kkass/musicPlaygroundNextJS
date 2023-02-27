import { makeAutoObservable } from "mobx"

interface ICount {
    count: number
}

type TResp = {
    id: number
    userId: number
    title: string
}

class Counter implements ICount {
    count = 0
    resp: TResp[] = []

    constructor() {
        makeAutoObservable(this)
    }

    increment() {
        this.count = this.count + 1
    }

    decrement() {
        this.count = this.count - 1
    }

    async fetching() {
        await fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => (this.resp = json))
    }
}

export default new Counter()
