import { useMutation, useQuery } from "@apollo/client"
import StyledButton from "components/UI/Button/Button";
import Input from "components/UI/Input/Input";
import { Formik } from "formik"
import { useFormik } from 'formik';
import { CREATE_USER } from "graphql/shema/mutations/shema"
import React, {useRef, FC} from 'react'

const Registration:FC = ()=>{
    const [registrations] = useMutation(CREATE_USER)

    const createUser = (name: string, email: string, password: string)=>{
        registrations({
                variables: {
                    input: {
                        user: name,
                        email,
                        password
                    }
                }
            })
    }

    const formik = useFormik({
        initialValues: {
          email: '',
          name: '',
          password: ''
        },
        onSubmit: (initialValues) => {
          createUser(initialValues.name, initialValues.email, initialValues.password)
        },
      });


    if(typeof window !== 'undefined' &&  localStorage.getItem('token')){
      return (
        <div>
          Вы авторизованы
        </div>
      )
    }
    
    return(
      <div className="Login">
      <div className="Login__container">
        <div className="Login__form">
            <form onSubmit={formik.handleSubmit}>
            <h1>Регистрация</h1>
              <div>
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                />
              </div>
              <div>
                  <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Имя"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  />
              </div>
              <div>
                  <Input
                  id="password"
                  name="password"
                  placeholder="Пароль"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  />
              </div>
              <div>
                <StyledButton type="submit">Зарегистрироваться</StyledButton>
              </div>
          </form>
        </div>
        <div className="Login__inf">

        </div>
      </div>
  </div>
    )
}

export default Registration