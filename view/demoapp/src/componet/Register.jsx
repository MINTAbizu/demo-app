import React from 'react'
import { useState } from 'react'
//prepare formvalidation

function Register() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        username: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
        setSuccess('')
    }

    const validate = () => {
        if (!form.email || !form.password || !form.username) {
            setError('All fields are required')
            return false
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError('Invalid email')
            return false
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        try {
            const res = await fetch('http://localhost:3000/addemploye', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            if (res.ok) {
                setSuccess('Registration successful!')
                setForm({ email: '', password: '', username: '' })
            } else {
                const data = await res.json()
                setError(data.message || 'Registration failed')
            }
        } catch (err) {
            setError('Server error')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
