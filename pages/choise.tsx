import StyledButton from "components/UI/Button/Button"
import Link from "next/link"

const choise = () => {
    return (
        <div className="Choose">
            <button>
                <div>
                    <Link href="/addonemusic">Создать альбом</Link>
                </div>
            </button>
            <button>
                <div>
                    <Link href="/musicadd">Добавить музыку</Link>
                </div>
            </button>
        </div>
    )
}

export default choise
