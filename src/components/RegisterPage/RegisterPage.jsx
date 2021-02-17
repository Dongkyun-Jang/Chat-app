import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Section = styled.div`
    margin-top: 10em;
`;

const Form = styled.div`
    max-width: 25%;
    margin: 0 auto;
    display : flex;
    flex-direction: column;
    justify-content: center;
`;

// const Label = styled.div`
//     display: block;
// `;

const Input = styled.input`
    margin-bottom: 20px;
`;

export default function RegisterPage() {
    return (
        <Section>
            <div style={{ textAlign: 'center' }}>
                <h3>Register</h3>
            </div>

            <Form >
                <label>Email</label>
                <Input name="email" type="email" />
                {/* errors will return when field validation fails  */}
                {/* {errors.exampleRequired && <span>This field is required</span>} */}

                <label>Name</label>
                <Input name="name" />
                {/* errors will return when field validation fails  */}
                {/* {errors.exampleRequired && <span>This field is required</span>} */}

                <label>Password</label>
                <Input name="password" type="password" />
                {/* errors will return when field validation fails  */}
                {/* {errors.exampleRequired && <span>This field is required</span>} */}

                <label>Password Confirm</label>
                <Input name="password_confirm" type="password" />
                {/* errors will return when field validation fails  */}
                {/* {errors.exampleRequired && <span>This field is required</span>} */}

                <input type="submit" />
            </Form>

            <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">이미 아이디가 있다면...</Link>
        </Section>
    )
}
