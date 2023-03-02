import axios from "axios"
import StyledButton from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import { Formik } from "formik"
import FormData from "form-data"
import { useRef } from "react"
import SelectForm from "../SelectForm/SelectForm"

interface IMusic {
    files: FileList
}

const FormMusic = () => {
    let formData: any = new FormData()
    const refName = useRef<HTMLInputElement>(null)
    const refFile = useRef<any>(null)
    const refAuthor = useRef<HTMLInputElement>(null)
    const genreRef = useRef<HTMLSelectElement>(null)

    const addMusic = async () => {
        formData.append("music", refFile?.current?.files[0])
        formData.append("name", refName?.current?.value || "")
        formData.append("author", refAuthor?.current?.value || "")
        formData.append("genre", genreRef?.current?.value || "")
        const res = await axios({
            method: "post",
            url: `http://localhost:5001/api/music/create`,
            data: formData,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": `multipart/form-data;`,
            },
        })
        console.log(res)

        formData.delete("music")
        formData.delete("name")
        formData.delete("author")
        formData.delete("genre")
    }

    return (
        <div className="Forms">
            <Input placeholder="Название" ref={refName} />
            <Input placeholder="Автор" ref={refAuthor} />
            <SelectForm ref={genreRef} />
            <input type="file" ref={refFile} accept=".mp3" />
            <StyledButton color="white" onClick={addMusic}>
                Добавить
            </StyledButton>
        </div>
    )
}

export default FormMusic
