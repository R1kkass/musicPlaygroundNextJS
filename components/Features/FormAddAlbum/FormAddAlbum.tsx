import axios from "axios"
import StyledButton from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import { Formik } from "formik"
import FormData from "form-data"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import SelectForm from "../SelectForm/SelectForm"
import UnitAudio from "components/UI/MyAudio/UnitAudio"

interface IMusic {
    files: FileList
}

interface IArr {
    id: number
    name: string
    album: string
    files: any
    author: string
    genre: string
}

let fr: any = typeof Audio !== "undefined" && new FileReader()

const FormAddAlbum = () => {
    let formData: any = new FormData()

    const refName = useRef<HTMLInputElement>(null)
    const refFile = useRef<any>(null)
    const refAuthor = useRef<HTMLInputElement>(null)
    const genreRef = useRef<HTMLSelectElement>(null)
    const refAlbum = useRef<HTMLInputElement>(null)
    const refImg = useRef<any>(null)

    const [arrMusic, setArrMusic] = useState<Array<IArr>>([])
    const [err, setErr] = useState<string>("")
    const [img, setImg] = useState<any>([])
    const [imgFile, setImgFile] = useState<any>()

    function fn() {
        if (img.result != fr.result) {
            setImg(fr)
            console.log(img)
        }
    }

    useEffect(() => {
        function fn() {
            setImg(fr)
            console.log(img)
            fr = typeof Audio !== "undefined" && new FileReader()
        }

        if (imgFile) {
            fr.readAsDataURL(refImg.current?.files[0])

            fr.addEventListener(
                "load",
                fn,
                false
            )
        }
    }, [imgFile, fr.readyState])

    const addMusic = async () => {
        formData.delete("album")
        formData.delete("genre")
        formData.delete("music")
        formData.delete("name")
        formData.delete("author")
        for (let i = 0; i < arrMusic.length; i++) {
            formData.append("music", arrMusic[i]?.files)
            formData.append("name", arrMusic[i]?.name || "")
            formData.append("author", arrMusic[i]?.author || "")
        }
        formData.set("album", arrMusic[0]?.album || "")
        formData.set("genre", arrMusic[0]?.genre || "")

        const res = await axios({
            method: "post",
            url: `http://localhost:5001/api/music/create`,
            data: formData,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": `multipart/form-data;`,
            },
        })
        formData.delete("album")
        formData.delete("genre")
        formData.delete("music")
        formData.delete("name")
        formData.delete("author")
    }

    const addArr = () => {
        if (
            !refName?.current?.value ||
            !refImg?.current?.files[0] ||
            !refAlbum?.current?.value ||
            !refAuthor?.current?.value ||
            !refFile?.current?.files[0] ||
            !genreRef?.current?.value
        ) {
            setErr("Поля не заполнены")
        } else {
            setArrMusic([
                ...arrMusic,
                {
                    id: Date.now(),
                    name: refName?.current?.value || "",
                    author: refAuthor?.current?.value || "",
                    files: refFile?.current?.files[0] || [],
                    genre: genreRef?.current?.value || "",
                    album: refAlbum?.current?.value || "",
                },
            ])
            setErr("")
        }
    }

    const deleteArr = (id: number) => {
        setArrMusic((p) => [...p.filter((key: any) => key.id != id)])
    }

    return (
        <div className="FormsAlbum">
            <div className="Forms">
                <Input placeholder="Название" ref={refName} />
                <Input placeholder="Автор" ref={refAuthor} />
                <Input placeholder="Альбом" ref={refAlbum} />
                <SelectForm ref={genreRef} />
                <input type="file" ref={refFile} accept=".mp3" />
                <input
                    type="file"
                    onChange={(e: ChangeEvent<any>) =>
                        setImgFile(e?.target?.files[0])
                    }
                    ref={refImg}
                    accept=".jpg"
                />
                <StyledButton color="white" onClick={addArr}>
                    Добавить
                </StyledButton>
                <p>{err}</p>
            </div>
            <div
                className="FormsAlbum__added"
                style={{ background: `url(${img?.result})` }}
            >
                {arrMusic?.map((mus: any) => (
                    <div key={mus?.id} className="FormsAlbum__unit">
                        {mus?.name} - {mus?.author}
                        <p onClick={() => deleteArr(mus?.id)}>X</p>
                    </div>
                ))}
            </div>
            <div className="ButtonAdd">
                <StyledButton onClick={addMusic}>
                    Подтвердить добавление
                </StyledButton>
            </div>
        </div>
    )
}

export default FormAddAlbum
