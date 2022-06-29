import Link from "next/link";
import { fetchAPI } from "../../lib/api";

export default function Register({ })
{
    return (
        <div className="mx-auto min-h-screen max-w-7xl p-10">
            <Link href='/'><a className="text-green-700 underline italic mb-6">Return</a></Link>
            <div className="text-green-600 font-bold text-2xl">Register form</div>

            <form onSubmit={handleSubmit} className="form-inline">
                <input type="text" name="identifier" placeholder="Username" onChange={handleChange}
                       className="form-input py-2 mx-2 rounded" required/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}
                       className="form-input py-2 mx-2 rounded" required/>

                <button className="py-2 mx-2 rounded bg-red-200" type="submit">Register</button>
            </form>
        </div>
    );
}