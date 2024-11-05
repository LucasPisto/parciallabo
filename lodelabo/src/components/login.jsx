import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../services/auth";
import { useAuthStore } from "../store/auth";

// campos que almacenan las credenciales de usuarios
export default function Login() {
   const [user, setUser] = useState({
   username: "",
   password: "",
   });

   // actualiza el estado del user a medida que el usuario escribe los campos
   const handleChange = (e) => {
   const { value, name } = e.target;

   setUser((prevUser) => ({ ...prevUser, [name]: value }));
   };

   const loginMutation = useMutation({
   mutationKey: ["login"],
   mutationFn: login,
   onSuccess: (data) => handleLogin(data),
   });

   const { handleLogin, handleLogout } = useAuthStore((data) => data);

   const handleSumbit = (e) => {
   e.preventDefault();

   loginMutation.mutate(user);
   setUser({
      username: "",
      password: "",
   });
   };

   return (
   <div>
      <form onSubmit={handleSumbit} className="login-form">
         <label className="login-user">
            <input
               type="text"
               name="username"
               value={user.username}
               onChange={handleChange}
               autoComplete="username"
               placeholder="Nombre de usuario"
            />
         </label>
         <br />
         <label className="login-user">
            <input
               type="password"
               name="password"
               value={user.password}
               onChange={handleChange}
               autoComplete="current-password"
               placeholder="Contraseña"
            />
         </label>
         <br />
         <div className="buttons-users">
            <button type="submit" className="button-login">Login</button>
            <button className="button-logout" onClick={handleLogout}>Logout</button>
         </div>
      </form>
   </div>
   );
}
