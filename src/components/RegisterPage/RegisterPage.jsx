import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import firebase from '../../firebase'
import md5 from 'md5'

const Section = styled.div`
    margin-top: 10em;
`;

const Form = styled.form`
    max-width: 25%;
    margin: 0 auto;
    display : flex;
    flex-direction: column;
    justify-content: center;
`;

const Input = styled.input`
    margin-bottom: 1em;
`;

export default function RegisterPage() {

    const { register, watch, errors, handleSubmit } = useForm()
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    const [loading, setLoading] = useState(false)
    const password = useRef()
    password.current = watch('password')

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            let createdUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)

            await createdUser.user.updateProfile({
                displayName: data.name,
                //이런 식으로 하면 랜덤한 아바타가 주어진다.
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })
            console.log(createdUser)

            //Firebase 데이터베이스에 저장하기
            await firebase.database().ref('user').child(createdUser.user.uid).set({
                name: createdUser.user.displayName,
                image: createdUser.user.photoURL,
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErrorFromSubmit(error.message)
            setTimeout(() => {
                setErrorFromSubmit("")
            }, 5000)
        }

    }

    return (
        <Section>
            <div style={{ textAlign: 'center' }}>
                <h3>Register</h3>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <Input
                    name="email"
                    type="email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <span>This email field is required</span>}

                <label>Name</label>
                <Input
                    name="name"
                    ref={register({ require: true, maxLength: 10 })}

                />
                {errors.name && errors.name.type === 'required' && <span>This Name field is required</span>}
                {errors.name && errors.name.type === 'maxLength' && <span>Your input exceed maximum length</span>}

                <label>Password</label>
                <Input
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === 'required' && <span>This password field is required</span>}
                {errors.password && errors.password.type === 'minLength' && <span>Password must have at least 6</span>}


                <label>Password Confirm</label>
                <Input
                    name="password_confirm"
                    type="password"
                    ref={register({
                        required: true,
                        validate: (value) => value === password.current
                    })}
                />
                {errors.password_confirm && errors.password_confirm.type === 'required' && <span>This password confirm field is required</span>}
                {errors.password_confirm && errors.password_confirm.type === 'validate' && <span>This password do not match</span>}


                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <input
                    style={{ backgroundColor: '#7173E4' }}
                    type="submit"
                    disabled={loading}
                />

                <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">이미 아이디가 있다면...</Link>
            </Form>


        </Section>
    )
}
