import { useState, type FormEvent } from "react";

const LoginPage = () => {
  const [state, setState] = useState<"login" | "register">("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 bg-white shadow-xl m-auto py-12 p-8 border border-gray-200 rounded-lg w-80 sm:w-[352px] text-gray-500">
      <p className="m-auto font-medium text-2xl">
        <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
      </p>
      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="mt-1 p-2 border border-gray-200 rounded w-full outline-purple-700" type="text" required />
        </div>
      )}
      <div className="w-full">
        <p>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="mt-1 p-2 border border-gray-200 rounded w-full outline-purple-700" type="email" required />
      </div>
      <div className="w-full">
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="mt-1 p-2 border border-gray-200 rounded w-full outline-purple-700" type="password" required />
      </div>
      {state === "register" ? (
        <p>
          Already have account? <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">click here</span>
        </p>
      ) : (
        <p>
          Create an account? <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">click here</span>
        </p>
      )}
      <button type="submit" className="bg-purple-700 hover:bg-purple-800 py-2 rounded-md w-full text-white transition-all cursor-pointer">
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  )
}

export default LoginPage