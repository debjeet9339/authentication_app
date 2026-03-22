'use client';
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";
import { useState } from "react";

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('http://127.0.0.1:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, gender, password }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                console.log('Signup successful!');
                router.push('/dashboard');
                setName('');
                setEmail('');
                setGender('');
                setPassword('');
            } else {
                console.log(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Signup Page</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-full max-w-md"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        Male
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        Female
                    </label>
                </div>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Signup
                </button>
            </form>
            <Link href="/login" className="text-blue-600 hover:underline mt-4">
                Already have an account? Login here
            </Link>
        </div>
    );
}