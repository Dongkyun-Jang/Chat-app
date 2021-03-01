import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import firebase from '../../firebase'

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

export default function LoginPage() {

    const { register, errors, handleSubmit } = useForm()
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    const [loading, setLoading] = useState(false)


    const onSubmit = async (data) => {
        try {
            setLoading(true)
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
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
                <h3>Login</h3>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <Input
                    name="email"
                    type="email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <span>This email field is required</span>}

                <label>Password</label>
                <Input
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === 'required' && <span>This password field is required</span>}
                {errors.password && errors.password.type === 'minLength' && <span>Password must have at least 6</span>}


                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <input
                    style={{ backgroundColor: '#7173E4' }}
                    type="submit"
                    disabled={loading}
                />

                <Link style={{ color: 'gray', textDecoration: 'none' }} to="register">아직 아이디가 없다면...</Link>
            </Form>


        </Section>
    )
}
