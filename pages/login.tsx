import { useMutation } from "@apollo/client"
import StyledButton from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import Layout from "components/Layout/Layout/Layout"
import { useFormik } from "formik"
import { LOGIN_USER } from "graphql/query/login"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Login = () => {
    const [logins, { data, loading, error, reset }] = useMutation(LOGIN_USER)
    const [err, setError] = useState("")

    const fn = async (email: string, password: string) => {
        const res = await logins({
            variables: {
                input: {
                    email: email,
                    password: password,
                },
            },
        })
        console.log(res.data)
        if (!res?.data?.getOneUser?.token) {
            setError(res?.data?.getOneUser?.message)
        } else {
            localStorage.setItem("token", res?.data?.getOneUser?.token)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (initialValues) => {
            fn(initialValues.email, initialValues.password)
        },
    })

    if (typeof window !== "undefined" && localStorage.getItem("token")) {
        return <div>Авторизован</div>
    }

    if (typeof window !== "undefined") {
        return (
            <div className="Login">
                <div className="Login__container">
                    <div className="Login__form">
                        <form onSubmit={formik.handleSubmit}>
                            <h1>Авторизация</h1>

                            <div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </div>
                            <div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </div>
                            <div>
                                <StyledButton
                                    backgroundcolor="rgb(87 87 87)"
                                    width="10px"
                                    type="submit"
                                >
                                    Вход
                                </StyledButton>
                            </div>
                            <p>{err}</p>
                        </form>
                    </div>
                    <div className="Login__inf"></div>
                </div>
            </div>
        )
    }
}

export default Login
