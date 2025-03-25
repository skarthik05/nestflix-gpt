export const validateFormData=(email,password,name)=>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
        email
      );
      const isPasswordValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
      if (!isEmailValid) return "Email ID is not valid";
      if (!isPasswordValid) return "Password is not valid";
      if(name && name.length<5) return "Full Name should be at least length 0f 5"
    
      return null;


}