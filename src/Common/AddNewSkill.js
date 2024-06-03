import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from "../api/apiUrl";

function AddNewSkill() {
    const [values, setValues] = useState({
        Skill_Name :""
    })

    const onTextChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    
    const addNewSkillHandler= ()=>{
        axios.post("/Skills/AddNewSkill", values).then((res)=>{
            const message = res.data.Message;
            if(res.data.status == 200){
                toast.success(message, { position: toast.POSITION.TOP_CENTER});
                setValues({
                    Skill_Name : ''
                })
            }
            else(
            toast.error(message, { position: toast.POSITION.TOP_CENTER})
            )
        }).catch(err => {
            toast.error(err, { position: toast.POSITION.TOP_CENTER})
        })
    }

  return (
    <div style={{ width: 400, height: 70, display: 'flex', justifyContent:'center', alignItems:'center', gap: 20}}>
    <TextField
    name='Skill_Name'
    variant="standard"
    label="Skill Name"
    placeholder="Enter Skill..."
    value={values.Skill_Name}
    style={{width: 300 , height: "55px"}}
    onChange={onTextChange}
  />
  <Button size='large' variant='outlined' onClick={addNewSkillHandler} >ADD</Button>
  </div>
  )
}

export default AddNewSkill




// import React, { useState } from 'react'
// import TextField from '@mui/material/TextField';

// export default function AddNewSkill() {

//     const [email, setEmail] = useState("");
//     const [isErrors, setIsErrors] = useState({});
//     const [isEmailError, setIsEmailError] = useState(false);
//     const [suggestions, setSuggestions] = useState([]);
//     const handleEmailSuggestion = (suggest) => {
//         const atIndex = email.indexOf("@");
//         const username = email.substring(0, atIndex + 1);
//         const updatedEmail = username + suggest;
//         setEmail(updatedEmail);
//     }
//     const handleEmailInputChange = (event) => {
//         const input = event.target.value;
//         const emailRegex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
    
//         if (input) {
//           const atIndex = input.indexOf("@");
//           setIsErrors({ ...isErrors, Email: "" });
//           if (atIndex !== -1) {
//             const domain = input.substring(atIndex + 1);
//             const domainSuggestions = getSuggestions(domain);
//             setSuggestions(domainSuggestions);
//           }
//           if (emailRegex.test(input)) {
//             setSuggestions([]);
//           }
//           setEmail(input);
//         } else {
//           setIsErrors({ ...isErrors, Email: "*input is Empty" });
//           setEmail("");
//         }
//       };
//       const getSuggestions = (domain) => {
//         return [
//           "gmail.com",
//           "yahoo.com",
//           "hotmail.com",
//           "outlook.com",
//           "icloud.com",
//         ].filter((suggestion) => suggestion.startsWith(domain));
//       };
    

//   return (
//     <div>

// <div class="p-2">
//         <label>Email ID:</label>
//         <TextField
//           onChange={handleEmailInputChange}
//           type="text"
//           id="txtemail"
//           title="Email ID"
//           class="min-w-full bg-white rounded-md  mt-2"
//           value={email}
//           error={isEmailError}
//           size="small"
//           inputProps={{ Autocomplete: "auto" }}
//           placeholder="Please Enter Email Id *"
//           name="EmailId"
//           fullWidth
//           lable="Error"
//         />
//         {suggestions.length > 0 && email.includes("@") && (
//           <ul className="w-32">
//             {suggestions.map((suggestion, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleEmailSuggestion(suggestion)}
//                 className="text-blue-500 cursor-pointer hover:underline"
//               >
//                 {suggestion}
//               </li>
//             ))}
//           </ul>
//         )}
//         {isErrors.Email && (
//           <p style={{ color: "red", fontSize: "0.75rem" }}>{isErrors.Email}</p>
//         )}
//       </div>

//     </div>
//   )
// }
